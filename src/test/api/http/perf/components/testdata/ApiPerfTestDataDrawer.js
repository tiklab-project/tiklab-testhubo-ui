import React, {useEffect, useState} from "react";
import {Drawer, Empty, Row, Col, Tooltip, Space} from "antd";
import IconCommon from "../../../../../../common/IconCommon";
import apiPerfTestDataStore from "../../store/apiPerfTestDataStore"
import ApiPerfTestDataDetail from "./ApiPerfTestDataDetail";
import {observer} from "mobx-react";
import CaseBread from "../../../../../../common/CaseBread";
import IconBtn from "../../../../../../common/iconBtn/IconBtn";
import "./testDataStyle.scss"

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

    const showTestDataView = (testDataInfo) => {
        const {id, name, createTime, type, testData} = testDataInfo;

        // 计算文本大小
        const getSize = (str) => {
            const bytes = new Blob([str]).size;
            if (bytes < 1024) return `${bytes} B`;
            if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
            return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
        };

        const dataSize = getSize(testData);

        return (
            <Row gutter={[10, 10]} className={"test-data-box"}>
                <Col span={4} className={"test-data-item-title"}>名称 :</Col>
                <Col span={13} className={"text-ellipsis"}>{name}</Col>
                <Col span={6}>
                    <Space>
                        <ApiPerfTestDataDetail
                            type={"edit"}
                            testDataId={id}
                            stepId={stepId}
                            findPage={findPage}
                            name={"更新"}
                        />
                        <IconBtn
                            className="pi-icon-btn-grey"
                            name={"删除"}
                            onClick={() => deleteApiPerfTestData(id).then(()=>findPage())}
                        />
                    </Space>
                </Col>
                <Col span={4} className={"test-data-item-title"}>大小 :</Col>
                <Col span={20}>{dataSize}</Col>
                <Col span={4} className={"test-data-item-title"}>类型 :</Col>
                <Col span={20}>{type}</Col>
                <Col span={4} className={"test-data-item-title"}>创建时间 :</Col>
                <Col span={20}>{createTime}</Col>
            </Row>
        );
    };


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
                width={500}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                closable={false}
            >
                <div style={{borderBottom:"1px solid #e4e4e4"}}>
                    <CaseBread
                        breadItem={["测试数据"]}
                        icon={"x"}
                    />
                </div>
                <div style={{margin:"20px"}}>

                    {
                        testDataList&&testDataList.length>0
                            ? showTestDataView(testDataList[0])
                            :<Row>
                                <Col span={24}>
                                    <ApiPerfTestDataDetail
                                        stepId={stepId}
                                        findPage={findPage}
                                        name={"导入"}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Empty
                                        imageStyle={{height: 80 }}
                                        description={<span>暂无测试数据</span>}
                                    />
                                </Col>
                            </Row>
                    }
                </div>
            </Drawer>
        </>
    )
}

export default observer(ApiPerfTestDataDrawer);