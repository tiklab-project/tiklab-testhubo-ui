import React, {useEffect, useState} from "react";
import {Empty, Table} from "antd";
import emptyImg from "../../../../../assets/img/empty.png";
import IconCommon from "../../../../../common/IconCommon";
import apiPerfTestDataStore from "../store/apiPerfTestDataStore"
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiPerfTestDataDetail from "./ApiPerfTestDataDetail";
import {observer} from "mobx-react";

const ApiPerfTestDataPage = (props) =>{
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
            render:(text,record)=>(<a onClick={()=>toDetail(record)}>{text}</a>)
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

    const [testDataInfo, setTestDataInfo] = useState();
    const [visible, setVisible] = useState(false);
    const [testDataList, setTestDataList] = useState([]);
    const apiPerfId = sessionStorage.getItem("apiPerfId")

    useEffect(async ()=>{
        await findPage()
    },[])


    const findPage = async () =>{
        let list = await findApiPerfTestDataList({caseId:apiPerfId})
        setTestDataList(list)
    }

    const toDetail = async (record) =>{
        let info =  await findApiPerfTestData(record.id)
        setTestDataInfo(info)
        setVisible(!visible)
    }


    const addTestData = () =>{
        setTestDataInfo(null)
        setVisible(!visible)
    }

    const cancel = () =>{
        setTestDataInfo(null)
        setVisible(!visible)
    }

    return(
        <div style={{margin:"10px 0 0 0",overflow: "auto",height: "calc(100% - 280px)"}}>
            <div className={`${visible?"teston-hide":"teston-show"}`}>
                <IconBtn
                    className="pi-icon-btn-grey"
                    onClick={addTestData}
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
            <div className={`${visible?"teston-show":"teston-hide"}`}>
                <ApiPerfTestDataDetail
                    cancel={cancel}
                    testDataInfo={testDataInfo}
                    apiPerfId={apiPerfId}
                    findPage={findPage}
                    setTestDataInfo={setTestDataInfo}
                />
            </div>

        </div>
    )
}

export default observer(ApiPerfTestDataPage);