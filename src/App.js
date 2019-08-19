import React from "react";
import { messaging } from "./init-fcm";
import { compose, lifecycle, withHandlers, withState } from "recompose";

const renderNotification = (notification, i) => <li key={i}>{notification}</li>;

const registerPushListener = pushNotification =>

	navigator.serviceWorker.addEventListener("message", ({ data }) =>
    pushNotification(
      data.notification
        ? data.notification.title
        : data["firebase-messaging-msg-data"].notification.title
    )
  );

const App = ({ token, notifications, topics }) => (
	<>
    <h1>React + Firebase Cloud Messaging (Push Notifications)</h1>
    <div>
      Current token is: <p style={{ color: "blue"}}>{token}</p>
    </div>
		Notifications List:
    <ul style={{ color: "green"}}>
      
      {notifications.map(renderNotification)}
    </ul>
		Topic List:
		<ul>
			
		</ul>
		
  </>
);

export default compose(
  withState("token", "setToken", ""),
  withState("notifications", "setNotifications", []),
  withHandlers({
    pushNotification: ({
      setNotifications,
      notifications
    }) => newNotification =>
      setNotifications(notifications.concat(newNotification))
  }),
  lifecycle({
    async componentDidMount() {
      const { pushNotification, setToken } = this.props;

      messaging
        .requestPermission()
        .then(async function() {
          const token = await messaging.getToken();
					console.log(token);
					setToken(token);
        })
        .catch(function(err) {
          console.log("Unable to get permission to notify.", err);
        });

      registerPushListener(pushNotification);
    }
  })
)(App);