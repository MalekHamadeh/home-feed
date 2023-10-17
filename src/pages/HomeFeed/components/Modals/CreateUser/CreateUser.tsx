import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IonButton, IonInput, IonText } from "@ionic/react";

import "./styles.css";
import ModalWireFrame from "../../../../../components/ModalWireFrame";
import useModalToogle from "../../../context/ModalContext";
import ModalContext from "../../../context/ModalContext";

interface userInfo {
  photo: string;
  nickname: string;
}

interface CreateUserProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateUser = () => {
  const { openInfoModal, AddedInfo, setOpenInfoModal } =
    useContext(ModalContext);

  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({
    photo: "whatever",
    nickname: "whatever",
  } as userInfo);

  return (
    <ModalWireFrame isOpen={openInfoModal} setOpenModal={setOpenInfoModal}>
      {step === 0 ? (
        <div className='modal-content-wrapper'>
          <div className='info-modal-header add-padding'>
            <IonText color='primary'>
              Create your profile to start posting!
            </IonText>
          </div>
          <div className='info-modal-first-btns-wrapper'>
            <IonButton
              className='info-first-step-btn'
              onClick={() => setOpenInfoModal(false)}
              fill='outline'
              color='medium'
            >
              Do it later
            </IonButton>
            <IonButton
              className='info-first-step-btn'
              onClick={() => setStep(step + 1)}
            >
              Create
            </IonButton>
          </div>
        </div>
      ) : (
        <div className='modal-content-wrapper'>
          <div className='info-modal-header'>
            <IonText color='primary'>
              Do you want to create your profile?
            </IonText>
          </div>
          <div className='info-modal-second-btns-wrapper'>
            <IonButton className='add-profile-pic-circular-btn' color='medium'>
              Add Photo
            </IonButton>
            <div className='add-nickname-input'>
              <IonInput
                placeholder='Example: John Doe'
                label='Nickname'
                labelPlacement='stacked'
                fill='outline'
                color='primary'
              ></IonInput>
            </div>
            <IonButton
              className='info-second-step-btn'
              expand='block'
              onClick={() => AddedInfo(info)}
            >
              Confirm
            </IonButton>
          </div>
        </div>
      )}
    </ModalWireFrame>
  );
};

export default CreateUser;
