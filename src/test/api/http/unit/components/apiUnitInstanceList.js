import React, {useEffect, useState} from "react";
import {Empty, Popconfirm,Table} from "antd";
import {observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import emptyImg from "../../../../../assets/img/empty.png";
import apiUnitInstanceStore from "../store/apiUnitInstanceStore";
import {useHistory} from "react-router";
import CaseBread from "../../../../../common/CaseBread";

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
                <a onClick={()=>toSingleInstance(record)}>
                    {text}
                </a>
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
                <IconCommon
                    className={"icon-s edit-icon"}
                    icon={"shanchu3"}
                    onClick={() => deleteApiUnitInstance(record.id).then(()=>findPage())}
                />
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

    const toSingleInstance = (record) =>{
        sessionStorage.setItem("apiUnitInstanceId",record.id)
        history.push("/repository/testcase/api-unit-instance-single")
    }


    return(
        <div className={"content-box-center"}>
            <CaseBread title={"历史"}/>
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
        </div>


    )
}

export default observer(ApiUnitInstanceList);