import React, {useEffect, useState} from "react";
import {Table, Input, Col,Row} from "antd";
import {inject, observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import workItemBindStore from "../store/WorkItemBindStore";
import ProjectSelect from "../../workItem/components/ProjectSelect";
const {createWorkItemBind,findWorkItemBindList} = workItemBindStore;

const DefectSelect = (props) =>{
    const {workItemStore,setShowSelect,caseId} = props;
    const {findWorkItemList} = workItemStore;

    const [selectProjectId, setSelectProjectId] = useState();
    const [workItemList, setWorkItemList] = useState([]);

    const columns = [
        {
            title:`缺陷名`,
            dataIndex: "name",
            key: "name",
            width:"40%",
        },
        {
            title: `项目`,
            dataIndex:"projectName",
            key: "projectName",
            width:"20%",
        },
        {
            title: `状态`,
            dataIndex: "status",
            key: "status",
            width:"15%",
        },
        {
            title: `优先级`,
            dataIndex: "priority",
            key: "priority",
            width:"15%",
        },
        {
            title:`操作`,
            dataIndex: "operation",
            key: "operation",
            width:150,
            render: (text, record) =>(
                <a onClick={()=>onFinish(record.id)}>关联</a>
            )
        }
    ]

    useEffect(()=>{
        findDemandList({})
    },[])

    const onFinish = (id) => {
        let param = {
            caseId:caseId,
            workItem:{id:id}
        }
        createWorkItemBind(param).then(()=>{
            findWorkItemBindList({caseId:caseId}).then(()=>{
                setShowSelect(false)
            })
        })
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
            workTypeCode:"defect",
            ...param
        }
        findWorkItemList(params).then(list=>{
            setWorkItemList(list);
        })
    }

    return(
        <>
            <div style={{padding:"0 0 15px"}}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={15}>
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
                    <Col className="gutter-row" span={3}>
                        <IconBtn
                            className="pi-icon-btn-grey"
                            onClick={()=>setShowSelect(false)}
                            name={"取消"}
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
                        pagination={false}
                    />
                </div>

            </div>


        </>
    )
}

export default inject("workItemStore")(observer(DefectSelect));
