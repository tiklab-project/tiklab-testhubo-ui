import React, { useState, useEffect } from 'react';
import { renderRoutes  } from "react-router-config";
import {PLUGIN_STORE, loadLanguage} from 'doublekit-plugin-ui';
import {I18nextProvider,useTranslation} from "react-i18next";
import resources from './common/language/resource';
import './common/styles/base.scss';
import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
// import {setCookie} from "doublekit-core-ui";
import {inject, observer} from "mobx-react";

 const App = (props) => {
     const {pluginsStore} = props;
     const { routers, isInitLoadPlugin, languages} = pluginsStore;

     const {i18n,t} = useTranslation();

     const [loading, setLoading] = useState(false);
     const [resourcesLanguage,setResources] = useState({});

     useEffect(() => {
         // setCookie("ticket", "6032a32d20404dc98445cdc5aba9e73601")
         if (isInitLoadPlugin) {
             setLoading(true);
             loadLanguage(i18n, resources, languages, fetchMethod, 'zh').then(res => {
                 const resources = {
                     en:res.en,
                     zh:res.zh
                 }
                 setResources(resources)
             })

         }
     }, [isInitLoadPlugin])

     const newI18 = i18n.cloneInstance({ resources: resourcesLanguage });



    return(
        <I18nextProvider i18n={newI18}>
            {
                loading ? renderRoutes(routers) : <div>loading...</div>
            }
        </I18nextProvider>
    )
}

export default inject(PLUGIN_STORE)(observer(App));
