import React, {useEffect, useState} from "react";
import {Button, Tabs} from "antd";
import BackCommon from "../../../common/backCommon";
import {inject, observer} from "mobx-react";
import WebPerfStepList from "./webPerfStepList";
import WebPerformCofig from "./webPerformCofig";
import WebEnvSelect from "../../webtest/webEnvSelect";
const { TabPane } = Tabs;

const WebPerformDetail = (props) =>{
    const {webPerformStore} = props;
    const {findWebPerf} = webPerformStore;

    const [showResponse, setShowResponse] = useState(false);

    const [allValue,setAllValue] = useState();

    let webPerfId = sessionStorage.getItem("webPerfId")

    useEffect(()=>{
        findWebPerf(webPerfId).then(res=>{
            setAllValue(res);
        })
    },[webPerfId])
    
    const updateTitle = (value) =>{

    }

    const toHistory = () =>{
        props.history.push("/repositorypage/webtest/perform-instance")
    }


    const onTest = ()=>{
        setShowResponse(true)
    }

    const changeTab = (actvieKey) =>{

    }

    const goBack = () =>{
        props.history.push("/repositorypage/webtest/performcase")
    }


    return(
        <>
            <BackCommon
                clickBack={goBack}
                // right={<WebEnvSelect history={props.history}/>}
            />
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
                    <div>
                        <a onClick={toHistory}>测试历史</a>
                        <Button onClick={onTest}>执行测试</Button>
                    </div>

                </div>
                <div className={"method-people-info"}>
                    <span className={"people-item "}>分组: {allValue?.testCase?.category?.name}</span>
                    <span className={"people-item "}>创建人: {allValue?.testCase?.createUser?.name}</span>
                    <span className={"people-item "}>更新者: {allValue?.testCase?.updateUser?.name}</span>
                    <span className={"people-item "}>更新时间: {allValue?.testCase?.updateTime}</span>
                </div>
            </div>
            <Tabs defaultActiveKey="1" onChange={changeTab}>
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
export default inject("webPerformStore")(observer(WebPerformDetail));