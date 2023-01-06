import React from "react";
import {Tabs} from "antd";
import ApiEnvList from "./apiEnvList";
import AppEnvList from "./appEnvList";
import WebEnvList from "./webEnvList";
import BreadcrumbEx from "../../../common/breadcrumbEx";

const { TabPane } = Tabs;

const EnvContant = (props)=>{

    return(
        <div className={"teston-page-center"}>
            <BreadcrumbEx breadArray={["设置","环境配置"]}/>
            <div className={"env-tab-box"}>
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
            </div>

        </div>
    )
}

export default EnvContant;