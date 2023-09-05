import React, {useEffect, useState} from "react";
import {Breadcrumb, Empty, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import emptyImg from "../../../../../assets/img/empty.png";
import ApiUnitInstanceDrawer from "./apiUnitInstanceDrawer";
import apiUnitInstanceStore from "../store/apiUnitInstanceStore";
import {useHistory} from "react-router";
import BreadcrumbCommon, {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";

const ApiUnitInstanceList = (props) =>{
    const {
        findApiUnitInstancePage,
        apiUnitInstanceList,
        findApiUnitInstance,
        deleteApiUnitInstance
    } = apiUnitInstanceStore;

    const history = useHistory()

    const column = [
        {
            title: '执行次数',
            dataIndex: ["apiUnitInstance",'executeNumber'],
            key: "executeNumber",
            render:(text,record)=>(
                <ApiUnitInstanceDrawer
                    name={`#${text}`}
                    apiUnitInstanceId={record.id}
                />
            )
        },
        {
            title: '是否通过',
            dataIndex: ["apiUnitInstance",'result'],
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },{
            title: `测试地址`,
            dataIndex: ["requestInstance","requestUrl"],
            key: "requestUrl",

        },{
            title: `状态码`,
            dataIndex: ["apiUnitInstance","statusCode"],
            key: "statusCode",
        },
        {
            title: `耗时/ms`,
            dataIndex:["apiUnitInstance","elapsedTime"],
            key: "elapsedTime",

        },
        // {
        //     title: `测试成员`,
        //     dataIndex: "",
        //     key: "user",
        // },
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
                    onConfirm={() => deleteApiUnitInstance(record.id).then(()=>findPage())}
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

    const apiUnitId = sessionStorage.getItem("apiUnitId")
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
            apiUnitId:apiUnitId,
            ...pageParam
        }
        let res = await findApiUnitInstancePage(param)
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
        history.push(`/repository/testcase/api-unit/${apiUnitId}`)
    }

    return(

        <div className={"table-list-box"}>
            <Table
                columns={column}
                dataSource={apiUnitInstanceList}
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
    )
}

export default observer(ApiUnitInstanceList);