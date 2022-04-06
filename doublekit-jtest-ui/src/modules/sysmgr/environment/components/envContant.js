import React from "react";
import {Tabs} from "antd";
import ApiEnvList from "./apiEnvList";
import AppEnvList from "./appEnvList";
import WebEnvList from "./webEnvList";

const { TabPane } = Tabs;

const EnvContant = (props)=>{

    return(
        <>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="API环境" key="1">
                    <ApiEnvList />
                </TabPane>
                <TabPane tab="APP环境" key="2">
                    <AppEnvList />
                </TabPane>
                <TabPane tab="WEB环境" key="3">
                    <WebEnvList />
                </TabPane>
            </Tabs>
        </>
    )
}

export default EnvContant;