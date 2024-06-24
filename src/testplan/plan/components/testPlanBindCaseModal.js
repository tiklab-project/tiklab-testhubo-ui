/**
 * @description：测试计划中关联用例
 * @date: 2021-08-20 17:00
 */
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Table, Select, Row, Col, Input} from 'antd';
import {showCaseTypeTable, showCaseTypeView, showStatus} from "../../../common/caseCommon/CaseCommonFn";
import testPlanDetailStore from "../store/testPlanDetailStore";
import {SearchOutlined} from "@ant-design/icons";
import PaginationCommon from "../../../common/pagination/Page";
import IconBtn from "../../../common/iconBtn/IconBtn";
import {CASE_TYPE} from "../../../common/dictionary/dictionary";
import {getVersionInfo} from "thoughtware-core-ui";
import ExtensionCommon from "../../../common/ExtensionCommon";
import {rowStyle} from "../../../test/testcase/components/testCaseTableFn";
import MenuSelect from "../../../common/menuSelect/MenuSelect";

// 添加与编辑
const TestPlanBindCaseModal = (props) => {
    const {testPlanId,findBindCasePage} = props;
    const {planBindCase} = testPlanDetailStore;
    const {findTestCasePage,testCaseList} = testPlanDetailStore;

    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width:'40%',
            render: (text,record) =>(
                <div className={"display-flex-gap"}>
                    <>{showCaseTypeView(record.caseType)}</>
                    {switchCaseTypeView(record)}
                </div>
            )
        },
        {
            title: `用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            width:"12%",
            render: (text) =>(<div className={"case-table-case-type"}>{showCaseTypeTable(text)}</div>)
        },{
            title: `状态`,
            dataIndex: "status",
            key: "status",
            width:"12%",
            render: (text)=><div className={"case-table-status"}>{showStatus(text)}</div>
        }, {
            title: `模块`,
            dataIndex: ["category","name"],
            key: "category",
            width:"15%",
        },
        {
            title: `创建时间`,
            dataIndex: 'createTime',
            key: "createTime",
            width:"15%",
        },
    ]

    const repositoryId = sessionStorage.getItem("repositoryId")
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectItem, setSelectItem] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


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

    //测试类型筛选
    const selectKeyFun = (item)=>{
        let key = item.key
        setSelectItem(key)

        let param
        if(key!=="all"){
            param={testType:key}
        }

        findPage(param)
    }
    const onSearch = (e) =>{
        let param = {name:e.target.value}
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

    const switchCaseTypeView = (record) =>{
        switch (record.caseType) {
            case CASE_TYPE.FUNCTION:
            case CASE_TYPE.API_UNIT:
            case CASE_TYPE.API_SCENE:
            case CASE_TYPE.API_PERFORM:
                return <span className={"link-text"} >{record.name}</span>
            case CASE_TYPE.WEB_SCENE:
            case CASE_TYPE.APP_SCENE:
                if(getVersionInfo().expired===false){
                    return <span className={"link-text"}  >{record.name}</span>
                }else {
                    return <ExtensionCommon name={record.name} />
                }
            default:
                return null
        }
    }



    return (
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                onClick={showModal}
                name={"关联用例"}
            />
            <Modal
                title="未关联用例"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                okText={"确定"}
                cancelText={"取消"}
            >
                <div style={{padding:"0 0 15px"}}>
                    <Row gutter={16} align={"middle"}>
                        <Col className="gutter-row"  span={10}>
                            <MenuSelect
                                menuItems={[
                                    {
                                        title: `所有`,
                                        key: `all`,
                                    },
                                    {
                                        title: `接口`,
                                        key: `api`,
                                    },
                                    {
                                        title: `UI`,
                                        key: `ui`,
                                    },
                                    {
                                        title: `性能`,
                                        key: `perform`,
                                    }
                                ]}
                                selectFn={selectKeyFun}
                                selected={selectItem}
                                style={{width: `320px`}}
                            />
                        </Col>
                        <Col className="gutter-row" span={6}  offset={8}>
                            <Input
                                placeholder={`搜索名称`}
                                onPressEnter={onSearch}
                                onChange={onSearch}
                                className='demand_project_search'
                                prefix={<SearchOutlined />}
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
                            rowSelection={{
                                selectedRowKeys,
                                onChange: (newSelectedRowKeys) => {
                                    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
                                    setSelectedRowKeys(newSelectedRowKeys);
                                }
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

export default inject("testcaseStore")(observer(TestPlanBindCaseModal));
