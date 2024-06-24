import React from 'react';
import { renderRoutes  } from "react-router-config";

import './common/styles/base.scss';
import './common/styles/global.scss';
import "./test/common/styles/testcaseStyle.scss"

import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";

import "./assets/index"

 const App = (props) => {
     const {routers} = props;

     return(
         <>
             {
                 renderRoutes(routers)
             }
         </>
    )
}

export default App;
