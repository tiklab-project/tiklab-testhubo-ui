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
    const testcaseId = sessionStorage.getItem('funcUnitId');

    useEffect(()=> {
        findFuncUnit(11).then(res=>{
            setAllValue(res);
        })
    },[testcaseId])



    const goback = () =>{
        props.history.push("/repositorypage/functest/unitcase")
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

            <FuncUnitStepList />

        </>
    )
}

export default inject('funcUnitStore')(observer(FuncUnitDetail));
