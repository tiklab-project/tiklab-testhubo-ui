import React, {useEffect, useState} from "react";
import ProjectSelect from "./ProjectSelect";
import {Table, Input, Col,Row} from "antd";
import {inject, observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import IconBtn from "../../../../common/iconBtn/IconBtn";

const DemandSelect = (props) =>{
    const {workItemStore,caseInfo,updateFn,setDemandInfo} = props;
    const {
        findWorkItemList,
        findWorkItem,
    } = workItemStore;

    const [selectProjectId, setSelectProjectId] = useState();
    const [workItemList, setWorkItemList] = useState([]);
    const repositoryId = sessionStorage.getItem("repositoryId")

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
        }
    ]

    useEffect(()=>{
        findDemandList({})
    },[])

    const onFinish = (id) => {
        setSelectProjectId(id)
        caseInfo.testCase.workItemId = id;
        updateFn(caseInfo).then(()=>{
            findWorkItem(id,repositoryId).then(res=>{
                if(res.code === 0) {
                    setDemandInfo(res.data)
                }
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
            repositoryId:repositoryId,
            workTypeCode:"demand",
            ...param
        }
        findWorkItemList(params).then(res=>{
            if(res.code===0){
                setWorkItemList(res.data);
            }else {
                // messageFn("error","TeamWire连接失败!")
            }
        })
    }

    return(
        <>
            <div style={{padding:"0 0 15px"}}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={18}>
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
                </div>
            </div>

        </>
    )
}

export default inject("workItemStore")(observer(DemandSelect));
