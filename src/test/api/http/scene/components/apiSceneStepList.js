import React, {useEffect, useState} from "react";
import {Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import ApiSceneBindUnit from "./apiSceneBindUnit";
import IconCommon from "../../../../../common/IconCommon";
import apiSceneStepStore from "../store/apiSceneStepStore";
import {useHistory} from "react-router";
import IconBtn from "../../../../../common/iconBtn/IconBtn";

const ApiSceneStepList =(props) =>{
    const {apiUnitStore} = props
    const {
        findApiSceneStepList,
        apiSceneStepList,
        deleteApiSceneStep,
    } = apiSceneStepStore;
    const {findApiUnitList} = apiUnitStore;

    const column = [
        {
            title: '用例名称',
            dataIndex: ["apiUnit","testCase",'name'],
            key: 'name',
            width: "25%",
            render: (text, record) => (
                 <a onClick={() => setSessionStorage(record.apiUnit.id)}>{text}</a>
            )
        },{
            title: '请求类型',
            dataIndex: ["apiUnit","methodType"],
            key: 'requestType',
            width: "20%",
        },{
            title: '请求路径',
            dataIndex: ["apiUnit",'path'],
            key: 'path',
            width: "25%",
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: "20%",
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 80,
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteApiSceneStep(record.id).then(()=>findApiSceneStepList(apiSceneId))}
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

    const history = useHistory();
    let repositoryId = sessionStorage.getItem("repositoryId");
    const apiSceneId = sessionStorage.getItem("apiSceneId");
    const [visible, setVisible] = useState(false);

    useEffect(async ()=>{
        await findApiSceneStepList(apiSceneId)
    },[apiSceneId])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiUnitId",id)
        history.push("/repository/api-scene-to-unit")
    }

    const showConnect =()=>{
        findApiUnitList({repositoryId:repositoryId,caseType: "api-unit", testType: "api"});
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
                        dataSource={apiSceneStepList}
                        rowKey = {record => record.id}
                        pagination={false}
                    />
                </div>
            </div>
            <div className={`case-bind_box ${visible?"teston-show":"teston-hide"}`}>
                <ApiSceneBindUnit
                    visible={visible}
                    setVisible={setVisible}
                />
            </div>

        </div>
    )
}


export default inject("apiUnitStore")(observer(ApiSceneStepList));