import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import { useParams} from "react-router";
import ApiPerformDetail from "./apiPerformDetail";
import CaseBread from "../../../../../common/CaseBread";

const ApiPerfContent = (props) => {
    const {apiPerfStore} = props;
    const {testCaseInfo} = apiPerfStore

    let {id} = useParams()
    const apiPerfId = sessionStorage.getItem('apiPerfId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiPerfId',id);
    },[apiPerfId])


    return(
        <div className={"content-box-center"}>
            <CaseBread
                style={{borderBottom:"none"}}
                title={testCaseInfo?.name}
                caseType={testCaseInfo?.caseType}
                breadItem={["用例列表","用例详情"]}
            />
            <ApiPerformDetail/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfContent));
