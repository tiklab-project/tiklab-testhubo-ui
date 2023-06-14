import React from "react";
import {Tabs} from "antd";
import "./connection.scss"
import WorkItemBindList from "../../../integrated/teamwire/defect/components/WorkItemBindList";
import {applyJump} from "tiklab-core-ui";

const ConnectionCommon = ({workItemSelect,workItemInfo,caseId})=>{


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
        <Tabs>
            <Tabs.TabPane tab="关联需求" key="item-1">
                <div className={"detail-box"}>
                    {
                        workItemSelect
                    }
                    <div className={"connection_work-item-body "}>
                        <div><span style={{ "color": "#999"}}>需求名：</span><a onClick={()=>toWorkItem(workItemInfo)}>{workItemInfo?.name ||"未设置"}</a></div>
                    </div>
                    <div className={"detail-bottom"}>
                        <span className={"detail-bottom-item "}>项目名 :  {workItemInfo?.projectName || "未设置"} </span>
                        <span className={"detail-bottom-item "}>负责人 : {workItemInfo?.director || "未设置"}</span>
                        <span className={"detail-bottom-item "}>状态 : {workItemInfo?.status || "未设置"}</span>
                        <span className={"detail-bottom-item "}>优先级 : {workItemInfo?.priority || "未设置"}</span>
                    </div>
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="关联缺陷" key="item-2">
                <WorkItemBindList caseId={caseId} />
            </Tabs.TabPane>
        </Tabs>
    )
}

export default ConnectionCommon;