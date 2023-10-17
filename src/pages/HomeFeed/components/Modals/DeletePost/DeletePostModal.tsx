import React, { useContext, useEffect } from "react";
import { IonButton, IonText } from "@ionic/react";

import "./styles.css";
import ModalWireFrame from "../../../../../components/ModalWireFrame";
import ModalContext from "../../../context/ModalContext";
import UserContext from "../../../context/UserContext";

const DeletePostModal = () => {
  const { openDeletePostModal, setOpenDeletePostModal } =
    useContext(ModalContext);

  const { DeletePost } = useContext(UserContext);

  const closeDeleteModalFromWireFrame = (res: boolean) => {
    setOpenDeletePostModal({
      isOpen: res,
      postId: 0,
    });
  };

  const ConfirmDeletePost = () => {
    try {
      DeletePost(openDeletePostModal.postId);
      closeDeleteModalFromWireFrame(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("openDeletePostModal", openDeletePostModal);
  }, [openDeletePostModal]);

  return (
    <ModalWireFrame
      isOpen={openDeletePostModal.isOpen}
      setOpenModal={closeDeleteModalFromWireFrame}
    >
      <div className='delete-post-modal-wrapper'>
        <div className='delete-modal-header'>
          <IonText>Are you sure you want to delete this post?</IonText>
        </div>
        <div className='delete-modal-btns'>
          <IonButton
            fill='outline'
            color='medium'
            className='delete-modal-action-btn'
            onClick={() => closeDeleteModalFromWireFrame(false)}
          >
            Cancel
          </IonButton>
          <IonButton
            color='danger'
            className='delete-modal-action-btn'
            onClick={() => ConfirmDeletePost()}
          >
            Delete
          </IonButton>
        </div>
      </div>
    </ModalWireFrame>
  );
};

export default DeletePostModal;
