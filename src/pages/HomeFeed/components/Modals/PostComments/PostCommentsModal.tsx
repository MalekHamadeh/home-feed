import { IonAvatar, IonButton, IonIcon, IonInput, IonText } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import {
  chatbubbleEllipsesOutline,
  lockClosedOutline,
  sendOutline,
} from "ionicons/icons";

import "./styles.css";
import ModalWireFrame from "../../../../../components/ModalWireFrame";
import ModalContext from "../../../context/ModalContext";

interface CommentsDetails {
  user: {
    name: string;
    profilePic: string;
    isActive: string;
  };
  commentDate: string;
  comment: string;
}

const PostCommentsModal = () => {
  const { commentModal, setCommentModal } = useContext(ModalContext);
  const { getCommentDetails, addUserComment } = useContext(UserContext);
  const [enhancedComments, setEnhancedComments] = useState<
    Array<CommentsDetails>
  >([]);
  const [commentText, setCommentText] = useState<string>("");
  useEffect(() => {
    setEnhancedComments(getCommentDetails(commentModal.comments));
  }, [commentModal]);

  const closeCommentModal = (res: boolean) => {
    setCommentModal({
      isOpen: res,
      postId: 0,
      comments: [],
    });
  };

  const addCommentText = (e: any) => {
    setCommentText(e.target.value);
  };

  const submitComment = () => {
    addUserComment(commentText, commentModal.postId);
  };

  return (
    <ModalWireFrame
      isOpen={commentModal.isOpen}
      setOpenModal={closeCommentModal}
    >
      <div className='comment-modal-wrapper'>
        <div>
          {enhancedComments.map((comment, index) => {
            const isLastItem = index === enhancedComments.length - 1;
            return (
              <div
                key={index}
                className={`post-comments-container ${
                  isLastItem && "no-divider"
                }`}
              >
                <CommentCard commentDetail={comment} />
              </div>
            );
          })}
        </div>
        <div className='post-comments-action-bar'>
          <div className='add-comment-text-area'>
            <IonIcon color='medium' icon={chatbubbleEllipsesOutline} />
            <IonInput
              placeholder='Type your comment here'
              className='comment-input-field'
              slot='start'
              onIonInput={(e) => addCommentText(e)}
            ></IonInput>
            <IonIcon color='medium' icon={lockClosedOutline} />
          </div>
          <IonButton
            className='add-comment-btn'
            onClick={() => submitComment()}
          >
            <IonIcon icon={sendOutline} />
          </IonButton>
        </div>
      </div>
    </ModalWireFrame>
  );
};

const CommentCard = ({ commentDetail }: { commentDetail: CommentsDetails }) => {
  let statusClassName = "inactive";
  if (commentDetail.user.isActive === "Online") {
    statusClassName = "active";
  }
  return (
    <div className='comment-card-wrapper'>
      <div className='comment-card-user'>
        <IonAvatar>
          <img src={commentDetail.user.profilePic} alt='profile' />
        </IonAvatar>
        <div className='comment-card-user-info'>
          <IonText>{commentDetail.user.name}</IonText>
          <div className='comment-card-user-info-status'>
            <div className={`user-status ${statusClassName}`}></div>
            <IonText>{commentDetail.user.isActive}</IonText>
            <div className='yellow-dot' />
            <IonText>{commentDetail.commentDate}</IonText>
          </div>
        </div>
      </div>
      <div className='comment-container'>
        <IonText>{commentDetail.comment}</IonText>
      </div>
    </div>
  );
};

export default PostCommentsModal;
{
  /* <IonText color='primary' style={{ fontWeight: "600", fontSize: "18px" }}>
  Comments
</IonText>; */
}
