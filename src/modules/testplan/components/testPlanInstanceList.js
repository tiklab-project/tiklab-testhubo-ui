import React, {useEffect, useState} from "react";
import {Breadcrumb, Empty, Popconfirm, Space, Table, Tag} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../common/iconCommon";
import emptyImg from "../../../assets/img/empty.png";

const TestPlanInstanceList = (props) =>{
    const {testPlanInstanceStore} = props;
    const {
        findTestPlanInstancePage,
        testPlanInstanceList,
        findTestPlanInstance,
        deleteTestPlanInstance
    } = testPlanInstanceStore;

    const column = [
        {
            title: '总结果',
            dataIndex: 'result',
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
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
                <Space size="middle">
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

                    {/*<TestPlanInstanceDrawer icon={true}  testPlanInstanceId={record.id}/>*/}
                </Space>
            )
        },
    ]

    const testPlanId = sessionStorage.getItem("testPlanId")
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParam, setPageParam] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })


    useEffect(()=>{
        findPage()
    },[pageParam])

    const findPage = async () => {
        let param = {
            testPlanId:testPlanId,
            ...pageParam
        }
        let res = await findTestPlanInstancePage(param)
        if(res.code===0){
            setTotalRecord(res.data.totalRecord)
        }

    }


    // 分页
    const onTableChange = (pagination) => {
        setCurrentPage(pagination.current)
        const newParams = {
            ...pageParam,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            },
        }

        setPageParam(newParams)
    }


    const goBack = () =>{
        props.history.push("/repository/plan-detail")
    }

    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>计划详情</Breadcrumb.Item>
                <Breadcrumb.Item>计划历史</Breadcrumb.Item>
            </Breadcrumb>

            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={testPlanInstanceList}
                    rowKey = {record => record.id}
                    pagination={{
                        current:currentPage,
                        pageSize:pageSize,
                        total:totalRecord,
                    }}
                    onChange = {(pagination) => onTableChange(pagination)}

                    locale={{
                        emptyText: <Empty
                            imageStyle={{height: 120 }}
                            description={<span>暂无历史</span>}
                            image={emptyImg}
                        />,
                    }}
                />
            </div>
        </div>
    )
}

export default inject("testPlanInstanceStore")(observer(TestPlanInstanceList));