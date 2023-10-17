import {
  IonIcon,
  IonLabel,
  IonNav,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router";
import HomeFeed from "../pages/HomeFeed/Screens/HomePage";
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";
import {
  compassOutline,
  gridOutline,
  qrCodeOutline,
  storefrontOutline,
  trophyOutline,
} from "ionicons/icons";

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path='/tabs' to='/tabs/home-feed' />
        <Route path='/tab2' render={() => <Tab2 />} exact />
        <Route path='/tabs/home-feed' exact render={() => <HomeFeed />} />
        <Route path='/tab3' render={() => <Tab3 />} exact />
        <Route path='/tab4' />
        <Route path='/tab5' />
      </IonRouterOutlet>

      <IonTabBar slot='bottom' selectedTab='/tabs/home-feed'>
        <IonTabButton tab='tab1' href='/tab1'>
          <IonIcon aria-hidden='true' icon={gridOutline} />
          <IonLabel>Recycle</IonLabel>
        </IonTabButton>

        <IonTabButton tab='tab2' href='/tabs/home-feed'>
          <IonIcon aria-hidden='true' icon={compassOutline} />
          <IonLabel>Feed</IonLabel>
        </IonTabButton>

        <IonTabButton tab='tab3' href='/tab3' className='middle-custom-btn'>
          <IonIcon aria-hidden='true' icon={qrCodeOutline} />
        </IonTabButton>

        <IonTabButton tab='tab4' href='/tab4'>
          <IonIcon aria-hidden='true' icon={trophyOutline} />
          <IonLabel>Rewards</IonLabel>
        </IonTabButton>

        <IonTabButton tab='tab5' href='/tab5'>
          <IonIcon aria-hidden='true' icon={storefrontOutline} />
          <IonLabel>Store</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
