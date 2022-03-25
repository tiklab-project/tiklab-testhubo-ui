/*
 * @Description: 入口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:43:26
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import 'antd/dist/antd.css';
import App from './app';
import { getUser } from 'doublekit-core-ui';
import { orgStores } from 'doublekit-user-ui';
import { privilegeStores } from 'doublekit-privilege-ui';
import { messageModuleStores } from 'doublekit-message-ui'
import { stores } from './stores';
import routes from './routers';

class Entry extends Component {


    render(){
        let allStore = {
            ...stores,
            ...privilegeStores,
            ...orgStores,
            ...messageModuleStores,
        };

        //获取系统权限
        const userInfo = getUser();
        if(userInfo && userInfo.userId) {
            allStore.systemRoleStore.getSystemPermissions(userInfo.userId);
        }

        allStore.pluginsStore.initLoadPlugin(fetchMethod, pluginAddressUrl)
        allStore.pluginsStore.setProjectRouter(routes);

        return (
            <Provider {...allStore} >
                <HashRouter>
                    <App/>
                </HashRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<Entry/>,document.getElementById('container'));


