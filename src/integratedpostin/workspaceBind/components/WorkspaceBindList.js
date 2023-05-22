import React, {useEffect} from "react";
import {Table} from "antd";
import {inject, observer} from "mobx-react";

const WorkspaceBindList = (props) =>{
    const {workspaceBindStore} = props;
    const {findWorkspaceBindList,workspaceBindList} = workspaceBindStore


    //列表头
    const columns = [
        {
            title:`空间名`,
            dataIndex: "workspaceName",
            key: "name",
        },
        {
            title: `创建时间`,
            dataIndex: "createTime",
            key: "createTime",
        },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findWorkspaceBindList({repositoryId:repositoryId})
    },[])


    return(
        <div className={"content-box-center"}>
            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>系统集成</div>

            </div>
            <div className={"table-list-box"}>
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={workspaceBindList}
                    rowKey={record => record.id}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default inject("workspaceBindStore")(observer(WorkspaceBindList));