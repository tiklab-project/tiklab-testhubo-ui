import React, {useEffect, useState} from "react";
import {Drawer, Empty, Table, Tooltip} from "antd";
import IconCommon from "../../../../../common/IconCommon";
import apiPerfTestDataStore from "../store/apiPerfTestDataStore"
import ApiPerfTestDataDetail from "./ApiPerfTestDataDetail";
import {observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";

const ApiPerfTestDataDrawer = ({stepId}) =>{
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
                    stepId={stepId}
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
    const [open, setOpen] = useState(false);

    useEffect(async ()=>{
        if (open) {
            await findPage()
        }
    },[open, stepId])


    const findPage = async () =>{
        let list = await findApiPerfTestDataList({stepId:stepId})
        setTestDataList(list)
    }

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    return(
        <>
            <Tooltip title="测试数据">
                <span>
                    <IconCommon
                        className={"icon-s edit-icon"}
                        icon={"layers"}
                        onClick={showDrawer}
                    />
                </span>
            </Tooltip>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={600}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                //contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <div style={{borderBottom:"1px solid #e4e4e4"}}>
                    <CaseBread
                        breadItem={["测试数据"]}
                        icon={"layers"}
                    />
                </div>
                <div style={{margin:"20px"}}>
                    <ApiPerfTestDataDetail
                        stepId={stepId}
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
                                    imageStyle={{height: 100 }}
                                    description={<span>暂无测试数据</span>}
                                />,
                            }}
                        />
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default observer(ApiPerfTestDataDrawer);