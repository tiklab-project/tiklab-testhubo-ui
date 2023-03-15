import React, { useState, useEffect } from 'react';
import { renderRoutes  } from "react-router-config";
import 'antd/dist/antd.css';
import './common/styles/base.scss';
import './common/styles/global.scss';
import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
import {useTranslation} from "react-i18next";

import {getUser} from "tiklab-core-ui";
import { PluginProvider,pluginLoader} from 'tiklab-plugin-core-ui';

import resources from './common/language/resource';
import {Spin} from "antd";
import "./assets/index"

 const App = (props) => {
     const {allStore,routers} = props;

     const {i18n,t} = useTranslation();

     const [viable,setViable] = useState(false);

     const [pluginData,setPluginData] = useState({
         routes:routers,
         pluginStore:[],
         languageStore:[]
     });

     useEffect(() => {
         pluginLoader( routers, resources,i18n).then(res => {
             setPluginData(res)
         })
         setViable(true)
     }, []);


     //获取系统权限
     const userInfo = getUser();
     if(userInfo && userInfo.userId) {
         allStore.systemRoleStore.getSystemPermissions(userInfo.userId);
     }


     if (!viable) {
         return <div style={{
             "height":"100%",
             "display":"flex",
             "justifyContent":"center",
             "alignItems":"center"
         }}>
             <Spin size="large"/>
         </div>
     }
     return(
         <PluginProvider store={pluginData}>
             {
                 renderRoutes(pluginData.routes)
             }
         </PluginProvider>
    )
}

export default App;
