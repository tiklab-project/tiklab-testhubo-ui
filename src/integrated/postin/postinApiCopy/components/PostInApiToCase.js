import React, { useState} from "react";
import {Modal, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import {TextMethodType} from "../../../../test/api/http/common/methodType";
import postInApiToCaseStore from "../store/PostinApiToCaseStore";
import workspaceBindStore from "../../workspaceBind/store/WorkspaceBindStore";


const PostInApiToCase = (props) => {
    const {testcaseStore} = props;
    const {findPostInApiList,createPostInApiToCase} = postInApiToCaseStore;
    const {findTestCaseList}= testcaseStore;
    const {workspaceName,findWorkspaceBindList} = workspaceBindStore

    //空间列表头
    const columns = [
        {
            title:`接口名`,
            dataIndex: "name",
            key: "postInApiName",
            width:"30%",
            // align:"center",
            render: (text,record) => <span >{record?.node?.name}</span>
        },{
            title: '方法',
            dataIndex: 'type',
            width: '20%',
            render: (text,record) => <TextMethodType type={record?.node?.methodType}/>
        },
        {
            title: '地址',
            dataIndex: 'path',
            width: '45%',
        },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId")
    const [visible, setVisible] = React.useState(false);
    const [postInApiList, setPostInApi] = useState();
    const [selectItem, setSelectItem] = useState();



    // 弹框展示
    const showModal =async () => {
        await findWorkspaceBindList({repositoryId:repositoryId})
        findPostInApiList(repositoryId).then(list=>{
            setPostInApi(list)
        })
        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        let param = {
            repositoryId:repositoryId,
            apiList:selectItem
        }
        createPostInApiToCase(param).then(()=>{
            const param = {
                repositoryId:repositoryId,
                pageParam: {
                    pageSize: 12,
                    currentPage: 1
                }
            }
            findTestCaseList(param)
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
            <a onClick={showModal}>从PostIn复制</a>
            <Modal
                destroyOnClose={true}
                title="从PostIn复制"
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={700}
            >
                <div style={{minHeight:"300px"}}>
                    <div style={{display:"flex","alignItems":"center",padding:"0 0 15px"}}>
                        <div>项目 :  {workspaceName}</div>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={postInApiList}
                        rowKey = {record => record.id}
                        rowSelection={{...rowSelection}}
                        pagination={false}
                    />
                </div>
            </Modal>
        </>
    )
}

export default inject("testcaseStore")(observer(PostInApiToCase));