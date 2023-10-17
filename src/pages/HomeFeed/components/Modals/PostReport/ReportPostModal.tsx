import React, { useContext } from "react";
import { IonButton, IonCard, IonIcon, IonText } from "@ionic/react";
import {
  checkmarkDoneCircleOutline,
  chevronForwardOutline,
  alertCircleOutline,
  eyeOffOutline,
} from "ionicons/icons";

import ModalWireFrame from "../../../../../components/ModalWireFrame";

import "./styles.css";
import useModalToogle from "../../../context/ModalContext";
import ModalContext from "../../../context/ModalContext";

interface explanationCard {
  icon: string;
  text: string;
}

const ReportPostModal = () => {
  const {
    openReportPostModal,
    closeReportModal,
    setOpenReportDoneModal,
    openReportDoneModal,
  } = useContext(ModalContext);

  const reportActionBtnsTitles: Array<string> = [
    "I just dont't like",
    "It's spam",
    "Nudity or sexual activity",
    "Hate speech or symbols",
    "Violence or dangerous organisations",
    "Bullying or harassment",
    "False information",
    "Scam or fraud",
    "Suicide or self-injury",
    "Sale of illegal or regulated goods",
    "Intellectual property violation",
    "Eating disorders",
    "Something else",
  ];

  const explanationCards: explanationCard[] = [
    {
      icon: alertCircleOutline,
      text: "Understand problems that people are having with different types of content on Yalla return",
    },
    {
      icon: eyeOffOutline,
      text: "Show you less of this kind of content in the future",
    },
  ];

  return (
    <ModalWireFrame
      isOpen={openReportPostModal}
      setOpenModal={closeReportModal}
    >
      {openReportDoneModal ? (
        <div className='report-post-modal-wrapper'>
          <div className='report-modal-header justify-center-header'>
            <IonIcon
              icon={checkmarkDoneCircleOutline}
              color='success'
              style={{ fontSize: "70px" }}
            />
            <IonText
              style={{ fontSize: "17px", fontWeight: "600" }}
              color='primary'
            >
              Thanks for letting us know
            </IonText>
            <IonText color='medium' style={{ fontSize: "14px" }}>
              We use these reports to:
            </IonText>
          </div>
          <div className='report-modal-explanation'>
            {explanationCards.map((card, index) => {
              return (
                <IonCard key={index} className='report-explanation-card'>
                  <span className='report-card-explanation-icon'>
                    <IonIcon icon={card.icon} />
                  </span>
                  <div className='report-card-explanation-text'>
                    {card.text}
                  </div>
                </IonCard>
              );
            })}
          </div>
        </div>
      ) : (
        <div className='report-post-modal-wrapper fixed-modal-size'>
          <div className='report-modal-header'>
            <IonText style={{ fontSize: "17px" }}>
              Why are you reporting this post?
            </IonText>
            <IonText color='medium' style={{ fontSize: "14px" }}>
              Your report is anonymous, except if you&apos;re reporting an
              intellectual property infringment. If someone is in immediate
              danger, call the local emergency services - dont&apos;t wait
            </IonText>
          </div>

          <div className='report-modal-btns'>
            {reportActionBtnsTitles.map((action, index) => {
              return (
                <IonButton
                  key={index}
                  className='report-action-btn'
                  fill='clear'
                  onClick={() => setOpenReportDoneModal(true)}
                >
                  <div className='report-action-btn-content'>
                    {action}
                    <IonIcon icon={chevronForwardOutline} slot='end' />
                  </div>
                </IonButton>
              );
            })}
          </div>
        </div>
      )}
    </ModalWireFrame>
  );
};

export default ReportPostModal;
