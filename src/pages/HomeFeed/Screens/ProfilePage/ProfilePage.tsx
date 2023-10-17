import {
  IonAvatar,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import PostActionSheet from "../../components/Modals/PostActionSheet";
import PostCommentsModal from "../../components/Modals/PostComments";

import "./styles.css";
import ScreenWireFrame from "../../../../components/ScreensWireFrame";
import DeletePostModal from "../../components/Modals/DeletePost";

import UserContext from "../../context/UserContext";
import ReportPostModal from "../../components/Modals/PostReport";
import PostAddedModal from "../../components/Modals/PostAdded";
import { IPost } from "../../context/types";
import usePost from "../../Hooks/usePost";
import { PostContext } from "../../context/PostContext";

const ProfilePage = () => {
  const [selectedSegment, setSelectedSegment] = useState("my-profile");
  const [likedPosts, setLikedPosts] = useState<IPost[]>([]);
  const [commentedPosts, setCommentedPosts] = useState<IPost[]>([]);
  const [myPosts, setMyPosts] = useState<IPost[]>([]);

  const { user } = useContext(UserContext);
  const { state } = useContext(PostContext);

  const { getUserPosts, postsLikedByUser, postsCommentedByUser } = usePost();

  useEffect(() => {
    const allUserPosts = getUserPosts(state.allPosts, user.userId);
    const likedUserPosts = postsLikedByUser(state.allPosts, user.userId);
    const commentedUserPosts = postsCommentedByUser(
      state.allPosts,
      user.userId
    );
    setMyPosts(allUserPosts);
    setLikedPosts(likedUserPosts);
    setCommentedPosts(commentedUserPosts);
  }, [state.allPosts]);

  const handleSegmentChange = (e: any) => {
    setSelectedSegment(e.detail.value);
  };

  return (
    <ScreenWireFrame backButtonText='Profile'>
      <div className='profile-page-wrapper'>
        <div className='profile-page-header'>
          <div className='profile-page-user-edit'>
            <IonButton fill='clear' slot='icon-only' size='small'>
              <IonIcon icon={pencilOutline} slot='icon-only' />
            </IonButton>
          </div>
          <div className='profile-page-user-avatar'>
            <IonAvatar className='profile-avatar'>
              <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' />
            </IonAvatar>
          </div>
          <div className='profile-page-user-nickname'>
            Nickname
            <div className='input-outline'>
              <IonInput
                value={user.name}
                mode='md'
                fill='outline'
                className='nickname-input'
              ></IonInput>
            </div>
          </div>
        </div>
        <div className='profile-page-switcher'>
          <IonSegment
            value={selectedSegment}
            onIonChange={(e) => handleSegmentChange(e)}
          >
            <IonSegmentButton value='my-profile'>
              <IonLabel>My posts</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value='my-likes'>
              <IonLabel>My likes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value='comments'>
              <IonLabel>Comments</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <div className='profile-page-posts-container'>
          {selectedSegment === "my-profile"
            ? myPosts.map((post, index) => (
                <Card key={index} post={post} myCard profileCard />
              ))
            : selectedSegment === "my-likes"
            ? likedPosts.map((post, index) => (
                <Card key={index} post={post} profileCard />
              ))
            : selectedSegment === "comments" &&
              commentedPosts.map((post, index) => (
                <Card key={index} post={post} profileCard />
              ))}
        </div>
      </div>

      <PostCommentsModal />
      <PostActionSheet />
      <DeletePostModal />
      <ReportPostModal />
      <PostAddedModal />
    </ScreenWireFrame>
  );
};

export default ProfilePage;
