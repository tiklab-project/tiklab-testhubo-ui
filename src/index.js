import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {enableAxios} from "thoughtware-core-ui"
import routes from './routers';
import {Spin} from "antd";

enableAxios();

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
            <App routers={routes}/>
        </Suspense>
    )
}



ReactDOM.render(<Main/>,document.getElementById('container'));


