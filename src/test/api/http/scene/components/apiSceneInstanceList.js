import React, {useEffect, useState} from "react";
import {Breadcrumb, Empty, Popconfirm, Space, Table, Tag} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import emptyImg from "../../../../../assets/img/empty.png";
import ApiSceneInstanceDrawer from "./apiSceneInstanceDrawer";
import apiSceneInstanceStore from "../store/apiSceneInstanceStore";
import {useHistory} from "react-router";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";

const ApiSceneInstanceList = (props) =>{
    const {
        findApiSceneInstancePage,
        apiSceneInstanceList,
        findApiSceneInstance,
        deleteApiSceneInstance
    } = apiSceneInstanceStore;

    const history = useHistory();

    const column = [
        {
            title: '执行次数',
            dataIndex: 'executeNumber',
            key: "executeNumber",
            render:(text,record)=>(<ApiSceneInstanceDrawer name={`#${text}`}  apiSceneInstanceId={record.id}/>)
        },{
            title: '总结果',
            dataIndex: 'result',
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },{
            title: `步骤数`,
            dataIndex: "testNumber",
            key: "testNumber",

        },{
            title: `通过率`,
            dataIndex: "passRate",
            key: "passNumber",
            render:(text)=>(<Tag color="success">{text}</Tag>)
        },
        {
            title: `耗时/ms`,
            dataIndex: "elapsedTime",
            key: "elapsedTime",

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
                    onConfirm={() => deleteApiSceneInstance(record.id).then(()=>findPage())}
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

    const apiSceneId = sessionStorage.getItem("apiSceneId")
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
            apiSceneId:apiSceneId,
            ...pageParam
        }
        let res = await findApiSceneInstancePage(param)
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
        history.push(`/repository/testcase/api-scene/${apiSceneId}`)
    }

    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item onClick={goBack}>用例详情</Breadcrumb.Item>
                    <Breadcrumb.Item >测试历史</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>

            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={apiSceneInstanceList}
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

export default observer(ApiSceneInstanceList);