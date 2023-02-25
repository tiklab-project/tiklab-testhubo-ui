import React from "react";
import {Tabs} from "antd";
import WebPerfStepList from "./webPerfStepList";
import WebPerformConfig from "./webPerfConfig";
const { TabPane } = Tabs;

const WebPerformDetailCommon = (props) =>{
    const {type} = props;
    return(
        <Tabs defaultActiveKey="1" >
            <TabPane tab="场景配置" key="1">
                <WebPerfStepList type={type}  {...props}/>
            </TabPane>
            <TabPane tab="压力配置" key="2">
                <WebPerformConfig {...props} />
            </TabPane>
        </Tabs>
    )
}
export default WebPerformDetailCommon;