import React from "react";
import { IonButton, IonIcon, IonText } from "@ionic/react";
import { menuOutline, personOutline } from "ionicons/icons";

import "./NavBar.css";
import { useHistory } from "react-router";

const NavBar = () => {
  const history = useHistory();

  return (
    <div className='navbar-wrapper'>
      <div className='navbar-side-menu-btn'>
        <IonButton fill='clear'>
          <IonIcon icon={menuOutline} color='primary' />
        </IonButton>
      </div>
      <div className='navbar-btns'>
        <IonButton
          fill='clear'
          onClick={() => {
            history.push("/profile");
          }}
        >
          <IonIcon icon={personOutline} color='primary' />
        </IonButton>
        <IonButton color='warning' size='small' className='credits-btn'>
          <IonText color='light'>400 Crs</IonText>
        </IonButton>
      </div>
    </div>
  );
};

export default NavBar;
