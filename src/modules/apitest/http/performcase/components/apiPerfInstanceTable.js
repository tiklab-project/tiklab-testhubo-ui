import React, {useEffect, useState} from "react";
import {Empty, Popconfirm, Space, Table, Tag} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../common/iconCommon";
import emptyImg from "../../../../../assets/img/empty.png";
import ApiPerformInstanceDrawer from "./apiPerformInstanceDrawer";

const ApiPerfInstanceTable = (props) =>{
    const {apiPerfInstanceStore,apiPerfId} = props;
    const {
        findApiPerfInstancePage,
        apiPerfInstanceList,
        findApiPerfInstance,
        deleteApiPerfInstance
    } = apiPerfInstanceStore;

    const column = [
        {
            title: '执行次数',
            dataIndex: 'executeNumber',
            key: "executeNumber",
            render:(text,record)=>(
                <div style={{fontWeight:"bold"}}>#{text}</div>
                // <ApiPerformInstanceDrawer name={`#${text}`} apiPerfInstanceId={record.id}/>
            )
        },
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
                        onConfirm={() => deleteApiPerfInstance(record.id).then(()=>findPage())}
                        okText='确定'
                        cancelText='取消'
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>

                    {/*<ApiPerfInstanceDrawer icon={true}  apiPerfInstanceId={record.id}/>*/}
                </Space>
            )
        },
    ]
    
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
            apiPerfId:apiPerfId,
            ...pageParam
        }
        let res = await findApiPerfInstancePage(param)
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
        <div className={"table-list-box"}>
            <Table
                columns={column}
                dataSource={apiPerfInstanceList}
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

export default inject("apiPerfInstanceStore")(observer(ApiPerfInstanceTable));