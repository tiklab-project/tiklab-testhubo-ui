/**
 * @description：测试计划中关联用例
 * @date: 2021-08-20 17:00
 */
import React, { useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Table, Space, Select, Row, Col, Input,} from 'antd';
import IconBtn from "../../common/iconBtn/IconBtn";
import {showCaseTypeInList, showCaseTypeView, showTestTypeView} from "../../common/caseCommon/CaseCommonFn";
import testPlanDetailStore from "../store/testPlanDetailStore";
import ApiSceneBindUnit from "../../test/api/http/scene/components/apiSceneBindUnit";
import {SearchOutlined} from "@ant-design/icons";

// 添加与编辑
const TestPlanBindCase = (props) => {
    const {testPlanId,testcaseStore,setVisible} = props;
    const {findBindTestCaseList,planBindCase} = testPlanDetailStore;
    const {findTestCaseList,testcaseList} = testcaseStore;


    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width:'40%'
        },
        {
            title:`测试类型`,
            dataIndex: "testType",
            key: "testType",
            width:'30%',
            render:(text,record)=>(showTestTypeView(record.testType))
        },
        {
            title:`用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            width:'30%',
            render:(text,record)=>(showCaseTypeInList(record.caseType))
        },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId")

    //提交
    const onFinish = (id) => {
        let obj={
            testPlan:{id: testPlanId},
            testCase: {id:id}
        }
        planBindCase([obj]).then(()=>findBindTestCaseList(testPlanId))
        setVisible(false)
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
        let values = {
            repositoryId:repositoryId,
            ...params
        }
        findTestCaseList(values)
    }


    return (
        <>
            <div style={{padding:"0 0 15px"}}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={16}>
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
                    <Col className="gutter-row" span={2}>
                        <IconBtn
                            className="pi-icon-btn-grey"
                            onClick={()=>setVisible(false)}
                            name={"取消"}
                        />
                    </Col>

                </Row>
            </div>
            <div style={{"overflow": "auto","height": "calc(100% - 38px)"}}>
                <div className={"table-list-box"} >
                    <Table
                        columns={columns}
                        dataSource={testcaseList}
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
    );
};

export default inject("testcaseStore")(observer(TestPlanBindCase));