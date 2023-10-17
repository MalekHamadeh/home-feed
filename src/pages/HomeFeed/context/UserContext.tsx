import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { IComment, IPost, IUser } from "./types";
import userData from "../data/users.json";
import postsData from "../data/posts.json";
import { PostToAdd } from "../Screens/CreatePost/CreatePost";

interface UserContextProps {
  user: IUser;
  userPosts: Array<IPost>;
  userLikedPosts: Array<IPost>;
  userCommentedPosts: Array<IPost>;
  isNewUser: boolean;
  userHomeFeedPosts: Array<IPost>;
  getCommentDetails: (comments: IComment[]) => CommentsDetails[];
  setUser: Dispatch<SetStateAction<IUser>>;
  ToggleUserLike: (post: IPost) => void;
  postUserInfo: (userId: number) => IUser;
  AddPost: (post: PostToAdd) => void;
  DeletePost: (postId: number) => void;
  getPostContent: (postId: number) => postContent;
  addUserComment: (userComment: string, postId: number) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface CommentsDetails {
  user: {
    name: string;
    profilePic: string;
    isActive: string;
  };
  commentDate: string;
  comment: string;
}

export interface postContent {
  description: string;
  images: Array<string>;
  category: string;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser>({
    userId: 1,
    name: "Leslie Alexander",
    email: "leslie123@gmail.com",
    password: "leslie_123",
    profilePicture: "123",
    availability: "Online",
    isNewUser: false,
  } as IUser);

  const [isNewUser, setIsNewUser] = useState(false);
  const [allPosts, setPosts] = useState<Array<IPost>>(postsData);
  const [userPosts, setUserPosts] = useState<Array<IPost>>([]);
  const [userHomeFeedPosts, setUserHomeFeedPosts] = useState<Array<IPost>>([]);
  const [userLikedPosts, setUserLikedPosts] = useState<Array<IPost>>([]);
  const [userCommentedPosts, setUserCommentedPosts] = useState<Array<IPost>>(
    []
  );

  useEffect(() => {
    getAllUserPosts();
  }, []);

  const getAllUserPosts = () => {
    const specificUserPosts: Array<IPost> = allPosts.filter(
      (post) => post.userId === user.userId
    );

    setUserPosts(specificUserPosts);
  };

  const HomeFeedPosts = () => {
    const nonUserPosts: Array<IPost> = allPosts.filter(
      (post) => post.userId !== user.userId
    );

    setUserHomeFeedPosts(nonUserPosts);
  };

  const likedPostsByUser = () => {
    const likedPosts: Array<IPost> = allPosts.filter((post) =>
      post.likes.includes(user.userId)
    );
    setUserLikedPosts(likedPosts);
  };

  const commentedPostsByUser = () => {
    const commentedPosts: Array<IPost> = allPosts.filter((post) => {
      return post.comments.some((comment) => comment.userId === user.userId);
    });
    setUserCommentedPosts(commentedPosts);
  };

  const getCommentDetails = (comments: IComment[]) => {
    const commentDetails = comments.map((comment) => {
      const user = userData.find((user) => user.userId === comment.userId);
      if (user) {
        return {
          user: {
            name: user.name,
            profilePic: user.profilePicture,
            isActive: user.availability,
          },
          commentDate: comment.commentDate,
          comment: comment.commentDesc,
        };
      }
      return null;
    });

    return commentDetails.filter(
      (commentDetail) => commentDetail !== null
    ) as CommentsDetails[];
  };

  const ToggleUserLike = (post: IPost) => {
    if (post.likes.includes(user.userId)) {
      const index = post.likes.indexOf(user.userId);
      post.likes.splice(index, 1);
      allPosts.forEach((post) =>
        post.likes.includes(user.userId) ? post.likes.splice(index, 1) : null
      );
    } else {
      post.likes.push(user.userId);
      allPosts.forEach((post) =>
        post.likes.includes(user.userId) ? post.likes.push(user.userId) : null
      );
    }
  };

  const postUserInfo = (userId: number) => {
    const selectedUser = userData.find((user) => {
      if (user.userId === userId) return user;
    });
    return selectedUser as IUser;
  };

  const DateFormatter = () => {
    const date = new Date(); // Replace this with your date object

    const options = { day: "2-digit" as const, month: "short" as const };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  const AddPost = (post: PostToAdd) => {
    const { description, images, category } = post;
    const newPost: IPost = {
      userId: user.userId,
      postId: allPosts.length + 1,
      description,
      images,
      category,
      likes: [],
      comments: [],
      datePosted: DateFormatter(),
    };

    setPosts([...allPosts, newPost]);
  };

  const DeletePost = (postId: number) => {
    const updatedAllPosts = allPosts.filter((post) => post.postId !== postId);
    setPosts(updatedAllPosts);
  };

  const getPostContent = (postId: number) => {
    const postToEdit = allPosts.find((post) => post.postId === postId);
    const { description, images, category } = postToEdit as IPost;
    const postContent: postContent = { description, images, category };
    return postContent;
  };

  const addUserComment = (userComment: string, postId: number) => {
    const userCommentToAdd: IComment = {
      userId: user.userId,
      commentDesc: userComment,
      commentDate: DateFormatter(),
    };
    allPosts.forEach((post) => {
      if (post.postId === postId) {
        post.comments.push(userCommentToAdd);
      }
    });
  };

  useEffect(() => {
    getAllUserPosts();
    HomeFeedPosts();
    likedPostsByUser();
    commentedPostsByUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userPosts,
        userLikedPosts,
        userCommentedPosts,
        isNewUser,
        userHomeFeedPosts,
        getCommentDetails,
        setUser,
        ToggleUserLike,
        postUserInfo,
        AddPost,
        DeletePost,
        getPostContent,
        addUserComment,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
