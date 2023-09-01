import React, {useEffect, useState} from "react";
import ProjectSelect from "./ProjectSelect";
import {Table, Input, Col,Row} from "antd";
import {inject, observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import IconBtn from "../../../../common/iconBtn/IconBtn";

const DemandSelect = (props) =>{
    const {workItemStore,setShowSelect,caseInfo,updateFn,setBinded,setDemandInfo} = props;
    const {
        findWorkItemList,
        findWorkItem,
    } = workItemStore;

    const [selectProjectId, setSelectProjectId] = useState();
    const [workItemList, setWorkItemList] = useState([]);

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
        {
            title:`操作`,
            dataIndex: "operation",
            key: "operation",
            render: (text, record) =>(
                <a onClick={()=>onFinish(record.id)}>关联</a>
            )
        }
    ]

    useEffect(()=>{
        findDemandList({})
    },[])

    const onFinish = (id) => {
        setSelectProjectId(id)
        caseInfo.testCase.workItemId = id;
        updateFn(caseInfo).then(()=>{
            findWorkItem(id).then(res=>{
                setDemandInfo(res)
                setBinded(true)
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
            workTypeCode:"demand",
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
                            placeholder={`搜索需求名称`}
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

export default inject("workItemStore")(observer(DemandSelect));
