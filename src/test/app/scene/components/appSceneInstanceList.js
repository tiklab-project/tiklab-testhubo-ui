import React, {useEffect, useState} from "react";
import { Empty, Table, Tag} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import emptyImg from "../../../../assets/img/empty.png";
import appSceneInstanceStore from "../store/appSceneInstanceStore";

import CaseBread from "../../../../common/CaseBread";
import AppSceneInstanceSinglePage from "./AppSceneInstanceSinglePage";
import PaginationCommon from "../../../../common/pagination/Page";

const AppSceneInstanceList = (props) =>{
    const {appSceneStore} = props;
    const {testCaseInfo} = appSceneStore
    const {
        findAppSceneInstancePage,
        appSceneInstanceList,
        deleteAppSceneInstance
    } = appSceneInstanceStore;

    const column = [
        {
            title: '执行次数',
            dataIndex: 'executeNumber',
            key: "executeNumber",
            render:(text,record)=>(
                <AppSceneInstanceSinglePage appSceneInstanceId={record.id} name={text}/>
            )
        },
        {
            title: '总结果',
            dataIndex: 'result',
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },{
            title: `步骤数`,
            dataIndex: "stepNum",
            key: "stepNum",

        },{
            title: `通过率`,
            dataIndex: "passRate",
            key: "passNumber",
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
        // {
        //     title: `总耗时/ms`,
        //     dataIndex: "totalDuration",
        //     key: "totalDuration",
        //     // render:(text)=>(text/1000)
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
                    onClick={() => deleteAppSceneInstance(record.id).then(()=>findPage())}
                />
            )
        },
    ]

    const appSceneId = sessionStorage.getItem("appSceneId")
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
            appSceneId:appSceneId,
            ...pageParam
        }
        let res = await findAppSceneInstancePage(param)
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
            <CaseBread
                breadItem={[testCaseInfo?.name,"历史"]}
                router={`/repository/app-scene/${appSceneId}`}
            />
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={appSceneInstanceList}
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

export default inject('appSceneStore')(observer(AppSceneInstanceList));