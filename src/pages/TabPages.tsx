import { IonHeader, IonPage, IonToolbar } from "@ionic/react";
import React from "react";
import NavBar from "../components/NavBar";
import Tabs from "../components/Tabs";

const TabPages = () => {
  return (
    <IonPage>
      <Tabs />
    </IonPage>
  );
};

export default TabPages;
