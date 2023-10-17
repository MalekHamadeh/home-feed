import React, {
  Dispatch,
  FC,
  useReducer,
  createContext,
  useEffect,
} from "react";
import { IPost } from "./types";
import postData from "../data/posts.json";

interface PostContextState {
  allPosts: Array<IPost>;
}

type ChangeAllPostsAction = {
  type: "CHANGE-ALL-POSTS";
  payload: Array<IPost>;
};

interface ContextProps {
  state: PostContextState;
  dispatch: Dispatch<ChangeAllPostsAction>;
}

const initialState = {
  allPosts: [],
};

const PostReducer = (state: PostContextState, action: ChangeAllPostsAction) => {
  switch (action.type) {
    case "CHANGE-ALL-POSTS":
      return {
        ...state,
        allPosts: action.payload,
      };

    default:
      return state;
  }
};
export const PostContext = createContext<ContextProps>({} as ContextProps);

const PostProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);

  const getAllPosts = () => {
    postData && dispatch({ type: "CHANGE-ALL-POSTS", payload: postData });
  };

  useEffect(() => {
    getAllPosts();
  }, [postData]);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
