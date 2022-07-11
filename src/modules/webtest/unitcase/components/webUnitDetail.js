/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import WebUnitStepList from "./webUnitStepList";
import {Button} from "antd";
import WebEnvSelect from "../../webtest/webEnvSelect";

const WebUnitDetail = (props) => {
    const {webUnitStore} = props;
    const {findWebUnit,updateWebUnit} = webUnitStore;
    const [allValue,setAllValue] = useState();
    const addRouter = props.history.push;
    const webUnitId = sessionStorage.getItem('webUnitId');
    let caseType = localStorage.getItem("caseType")

    const [showResponse,setShowResponse] = useState(false);



    useEffect(()=> {
        findWebUnit(webUnitId).then(res=>{
            setAllValue(res);
        })
    },[webUnitId])



    //执行测试
    const actionTest = () =>{
        //调接口

        setShowResponse(true)
    }


    //返回
    const  goBack = () => {
        if(caseType==="unit"){
            addRouter("/repositorypage/webtest/unitcase")
        }else if(caseType==="scene"){
            addRouter("/repositorypage/webtest/scenedetail")
        }
    }


    const toHistory = () =>{
        addRouter("/repositorypage/webtest/unitcase-instance")
    }

    return(
        <>
            <BackCommon
                clickBack={goBack}
                // right={<WebEnvSelect history={props.history}/>}
            />
            <div className={'testcase-detail'}>
                <div className="apidetail-header-btn">
                    <div className={"method-name"}>{allValue?.testCase?.name}</div>
                    <div className={'apidetail-title-tool'}>
                        {
                            caseType === "unitcase"
                                ?<Button onClick={toHistory}>历史</Button>
                                :null
                        }

                        <Button className="important-btn" onClick={actionTest}>测试</Button>
                    </div>
                </div>
                <div className={"method"}>
                   
                    <div className={"method-people-info"}>
                        <span className={"people-item "}>分组: {allValue?.testCase?.category?.name}</span>
                        <span className={"people-item "}>创建人: {allValue?.testCase?.createUser?.name}</span>
                        <span className={"people-item "}>更新者: {allValue?.testCase?.updateUser?.name}</span>
                        <span className={"people-item "}>更新时间: {allValue?.testCase?.updateTime}</span>
                    </div>
                </div>
            </div>

            <WebUnitStepList />

        </>
    )
}

export default inject('webUnitStore')(observer(WebUnitDetail));
