import React from "react";
import {Tabs} from "antd";
import "./connection.scss"
import WorkItemBindList from "../../../integrated/teamwire/defect/components/WorkItemBindList";

const ConnectionCommon = ({workItemSelect,workItemInfo,caseId})=>{


    return(
        <Tabs>
            <Tabs.TabPane tab="关联需求" key="item-1">
                <div className={"connection_work-item-body"}>
                    <div>需求名称：</div>
                    <div>
                        {workItemInfo?workItemInfo.name:"未设置"}
                    </div>
                    {
                        workItemSelect
                    }
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="关联缺陷" key="item-2">
                <WorkItemBindList
                    caseId={caseId}
                />
            </Tabs.TabPane>
        </Tabs>
    )
}

export default ConnectionCommon;