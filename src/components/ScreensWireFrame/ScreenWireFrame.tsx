import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import React, { FC, ReactNode } from "react";
import "./styles.css";

interface ScreenWireFrameProps {
  children: ReactNode;
  backButtonText: string;
}
const ScreenWireFrame: FC<ScreenWireFrameProps> = ({
  children,
  backButtonText,
}) => {
  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons>
            <IonBackButton
              icon={arrowBackOutline}
              text={backButtonText}
              defaultHref='/tabs'
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
};

export default ScreenWireFrame;
