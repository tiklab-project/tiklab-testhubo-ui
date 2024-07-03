import React, {useEffect} from "react";
import {Popconfirm, Space, Table} from "antd";
import { observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import apiPerfStepStore from "../store/apiPerfStepStore";
import {useHistory} from "react-router";
import ApiPerformBindScene from "./apiPerformBindScene";
import {showCaseTypeTable} from "../../../../../common/caseCommon/CaseCommonFn";
import ApiPerfConfigDrawer from "./ApiPerfConfigDrawer";
import ApiPerfTestDataDrawer from "./ApiPerfTestDataDrawer";

const ApiPerfStepList = (props) =>{
    const {apiPerfId} = props
    const {findApiPerfStepList,apiPerfStepList,deleteApiPerfStep} =apiPerfStepStore;


    const column =[
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: "30%",
            render: (text, record) => (
                props.type
                    ? <span>{record.caseType==="api-unit"? record.apiUnitCase.testCase.name:record.apiScene.testCase.name}</span>
                    :<a onClick={() => setSessionStorage(record)}>
                        {record.caseType==="api-unit"? record.apiUnitCase.testCase.name:record.apiScene.testCase.name}
                    </a>
            )
        },
        {
            title: `用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            width:"10%",
            render: (text) =>(<div className={"case-table-case-type"}>{showCaseTypeTable(text)}</div>)
        },
        {
            title: `信息`,
            dataIndex:'info',
            key: "info",
            render:(text,record)=>(
                <div
                    className={"display-flex-gap"}
                    style={{
                        fontSize:"12px",
                        padding: "2px 5px",
                    }}
                >
                    <div>并行用户数: {record.threadCount}</div>
                    <div> / </div>
                    <div>执行次数: {record.executeCount}</div>
                </div>
            )
        },
        {
            title: `创建时间`,
            dataIndex:'createTime',
            key: "createTime",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: "15%",
            render: (text, record) => (
                <Space>
                    <ApiPerfConfigDrawer apiPerfStepId={record.id} apiPerfId={apiPerfId}/>
                    <ApiPerfTestDataDrawer  stepId={record.id}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteApiPerfStep(record.id).then(()=>findApiPerfStepList(apiPerfId))}
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

    let history = useHistory()
    useEffect(async ()=>{
        await findApiPerfStepList(apiPerfId)
    },[apiPerfId])

    const setSessionStorage = (record) =>{
        if(record.caseType==="api-unit"){
            sessionStorage.setItem("apiUnitId",record.apiUnitCase.id);
            history.push("/repository/api-perform-to-unit")
        }else {
            sessionStorage.setItem("apiSceneId",record.apiScene.id);
            history.push("/repository/api-perform-to-scene")
        }

    }

    return(
        <div style={{margin:"10px 0",height:"100%"}}>
            <ApiPerformBindScene />
            <div className={"table-list-box"}>
            <Table
                columns={column}
                dataSource={apiPerfStepList}
                rowKey = {record => record.id}
                pagination={false}
            />
            </div>
        </div>
    )
}

export default observer(ApiPerfStepList);