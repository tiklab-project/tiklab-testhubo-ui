import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import WebSceneStepList from "./WebSceneStepList";
import "./webStyle.scss"
import {Form} from "antd";
import CaseContentCommon from "../../../common/CaseContentCommon";
import DetailCommon from "../../../../common/caseCommon/DetailCommon";
import VariableTable from "../../../common/Variable/components/VariableTable";
import "../../../common/styles/testcaseStyle.scss"
import "../../../common/styles/caseContantStyle.scss"
import "../../../common/styles/unitcase.scss"

const WebSceneDetail = (props) => {
    const {webSceneStore,webSceneId} = props;
    const {findWebScene,updateWebScene,webSceneInfo} = webSceneStore;

    const [form] = Form.useForm()
    useEffect(()=> {
        findWebScene(webSceneId).then(res=>{
            let testCase = res.testCase
            form.setFieldsValue({
                name: testCase.name,
                category:testCase.category?.id,
                updateTime:testCase.updateTime,
                createTime:testCase.createTime,
                status:testCase.status,
                priorityLevel:testCase.priorityLevel,
                director:testCase.director?.id,
                desc:testCase.desc
            })
        })
    },[webSceneId])

    const updateCase = async () =>{
        let newData = await form.getFieldsValue()
        const params = {
            id:webSceneInfo.id,
            testCase: {
                ...webSceneInfo.testCase,
                name:newData.name,
                category:{id:newData.category||"nullstring"},
                status:newData.status,
                priorityLevel:newData.priorityLevel,
                director: {id:newData.director},
                desc: newData.desc,
            }
        }
        updateWebScene(params).then(()=> findWebScene(webSceneId))
    }


    const tabItem=[
        {
            label: `详细信息`,
            key: '1',
            children:<DetailCommon
                type={true}
                detailInfo={webSceneInfo}
                updateCase={updateCase}
                form={form}
            />
        },{
            label: `测试步骤 (${webSceneInfo?.stepNum||0})`,
            key: '2',
            children:  <WebSceneStepList webSceneId={webSceneId}/>
        },{
            label: `环境变量`,
            key: '3',
            children: <VariableTable belongId={webSceneId}/>
        }
    ]

    return(
        <CaseContentCommon
            tabItem={tabItem}
        />
    )
}

export default inject('webSceneStore')(observer(WebSceneDetail));
