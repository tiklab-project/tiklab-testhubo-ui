import React, {useEffect} from "react";
import FunctionDetail from "./FunctionDetail";
import {useParams} from "react-router";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../common/CaseBread";
const FunctionContent = (props) =>{
    const {funcUnitStore} = props;
    const {testCaseInfo} = funcUnitStore

    let {id} = useParams()
    const functionId = sessionStorage.getItem('functionId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('functionId',id);

    },[functionId])


    return(
        <>
            <CaseBread
                icon={"gongneng"}
                title={testCaseInfo?.name}
                caseType={testCaseInfo?.caseType}
                style={{
                    borderBottom:"none"
                }}
            />
            <FunctionDetail />

        </>


    )
}

export default inject('funcUnitStore')(observer(FunctionContent));