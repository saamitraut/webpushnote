 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

 // Initialize the Firebase app in the service worker by passing the generated config
 const firebaseConfig = {
  apiKey: "AIzaSyA6mhsRIRErBIeProYHVY_wSe8QA0reCPw",
  authDomain: "pushnotification-web-ak.firebaseapp.com",
  projectId: "pushnotification-web-ak",
  storageBucket: "pushnotification-web-ak.appspot.com",
  messagingSenderId: "775776591950",
  appId: "1:775776591950:web:093d40ea794b37eef9631f",
  measurementId: "G-LSCSFXHRKK",
 };

 firebase.initializeApp(firebaseConfig);

 // Retrieve firebase messaging
 const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });