
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './app';

import { orgStores } from 'tiklab-user-ui/es/store';
import { privilegeStores } from "tiklab-privilege-ui/es/store";
import {enableAxiosCE} from "tiklab-core-ui"

import { stores } from './stores';
import routes from './routers';
import {Spin} from "antd";

enableAxiosCE();

const Entry =()=> {

    let allStore = {
        ...stores,
        ...privilegeStores,
        ...orgStores,
    };

    return (
        <Provider {...allStore} >
            <HashRouter>
                <App routers={routes}/>
            </HashRouter>
        </Provider>
    )
}

const Main = () =>{
    return(
        <Suspense fallback={
            <div style={{
                "height":"100%",
                "display":"flex",
                "justifyContent":"center",
                "alignItems":"center"
            }}>
                <Spin size="large"/>
            </div>
        }>
            <Entry />
        </Suspense>
    )
}



ReactDOM.render(<Main/>,document.getElementById('container'));


