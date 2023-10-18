import React, {useEffect, useState} from "react";
import { Empty, Table, Tag} from "antd";
import {observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import emptyImg from "../../../../assets/img/empty.png";
import appSceneInstanceStore from "../store/appSceneInstanceStore";
import {useHistory} from "react-router";
import CaseBread from "../../../../common/CaseBread";
import AppSceneInstanceSinglePage from "./AppSceneInstanceSinglePage";

const AppSceneInstanceList = (props) =>{
    const {
        findAppSceneInstancePage,
        appSceneInstanceList,
        findAppSceneInstance,
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
            appSceneId:appSceneId,
            ...pageParam
        }
        let res = await findAppSceneInstancePage(param)
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


    return(
        <div className={"content-box-center"}>
            <CaseBread breadItem={["用例列表","用例详情","用例历史"]}/>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={appSceneInstanceList}
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

export default observer(AppSceneInstanceList);