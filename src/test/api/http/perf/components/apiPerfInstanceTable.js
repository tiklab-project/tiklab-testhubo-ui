import React, {useEffect, useState} from "react";
import {Empty,  Table, Tag} from "antd";
import { observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import emptyImg from "../../../../../assets/img/empty.png";
import apiPerfInstanceStore from "../store/apiPerfInstanceStore";
import ApiPerfInstanceSinglePage from "./ApiPerfInstanceSinglePage";
import PaginationCommon from "../../../../../common/pagination/Page";

const ApiPerfInstanceTable = (props) =>{
    const {apiPerfId} = props;
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
            render:(text,record)=>(<ApiPerfInstanceSinglePage name={text} apiPerfInstanceId={record.id}/>)
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
                <IconCommon
                    className={"icon-s edit-icon"}
                    icon={"shanchu3"}
                    onClick={() => deleteApiPerfInstance(record.id).then(()=>findPage())}
                />
            )
        },
    ]

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
            apiPerfId:apiPerfId,
            ...pageParam
        }
        let res = await findApiPerfInstancePage(param)
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
        <div className={"table-list-box"}>
            <Table
                columns={column}
                dataSource={apiPerfInstanceList}
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
    )
}

export default observer(ApiPerfInstanceTable);