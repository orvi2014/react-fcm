/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBPmRWZXJ_ILOgsNPl49RjB82tKZifyTsw",
	authDomain: "tigrow-ac160.firebaseapp.com",
	databaseURL: "https://tigrow-ac160.firebaseio.com",
	projectId: "tigrow-ac160",
	storageBucket: "tigrow-ac160.appspot.com",
	messagingSenderId: "534503635154",
	appId: "1:534503635154:web:6b63e49c93d3b152"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
			/*global someFunction b:true*/
/*eslint no-undef: "error"*/
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
