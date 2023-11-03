import React, {useEffect, useState} from "react";
import {Button, Space,Form} from "antd";
import ApiSceneStepList from "./ApiSceneStepList";
import CaseContentCommon from "../../../../common/CaseContentCommon";
import DetailCommon from "../../../../../common/DetailCommon";
import {inject, observer} from "mobx-react";
import VariableTable from "../../../../common/Variable/components/VariableTable";

const ApiSceneDetail = (props) =>{
    const {apiSceneStore,apiEnvStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;

    const [form] = Form.useForm()
    const [caseInfo,setCaseInfo]=useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    const repositoryId = sessionStorage.getItem('repositoryId');
    useEffect(()=> {
        findApiScene(apiSceneId).then(res=>{
            setCaseInfo(res);

            let testCase = res.testCase
            form.setFieldsValue({
                name: testCase.name,
                category:testCase.category?.id,
                updateTime:testCase.updateTime,
                createTime:testCase.createTime,
                status:testCase.status,
                priorityLevel:testCase.priorityLevel,
                director:testCase.director?.id,
            })

        })
    },[apiSceneId])


    const updateCase = async () =>{
        let newData = await form.getFieldsValue()
        const params = {
            id:caseInfo.id,
            testCase: {
                ...caseInfo.testCase,
                name:newData.name,
                category:{id:newData.category||"nullstring"},
                status:newData.status,
                priorityLevel:newData.priorityLevel,
                director: {id:newData.director},
            }
        }
        updateApiScene(params).then(()=>{
            findApiScene(apiSceneId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


    const tabItem=[
        {
            label: `详细信息`,
            key: '1',
            children:<DetailCommon
                type={true}
                detailInfo={caseInfo}
                updateCase={updateCase}
                form={form}
            />
        },{
            label: `测试步骤`,
            key: '2',
            children: <ApiSceneStepList />
        },{
            label: `环境变量`,
            key: '3',
            children: <VariableTable belongId={repositoryId}/>
        }
    ]

    return(
        <CaseContentCommon tabItem={tabItem}/>
    )
}

export default inject('apiSceneStore',"apiEnvStore")(observer(ApiSceneDetail))