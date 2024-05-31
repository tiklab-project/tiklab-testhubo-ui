import React, { useState, useEffect } from 'react';
import { renderRoutes  } from "react-router-config";

import './common/styles/base.scss';
import './common/styles/global.scss';
import "./test/common/styles/testcaseStyle.scss"

import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
import {useTranslation} from "react-i18next";
import resources from './common/language/resource';

import "./assets/index"

 const App = (props) => {
     const {routers} = props;

     const {i18n} = useTranslation();

     return(
         <>
             {
                 renderRoutes(routers)
             }
         </>
    )
}

export default App;
