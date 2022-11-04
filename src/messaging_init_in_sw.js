import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
//

const firebaseConfig = {

  apiKey: "AIzaSyAD1QWN6juxGrl8MNUzDWwtUGfZKkrLrY0",

  authDomain: "orbital-citizen-329918.firebaseapp.com",

  projectId: "orbital-citizen-329918",
  storageBucket: "orbital-citizen-329918.appspot.com",

  messagingSenderId: "585222784568",

  appId: "1:585222784568:web:044e3f50546304953788cd",
  measurementId: "G-QF7HRMCTP9"

};

// Initialize Firebase Cloud Messaging and get a reference to the service

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BMvKqKSpVpXIxOzHDNuAjU9F-a6xWuB9WUJhp4sliub32Uk_dO2SvqxhnlLhFvrUQSCZbrpQgUMthWXxpjgf2aE",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken", currentToken);
          var url = new URL(window.location.href);
          var userid = window.atob(url.searchParams.get("userid"));

          var formdata = new FormData();

          formdata.append("userid", userid);
          formdata.append("browsertoken", currentToken);

          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };

          fetch(
            "https://seatvnetwork.com/api/insertBrowserRegistration",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => {
              console.log(result);
              // document.getElementById("msg").innerHTML = result;
              result = JSON.parse(result);
              MySwal.fire({
                title: result.Message,
                // didOpen: () => {
                //   // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                //   MySwal.showLoading();
                // },
              }).then(() => {
                // return MySwal.fire(<p>Shorthand works too</p>);
              });
            })
            .catch((error) => console.log("error", error));
        } else {
          MySwal.fire(<p>Token not received</p>);
        }
      });
    } else {
      MySwal.fire(<p>Permission Denied</p>);
    }
  });
}
requestPermission();
