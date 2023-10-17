import React, { useEffect, useState } from "react";
import { IPost } from "../context/types";

const usePost = () => {
  const getUserPosts = (array: Array<IPost>, userId: number) => {
    const userPosts: Array<IPost> = array.filter(
      (post) => post.userId === userId
    );

    return userPosts;
  };

  const getNonUserPosts = (array: Array<IPost>, userId: number) => {
    const nonUserPosts: Array<IPost> = array.filter(
      (post) => post.userId !== userId
    );
    return nonUserPosts;
  };

  const deletePost = (array: Array<IPost>, selectedPostId: number) => {
    const updatedArray: Array<IPost> = array.filter(
      (post) => post.postId !== selectedPostId
    );
    return updatedArray;
  };

  const addPost = (array: Array<IPost>, newPost: IPost) => {
    const updatedArray: Array<IPost> = [...array, newPost];
    return updatedArray;
  };

  const editPost = (array: Array<IPost>, updatedPost: IPost) => {
    const updatedArray: Array<IPost> = array.map((post) => {
      if (post.postId === updatedPost.postId) {
        return updatedPost;
      } else {
        return post;
      }
    });
    return updatedArray;
  };

  const postsLikedByUser = (array: Array<IPost>, userId: number) => {
    const likedPosts: Array<IPost> = array.filter((post) =>
      post.likes.includes(userId)
    );
    return likedPosts;
  };

  const postsCommentedByUser = (array: Array<IPost>, userId: number) => {
    const commentedPosts: Array<IPost> = array.filter((post) =>
      post.comments.some((comment) => comment.userId === userId)
    );
    return commentedPosts;
  };

  const addCommentToPost = (array: Array<IPost>, selectedPostId: number) => {
    console.log("ADD coment to post");
  };

  const toggleLikeOnPost = (
    array: Array<IPost>,
    selectedPostId: number,
    userId: number
  ) => {
    const updatedArray: Array<IPost> = array.map((post) => {
      if (post.postId === selectedPostId) {
        return { ...post, likes: [...post.likes, userId] };
      } else {
        return post;
      }
    });
    return updatedArray;
  };

  return {
    getUserPosts,
    getNonUserPosts,
    deletePost,
    addPost,
    editPost,
    postsLikedByUser,
    addCommentToPost,
    postsCommentedByUser,
    toggleLikeOnPost,
  };
};

export default usePost;
