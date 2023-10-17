export interface IUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  availability: string;
  isNewUser: boolean;
}

export interface IPost {
  userId: number;
  postId: number;
  datePosted: string;
  description: string;
  images: string[];
  category: string;
  likes: number[];
  comments: IComment[];
}

export interface IComment {
  userId: number;
  commentDate: string;
  commentDesc: string;
}
