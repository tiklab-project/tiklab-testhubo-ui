import React, {useEffect, useState} from "react";
import {Button,Tabs} from "antd";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../../common/backCommon";
import ApiPerfStepList from "./apiPerfStepList";
import ApiPerformCofig from "./apiPerfConfig";
import ApiEnvSelect from "../../../../sysmgr/environment/components/apiEnvSelect";


const { TabPane } = Tabs;

const ApiPerformDetail = (props) =>{
    const {apiPerfStore} = props;
    const {findApiPerf} = apiPerfStore;

    const [allValue,setAllValue] = useState();
    const apiPerfId = sessionStorage.getItem("apiPerfId");


    useEffect(()=>{
        findApiPerf(apiPerfId).then(res=>{
            setAllValue(res);
        })
    },[apiPerfId])

    const updateTitle = (value) =>{


    }


    const changeTab = (actvieKey) =>{

    }

    const goBack = () =>{
        props.history.push("/repositorypage/apitest/performcase")
    }


    return(
        <>
            <div>
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
                        <ApiPerfStepList />
                    </TabPane>
                    <TabPane tab="压力配置" key="2">
                        <ApiPerformCofig />
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default inject("apiPerfStore")(observer(ApiPerformDetail));