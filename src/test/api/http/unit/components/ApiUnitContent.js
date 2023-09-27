import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import { useParams} from "react-router";
import ApiUnitEditPageCommon from "./apiUnitEditPageCommon";
import CaseBread from "../../../../../common/CaseBread";


const ApiUnitContent = (props) =>{
    const {apiUnitStore} = props;
    const {testCaseInfo} = apiUnitStore;

    let {id} = useParams()
    const apiUnitId = sessionStorage.getItem('apiUnitId') || id;

    useEffect(async ()=>{
        //获取路由id存入
        sessionStorage.setItem('apiUnitId',id);

    },[apiUnitId])

    return(
        <>
            <CaseBread
                icon={"jiekou1"}
                title={testCaseInfo?.name}
                caseType={testCaseInfo?.caseType}
            />

            <ApiUnitEditPageCommon/>
        </>
    )
}

export default inject('apiUnitStore')(observer(ApiUnitContent));