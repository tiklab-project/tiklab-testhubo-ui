import React, {useEffect} from "react";
import {Form} from "antd";
import ApiSceneStepList from "./ApiSceneStepList";
import CaseContentCommon from "../../../../common/CaseContentCommon";
import DetailCommon from "../../../../../common/caseCommon/DetailCommon";
import {inject, observer} from "mobx-react";
import VariableTable from "../../../../common/Variable/components/VariableTable";
import "../../../../common/styles/caseContantStyle.scss"
import "../../../../common/styles/unitcase.scss"
import ApiSceneInstanceList from "./apiSceneInstanceList";

const ApiSceneDetail = (props) =>{
    const {apiSceneStore,apiSceneId} = props;
    const {findApiScene,updateApiScene,apiSceneInfo} = apiSceneStore;

    const [form] = Form.useForm()

    const repositoryId = sessionStorage.getItem('repositoryId');
    useEffect(()=> {
        findApiScene(apiSceneId).then(res=>{
            let testCase = res.testCase
            form.setFieldsValue({
                name: testCase.name,
                category:testCase.category?.id,
                updateTime:testCase.updateTime,
                createTime:testCase.createTime,
                status:testCase.status,
                priorityLevel:testCase.priorityLevel,
                director:testCase.director?.id,
                desc: testCase.desc,
            })
        })
    },[apiSceneId])


    const updateCase = async () =>{
        let newData = await form.getFieldsValue()
        const params = {
            id:apiSceneInfo.id,
            testCase: {
                ...apiSceneInfo.testCase,
                name:newData.name,
                category:{id:newData.category||"nullstring"},
                status:newData.status,
                priorityLevel:newData.priorityLevel,
                director: {id:newData.director},
                desc:newData.desc
            }
        }
        updateApiScene(params).then(()=>{
            findApiScene(apiSceneId)
        })
    }


    const tabItem=[
        {
            label: `详细信息`,
            key: '1',
            children:<DetailCommon
                type={true}
                detailInfo={apiSceneInfo}
                updateCase={updateCase}
                form={form}
            />
        },
        {
            label: <span>测试步骤 <span className={"font-12"}>{apiSceneInfo?.stepNum||0}</span></span>,
            key: '2',
            children: <ApiSceneStepList apiSceneId={apiSceneId}/>
        },
        {
            label: <span>历史 <span className={"font-12"}>{apiSceneInfo?.instanceNum||0}</span></span>,
            key: '3',
            children: <ApiSceneInstanceList/>
        },
        {
            label: <span>环境变量 <span className={"font-12"}>{apiSceneInfo?.variableNum||0}</span></span>,
            key: '4',
            children: <VariableTable belongId={repositoryId}/>
        }
    ]

    return(
        <CaseContentCommon tabItem={tabItem} apiSceneId={apiSceneId}/>
    )
}

export default inject('apiSceneStore',"apiEnvStore")(observer(ApiSceneDetail))