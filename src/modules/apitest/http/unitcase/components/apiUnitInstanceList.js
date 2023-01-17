import React, {useEffect, useState} from "react";
import {Empty, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../common/iconCommon";
import emptyImg from "../../../../../assets/img/empty.png";
import ApiUnitInstanceDrawer from "./apiUnitInstanceDrawer";

const ApiUnitInstanceList = (props) =>{
    const {apiUnitInstanceStore} = props;
    const {
        findApiUnitInstancePage,
        apiUnitInstanceList,
        findApiUnitInstance,
        deleteApiUnitInstance
    } = apiUnitInstanceStore;

    const column = [
        {
            title: '是否通过',
            dataIndex: 'result',
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
            dataIndex: "statusCode",
            key: "statusCode",
        },
        {
            title: `耗时/ms`,
            dataIndex: "elapsedTime",
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
                <Space size="middle">
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

                    <ApiUnitInstanceDrawer icon={true}  apiUnitInstanceId={record.id}/>
                </Space>
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
        props.history.push("/repositorypage/testcase/api-unit-detail")
    }

    return(
        <div className={"content-box-center"}>
            <div  className={"header-box-space-between"} >
                <div style={{"display":"flex","gap":"10px","alignItems":"center"}}>
                    <IconCommon
                        icon={"31fanhui1"}
                        className={"icon-s edit-icon"}
                        onClick={goBack}
                    />

                    <div className={'header-box-title'}>接口单元历史</div>
                </div>

            </div>
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

export default inject("apiUnitInstanceStore")(observer(ApiUnitInstanceList));