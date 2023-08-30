import React, {useState} from "react";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import ProjectSelect from "./ProjectSelect";
import {Table} from "antd";
import {inject, observer} from "mobx-react";

const DemandSelect = (props) =>{
    const {workItemStore,caseInfo,updateCase} = props;
    const {
        findWorkItemList,
        findWorkItem,
        getDemandInfo
    } = workItemStore;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectItem, setSelectItem] = useState();
    const [workItemList, setWorkItemList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectProjectId, setSelectProjectId] = useState();
    const showModal = () => {
        setVisible(true)
    }

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


    /**
     * 通过项目id查询需求
     * @param projectId
     */
    const clickProject = (projectId)=>{
        findWorkItemLists(projectId);
        setSelectProjectId(projectId)
    }

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
                className={`pi-icon-btn-grey ${visible?"demand_hide":"demand_show"}`}
                name={"关联需求"}
                onClick={showModal}
            />
            <div className={`${visible?"demand_show":"demand_hide"}`}>
                <div style={{display:"flex","alignItems":"center",padding:"0 0 15px"}}>
                    <ProjectSelect
                        clickProject={clickProject}
                        {...props}
                    />
                </div>
                <div className={"table-list-box"}>
                    <Table
                        columns={columns}
                        dataSource={workItemList}
                        rowKey = {record => record.id}
                        rowSelection={{...rowSelection}}
                        pagination={false}
                    />
                </div>
            </div>
        </>
    )
}

export default inject("workItemStore")(observer(DemandSelect));
