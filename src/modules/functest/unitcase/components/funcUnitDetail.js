/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import FuncUnitStepList from "./funcUnitStepList";
import DetailCommon from "../../../common/detailCommon";

const FuncUnitDetail = (props) => {
    const {funcUnitStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;

    const [detailInfo,setDetailInfo]=useState();

    const funcUnitId = sessionStorage.getItem('funcUnitId');

    useEffect(()=> {
        findFuncUnit(funcUnitId).then(res=>{
            setDetailInfo(res);
        })
    },[funcUnitId])

    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateFuncUnit(param)
    }


    const goback = () =>{
        props.history.push("/repositorypage/functest/unitcase")
    }


    return(
        <>
            {/*<BackCommon clickBack={goback} />*/}
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
            />
            <FuncUnitStepList />
        </>
    )
}

export default inject('funcUnitStore')(observer(FuncUnitDetail));
