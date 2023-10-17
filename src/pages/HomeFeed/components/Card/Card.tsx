import React, { FC, useContext, useEffect, useState } from "react";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonCard,
  IonChip,
  IonIcon,
  IonImg,
  IonText,
} from "@ionic/react";
import {
  chatbubbleEllipsesOutline,
  ellipsisHorizontalOutline,
  heart,
  heartOutline,
  image,
} from "ionicons/icons";

import imageBanana from "../../assets/bananaz.jpg";
import "./styles.css";

import ModalContext from "../../context/ModalContext";
import { IPost, IUser } from "../../context/types";
import UserContext from "../../context/UserContext";

const Card: FC<CardProps> = (props) => {
  const { myCard, profileCard, post } = props;

  const { infoAndCommentToggle, openActionSheet } = useContext(ModalContext);
  const { user, setUser, ToggleUserLike, postUserInfo } =
    useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [postUser, setPostUser] = useState<IUser>();

  useEffect(() => {
    if (post.likes.includes(user.userId)) {
      setLiked(true);
    }
    setPostUser(postUserInfo(post.userId));
  }, [post]);

  const toggleLike = () => {
    ToggleUserLike(post);
    setLiked(!liked);
  };
  return (
    <IonCard className='main-card'>
      <div className={`feed-card-wrapper ${profileCard && "no-padding"}`}>
        <div className={`feed-card-header ${myCard && "justify-end"}`}>
          {!myCard && (
            <div className='feed-card-user'>
              <IonAvatar>
                <img src={postUser?.profilePicture} alt='profile' />
              </IonAvatar>
              <div
                className='feed-user-info'
                style={{ display: "flex", flexDirection: "column" }}
              >
                <IonText color='primary' className='card-post-user'>
                  {postUser?.name}
                </IonText>
                <IonText className='feed-user-date'>
                  {post.datePosted} <div className='yellow-dot' /> Date
                </IonText>
              </div>
            </div>
          )}
          <div>
            <IonButton
              fill='clear'
              size='small'
              onClick={() => {
                openActionSheet(myCard!, post.postId);
              }}
            >
              <IonIcon
                className='more-options-btn'
                icon={ellipsisHorizontalOutline}
                color='primary'
                slot='icon-only'
              />
            </IonButton>
          </div>
        </div>
        <div className='feed-card-post-tags'>
          <IonChip color='primary' className='card-tags'>
            General
          </IonChip>
        </div>
        <div className='feed-card-post-desc'>
          <IonText>{post.description}</IonText>
        </div>
        <div className='feed-card-post-image'>
          {post.images.map((image, index) => {
            return (
              <IonImg
                src={image}
                alt='postImg'
                className='post-image'
                key={index}
              ></IonImg>
            );
          })}
        </div>
        <div className='feed-card-footer'>
          <IonButton
            fill='clear'
            color='dark'
            onClick={toggleLike}
            className='info-card-action-btn'
            size='small'
          >
            <IonIcon icon={liked ? heart : heartOutline} color='danger' />
            {post.likes.length}
          </IonButton>
          <IonButton
            fill='clear'
            color='dark'
            onClick={() => infoAndCommentToggle(post.comments, post.postId)}
            className='info-card-action-btn'
            size='small'
          >
            <IonIcon icon={chatbubbleEllipsesOutline} color='primary' />
            {post.comments.length}
          </IonButton>
        </div>
      </div>
    </IonCard>
  );
};

export default Card;

interface CardProps {
  profileCard?: boolean;
  myCard?: boolean;
  post: IPost;
}
