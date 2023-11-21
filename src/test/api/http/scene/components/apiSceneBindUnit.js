import React from "react";
import {inject, observer} from "mobx-react";
import apiSceneStepStore from "../store/apiSceneStepStore";
import ConnectSelectCommon from "../../../../common/ConnectSelectCommon";

const ApiSceneBindUnit =(props) =>{
    const {apiUnitStore,setVisible,findList,apiSceneId} = props;
    const {findApiUnitList,apiUnitList} = apiUnitStore;
    const {bindApiUnit} = apiSceneStepStore

    const column =[
        {
            title: 'UnitCase名',
            dataIndex: ['testCase','name'],
            key: 'name',
            width: "30%",
        },{
            title: '请求类型',
            dataIndex: 'methodType',
            key: 'methodType',
            width: "20%",
        },{
            title: '路径',
            dataIndex:  'path',
            key: 'path',
            width: "20%",
        },{
            title: `创建人`,
            dataIndex: ['testCase','user', 'name'],
            key: "user",
            width: "20%",
        }
    ]

    let repositoryId = sessionStorage.getItem("repositoryId");

    // 提交
    const onFinish = async (id) => {
        await bindApiUnit([id],apiSceneId)
        await findList()
        setVisible(false);
    };

    const onSearch = (e) =>{
        findApiUnitList({
            repositoryId:repositoryId,
            caseType: "api-unit",
            testType: "api",
            name:e.target.value
        })
    }


    return(
        <>
            <ConnectSelectCommon
                setVisible={setVisible}
                dataList={apiUnitList}
                columns={column}
                onSearch={onSearch}
                onFinish={onFinish}
            />
        </>
    )
}

export default inject("apiUnitStore")(observer(ApiSceneBindUnit));