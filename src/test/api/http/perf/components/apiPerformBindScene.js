import React from "react";
import {inject, observer} from "mobx-react";
import apiPerfStepStore from "../store/apiPerfStepStore";
import ConnectSelectCommon from "../../../../common/ConnectSelectCommon";
import apiSceneStore from "../../scene/store/apiSceneStore";

const ApiPerformBindScene = (props) =>{
    const {apiPerfId,setVisible} = props;
    const {findApiSceneList,apiSceneList} =apiSceneStore;

    const {bindApiScene,findApiPerfStepList} = apiPerfStepStore;


    const column =[
        {
            title: '场景名称',
            dataIndex: ['testCase','name'],
            key: 'name',
            // width: "30%",
        },{
            title: '类型',
            dataIndex:['testCase','testType'],
            key: 'testType',
            // width: "30%",
        },
        {
            title: `创建时间`,
            dataIndex: ['testCase', 'createTime'],
            key: "createTime",
        }
    ]


    let repositoryId = sessionStorage.getItem("repositoryId");

    // 弹框展示
    const onSearch = (e) => {
        findApiSceneList({
            repositoryId:repositoryId,
            caseType:"api-scene",
            testType:"api",
            name:e.target.value
        });
    };


    // 提交
    const onFinish = async (id) => {
        bindApiScene([id]).then(()=>findApiPerfStepList(apiPerfId));

        setVisible(false);
    };


    return(
        <>
            <ConnectSelectCommon
                setVisible={setVisible}
                dataList={apiSceneList}
                columns={column}
                onSearch={onSearch}
                onFinish={onFinish}
            />
        </>
    )
}

export default inject("apiSceneStore")(observer(ApiPerformBindScene));