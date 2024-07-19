import React, {useEffect} from "react";
import {useParams} from "react-router";
import {inject, observer} from "mobx-react";
import "../functionStyle.scss"
import CaseBread from "../../../../common/CaseBread";
import FunctionDetail from "../FunctionDetail";


const FunctionContentListView = (props) =>{
    const {funcUnitStore} = props;
    const {testCaseInfo} = funcUnitStore

    let {id} = useParams()
    const functionId = sessionStorage.getItem('functionId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('functionId',id);

    },[functionId])


    return(
        <div className={"content-box-center"}>
            <CaseBread
                icon={"gongneng1"}
                breadItem={[testCaseInfo?.name]}
            />
            <FunctionDetail functionId={functionId} />

        </div>


    )
}

export default inject('funcUnitStore')(observer(FunctionContentListView));