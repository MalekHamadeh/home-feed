import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IonButton,
  IonChip,
  IonIcon,
  IonInput,
  IonText,
  IonTextarea,
} from "@ionic/react";

import "./styles.css";
import { arrowBackOutline, closeCircleOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import ScreenWireFrame from "../../../../components/ScreensWireFrame";
import UserContext, { postContent } from "../../context/UserContext";
import { IPost } from "../../context/types";
import usePost from "../../Hooks/usePost";
import { PostContext } from "../../context/PostContext";

interface LocationState {
  post: IPost;
}

export interface PostToAdd {
  description: string;
  images: Array<string>;
  category: string;
}

const CreatePost = () => {
  const location = useLocation<LocationState>();
  const { AddPost, getPostContent } = useContext(UserContext);
  const { addPost } = usePost();
  const { state, dispatch } = useContext(PostContext);
  const [images, setImages] = useState<Array<string>>([]);
  const [post, setPost] = useState<postContent>({
    description: "",
    images: images,
    category: "",
  });

  const categories: Array<string> = [
    "General",
    "Recommendations",
    "Buy, sell, rent",
    "Lost and found",
    "Meet-ups",
    "Events",
  ];

  useEffect(() => {
    if (location?.state) {
      setPost({
        description: location.state.post.description,
        images: location.state.post.images,
        category: location.state.post.category,
      });
    }
  }, [location?.state]);

  useEffect(() => {
    console.log("images", images);
    console.log("post", post);
  }, [images]);

  const addPostDesc = (e: any) => {
    setPost({ ...post, description: e.detail.value });
  };

  const setCategoryChip = (category: string) => {
    setPost({ ...post, category: category });
  };

  const addImageToPost = (imageURL: string) => {
    setPost((prevState) => ({
      ...prevState,
      images: [...prevState.images, imageURL],
    }));
  };

  const removeImageFromPost = (imageURL: string) => {
    setPost((prevState) => ({
      ...prevState,
      images: prevState.images.filter((img) => img !== imageURL),
    }));
  };

  const PostToAddFunc = () => {
    // AddPost(post);
    console.log(post);
    const history = useHistory();
    history.push("/", { openPostAdded: true });
  };

  return (
    <ScreenWireFrame backButtonText='Create Post'>
      <div className='create-post-wrapper'>
        <div className='create-post-info-wrapper'>
          <div className='create-post-text-area-wrapper'>
            <IonText>What would you like to share?</IonText>
            <div className='create-post-text-area'>
              <IonTextarea
                rows={10}
                placeholder='Type here...'
                value={post.description}
                onIonInput={(e) => addPostDesc(e)}
              ></IonTextarea>
            </div>
          </div>
          <div className='create-post-image-wrapper'>
            <IonText>Add photos</IonText>
            <div className='create-post-image-containers'>
              <ImageBtn
                addImageToPost={addImageToPost}
                removeImageFromPost={removeImageFromPost}
                setSelectedImage={setImages}
                selectedImage={images[1]}
                number={1}
              />
              <ImageBtn
                addImageToPost={addImageToPost}
                removeImageFromPost={removeImageFromPost}
                setSelectedImage={setImages}
                selectedImage={images[2]}
                number={2}
              />
              <ImageBtn
                addImageToPost={addImageToPost}
                removeImageFromPost={removeImageFromPost}
                setSelectedImage={setImages}
                selectedImage={images[3]}
                number={3}
              />
            </div>
          </div>
          <div className='create-post-category-wrapper'>
            <IonText>Select Category</IonText>
            <div className='create-post-category-options'>
              {categories.map((category, index) => {
                return (
                  <IonChip
                    key={index}
                    onClick={() => setCategoryChip(category)}
                  >
                    {category}
                  </IonChip>
                );
              })}
            </div>
          </div>
        </div>

        {location?.state?.post ? (
          <div className='create-post-footer-wrapper'>
            <Link to='/tabs-homefeed' className='primary'>
              <IonButton style={{ width: "100%" }}>Confirm</IonButton>
            </Link>
            <IonButton fill='clear' style={{ width: "100%" }}>
              Cancel
            </IonButton>
          </div>
        ) : (
          <div className='create-post-footer-wrapper'>
            <IonButton
              style={{ width: "100%" }}
              onClick={() => PostToAddFunc()}
            >
              Post
            </IonButton>
          </div>
        )}
      </div>
    </ScreenWireFrame>
  );
};

export default CreatePost;

const ImageBtn: FC<ImageBtnProps> = ({
  setSelectedImage,
  addImageToPost,
  removeImageFromPost,
  selectedImage,
  number,
}) => {
  const openImageInput = (buttonNumber: number) => {
    const imageInput = document.getElementById(`imageInput${buttonNumber}`);
    if (imageInput) {
      imageInput.click();
    }
  };

  const handleImageSelect = (
    e: any,
    setFunction: any,
    buttonNumber: number
  ) => {
    const selectedImageFile = e.target.files[0];
    if (selectedImageFile) {
      const imageURL = URL.createObjectURL(selectedImageFile);
      setFunction(imageURL);
      document.documentElement.style.setProperty(
        `--bg-img-${buttonNumber}`,
        `url(${imageURL})`
      );
      addImageToPost(imageURL);
    }
  };

  const removeImage = (setFunction: any) => {
    setFunction("");
    removeImageFromPost(selectedImage);
  };

  return (
    <>
      <IonButton
        onClick={() => openImageInput(number)}
        fill='clear'
        color='light'
        className={`create-post-add-img-btn ${
          selectedImage ? `with-img-${number}` : ""
        }`}
      >
        {!selectedImage && "+"}
      </IonButton>
      <input
        type='file'
        accept='image/*'
        id={`imageInput${number}`}
        style={{ display: "none" }}
        onChange={(e) => handleImageSelect(e, setSelectedImage, number)}
      />
      {selectedImage && (
        <IonButton
          className='remove-button'
          fill='clear'
          size='small'
          onClick={() => removeImage(setSelectedImage)}
        >
          <IonIcon icon={closeCircleOutline} />
        </IonButton>
      )}
    </>
  );
};

interface ImageBtnProps {
  setSelectedImage: Dispatch<SetStateAction<Array<string>>>;
  addImageToPost: (imageUrl: string) => void;
  removeImageFromPost: (imageUrl: string) => void;
  selectedImage: string;
  number: number;
}
