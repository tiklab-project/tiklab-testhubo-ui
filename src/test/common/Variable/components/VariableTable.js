import React, {useEffect, useState} from "react";
import {Empty, Popconfirm, Space, Table} from "antd";
import emptyImg from "../../../../assets/img/empty.png";

import variableStore from "../store/VariableStore";
import IconCommon from "../../../../common/IconCommon";
import VariableEdit from "./AgentConfigEdit";

const {findVariablePage,deleteVariable} = variableStore

const VariableTable = (props) =>{
    const {belongId} = props;

    const [dataList, setDataList] = useState([]);
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    const column = [
        {
            title:`名称`,
            dataIndex: 'name',
            key: "name",
            width:"25%",
        },
        {
            title: `类型`,
            dataIndex: "type",
            key: "type",
            width:"10%",
            render:(text,record)=>(
                text==="string"?"字符串":"--"
            )
        },
        {
            title: `值`,
            dataIndex: "value",
            key: "value",
            width:"30%",
        },
        {
            title: `描述`,
            dataIndex: "desc",
            key: "desc",
            width:"30%",
        },
        {
            title: `操作`,
            dataIndex: 'operation',
            key: 'operation',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    <VariableEdit
                        belongId={belongId}
                        findPage={findPage}
                        type={"edit"}
                        variableId={record.id}
                    />


                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteVariable(record.id).then(() => findPage())}
                        okText='确定'
                        cancelText='取消'
                        placement="left"
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            )
        }
    ]

    useEffect(async ()=>{
        await findPage()
    },[belongId])

    const findPage =async (param) =>{
        let params = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            belongId:belongId,
            ...param
        }
        let data = await findVariablePage(params)
        setTotalRecord(data.totalRecord);
        setDataList(data.dataList)
    }


    const onTableChange = async (pagination) => {
        setCurrentPage(pagination.current)

        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:pagination.current
            },
        }

        await findPage(param)
    }


    return(
        <div className={"table-list-box"} style={{margin:"10px 0 "}}>
            <VariableEdit
                belongId={belongId}
                findPage={findPage}
            />
            <Table
                columns={column}
                dataSource={dataList}
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

export default VariableTable;