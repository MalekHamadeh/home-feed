import React from "react";
import { Redirect, Route } from "react-router";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Tabs from "./components/Tabs";
import CreatePost from "./pages/HomeFeed/Screens/CreatePost";
import PostingRules from "./pages/HomeFeed/Screens/PostingRules";
import NotificationPage from "./pages/HomeFeed/Screens/Notification";
import ProfilePage from "./pages/HomeFeed/Screens/ProfilePage/ProfilePage";
import { ModalProvider } from "./pages/HomeFeed/context/ModalContext";

const Routes = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path='/tabs/posting-rules' exact component={PostingRules} />
        <Route path='/notifications' exact component={NotificationPage} />
        <Route path='/tabs/create-post' exact component={CreatePost} />
        <ModalProvider>
          <Route path='/' exact>
            <Redirect to='/tabs' />
          </Route>
          <Route path='/profile' exact component={ProfilePage} />
          <Route path='/tabs' component={Tabs} />
        </ModalProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
