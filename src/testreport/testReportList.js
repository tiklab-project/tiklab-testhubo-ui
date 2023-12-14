import React, {useEffect, useState} from "react";
import {Empty, Input, Popconfirm, Table, Tag} from "antd";
import IconCommon from "../common/IconCommon";
import emptyImg from "../assets/img/empty.png";
import {observer} from "mobx-react";
import testPlanInstanceStore from "../testplan/store/testPlanInstanceStore";
import PaginationCommon from "../common/pagination/Page";
import {SearchOutlined} from "@ant-design/icons";

const TestReportList = (props) =>{
    const {
        findTestPlanInstancePage,
        deleteTestPlanInstance,
        testPlanInstanceList
    } = testPlanInstanceStore;

    const column = [
        {
            title: '测试计划名',
            dataIndex: ["testPlan",'name'],
            key: "name",
            render:(text,record)=>(<span className={"link-text"}  onClick={()=>toCaseInstanceList(record.id)}>{text}</span>)
        },{
            title: `用例数`,
            dataIndex: "total",
            key: "total",

        },{
            title: `通过率`,
            dataIndex: "passRate",
            key: "passRate",
            render:(text)=>(<Tag color="success">{text}</Tag>)
        },{
            title: `成功数`,
            dataIndex: "passNum",
            key: "passNum",
        },{
            title: `失误率`,
            dataIndex: "errorRate",
            key: "errorRate",
            render:(text)=>(<Tag color="error">{text}</Tag>)
        },
        {
            title: `失败数`,
            dataIndex: "failNum",
            key: "failNum",
        },
        {
            title: `测试时间`,
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 120,
            render: (text, record) => (
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteTestPlanInstance(record.id).then(()=>findPage())}
                    okText='确定'
                    cancelText='取消'
                >
                    <IconCommon
                        className={"icon-s edit-icon"}
                        icon={"shanchu3"}
                    />
                </Popconfirm>
            )
        },
    ]

    const repositoryId = sessionStorage.getItem("repositoryId")
    const [totalPage, setTotalPage] = useState();
    const [totalRecord, setTotalRecord] = useState(0);
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParam, setPageParam] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })


    useEffect(async ()=>{
        await findPage()
    },[pageParam])

    const findPage = async (params) => {
        let param = {
            repositoryId:repositoryId,
            ...pageParam,
            ...params
        }
        let res = await findTestPlanInstancePage(param)
        if(res.code===0){
            setTotalPage(res.data.totalPage)
            setTotalRecord(res.data.totalRecord)
        }
    }


    //跳往用例历史列表页
    const toCaseInstanceList = (testPlanInstanceId) =>{
        sessionStorage.setItem("testPlanInstanceId",testPlanInstanceId)
        props.history.push(`/repository/report/${testPlanInstanceId}`)
    }

    // 分页
    const onTableChange = (current) => {
        setCurrentPage(current)
        const newParams = {
            ...pageParam,
            pageParam: {
                pageSize: pageSize,
                currentPage: current
            },
        }

        setPageParam(newParams)
    }

    //搜索
    const onSearch = async (e) =>{
        setCurrentPage(1)
        let param = {name: e.target.value}

        await findPage(param)
    }

    return(
        <div className={"content-box-center"}>
            <div className='header-box-space-between'>
                <div className={'header-box-title'}>测试报告</div>
            </div>
            <div className='header-box-space-between'>
                <Input
                    placeholder={`搜索用例`}
                    onPressEnter={onSearch}
                    className='search-input-common'
                    prefix={<SearchOutlined />}
                />
                <div style={{padding: "3px 8px", fontSize: "13px", borderRadius: "5px"}}>历史数：{totalRecord}</div>
            </div>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={testPlanInstanceList}
                    rowKey = {record => record.id}
                    pagination={false}
                    locale={{
                        emptyText: <Empty
                            imageStyle={{height: 120 }}
                            description={<span>暂无历史</span>}
                            image={emptyImg}
                        />,
                    }}
                />
                <PaginationCommon
                    currentPage={currentPage}
                    totalPage={totalPage}
                    changePage={onTableChange}
                />
            </div>
        </div>
    )
}

export default observer(TestReportList);