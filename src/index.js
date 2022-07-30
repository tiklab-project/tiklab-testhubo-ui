
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './app';
import { useVersion } from 'tiklab-eam-ui/es/_utils';

import { orgStores } from 'tiklab-user-ui/es/store';
import { privilegeStores } from 'tiklab-privilege-ui/es/store';
import { messageModuleStores } from 'tiklab-message-ui/es/store'
import { stores } from './stores';
import routes from './routers';

const Entry =()=> {

    useVersion()

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


