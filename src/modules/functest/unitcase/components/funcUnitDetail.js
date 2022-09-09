/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import FuncUnitStepList from "./funcUnitStepList";

const FuncUnitDetail = (props) => {
    const {funcUnitStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;

    const [allValue,setAllValue] = useState();

    const funcUnitId = sessionStorage.getItem('funcUnitId');
    let caseType = localStorage.getItem("caseType")

    useEffect(()=> {
        findFuncUnit(funcUnitId).then(res=>{
            setAllValue(res);
        })
    },[funcUnitId])



    const goback = () =>{
        props.history.push("/repositorypage/functest/unitcase")
    }


    return(
        <>
            <BackCommon clickBack={goback} />
            <div className={'testcase-detail'}>
                <div className="apidetail-header-btn">
                    <div className={"method-name"}>{allValue?.testCase?.name}</div>
                    
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
            <FuncUnitStepList />
        </>
    )
}

export default inject('funcUnitStore')(observer(FuncUnitDetail));
