import React, { useContext, useEffect } from "react";
import { IonButton, IonIcon } from "@ionic/react";

import {
  alertCircleOutline,
  pencilOutline,
  trashBinOutline,
} from "ionicons/icons";

import "./styles.css";
import ModalWireFrame from "../../../../../components/ModalWireFrame";
import useModalToogle from "../../../context/ModalContext";
import ModalContext from "../../../context/ModalContext";
import { useHistory } from "react-router";

const PostActionSheet = () => {
  const {
    openPostAS,
    setOpenPostAS,
    openDeleteModal,
    openReportModal,
    showAllButtons,
  } = useContext(ModalContext);

  const history = useHistory();

  const editPost = () => {
    history.push("/tabs/create-post", { postId: openPostAS.postId });
  };

  const closeActionSheetFromWireFrame = (res: boolean) => {
    setOpenPostAS({
      isOpen: res,
      postId: 0,
    });
  };

  return (
    <ModalWireFrame
      isOpen={openPostAS.isOpen}
      setOpenModal={closeActionSheetFromWireFrame}
    >
      <div className='action-sheet-container'>
        {showAllButtons && (
          <>
            <IonButton className='action-sheet-btn' onClick={editPost}>
              <IonIcon
                slot='start'
                icon={pencilOutline}
                className='action-sheet-icon'
              />
              Edit
            </IonButton>
            <IonButton
              slot='start'
              color='danger'
              className='action-sheet-btn'
              onClick={() => openDeleteModal(openPostAS.postId)}
            >
              <IonIcon icon={trashBinOutline} className='action-sheet-icon' />
              Delete
            </IonButton>
          </>
        )}

        <IonButton
          slot='start'
          className='action-sheet-report-btn'
          onClick={() => openReportModal()}
        >
          <IonIcon icon={alertCircleOutline} className='action-sheet-icon' />
          Report
        </IonButton>
      </div>
    </ModalWireFrame>
  );
};

export default PostActionSheet;
