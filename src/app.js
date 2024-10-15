import React from 'react';
import { renderRoutes  } from "react-router-config";
import { Provider } from 'mobx-react';
import './globalConfig/globalstyles/base.scss';
import './globalConfig/globalstyles/global.scss';
import './globalConfig/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
import "./assets/index"
import zhCN from "antd/es/locale/zh_CN";
import {ConfigProvider} from "antd";
import {HashRouter} from "react-router-dom";
import {stores} from "./stores";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {orgStores} from "tiklab-user-ui/es/store";

 const App = (props) => {
     const {routers} = props;

     let allStore = {
         ...stores,
         ...privilegeStores,
         ...orgStores,
     };

     return(
         <Provider {...allStore} >
             <ConfigProvider locale={zhCN}>
                 <HashRouter>
                 {
                     renderRoutes(routers)
                 }
                 </HashRouter>
             </ConfigProvider>
         </Provider>
    )
}

export default App;
