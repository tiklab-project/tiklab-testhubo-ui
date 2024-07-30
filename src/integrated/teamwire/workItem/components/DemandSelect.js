import React, {useEffect, useState} from "react";
import ProjectSelect from "./ProjectSelect";
import {Table, Input, Col,Row} from "antd";
import {inject, observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import PaginationCommon from "../../../../common/pagination/Page";
import IconCommon from "../../../../common/IconCommon";
import {debounce} from "../../../../common/utils/commonFn";

const DemandSelect = (props) =>{
    const {workItemStore,caseInfo,updateFn,setDemandInfo,onCancel} = props;
    const {
        findWorkItemList,
        findWorkItem,
    } = workItemStore;

    const [selectProjectId, setSelectProjectId] = useState();
    const [workItemList, setWorkItemList] = useState([]);
    const repositoryId = sessionStorage.getItem("repositoryId")
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        {
            title:`需求名`,
            dataIndex: "title",
            key: "name",
            width:"40%"
        },
        {
            title:`经办人`,
            dataIndex: ["assigner","name"],
            key: "director",
            width:"20%"
        },
        {
            title:`状态`,
            dataIndex: ["workStatusNode","name"],
            key: "status",
            width:"20%"
        }, {
            title:`优先级`,
            dataIndex: ["workPriority","name"],
            key: "priority",
            width:"20%"
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

        onCancel()
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
            name:e.target.value,

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
            }else {
                // messageFn("error","TeamWire连接失败!")
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
            <div style={{padding:"0 0 15px"}}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={18}>
                        <Input
                            placeholder={`搜索需求名称`}
                            onPressEnter={onSearch}
                            onChange={onSearch}
                            className='demand_project_search'
                            prefix={<IconCommon
                                icon={"sousuo"}
                                className={"icon-s"}
                            />}
                            onChange={debounce(onSearch,500) }
                            allowClear
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
            <div style={{"overflow": "auto","height": "350px"}}>
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

        </>
    )
}

export default inject("workItemStore")(observer(DemandSelect));
