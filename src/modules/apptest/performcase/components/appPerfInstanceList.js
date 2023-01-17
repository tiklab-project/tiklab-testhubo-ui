import React, {useEffect, useState} from "react";
import {Empty, Popconfirm, Space, Table, Tag} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../common/iconCommon";
import emptyImg from "../../../../assets/img/empty.png";

const AppPerfInstanceList = (props) =>{
    const {appPerfInstanceStore} = props;
    const {
        findAppPerfInstancePage,
        appPerfInstanceList,
        findAppPerfInstance,
        deleteAppPerfInstance
    } = appPerfInstanceStore;

    const column = [
        {
            title: `总场景数`,
            dataIndex: "total",
            key: "total",

        },{
            title: `通过率`,
            dataIndex: "passRate",
            key: "passNumber",
            render:(text)=>(<Tag color="success">{text}</Tag>)
        },
        {
            title: `通过数`,
            dataIndex: "passNum",
            key: "passNum",

        },{
            title: `失败率`,
            dataIndex: "errorRate",
            key: "errorRate",
            render:(text)=>(<Tag color="error">{text}</Tag>)
        },{
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
                        onConfirm={() => deleteAppPerfInstance(record.id).then(()=>findPage())}
                        okText='确定'
                        cancelText='取消'
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const appPerfId = sessionStorage.getItem("appPerfId")
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
            appPerfId:appPerfId,
            ...pageParam
        }
        let res = await findAppPerfInstancePage(param)
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
        props.history.push("/repositorypage/testcase/app-perform-detail")
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

                    <div className={'header-box-title'}>APP性能历史</div>
                </div>

            </div>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={appPerfInstanceList}
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

export default inject("appPerfInstanceStore")(observer(AppPerfInstanceList));