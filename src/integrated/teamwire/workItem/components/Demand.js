import React from "react";
import {applyJump} from "tiklab-core-ui";

/**
 * 关联需求
 */
const Demand = ({workItemSelect,workItemInfo})=>{

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
            {
                workItemSelect
            }
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "10px 0",
            }}>
                <div><span style={{ "color": "#999"}}>需求名：</span><a onClick={()=>toWorkItem(workItemInfo)}>{workItemInfo?.name ||"未设置"}</a></div>
            </div>
            <div className={"detail-bottom"}>
                <span className={"detail-bottom-item "}>项目名 :  {workItemInfo?.projectName || "未设置"} </span>
                <span className={"detail-bottom-item "}>负责人 : {workItemInfo?.director || "未设置"}</span>
                <span className={"detail-bottom-item "}>状态 : {workItemInfo?.status || "未设置"}</span>
                <span className={"detail-bottom-item "}>优先级 : {workItemInfo?.priority || "未设置"}</span>
            </div>
        </div>
    )
}

export default Demand;