import React, {useEffect, useState} from "react";
import {Empty, Table} from "antd";
import emptyImg from "../../../../../assets/img/empty.png";
import IconCommon from "../../../../../common/IconCommon";
import apiPerfTestDataStore from "../store/apiPerfTestDataStore"
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiPerfTestDataDetail from "./ApiPerfTestDataDetail";
import {observer} from "mobx-react";

const ApiPerfTestDataPage = ({apiPerfId}) =>{
    const {
        findApiPerfTestDataList,
        findApiPerfTestData,
        createApiPerfTestData,
        updateApiPerfTestData,
        deleteApiPerfTestData
    } = apiPerfTestDataStore

    const column = [
        {
            title: '测试数据名称',
            dataIndex: 'name',
            key: "name",
            render:(text,record)=>(
                <ApiPerfTestDataDetail
                    type={"edit"}
                    testDataId={record.id}
                    apiPerfId={apiPerfId}
                    findPage={findPage}
                    name={text}
                />
            )
        },
        {
            title: `创建时间`,
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
                    onClick={() => deleteApiPerfTestData(record.id).then(()=>findPage())}
                />
            )
        },
    ]

    const [testDataList, setTestDataList] = useState([]);

    useEffect(async ()=>{
        await findPage()
    },[])


    const findPage = async () =>{
        let list = await findApiPerfTestDataList({caseId:apiPerfId})
        setTestDataList(list)
    }



    return(
        <div style={{margin:"10px 0 0 0",overflow: "auto"}}>

            <ApiPerfTestDataDetail
                apiPerfId={apiPerfId}
                findPage={findPage}
                name={"新增测试数据"}
            />
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={testDataList}
                    rowKey = {record => record.id}
                    pagination={false}
                    locale={{
                        emptyText: <Empty
                            imageStyle={{height: 120 }}
                            description={<span>暂无测试数据</span>}
                            image={emptyImg}
                        />,
                    }}
                />
            </div>


        </div>
    )
}

export default observer(ApiPerfTestDataPage);