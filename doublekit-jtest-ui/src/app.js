import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { renderRoutes  } from "react-router-config";
import routes from './routers';
import { handelPluginRouter, initPlugins, useLoadLanguage } from 'doublekit-plugin-ui';
import resources from './common/language/resource';
import './common/styles/base.scss';
import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";

 const App = () => {
    useLoadLanguage(resources,fetchMethod,pluginAddressUrl,'zh')
    const [pData, setData] = useState([]);

    useEffect(() => {
        getPluginConfig();
    }, []);

    const getPluginConfig = () => {
        initPlugins(fetchMethod,pluginAddressUrl).then(res => {
            setData(res)
        })
    };

     // console.log(handelPluginRouter(routes, pData),'handelroutes')

    return(
        <>
            {renderRoutes(handelPluginRouter(routes, pData))}
        </>
    )
}

export default withRouter(App)
