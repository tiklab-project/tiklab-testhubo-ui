import React, {useState} from "react";
import {Modal, Space, Table} from "antd";
import IconBtn from "../../../common/iconBtn/IconBtn";
import {inject, observer} from "mobx-react";

const WorkspaceFindList = (props) =>{
    const {workspaceBindStore} = props;
    const {findWorkspaceList,bindWorkspace,findWorkspaceBindList} = workspaceBindStore;


    //空间列表头
    const columns = [
        {
            title:`空间名`,
            dataIndex: "workspaceName",
            key: "workspaceName",
            width:"90%",
            // align:"center",
            render: (text,record) =>(
                <Space>
                    <img src={record.iconUrl} alt={"icon"} className={"repository-icon"}/>
                    <span>{text}</span>
                </Space>
            )
        },
        // {
        //     title: `可见范围`,
        //     dataIndex: "visibility",
        //     key: "visibility",
        //     width:"20%",
        // },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId")
    const [visible, setVisible] = React.useState(false);
    const [workspaceList, setWorkspaceList] = useState();
    const [selectItem, setSelectItem] = useState();

    // 弹框展示
    const showModal = () => {
        findWorkspaceList({}).then(list=>{
            setWorkspaceList(list)
        })
        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        let param = {
            repositoryId:repositoryId,
            workspace:{id:selectItem[0]}
        }
        bindWorkspace(param).then(()=>{
            findWorkspaceBindList({repositoryId:repositoryId})
        })

        setVisible(false);
    };

    const rowSelection = {
        type:"radio",
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows)
            setSelectItem(selectedRowKeys)
        },
    };

    const onCancel = () => { setVisible(false) };

    return(
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                name={"关联空间"}
                onClick={showModal}
            />
            <Modal
                destroyOnClose={true}
                title="关联空间"
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={400}
            >

                <Table
                    columns={columns}
                    dataSource={workspaceList}
                    rowKey = {record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={false}
                />

            </Modal>
        </>
    )
}

export default inject("workspaceBindStore")(observer(WorkspaceFindList));