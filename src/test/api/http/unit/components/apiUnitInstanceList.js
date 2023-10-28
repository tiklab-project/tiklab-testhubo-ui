import React, {useEffect, useState} from "react";
import {Empty,Table} from "antd";
import {observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import emptyImg from "../../../../../assets/img/empty.png";
import apiUnitInstanceStore from "../store/apiUnitInstanceStore";
import CaseBread from "../../../../../common/CaseBread";
import ApiUnitInstanceSinglePage from "./apiUnitInstanceSinglePage";
import PaginationCommon from "../../../../../common/pagination/Page";

const ApiUnitInstanceList = (props) =>{
    const {
        findApiUnitInstancePage,
        apiUnitInstanceList,
        findApiUnitInstance,
        deleteApiUnitInstance
    } = apiUnitInstanceStore;

    const column = [
        {
            title: '执行次数',
            dataIndex: ["apiUnitInstance",'executeNumber'],
            key: "executeNumber",
            render:(text,record)=>(
                <ApiUnitInstanceSinglePage
                    apiUnitInstanceId={record.id}
                    name={text}
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
                <IconCommon
                    className={"icon-s edit-icon"}
                    icon={"shanchu3"}
                    onClick={() => deleteApiUnitInstance(record.id).then(()=>findPage())}
                />
            )
        },
    ]

    const apiUnitId = sessionStorage.getItem("apiUnitId")
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
            apiUnitId:apiUnitId,
            ...pageParam
        }
        let res = await findApiUnitInstancePage(param)
        if(res.code===0){
            setTotalPage(res.data.totalPage)
        }
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
            <CaseBread breadItem={["用例详情","用例历史"]}/>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={apiUnitInstanceList}
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

export default observer(ApiUnitInstanceList);