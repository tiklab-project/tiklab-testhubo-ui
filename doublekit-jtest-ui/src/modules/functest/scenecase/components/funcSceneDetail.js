/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import FuncSceneStepList from "./funcSceneStepList";

const FuncSceneDetail = (props) => {
    const {funcSceneStore} = props;
    const {findFuncScene,updateFuncScene} = funcSceneStore;
    const [allValue,setAllValue] = useState();
    const testcaseId = sessionStorage.getItem('funcSceneId');

    useEffect(()=> {
        findFuncScene(11).then(res=>{
            setAllValue(res);
        })
    },[testcaseId])



    const goback = () =>{
        props.history.push("/repositorypage/functest/scenecase")
    }


    return(
        <>
            <BackCommon clickBack={goback} />
            <div className={'testcase-detail'}>
                <div className="apidetail-header-btn">
                    <div className={"method-name"}>{allValue?.name}</div>
                    
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

            <FuncSceneStepList />

        </>
    )
}

export default inject('funcSceneStore')(observer(FuncSceneDetail));
