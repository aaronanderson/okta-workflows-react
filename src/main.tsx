import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, useHref } from 'react-router-dom';
import { App } from "./app";
import { store } from './store'
import { useGetUserQuery } from './features/apiSlice';

import { Provider } from 'react-redux'
import { OdysseyProvider } from "@okta/odyssey-react-mui";
//import { OktaAuth, OktaAuthOptions, AuthState, Token, AccessToken, toRelativeUrl } from '@okta/okta-auth-js'
//import { Security, useOktaAuth } from '@okta/okta-react'

import { useNavigate } from 'react-router-dom';
import {
  UiShell,
  renderReactInWebComponent,
  uiShellDataAttribute,
  type UiShellNavComponentProps,
  type UiShellProps,
} from "@okta/odyssey-react-mui/ui-shell";

import { TopNav, UserProfile, type UserProfileProps } from "@okta/odyssey-react-mui/labs";
import { UserIcon } from "@okta/odyssey-react-mui/icons";


if (!!!window.IS_PRODUCTION) {
  // Enable Hot Module Reloading in dev
  // new EventSource("/esbuild").addEventListener("change", () =>
  //   location.reload()
  // );
}

// https://acme.okta.com/.well-known/openid-configuration?client_id=0oahfeff0asuoOL70697
//let redirectUri = location.protocol + '//' + location.host + location.pathname;
// let redirectUri = `${window.location.origin}/callback`;

// const oidc: OktaAuthOptions = {
//   clientId: '0oapgh9pauVhuGbHT1d7',
//   issuer: 'https://acme.oktapreview.com',
//   redirectUri: redirectUri,
//   //postLogoutRedirectUri: redirectUri,
//   scopes: ['openid', 'profile', 'email'], //'offline_access'
//   pkce: true,
//   restoreOriginalUri: undefined,
//   tokenManager: {
//     //autoRenew: true,
//     secure: true,
//     storage: 'sessionStorage',
//   }
// }
// const oktaAuth = new OktaAuth(oidc);
// oktaAuth.start();

// const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
//   //const navigate = useNavigate();
//   console.log("restoring URL", originalUri);
//   //navigate(toRelativeUrl(originalUri || '/', window.location.origin));
//   navRedirect(toRelativeUrl(originalUri || '/', window.location.origin));  
// };


const appElement = document.createElement("div");
const appWCRenderElement = document.createElement("div");
document.body.appendChild(appElement);


//Render Oddysey in the light dom to set styles in document.header. Popups sometimes render in the document and not a web component's shadow dom.
const root = ReactDOM.createRoot(appElement);
root.render(<OdysseyProvider emotionRootElement={document.head} hasShadowDom={false}>
  <Provider store={store}>
    <App />
  </Provider>
</OdysseyProvider>);



const sharedAppSwitcherProps = {
  appIcons: [
    {
      appIconDefaultUrl: "/appswitcher/okta-dashboard-default.svg",
      appIconSelectedUrl: "/appswitcher/okta-dashboard-selected.svg",
      appName: "okta_enduser",
      label: "Okta Dashboard",
      linkUrl: "https://acme.oktapreview.com/app/UserHome",
    }
  ],
  isLoading: false,
  selectedAppName: "okta_enduser",
};




//unable to create a react hook function using the useNavigate hook in a component. 
//useNavigate needs to be under the RouteProvider and functions defined outside of components like here
//cannot invoke hooks. Use a custom DOM event to coordinate nav menu changes
const navRedirect = async (path: string) => {
  //console.log("navRedirect");
  document.dispatchEvent(new CustomEvent("ioc-navigate", {
    detail: {
      path: path
    },
  }));

}


const sharedSideNavProps: UiShellNavComponentProps["sideNavProps"] = {
  appName: "Contractors",
  isCollapsible: true,
  sideNavItems: [
    {
      id: "contracts",
      label: "Contracts",
      startIcon: <UserIcon />,
      onClick: (e) => navRedirect("contracts")
    },
    {
      id: "people",
      label: "People",
      startIcon: <UserIcon />,
      //isSelected: true,
      onClick: (e) => navRedirect("people")
    },
    {
      id: "access",
      label: "Access",
      startIcon: <UserIcon />,
      onClick: (e) => navRedirect("access")
    },
  ],
};


const subscribeToPropChanges: UiShellProps["subscribeToPropChanges"] = (
  subscriber,
) => {
  //console.log("subscribeListener invoked");
  subscriber({
    appSwitcherProps: sharedAppSwitcherProps,
    sideNavProps: sharedSideNavProps
  });

  return () => { };
};


export function RightTopNav() {

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery()

  return (
    <UserProfile
      profileIcon={<UserIcon />}
      orgName={user ? user.orgName : ''}
      userName={user ? user.userName : ''}
    />
  )

}

const sharedOptionalComponents: UiShellProps["optionalComponents"] = {

  topNavLeftSide: (
    <div>

    </div>
  ),
  topNavRightSide: (
    <RightTopNav />
  ),
};

const uiShellElement = document.createElement("div");
const containerRootElement = document.getElementById("app") as HTMLElement;

const uiShellWC = renderReactInWebComponent({
  getReactComponent: ({ appRootElement, stylesRootElement }) => {

    return (
      // <Security
      //   oktaAuth={oktaAuth}
      //   restoreOriginalUri={restoreOriginalUri}>
      <Provider store={store}>
        <UiShell
          uiShellAppElement={appRootElement}
          uiShellStylesElement={stylesRootElement}
          appElement={appElement}
          appElementScrollingMode={"vertical"}
          onError={() => () => { }}
          onSubscriptionCreated={() => { }}
          optionalComponents={sharedOptionalComponents}
          subscribeToPropChanges={subscribeToPropChanges}

        />
      </Provider>
      //</Security>
    )
  },
  webComponentRootElement: containerRootElement,
  webComponentChildren: uiShellElement,
});



