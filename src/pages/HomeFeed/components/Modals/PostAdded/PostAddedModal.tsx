import { IonButton, IonIcon, IonText } from "@ionic/react";
import { checkmarkDoneCircleOutline } from "ionicons/icons";
import React, { useState } from "react";
import ModalWireFrame from "../../../../../components/ModalWireFrame";

import "./styles.css";

const PostAddedModal = () => {
  const [postDone, setPostDone] = useState(false);

  return (
    <ModalWireFrame isOpen={postDone} setOpenModal={setPostDone}>
      <div className='post-added-modal-wrapper'>
        <div className='post-added-message'>
          <IonIcon
            icon={checkmarkDoneCircleOutline}
            color='success'
            style={{ fontSize: "70px" }}
          />

          <IonText
            style={{ fontSize: "17px", fontWeight: "600" }}
            color='primary'
          >
            Your Post is successfully submited
          </IonText>

          <IonText color='medium' style={{ fontSize: "14px" }}>
            Your post is sent for approval and will be posted shortly.
          </IonText>
        </div>
        <div className='post-add-dismiss-btn'>
          <IonButton
            fill='outline'
            color='medium'
            onClick={() => {
              setPostDone(false);
            }}
          >
            Close
          </IonButton>
        </div>
      </div>
    </ModalWireFrame>
  );
};

export default PostAddedModal;
