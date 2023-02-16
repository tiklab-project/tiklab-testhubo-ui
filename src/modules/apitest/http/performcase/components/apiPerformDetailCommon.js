import React from "react";
import {Breadcrumb, Tabs} from "antd";
import ApiPerfStepList from "./apiPerfStepList";
import ApiPerformConfig from "./apiPerfConfig";
const { TabPane } = Tabs;

const ApiPerformDetailCommon = (props) =>{
    const {type} = props;
 
    return(
        <Tabs defaultActiveKey="1" >
            <TabPane tab="场景配置" key="1">
                <ApiPerfStepList type={type} {...props} />
            </TabPane>
            <TabPane tab="压力配置" key="2">
                <ApiPerformConfig {...props}/>
            </TabPane>
        </Tabs>
    )
}

export default ApiPerformDetailCommon;