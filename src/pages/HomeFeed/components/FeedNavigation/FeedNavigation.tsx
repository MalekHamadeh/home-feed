import React, { useContext } from "react";
import { IonButton, IonIcon, IonNavLink, IonText } from "@ionic/react";
import {
  addOutline,
  chatbubbleEllipsesOutline,
  notificationsOutline,
} from "ionicons/icons";

import "./styles.css";

import { Link, useHistory } from "react-router-dom";
import useModalToogle from "../../context/ModalContext";
import ModalContext from "../../context/ModalContext";
import UserContext from "../../context/UserContext";

const FeedNavigation = () => {
  const { isNewUser } = useContext(UserContext);

  return (
    <div className='feed-nav-bar-wrapper'>
      <div className='feed-nav-bar-title'>
        <IonText color='primary'>Feed</IonText>
      </div>
      <div className='feed-nav-bar-btns'>
        <IonButton fill='clear' size='small'>
          <IonIcon
            icon={chatbubbleEllipsesOutline}
            aria-hidden='true'
            color='primary'
            slot='icon-only'
          />
        </IonButton>
        <IonButton fill='clear' size='small' routerLink='/notifications'>
          <IonIcon
            icon={notificationsOutline}
            aria-hidden='true'
            color='primary'
            slot='icon-only'
          />
        </IonButton>

        <IonButton
          fill='clear'
          size='small'
          routerLink={isNewUser ? "/tabs/posting-rules" : "/tabs/create-post"}
        >
          <IonIcon
            icon={addOutline}
            aria-hidden='true'
            color='primary'
            slot='icon-only'
          />
        </IonButton>
      </div>
    </div>
  );
};

export default FeedNavigation;
