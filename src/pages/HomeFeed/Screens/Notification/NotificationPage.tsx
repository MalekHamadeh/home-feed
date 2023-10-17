import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import {
  alertCircleOutline,
  arrowBackOutline,
  chatbubbleEllipses,
  checkmarkCircleOutline,
  heartOutline,
} from "ionicons/icons";
import React, { useState } from "react";

interface NotificationCardProp {
  userAvatar: string;
  userName: string;
  postId: string;
  postType: string;
}

import "./styles.css";
import ScreenWireFrame from "../../../../components/ScreensWireFrame";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      userAvatar:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      userName: "Leslie Alexander",
      postId: "#1",
      postType: "comment",
    },
    {
      userAvatar:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      userName: "Jacob Jones",
      postId: "#2",
      postType: "like",
    },
    {
      userAvatar:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      userName: "Leslie Alexander",
      postId: "#3",
      postType: "report",
    },
    {
      userAvatar:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      userName: "Leslie Alexander",
      postId: "#4",
      postType: "approve",
    },
  ]);

  return (
    <ScreenWireFrame backButtonText='Notifications'>
      <div className='notifications-wrapper'>
        {notifications.map((notification, index) => {
          return notification.postType === "like" ||
            notification.postType === "comment" ? (
            <NotificationCard data={notification} key={index} />
          ) : (
            (notification.postType === "report" ||
              notification.postType === "approve") && (
              <DoubleNotificationCard data={notification} key={index} />
            )
          );
        })}
      </div>
    </ScreenWireFrame>
  );
};

const NotificationCard = ({ data }: { data: NotificationCardProp }) => {
  return (
    <div className='notification-card-wrapper'>
      <div className='notification-card-info'>
        <div className='notification-card-user'>
          <IonAvatar>
            <img src={data.userAvatar} alt='profile' />
          </IonAvatar>
        </div>
        <div className='notification-card-text'>
          {data.postType === "like" && (
            <IonText className='ion-padding'>
              <b>{data.userName}</b> liked your post
              <b> [Post {data.postId}]</b>
            </IonText>
          )}
          {data.postType === "comment" && (
            <IonText className='ion-padding'>
              <b>{data.userName}</b> commented on your post
              <b> [Post {data.postId}]</b>
            </IonText>
          )}
        </div>
      </div>
      <div
        className={`notification-card-icon ${
          data.postType === "like" ? "like-report-card" : "comment-card"
        }`}
      >
        {data.postType === "like" && (
          <IonIcon icon={heartOutline} color='danger' />
        )}
        {data.postType === "comment" && (
          <IonIcon icon={chatbubbleEllipses} color='primary' />
        )}
      </div>
    </div>
  );
};

const DoubleNotificationCard = ({ data }: { data: NotificationCardProp }) => {
  return (
    <div className='notification-double-card'>
      <div
        className={`notification-double-card-icon ${
          data.postType === "report" ? "like-report-card" : "approve-card"
        }`}
      >
        {data.postType === "report" && (
          <IonIcon icon={alertCircleOutline} color='danger' />
        )}
        {data.postType === "approve" && (
          <IonIcon icon={checkmarkCircleOutline} color='success' />
        )}
      </div>
      <div className='notification-card-text'>
        {data.postType === "report" && (
          <IonText className='ion-padding'>
            <b>Someone</b> reported your post <b>[Post {data.postId}]</b>
          </IonText>
        )}
        {data.postType === "approve" && (
          <IonText className='ion-padding'>
            Your post was approved <b>[Post {data.postId}]</b>
          </IonText>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
