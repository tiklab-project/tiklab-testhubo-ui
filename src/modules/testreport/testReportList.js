import React, {useEffect, useState} from "react";
import {Empty, Popconfirm, Space, Table, Tag} from "antd";
import IconCommon from "../common/iconCommon";
import emptyImg from "../../assets/img/empty.png";
import {inject, observer} from "mobx-react";

const TestReportList = (props) =>{
    const {testPlanInstanceStore} = props;
    const {
        findTestPlanInstancePage,
        deleteTestPlanInstance,
        testPlanInstanceList
    } = testPlanInstanceStore;

    const column = [
        {
            title: '总结果',
            dataIndex: 'result',
            render: (text) => (
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

                    <IconCommon
                        icon={"lishi"}
                        className={"icon-s "}
                        style={{margin:"5px 0 0 0",cursor:"pointer"}}
                        onClick={()=>toCaseInstanceList(record.id)}
                    />
                </Space>
            )
        },
    ]

    const repositoryId = sessionStorage.getItem("repositoryId")
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
            repositoryId:repositoryId,
            ...pageParam
        }
        let res = await findTestPlanInstancePage(param)
        if(res.code===0){
            setTotalRecord(res.data.totalRecord)
        }
    }


    //跳往用例历史列表页
    const toCaseInstanceList = (testPlanInstanceId) =>{
        sessionStorage.setItem("testPlanInstanceId",testPlanInstanceId)
        props.history.push("/repository/report-detail")
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


    return(
        <div className={"content-box-center"}>
            <div className='header-box-space-between'>
                <div className={'header-box-title'}>测试报告</div>
            </div>
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

export default  inject("testPlanInstanceStore")(observer(TestReportList));