import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { IComment } from "./types";

interface ModalContextProps {
  isNewUserModal: boolean;
  openInfoModal: boolean;
  openPostAS: PostIdModalProps;
  openDeletePostModal: PostIdModalProps;
  openReportPostModal: boolean;
  openReportDoneModal: boolean;
  showAllButtons: boolean;
  commentModal: commentModalProps;
  setOpenPostAS: Dispatch<SetStateAction<PostIdModalProps>>;
  setOpenInfoModal: Dispatch<SetStateAction<boolean>>;
  setOpenReportPostModal: Dispatch<SetStateAction<boolean>>;
  setOpenReportDoneModal: Dispatch<SetStateAction<boolean>>;
  setOpenDeletePostModal: Dispatch<SetStateAction<PostIdModalProps>>;
  infoAndCommentToggle: (commentArray: IComment[], postId: number) => void;
  finishTutorial: () => void;
  AddedInfo: (info: AddedInfo) => void;
  openDeleteModal: (postId: number) => void;
  openReportModal: () => void;
  closeReportModal: () => void;
  openActionSheet: (myCard: boolean, postId: number) => void;
  setCommentModal: Dispatch<SetStateAction<commentModalProps>>;
  setIsNewUserModal: Dispatch<SetStateAction<boolean>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface AddedInfo {
  photo: string;
  nickname: string;
}

interface ModalProps {
  isOpen: boolean;
}

interface PostIdModalProps extends ModalProps {
  postId: number;
}
interface commentModalProps extends PostIdModalProps {
  comments: IComment[];
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export const ModalProvider = ({ children }: UserProviderProps) => {
  const [isNewUserModal, setIsNewUserModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [info, setInfo] = useState({} as AddedInfo);
  const [openPostAS, setOpenPostAS] = useState<PostIdModalProps>({
    isOpen: false,
    postId: 0,
  });
  const [openDeletePostModal, setOpenDeletePostModal] =
    useState<PostIdModalProps>({
      isOpen: false,
      postId: 0,
    });
  const [openReportPostModal, setOpenReportPostModal] = useState(false);
  const [openReportDoneModal, setOpenReportDoneModal] = useState(false);
  const [commentModal, setCommentModal] = useState<commentModalProps>({
    isOpen: false,
    postId: 0,
    comments: [],
  });
  const [showAllButtons, setShowAllButtons] = useState(false);

  useEffect(() => {
    finishTutorial();
  }, [info]);

  const infoAndCommentToggle = (commentArray: IComment[], postId: number) => {
    if (isNewUserModal) {
      setOpenInfoModal(true);
    } else {
      setCommentModal({
        isOpen: true,
        postId,
        comments: commentArray,
      });
    }
  };

  const AddedInfo = (info: AddedInfo) => {
    if (info.nickname && info.photo !== null) {
      setInfo(info);
    }
  };

  const finishTutorial = () => {
    if (openInfoModal && info.nickname && info.photo !== null) {
      setIsNewUserModal(false);
      setOpenInfoModal(false);
    }
  };

  const openDeleteModal = (postId: number) => {
    setOpenPostAS({
      isOpen: false,
      postId: 0,
    });
    setOpenDeletePostModal({
      isOpen: true,
      postId,
    });
  };

  const openReportModal = () => {
    setOpenPostAS({
      isOpen: false,
      postId: 0,
    });
    setOpenReportPostModal(true);
  };

  const closeReportModal = () => {
    setOpenReportDoneModal(false);
    setOpenReportPostModal(false);
  };

  const openActionSheet = (myPost: boolean, postId: number) => {
    setOpenPostAS({
      isOpen: true,
      postId,
    });
    setShowAllButtons(myPost);
  };

  return (
    <ModalContext.Provider
      value={{
        isNewUserModal,
        openInfoModal,
        openPostAS,
        openReportPostModal,
        openReportDoneModal,
        commentModal,
        showAllButtons,
        openDeletePostModal,
        setOpenReportPostModal,
        setOpenReportDoneModal,
        setOpenPostAS,
        setOpenInfoModal,
        infoAndCommentToggle,
        finishTutorial,
        AddedInfo,
        openDeleteModal,
        setOpenDeletePostModal,
        openReportModal,
        closeReportModal,
        openActionSheet,
        setCommentModal,
        setIsNewUserModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
