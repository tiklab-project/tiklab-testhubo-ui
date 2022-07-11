/*
 * @Description: 入口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:43:26
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './app';
import { orgStores } from 'doublekit-user-ui';
import { privilegeStores } from 'doublekit-privilege-ui';
import { messageModuleStores } from 'doublekit-message-ui'
import { stores } from './stores';
import routes from './routers';

const Entry =()=> {


    let allStore = {
        ...stores,
        ...privilegeStores,
        ...orgStores,
        ...messageModuleStores,
    };

    return (
        <Provider {...allStore} >
            <HashRouter>
                <App
                    allStore={allStore}
                    routers={routes}
                />
            </HashRouter>
        </Provider>
    )

}

ReactDOM.render(<Entry/>,document.getElementById('container'));


