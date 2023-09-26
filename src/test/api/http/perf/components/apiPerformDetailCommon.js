import React from "react";
import { Tabs} from "antd";
import ApiPerfStepList from "./apiPerfStepList";
import ApiPerformConfig from "./apiPerfConfig";
import ApiPerfTestData from "./ApiPerfTestData";
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
            <TabPane tab="测试数据" key="3">
                <ApiPerfTestData />
            </TabPane>
        </Tabs>
    )
}

export default ApiPerformDetailCommon;