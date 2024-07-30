import React from 'react';
import { renderRoutes  } from "react-router-config";

import './common/styles/base.scss';
import './common/styles/global.scss';
import "./test/common/styles/testcaseStyle.scss"
import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
import "./assets/index"
import zhCN from "antd/es/locale/zh_CN";
import {ConfigProvider} from "antd";
import {HashRouter} from "react-router-dom";

 const App = (props) => {
     const {routers} = props;

     return(
         <ConfigProvider locale={zhCN}>
             <HashRouter>
             {
                 renderRoutes(routers)
             }
             </HashRouter>
         </ConfigProvider>
    )
}

export default App;
