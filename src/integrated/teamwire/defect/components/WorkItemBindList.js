import React, {useEffect} from "react";
import {Popconfirm, Table} from "antd";
import {inject, observer} from "mobx-react";
import WorkItemFindList from "./WorkItemFindList";
import IconCommon from "../../../../common/IconCommon";
import WorkItemAdd from "./WorkItemAdd";
import {applyJump} from "tiklab-core-ui"
import "./workItemStyle.scss"
/**
 * 绑定的缺陷列表
 */
const WorkItemBindList = (props) =>{
    const {workItemBindStore,caseId} = props;
    const {findWorkItemBindList,workItemBindList,deleteWorkItemBind} = workItemBindStore

    //列表头
    const columns = [
        {
            title:`缺陷名称`,
            dataIndex: ["workItem","name"],
            key: "name",
            render:(text,record)=>(
                <a onClick={()=>toWorkItem(record)}>{text}</a>
            )
        },
        {
            title: `项目`,
            dataIndex:["workItem","projectName"],
            key: "projectName",
        },
        {
            title: `状态`,
            dataIndex: ["workItem","status"],
            key: "status",
        },
        {
            title: `优先级`,
            dataIndex: ["workItem","priority"],
            key: "priority",
        },
        {
            title: `创建时间`,
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: `操作`,
            key: "action",
            width:"10%",
            // align:"center",
            render: (text, record) => (
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteWorkItemBind(record.id).then(()=> findWorkItemBindList({caseId:caseId}))}
                    okText='确定'
                    cancelText='取消'
                >
                    <IconCommon
                        className={"icon-s edit-icon"}
                        icon={"shanchu3"}
                    />
                </Popconfirm>
            )
        },
    ]


    useEffect(()=>{
        findWorkItemBindList({caseId:caseId})
    },[])

    const toWorkItem = (record)=>{
        try{
            if(IS_DEV){
                applyJump(`${teamwireUrl}/#/index/projectDetail/${record.workItem.projectId}/workDetail/${record.workItem.id}`,'_blank')
            }else {
                applyJump(`${record.projectUrl}/#/index/projectDetail/${record.workItem.projectId}/workDetail/${record.workItem.id}`,'_blank')
            }
        }catch {
            applyJump(`${record.projectUrl}/#/index/projectDetail/${record.workItem.projectId}/workDetail/${record.workItem.id}`,'_blank')
        }
    }

    return(
        <>
            <div style={{display:"flex",gap:"10px",margin:'5px 0'}}>
                <WorkItemFindList caseId={caseId} />
                <WorkItemAdd caseId={caseId} />
            </div>
            <div className={"table-list-box"}>
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={workItemBindList}
                    rowKey={record => record.id}
                    pagination={false}
                />
            </div>
        </>

    )
}

export default inject("workItemBindStore")(observer(WorkItemBindList));