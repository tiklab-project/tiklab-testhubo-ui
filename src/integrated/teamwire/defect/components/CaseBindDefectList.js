import React, {useEffect, useState} from "react";
import {Empty, Popconfirm, Table} from "antd";
import { observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import {applyJump} from "thoughtware-core-ui"
import "./workItemStyle.scss"
import workItemBindStore from "../store/WorkItemBindStore";
import DefectSelect from "./DefectSelect";
/**
 * 绑定的缺陷列表
 */
const CaseBindDefectList = (props) =>{
    const {caseId} = props;
    const {findWorkItemBindList,workItemBindList,deleteWorkItemBind} = workItemBindStore

    //列表头
    const columns = [
        {
            title:`缺陷名称`,
            dataIndex: ["workItem","name"],
            key: "name",
            // render:(text,record)=>(
            //     <a onClick={()=>toWorkItem(record)}>{text}</a>
            // )
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


    const [showSelect, setShowSelect] = useState(false);


    useEffect(async ()=>{
        await findWorkItemBindList({caseId:caseId})
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
        <div style={{padding: "0 0 20px"}}>
            <div style={{margin:'10px 0'}}>
                <div className={"display-flex-between"} style={{margin: "10px 0"}}>
                    <div className={"list-size-title"}>共{workItemBindList.length}个</div>
                    <DefectSelect
                        caseId={caseId}
                    />
                </div>
            </div>
            <div className={"table-list-box"}  >
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={workItemBindList}
                    rowKey={record => record.id}
                    pagination={false}
                    locale={{
                        emptyText: <Empty
                            imageStyle={{height: 100}}
                            description={<span>暂无缺陷</span>}
                        />,
                    }}
                />
            </div>
        </div>

    )
}

export default observer(CaseBindDefectList);