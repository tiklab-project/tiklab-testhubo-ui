import React, {useEffect, useState} from "react";
import {applyJump} from "tiklab-core-ui";
import DemandSelect from "./DemandSelect";
import "./demandStyle.scss"
import {inject, observer} from "mobx-react";
/**
 * 关联需求
 */
const Demand = (props)=>{
    const {workItemId,workItemStore} = props
    const {findWorkItem} =workItemStore

    const [demandInfo, setDemandInfo] = useState();

    useEffect(()=>{
        if(workItemId){
            findWorkItem(workItemId).then(res=>{
                setDemandInfo(res)
            })
        }else {
            setDemandInfo(null)
        }
    },[workItemId])


    const toWorkItem = (record)=>{
        try{
            if(IS_DEV){
                applyJump(`${teamwireUrl}/#/index/projectDetail/${record.projectId}/workDetail/${record.id}`,'_blank')
            }else {
                applyJump(`${record.projectUrl}/#/index/projectDetail/${record.projectId}/workDetail/${record.id}`,'_blank')
            }
        }catch {
            applyJump(`${record.projectUrl}/#/index/projectDetail/${record.projectId}/workDetail/${record.id}`,'_blank')
        }
    }

    return(
        <div style={{padding:"10px 0"}} className={"detail-box"}>
            <DemandSelect />
            {/*<div >*/}
            {/*    <div style={{*/}
            {/*        display: "flex",*/}
            {/*        alignItems: "center",*/}
            {/*        gap: "20px",*/}
            {/*        padding: "10px 0",*/}
            {/*    }}>*/}
            {/*        <div><span style={{ "color": "#999"}}>需求名：</span><a onClick={()=>toWorkItem(demandInfo)}>{demandInfo?.name ||"未设置"}</a></div>*/}
            {/*    </div>*/}
            {/*    <div className={"detail-bottom"}>*/}
            {/*        <span className={"detail-bottom-item "}>项目名 :  {demandInfo?.projectName || "未设置"} </span>*/}
            {/*        <span className={"detail-bottom-item "}>负责人 : {demandInfo?.director || "未设置"}</span>*/}
            {/*        <span className={"detail-bottom-item "}>状态 : {demandInfo?.status || "未设置"}</span>*/}
            {/*        <span className={"detail-bottom-item "}>优先级 : {demandInfo?.priority || "未设置"}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    )
}

export default inject("workItemStore")(observer(Demand));