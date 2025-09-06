import React, { useRef } from "react";
import { useState, useEffect, useContext, Fragment, SetStateAction } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, useNavigate, Navigate, useLocation, useNavigationType } from 'react-router-dom';

import styles from "./app.module.css";
import { SvgIcon } from '@mui/material';
import { Button, MenuItem } from "@okta/odyssey-react-mui";
import { TopNav, UserProfile, type UserProfileProps, TopNavProps, SideNavProps } from "@okta/odyssey-react-mui/labs";


import { UserIcon } from "@okta/odyssey-react-mui/icons";

import { Content } from './content';
import { Contracts } from './features/contracts';
import { People, PersonView } from './features/people';
import { Access } from './features/access';

//import { ProjectConfiguration } from './features/project/configuration';
//import { Project } from './project';

import type { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux'

//import { OktaAuth, OktaAuthOptions, AccessToken } from '@okta/okta-auth-js';



import LogoutIcon from '@mui/icons-material/Logout';

//https://stackoverflow.com/questions/72008357/mui-icons-used-in-shared-react-component-library-wont-render-error-element-ty
export function normalizeIcon(Icon: typeof SvgIcon) {
  return ((Icon as any).default ? (Icon as any).default : Icon) as typeof SvgIcon;
};


//https://stackoverflow.com/questions/72008357/mui-icons-used-in-shared-react-component-library-wont-render-error-element-ty
export function iconURI(icon: typeof SvgIcon) {
  //<Logo fill='red' stroke='green'/>
  //const svgNode = ReactDOM.findDOMNode(icon.current);
  //const data = svgNode.outerHTML; 
  //console.log(data); 
  //const svg = new Blob([data], { type: "image/svg+xml" }); 

};


export const router = createBrowserRouter([
  {
    path: '/callback', element: <h3 id='loading-icon'>Loading...</h3>,
  },
  // {
  //   path: '/index.html', element: <Content />,
  //   children: [
  //     { index: true, element: <People /> },
  //   ],
  // },
  {
    path: "/index.html",
    element: <Navigate to="/" replace />
  },
  {
    path: '/', element: <Content />,
    children: [
      { index: true, element: <People /> },
      {
        path: "contracts",
        element: <Contracts />,
      },
      {
        path: "people",
        element: <People />,
      },
      {
        path: "person",
        element: <PersonView />,
      },
      {
        path: "access",
        element: <Access />,
      }

    ],
  }

], {

});



const LogoutIcon2 = normalizeIcon(LogoutIcon);

export function App() {
  const initialized = useRef(false); //React Strict renders components twice. Debounce.
  //Auth handled in the express server now

  //const { oktaAuth, authState } = useOktaAuth();
  //Mount Hook
  
  // useEffect(() => {
  //   if (!initialized.current) {
  //     initialized.current = true;
  //     if (authState && authState?.isAuthenticated) {
  //       console.log("OIDC Authenticated", authState);
  //     } else {
  //       console.log("OIDC Error", authState?.error);
  //       if (authState?.error) {
  //         console.log("OIDC Error", authState?.error);
  //       } else {
  //         console.log("OIDC Unauthenticated", authState);
  //         if (!oktaAuth.isLoginRedirect()) {
  //           console.log("OIDC Unauthenticated Start Redirect");
  //           oktaAuth.token.getWithRedirect({ responseType: ['id_token'] });
  //         } else {
  //           console.log("OIDC Unauthenticated In Redirect");
  //           const redirectUri = oktaAuth.getOriginalUri();
  //           oktaAuth.handleLoginRedirect().catch(e => {
  //             console.error(e);
  //           });
  //         }

  //       }

  //     }
  //   }

  // }, []);

  return (
    <RouterProvider router={router} />
  );
}




