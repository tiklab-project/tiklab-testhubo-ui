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
            title: '序号',
            dataIndex: 'executeNumber',
            key: "executeNumber",
            width: "5%",
            render:(text,record)=>(<ApiPerfInstanceSinglePage name={text} apiPerfInstanceId={record.id}/>)
        },
        {
            title: '详情',
            dataIndex: "detail",
            key: "detail",
            width: "60%",
            render:(text,record)=>(showDetail(record))
        },
        {
            title: `测试人`,
            dataIndex: ["createUser","nickname"],
            key: "name",
            width: "10%",
        },
        {
            title: `测试时间`,
            dataIndex: "createTime",
            key: "createTime",
            width: "20%",
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

    const showDetail = (record)=> {
        let content = JSON.parse(record.content);

        return <>
            <div className={"display-flex-gap"}>
                <div style={{fontSize: "12px", color: "#aaa"}}> 总数:</div>
                <div>{content.total}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过数:</div>
                <div>{content.passNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过率:</div>
                <div>{content.passRate}</div>
            </div>
            <div className={"display-flex-gap"}>
                <div style={{fontSize: "12px", color: "#aaa"}}> 错误数:</div>
                <div>{content.failNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 失败率:</div>
                <div>{content.errorRate}</div>
            </div>

        </>
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