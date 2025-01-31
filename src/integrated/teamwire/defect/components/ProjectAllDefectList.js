import React, {useEffect, useState} from "react";
import {Empty, Popconfirm, Table} from "antd";
import { observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import "./workItemStyle.scss"
import workItemBindStore from "../store/WorkItemBindStore";
import PageCenter from "../../../../common/pageContent/PageCenter";

/**
 * 绑定的缺陷列表
 */
const ProjectAllDefectList = (props) =>{
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
        },{
            title: `用例名称`,
            dataIndex:["testCase","name"],
            key: "name",
        },
        {
            title: `项目名称`,
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
                    onConfirm={() => deleteWorkItemBind(record.id).then(()=> findWorkItemBindList({repositoryId:repositoryId}))}
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

    const repositoryId = sessionStorage.getItem("repositoryId")
    const [tableLoading,setTableLoading] = useState(true);

    useEffect(async ()=>{
        setTableLoading(true)
        await findWorkItemBindList({repositoryId:repositoryId})
        setTableLoading(false)
    },[repositoryId])

    return(
        <PageCenter>
            <div className={"content-box-center"}>
                <div  className={"header-box-space-between"} style={{margin:"10px 8px"}} >
                    <div className={'header-box-title'}>缺陷</div>
                </div>
                <div className={"table-list-box"}  >
                    <Table
                        className="tablelist"
                        columns={columns}
                        dataSource={workItemBindList}
                        rowKey={record => record.id}
                        pagination={false}
                        loading={tableLoading}
                        locale={{
                            emptyText: !tableLoading
                                ?<Empty
                                    imageStyle={{height: 100}}
                                    description={<span>暂无缺陷</span>}
                                />
                                :<div style={{height: 100}}/>,
                        }}
                    />
                </div>
            </div>
        </PageCenter>
    )
}

export default observer(ProjectAllDefectList);