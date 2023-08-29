import React, {useEffect, useState} from "react";
import {Breadcrumb, Empty, Popconfirm, Table, Tag} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import emptyImg from "../../../../assets/img/empty.png";
import AppSceneInstanceDrawer from "./appSceneInstanceDrawer";
import appSceneInstanceStore from "../store/appSceneInstanceStore";
import {useHistory} from "react-router";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";

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
            render:(text,record)=>(  <AppSceneInstanceDrawer name={`#${text}`} appSceneInstanceId={record.id}/>)
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
                    onConfirm={() => deleteAppSceneInstance(record.id).then(()=>findPage())}
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

    const history = useHistory();
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

    const goBack = () =>{
        history.push(`/repository/testcase/app-scene/${appSceneId}`)
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