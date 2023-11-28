
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppSceneStepList from "./AppSceneStepList";
import "./appStyle.scss"
import { Form} from "antd";
import CaseContentCommon from "../../../common/CaseContentCommon";
import DetailCommon from "../../../../common/caseCommon/DetailCommon";
import VariableTable from "../../../common/Variable/components/VariableTable";
import "../../../common/styles/testcaseStyle.scss"
import "../../../common/styles/caseContantStyle.scss"
import "../../../common/styles/unitcase.scss"

const AppSceneDetail = (props) => {
    const {appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;
    const [caseInfo,setCaseInfo]=useState();

    const [form] = Form.useForm()
    const appSceneId = sessionStorage.getItem('appSceneId');
    useEffect(()=> {
        findAppScene(appSceneId).then(res=>{
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
                desc: testCase.desc,
            })
        })
    },[appSceneId])

    //更新名称
    const updateCase = async (e) =>{
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
                desc:newData.desc
            }
        }
        updateAppScene(params).then(()=>{
            findAppScene(appSceneId).then(res=>{
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
        },
        {
            label: `测试步骤`,
            key: '2',
            children:<AppSceneStepList />
        },{
            label: `环境变量`,
            key: '3',
            children: <VariableTable belongId={appSceneId}/>
        }
    ]
    return(
        <CaseContentCommon
            tabItem={tabItem}
        />
    )
}

export default inject('appSceneStore')(observer(AppSceneDetail));
