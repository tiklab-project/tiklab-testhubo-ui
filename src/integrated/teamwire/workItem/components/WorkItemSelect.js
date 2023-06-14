import React, { useState} from "react";
import { Divider, Modal, Table} from "antd";
import {inject, observer} from "mobx-react";
import ProjectSelect from "./ProjectSelect";
import IconBtn from "../../../../common/iconBtn/IconBtn";

const WorkItemSelect = (props) =>{
    const {workItemStore,caseInfo,updateCase} = props;
    const {
        findWorkItemList,
        findWorkItem,
        getDemandInfo,
        demandInfo
    } = workItemStore;

    const columns = [
        {
            title:`需求名`,
            dataIndex: "name",
            key: "name",
        },
        {
            title:`负责人`,
            dataIndex: "director",
            key: "director",
        },
        {
            title:`状态`,
            dataIndex: "status",
            key: "status",
        }, {
            title:`优先级`,
            dataIndex: "priority",
            key: "priority",
        },
    ]

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [workItemList, setWorkItemList] = useState([]);
    const [selectProjectId, setSelectProjectId] = useState();
    const [selectItem, setSelectItem] = useState();

    /**
     * 打开关联需求
     */
    const showModal = () => {

        setIsModalOpen(true);
    };


    /**
     * 查询需求
     */
    const findWorkItemLists = (projectId)=>{
        let param = {
            projectId:projectId||selectProjectId,
            workTypeCode:"demand"
        }
        findWorkItemList(param).then(list=>{
            setWorkItemList(list);
        })
    }

    /**
     * 通过项目id查询需求
     * @param projectId
     */
    const clickProject = (projectId)=>{
        findWorkItemLists(projectId);
        setSelectProjectId(projectId)
    }


    const onFinish = () => {
        caseInfo.testCase.workItemId = selectItem[0];
        updateCase(caseInfo).then(()=>{
            findWorkItem(selectItem[0]).then(res=>{
                getDemandInfo(res)
            })
        })

        setIsModalOpen(false);
    };

    const onCancel = () => {
        setIsModalOpen(false);
    };

    const rowSelection = {
        type:"radio",
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows)
            setSelectItem(selectedRowKeys)
        },
    };


    return(
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                name={"关联需求"}
                onClick={showModal}
            />
            <Modal
                destroyOnClose={true}
                title="关联需求"
                visible={isModalOpen}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={600}
            >
                <div style={{display:"flex","alignItems":"center",padding:"0 0 15px"}}>
                    <div>项目: </div>
                    <ProjectSelect
                        clickProject={clickProject}
                        {...props}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={workItemList}
                    rowKey = {record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={false}
                />
            </Modal>
        </>
    )
}



export default inject("workItemStore")(observer(WorkItemSelect));