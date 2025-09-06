import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigationType, useNavigate } from 'react-router-dom';

import styles from "./app.module.css";
import styled from "@emotion/styled";
import { Button } from "@okta/odyssey-react-mui";
import { TopNav, SideNav, Layout } from "@okta/odyssey-react-mui/labs";
import { UserIcon, ServerIcon, ShowIcon } from "@okta/odyssey-react-mui/icons";
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
//import { DatasetOutlined as DatasetOutlinedIcon } from '@mui/icons-material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

import {  normalizeIcon, router } from './app';

import type { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux'

import { OktaAuth, AccessToken } from '@okta/okta-auth-js';


/*import { SvgIcon } from '@mui/material';

export const normalizeIcon3 = (Icon: typeof SvgIcon) => {
  return ((Icon as any).default ? (Icon as any).default : Icon) as typeof SvgIcon;
};
*/


const DatasetOutlinedIcon2 = normalizeIcon(DatasetOutlinedIcon);
const CloudUploadOutlinedIcon2 = normalizeIcon(CloudUploadOutlinedIcon);
const CloudDownloadOutlinedIcon2 = normalizeIcon(CloudDownloadOutlinedIcon);
const AnalyticsOutlinedIcon2 = normalizeIcon(AnalyticsOutlinedIcon);
const VerifiedUserOutlinedIcon2 = normalizeIcon(VerifiedUserOutlinedIcon);


const VisibleRegion = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  border: "1px dashed #cbcbcb",
});

const RegionLabel = styled.h3({
  margin: 0,
});


export function Content() {
const initialized = useRef(false); //React Strict renders components twice. Debounce.
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
   useEffect(() => {
      if (!initialized.current) {
        initialized.current = true;        
        document.addEventListener("ioc-navigate", (e) => navigate((e as any).detail.path));//console.log("navigate handler", (e as any).detail.path));
      }
  
    }, []);

  useEffect(() => {
    console.log("The current URL is", {...location});
    console.log("The last navigation action was", navigationType);
    

  }, [location, navigationType]);


  return (
    <div className={styles.page}>     
      <div className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}





