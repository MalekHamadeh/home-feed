import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React, { FC, ReactNode, useEffect } from "react";

interface ModalWireFrame {
  children: ReactNode;
  isOpen: boolean;
  setOpenModal: (boolean: boolean) => void;
}

const ModalWireFrame: FC<ModalWireFrame> = ({
  isOpen,
  setOpenModal,
  children,
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      className='info-modal'
      showBackdrop
    >
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='end'>
            <IonButton onClick={() => setOpenModal(false)}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {children}
    </IonModal>
  );
};

export default ModalWireFrame;
