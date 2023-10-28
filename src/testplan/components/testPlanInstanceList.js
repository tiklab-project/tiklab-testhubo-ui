import React, {useEffect, useState} from "react";
import { Empty, Popconfirm, Table, Tag} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../common/IconCommon";
import emptyImg from "../../assets/img/empty.png";
import testPlanInstanceStore from "../store/testPlanInstanceStore";
import CaseBread from "../../common/CaseBread";
import PaginationCommon from "../../common/pagination/Page";

const TestPlanInstanceList = (props) =>{
    const {
        findTestPlanInstancePage,
        testPlanInstanceList,
        findTestPlanInstance,
        deleteTestPlanInstance
    } = testPlanInstanceStore;

    const column = [
        {
            title: '执行次数',
            dataIndex: 'executeNumber',
            key: "executeNumber",
            render:(text,record)=>(<a style={{fontWeight:"bold"}} onClick={()=>toCaseInstanceList(record.id)}>#{text}</a>)
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

    const testPlanId = sessionStorage.getItem("testPlanId")
    const [totalPage, setTotalPage] = useState();
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

    const findPage = async () => {
        let param = {
            testPlanId:testPlanId,
            ...pageParam
        }
        let res = await findTestPlanInstancePage(param)
        if(res.code===0){
            setTotalPage(res.data.totalPage)
        }

    }

    //跳往用例历史列表页
    const toCaseInstanceList = (testPlanInstanceId) =>{
        sessionStorage.setItem("testPlanInstanceId",testPlanInstanceId)
        props.history.push("/repository/plan-instance-case")

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

    return(
        <div className={"content-box-center"}>
            <CaseBread breadItem={["计划详情","历史详情"]}/>
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

export default observer(TestPlanInstanceList);