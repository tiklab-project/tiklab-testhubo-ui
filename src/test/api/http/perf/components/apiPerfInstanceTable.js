import React, {useEffect, useState} from "react";
import {Empty,  Table, Tag} from "antd";
import { observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import emptyImg from "../../../../../assets/img/empty.png";
import apiPerfInstanceStore from "../store/apiPerfInstanceStore";
import {useHistory} from "react-router";
import ApiPerfInstanceSinglePage from "./ApiPerfInstanceSinglePage";

const ApiPerfInstanceTable = (props) =>{
    const {apiPerfId} = props;
    const {
        findApiPerfInstancePage,
        apiPerfInstanceList,
        findApiPerfInstance,
        deleteApiPerfInstance
    } = apiPerfInstanceStore;

    const history = useHistory();


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

    /**
     * 去往单个历史详情页
     */
    const toInstanceSinglePage = (id) => {
        sessionStorage.setItem("apiPerfInstanceId",id)
        history.push("/repository/api-perform-instance-single")
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

export default observer(ApiPerfInstanceTable);