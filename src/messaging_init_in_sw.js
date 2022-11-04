import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
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
//

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
          var userid = url.searchParams.get("userid");
          const user = {};
          user = {
            userid: userid,
            browsertoken: currentToken,
          };
          let options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(user),
          };
          // Storing Token against userid in notification_registration
          let fetchRes = fetch(
            "bill.seatvnetwork.com:8081/sla/api/insertBrowserRegistration.php",
            options
          );
          fetchRes
            .then((res) => res.json())
            .then((d) => {
              console.log(d);
              alert("done");
            });
        } else {
          console.log("cannot get");
        }
      });
    } else {
      console.log("no permisssion");
    }
  });
}

requestPermission();
