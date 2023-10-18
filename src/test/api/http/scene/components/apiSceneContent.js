import React,{useEffect} from 'react';
import { inject,observer } from 'mobx-react';
import {useParams} from "react-router";
import ApiSceneDetail from "./ApiSceneDetail";
import CaseBread from "../../../../../common/CaseBread";

const ApiSceneContent = (props) => {
    const {apiSceneStore} = props;
    const {testCaseInfo} = apiSceneStore

    let {id} = useParams()
    const apiSceneId = sessionStorage.getItem('apiSceneId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiSceneId',id);

    },[apiSceneId])

    return(
        <div className={"content-box-center"}>
            <CaseBread
                style={{borderBottom:"none"}}
                // title={testCaseInfo?.name}
                caseType={testCaseInfo?.caseType}
                breadItem={["用例列表","用例详情"]}
            />
            <ApiSceneDetail/>
        </div>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneContent));
