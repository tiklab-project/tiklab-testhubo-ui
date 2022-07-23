import React, {useEffect, useState} from "react";
import { Tabs} from "antd";
import {inject, observer} from "mobx-react";
import WebPerfStepList from "./webPerfStepList";
import WebPerformCofig from "./webPerfConfig";
const { TabPane } = Tabs;

const WebPerformDetail = (props) =>{
    const {webPerfStore} = props;
    const {findWebPerf} = webPerfStore;


    const [allValue,setAllValue] = useState();

    let webPerfId = sessionStorage.getItem("webPerfId")

    useEffect(()=>{
        findWebPerf(webPerfId).then(res=>{
            setAllValue(res);
        })
    },[webPerfId])
    
    const updateTitle = (value) =>{

    }


    return(
        <>
            <div className={'testcase-webUI-form'}>
                <div className="web-form-header">
                    <div
                        className='teststep-title'
                        contentEditable={true}
                        suppressContentEditableWarning  //去掉contentEditable 提示的页面警告
                        onBlur={updateTitle}
                    >
                        {allValue?.testCase?.name}
                    </div>


                </div>
                <div className={"method-people-info"}>
                    <span className={"people-item "}>分组: {allValue?.testCase?.category?.name}</span>
                    <span className={"people-item "}>创建人: {allValue?.testCase?.createUser?.name}</span>
                    <span className={"people-item "}>更新者: {allValue?.testCase?.updateUser?.name}</span>
                    <span className={"people-item "}>更新时间: {allValue?.testCase?.updateTime}</span>
                </div>
            </div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="场景配置" key="1">
                    <WebPerfStepList />
                </TabPane>
                <TabPane tab="压力配置" key="2">
                    <WebPerformCofig />
                </TabPane>
            </Tabs>
        </>
    )
}
export default inject("webPerfStore")(observer(WebPerformDetail));