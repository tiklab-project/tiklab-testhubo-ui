/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import AppUnitStepList from "./appUnitStepList";
import {Button} from "antd";
import AppEnvSelect from "../../apptest/appEnvSelect";

const AppUnitDetail = (props) => {
    const {appUnitStore} = props;
    const {findAppUnit,updateAppUnit} = appUnitStore;
    const [allValue,setAllValue] = useState();
    const addRouter = props.history.push;
    const appUnitId = sessionStorage.getItem('appUnitId');
    let caseType = localStorage.getItem("caseType")

    const [showResponse,setShowResponse] = useState(false);

    useEffect(()=> {
        findAppUnit(11).then(res=>{
            setAllValue(res);
        })
    },[appUnitId])



    //执行测试
    const actionTest = () =>{
        //调接口

        setShowResponse(true)
    }


    //返回
    const  goBack = () => {
        if(caseType==="unit"){
            addRouter("/repositorypage/apptest/unitcase")
        }else if(caseType==="scene"){
            addRouter("/repositorypage/apptest/scenedetail")
        }
    }


    const toHistory = () =>{
        addRouter("/repositorypage/apptest/unitcase-instance")
    }

    return(
        <>
            <BackCommon clickBack={goBack} right={<AppEnvSelect history={props.history}/>}/>
            <div className={'testcase-detail'}>
                <div className="apidetail-header-btn">
                    <div className={"method-name"}>{allValue?.name}</div>
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
                        <span className={"people-item "}>分组: {allValue?.category.name}</span>
                        <span className={"people-item "}>创建人: {allValue?.createUser.name}</span>
                        <span className={"people-item "}>更新者: {allValue?.updateUser.name}</span>
                        <span className={"people-item "}>更新时间: {allValue?.updateTime}</span>
                    </div>
                </div>
            </div>

            <AppUnitStepList />

        </>
    )
}

export default inject('appUnitStore')(observer(AppUnitDetail));
