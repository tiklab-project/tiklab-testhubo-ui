import React, {useEffect} from "react";
import FunctionDetail from "./FunctionDetail";
import {useParams} from "react-router";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../common/CaseBread";
import "./functionStyle.scss"
import ToggleCase from "../../testcase/components/ToggleCase";
import PageCenter from "../../../common/pageContent/PageCenter";

const FunctionContent = (props) =>{
    const {funcUnitStore} = props;
    const {testCaseInfo} = funcUnitStore

    let {caseId} = useParams()
    const functionId = sessionStorage.getItem('functionId') || caseId;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('functionId',caseId);

    },[functionId])


    return(
        <PageCenter>
            <div className={"content-box-center"}>
                <CaseBread
                    router={`/project/${sessionStorage.getItem("repositoryId")}/testcase`}
                    breadItem={[testCaseInfo?.name]}
                    toggleCase={<ToggleCase caseId={functionId}/>}
                    style={{borderBottom:"none"}}
                />
                <FunctionDetail functionId={functionId} />
            </div>
        </PageCenter>
    )
}

export default inject('funcUnitStore')(observer(FunctionContent));