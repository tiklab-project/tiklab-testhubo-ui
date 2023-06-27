import React, { useState, useEffect } from 'react';
import { renderRoutes  } from "react-router-config";

import './common/styles/base.scss';
import './common/styles/global.scss';
import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
import {useTranslation} from "react-i18next";
import { PluginProvider,pluginLoader} from 'tiklab-plugin-core-ui';

import resources from './common/language/resource';

import "./assets/index"

 const App = (props) => {
     const {routers} = props;

     const {i18n} = useTranslation();

     const [pluginData,setPluginData] = useState({
         routes:routers,
         pluginStore:[],
         languageStore:[]
     });

     useEffect(() => {
         pluginLoader( routers, resources,i18n).then(res => {
             setPluginData(res)
         })

     }, []);


     return(
         <PluginProvider store={pluginData}>
             {
                 renderRoutes(pluginData.routes)
             }
         </PluginProvider>
    )
}

export default App;
