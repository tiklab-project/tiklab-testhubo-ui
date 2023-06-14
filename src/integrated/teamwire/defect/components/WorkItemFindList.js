import React, {useState} from "react";
import {Modal, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import ProjectSelect from "../../workItem/components/ProjectSelect";

const WorkItemFindList = (props) =>{
    const {workItemBindStore,workItemStore,caseId} = props;
    const {createWorkItemBind,findWorkItemBindList} = workItemBindStore;
    const {
        findProjectList,
        findWorkItemList,
     
    } = workItemStore;


    //缺陷列表头
    const columns = [
        {
            title:`缺陷名`,
            dataIndex: "name",
            key: "name",
            // width:"90%",
            // align:"center",
        },
        {
            title: `项目`,
            dataIndex:"projectName",
            key: "projectName",
        },
        {
            title: `状态`,
            dataIndex: "status",
            key: "status",
        },
        {
            title: `优先级`,
            dataIndex: "priority",
            key: "priority",
        },
    ]

    const [visible, setVisible] = React.useState(false);
    const [projectList, setProjectList] = useState([]);
    const [workItemList, setWorkItemList] = useState();
    const [selectItem, setSelectItem] = useState();
    const [selectProjectId, setSelectProjectId] = useState();
    
    // 弹框展示
    const showModal = () => {
        findProjectList({}).then(list=>{
            setProjectList(list)
        })
        
        setVisible(true);
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
     * 查询缺陷
     */
    const findWorkItemLists = (projectId)=>{
        let param = {
            projectId:projectId||selectProjectId,
            workTypeCode:"defect"
        }
        findWorkItemList(param).then(list=>{
            setWorkItemList(list);
        })
    }


    // 提交
    const onFinish = async () => {
        let param = {
            caseId:caseId,
            workItem:{id:selectItem[0]}
        }
        createWorkItemBind(param).then(()=>{
            findWorkItemBindList({caseId:caseId})
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
                name={"关联缺陷"}
                onClick={showModal}
            />
            <Modal
                destroyOnClose={true}
                title="关联缺陷"
                visible={visible}
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
                        projectList={projectList}
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

export default inject("workItemStore","workItemBindStore")(observer(WorkItemFindList));