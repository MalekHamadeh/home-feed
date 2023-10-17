import React, { useContext, useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";

import NavBar from "../../../../components/NavBar";
import FeedNavigation from "../../components/FeedNavigation";

import Card from "../../components/Card";

import CreateUser from "../../components/Modals/CreateUser";
import PostActionSheet from "../../components/Modals/PostActionSheet";
import DeletePostModal from "../../components/Modals/DeletePost";
import ReportPostModal from "../../components/Modals/PostReport";
import PostCommentsModal from "../../components/Modals/PostComments";
import PostAddedModal from "../../components/Modals/PostAdded";

import ModalContext from "../../context/ModalContext";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router";
import { IPost } from "../../context/types";
import usePost from "../../Hooks/usePost";
import { PostContext } from "../../context/PostContext";

const HomeFeed: React.FC = () => {
  const { user } = useContext(UserContext);
  const { state } = useContext(PostContext);
  const { getNonUserPosts } = usePost();
  const { setIsNewUserModal } = useContext(ModalContext);

  const history = useHistory();

  const [homeFeedPosts, setHomeFeedPosts] = useState<IPost[]>([]);

  const [open, setOpen] = useState({
    createUser: false,
    deletePost: false,
    postAs: false,
    postAdded: false,
    postComment: false,
    report: false,
  });

  const [currentPost, setCurrentPost] = useState<IPost>();

  useEffect(() => {
    const nonUserPosts = getNonUserPosts(state.allPosts, user.userId);
    console.log("nonUserPosts", nonUserPosts);
    setHomeFeedPosts(nonUserPosts);
  }, [user, state.allPosts]);

  const editPost = (post: IPost) => {
    history.push("/tabs/create-post", currentPost);
  };

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <NavBar />
          <FeedNavigation />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {homeFeedPosts.map((post, index) => {
          return <Card key={index} post={post} />;
        })}
        <CreateUser />
        <PostCommentsModal />
        <PostActionSheet />
        <DeletePostModal />
        <ReportPostModal />
        <PostAddedModal />
      </IonContent>
    </IonPage>
  );
};

export default HomeFeed;
