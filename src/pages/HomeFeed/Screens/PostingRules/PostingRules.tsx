import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";

import "./styles.css";
import ScreenWireFrame from "../../../../components/ScreensWireFrame";

const PostingRules = () => {
  const rules: Array<string> = [
    "Respect your neighbours",
    "Do not promote or spam",
    "Only community - relevant content",
    "No inappropriate topics",
    "Abide by UAE laws",
    "Use your real identity",
  ];
  return (
    <ScreenWireFrame backButtonText='Rules'>
      <div className='posting-rules-wrapper'>
        <div className='posting-rules-title'>
          <IonText color='primary'>Posting rules</IonText>
        </div>
        <div className='posting-rules-container'>
          {rules.map((rule, index) => {
            return (
              <div key={index} className='posting-rule-card'>
                <div className='posting-rule-nb'>{index + 1}</div>
                <IonText color='primary'>{rule}</IonText>
              </div>
            );
          })}
        </div>
        <div className='posting-rules-confirm-btn'>
          <IonButton color='primary' routerLink='/tabs/create-post'>
            Confirm
          </IonButton>
        </div>
      </div>
    </ScreenWireFrame>
  );
};

export default PostingRules;
