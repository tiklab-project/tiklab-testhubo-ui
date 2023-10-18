import React, {useEffect, useState} from "react";
import {Popconfirm, Table} from "antd";
import { observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import apiPerfStepStore from "../store/apiPerfStepStore";
import {useHistory} from "react-router";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import apiSceneStore from "../../scene/store/apiSceneStore";
import ApiPerformBindScene from "./apiPerformBindScene";

const ApiPerfStepList = (props) =>{
    const {findApiPerfStepList,apiPerfStepList,deleteApiPerfStep} =apiPerfStepStore;
    const {findApiSceneList} =apiSceneStore;

    const column =[
        {
            title: '场景名称',
            dataIndex: ["apiScene",'testCase','name'],
            key: 'name',
            width: "30%",
            render: (text, record) => (
                props.type ? <a onClick={() => setSessionStorage(record.apiScene.id)}>{text}</a>:<span>{text}</span>
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
            )
        },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId");
    const apiPerfId = sessionStorage.getItem("apiPerfId")
    let history = useHistory()
    const [visible, setVisible] = useState(false);

    useEffect(async ()=>{
        await findApiPerfStepList(apiPerfId)
    },[apiPerfId])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiSceneId",id);
        history.push("/repository/api-perform-to-scene")
    }

    const showConnect =()=>{
        findApiSceneList({
            repositoryId:repositoryId,
            caseType:"api-scene",
            testType:"api",
        });
        setVisible(true);
    }


    return(
        <div style={{margin:"10px 0",height:"100%"}}>
            <div className={`${visible?"teston-hide":"teston-show"}`} >
                <IconBtn
                    className="pi-icon-btn-grey"
                    name={"关联用例"}
                    onClick={showConnect}
                />
                <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={apiPerfStepList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
                </div>
            </div>
            <div className={`case-bind_box ${visible?"teston-show":"teston-hide"}`}>
                <ApiPerformBindScene
                    visible={visible}
                    setVisible={setVisible}
                />
            </div>
        </div>
    )
}

export default observer(ApiPerfStepList);