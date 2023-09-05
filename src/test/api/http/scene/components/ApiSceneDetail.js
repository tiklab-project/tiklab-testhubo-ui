import React, {useEffect, useState} from "react";
import {Button} from "antd";
import ApiSceneStepList from "./apiSceneStepList";
import {inject, observer} from "mobx-react";
import {useHistory} from "react-router";

const ApiSceneDetail = (props) =>{
    const {apiSceneStore} = props;
    const {findApiScene} = apiSceneStore;
    const [caseInfo,setCaseInfo]=useState();

    let history = useHistory()
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    useEffect(()=> {
        findApiScene(apiSceneId).then(res=>{
            setCaseInfo(res);
        })
    },[apiSceneId])
    
    const toExePage = () =>{
        history.push("/repository/testcase/api-scene-execute")
    }


    return(
        <>
            <div className={"detail-box"}
                 style={{
                     padding:"20px 0",
                     display:"flex",
                     alignItems:"center",
                     justifyContent:"space-between"

                 }}
            >
                <div className={"detail-bottom"} style={{flex:"1"}}>
                    <span className={"detail-bottom-item "}>分组:{caseInfo?.testCase?.category?.name||"未设置"} </span>
                    <span className={"detail-bottom-item "}>更新者:{caseInfo?.testCase?.updateUser?.nickname||"未更新"}</span>
                    <span className={"detail-bottom-item "}>更新时间:{caseInfo?.testCase?.updateTime}</span>
                </div>
                <Button className={"important-btn"} onClick={toExePage}>
                    测试
                </Button>
            </div>

            <ApiSceneStepList />

        </>
    )
}

export default inject('apiSceneStore')(observer(ApiSceneDetail))