
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './app';

import { orgStores } from 'thoughtware-user-ui/es/store';
import { privilegeStores } from "thoughtware-privilege-ui/es/store";
import {enableAxios} from "thoughtware-core-ui"

import { stores } from './stores';
import routes from './routers';
import {Spin} from "antd";

enableAxios();

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


