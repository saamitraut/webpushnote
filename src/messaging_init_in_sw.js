import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
//

const firebaseConfig = {
  apiKey: "AIzaSyA6mhsRIRErBIeProYHVY_wSe8QA0reCPw",
  authDomain: "pushnotification-web-ak.firebaseapp.com",
  projectId: "pushnotification-web-ak",
  storageBucket: "pushnotification-web-ak.appspot.com",
  messagingSenderId: "775776591950",
  appId: "1:775776591950:web:093d40ea794b37eef9631f",
  measurementId: "G-LSCSFXHRKK",
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
          "BDx-yTB0rUkMTLgad-2fOpA2OHYyteiChHKqQArrbgHUQs76vJXVBLNxiF-lPaYysIk9e-j5r4ZjiRrn3AYJN7g",
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
