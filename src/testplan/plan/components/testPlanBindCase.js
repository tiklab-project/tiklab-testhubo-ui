/**
 * @description：测试计划中关联用例
 * @date: 2021-08-20 17:00
 */
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Table, Space, Select, Row, Col, Input, Avatar,} from 'antd';
import {showCaseTypeTable} from "../../../common/caseCommon/CaseCommonFn";
import testPlanDetailStore from "../store/testPlanDetailStore";
import {SearchOutlined} from "@ant-design/icons";
import PaginationCommon from "../../../common/pagination/Page";
import IconBtn from "../../../common/iconBtn/IconBtn";

// 添加与编辑
const TestPlanBindCase = (props) => {
    const {testPlanId,findBindCasePage} = props;
    const {planBindCase} = testPlanDetailStore;
    const {findTestCasePage,testCaseList} = testPlanDetailStore;

    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width:'40%'
        },
        {
            title: `用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            width:"10%",
            render: (text) =>(<div className={"case-table-case-type"}>{showCaseTypeTable(text)}</div>)
        }, {
            title: `模块`,
            dataIndex: ["category","name"],
            key: "category",
            width:"10%",
        },
        {
            title: `创建人`,
            dataIndex:  ["createUser","name"],
            key: "user",
            width:"15%",
            render: (text, record) => (showCreateUser(record.createUser))
        },
        {
            title: `创建时间`,
            dataIndex: 'createTime',
            key: "createTime",
            width:"15%",
        },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId")
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        findPage()
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //提交
    const onFinish = (id) => {
        let obj={
            testPlan:{id: testPlanId},
            testCase: {id:id}
        }
        planBindCase([obj]).then(()=> {
            findBindCasePage()
            findPage()
        })
    }

    const showCreateUser = (createUser) =>{
        if(createUser&&createUser.nickname){
            return <div className={"ws-user-item"}>
                <Space>
                    <Avatar style={{width:"20px",height:"20px",lineHeight:"20px"}}>{createUser?.nickname[0]}</Avatar>
                    <span >{createUser?.nickname} </span>
                </Space>
            </div>
        }
    }

    //测试类型筛选
    const testTypeFn = (type)=>{
        let params = {
            testType:type,
        }
        findPage(params)
    }

    const onSearch = (value) =>{
        let param = {name:value}
        findPage(param)
    }

    const findPage = (params) =>{
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            repositoryId:repositoryId,
            testPlanId:testPlanId,
            ...params
        }
        findTestCasePage(param).then((res)=>{
            setTotalPage(res.totalPage);
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

        findPage(param)
    }

    return (
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                onClick={showModal}
                name={"关联用例"}
            />
            <Modal
                title="关联"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={false}
            >
                <div style={{padding:"0 0 15px"}}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <Input
                                placeholder={`搜索名称`}
                                onPressEnter={onSearch}
                                onChange={onSearch}
                                className='demand_project_search'
                                prefix={<SearchOutlined />}
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Select
                                // defaultValue={null}
                                placeholder={"测试类型"}
                                className={"bind-case-select"}
                                onChange={testTypeFn}
                                options={[
                                    {
                                        value: null,
                                        label: '所有',
                                    },{
                                        value: 'api',
                                        label: '接口',
                                    },{
                                        value: 'ui',
                                        label: 'UI',
                                    },
                                    {
                                        value: 'perform',
                                        label: '性能',
                                    },{
                                        value: 'function',
                                        label: '功能',
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </div>
                <div style={{"overflow": "auto","height": "calc(100% - 38px)"}}>
                    <div className={"table-list-box"} >
                        <Table
                            columns={columns}
                            dataSource={testCaseList}
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
    );
};

export default inject("testcaseStore")(observer(TestPlanBindCase));
