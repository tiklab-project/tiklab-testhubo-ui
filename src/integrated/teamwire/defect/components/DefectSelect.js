import React, { useState} from "react";
import {Table, Input, Col,Row,Modal} from "antd";
import {inject, observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import workItemBindStore from "../store/WorkItemBindStore";
import ProjectSelect from "../../workItem/components/ProjectSelect";
import PaginationCommon from "../../../../common/pagination/Page";
const {createWorkItemBind,findWorkItemBindList} = workItemBindStore;

const DefectSelect = (props) =>{
    const {workItemStore,caseId} = props;
    const {findWorkItemList} = workItemStore;
    const columns = [
        {
            title:`缺陷名`,
            dataIndex: "title",
            key: "name",
            width:"40%",
        },
        {
            title: `项目`,
            dataIndex:["project","projectName"],
            key: "projectName",
            width:"20%",
        },
        {
            title: `状态`,
            dataIndex:  ["workStatusNode","name"],
            key: "status",
            width:"15%",
        },
        {
            title: `优先级`,
            dataIndex: ["workPriority","name"],
            key: "priority",
            width:"15%",
        },
        // {
        //     title:`操作`,
        //     dataIndex: "operation",
        //     key: "operation",
        //     width:150,
        //     render: (text, record) =>(
        //         <a onClick={()=>onFinish(record.id)}>关联</a>
        //     )
        // }
    ]

    const [selectProjectId, setSelectProjectId] = useState();
    const [workItemList, setWorkItemList] = useState([]);
    const repositoryId = sessionStorage.getItem("repositoryId")
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        findDemandList({})
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (id) => {
        let param = {
            repositoryId:repositoryId,
            testCase:{id:caseId},
            workItem:{id:id}
        }
        createWorkItemBind(param).then(()=>findWorkItemBindList({caseId:caseId}))
    };

    /**
     * 通过项目id查询需求
     * @param projectId
     */
    const clickProject = (projectId)=>{
        setSelectProjectId(projectId)
        findDemandList({projectId:projectId})
    }

    const onSearch =(e)=>{
        let param = {
            projectId:selectProjectId,
            name:e.target.value
        }
        findDemandList(param)
    }

    /**
     * 查询需求
     */
    const findDemandList = (param)=>{
        let params = {
            repositoryId:repositoryId,
            workTypeCode:"defect",
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            ...param
        }
        findWorkItemList(params).then(res=>{
            if(res.code===0){
                setWorkItemList(res.data.dataList);
                setTotalPage(res.data.totalPage)
            }
        })
    }


    // 分页
    const onTableChange = (current) => {
        setCurrentPage(current)

        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:current
            },
        }

        findDemandList(param)
    }


    return(
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                name={"关联缺陷"}
                onClick={showModal}
            />
            <Modal
                title="关联缺陷"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={false}
            >
                <div style={{padding:"0 0 15px"}}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <Input
                                placeholder={`搜索缺陷名称`}
                                onPressEnter={onSearch}
                                onChange={onSearch}
                                className='demand_project_search'
                                prefix={<SearchOutlined />}
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <ProjectSelect
                                clickProject={clickProject}
                                {...props}
                            />
                        </Col>

                    </Row>
                </div>
                <div style={{"overflow": "auto","height": "calc(100% - 38px)"}}>
                <div className={"table-list-box"} >
                    <Table
                        columns={columns}
                        dataSource={workItemList}
                        rowKey = {record => record.id}
                        onRow={(record) => {
                            return {
                                onClick: () => {onFinish(record.id)},
                                style: {cursor: 'pointer'}
                            };
                        }}
                        pagination={false}
                    />
                    <PaginationCommon
                        currentPage={currentPage}
                        totalPage={totalPage}
                        changePage={onTableChange}
                    />
                </div>

            </div>
            </Modal>
        </>
    )
}

export default inject("workItemStore")(observer(DefectSelect));
