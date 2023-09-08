import React, {useEffect, useState} from "react";
import Demand from "../../../integrated/teamwire/workItem/components/Demand";
import WorkItemBindList from "../../../integrated/teamwire/defect/components/WorkItemBindList";
import {inject, observer} from "mobx-react";
import {Button, Form, Space, Tabs} from "antd";
import DetailCommon from "../../../common/DetailCommon";
import CaseContentCommon from "../../common/CaseContentCommon";
import FunctionStepList from "./FunctionStepList";

const FunctionDetail = (props) =>{
    const {funcUnitStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;

    const [form] = Form.useForm()
    const [caseInfo,setCaseInfo]=useState();
    const [workItemId, setWorkItemId] = useState();

    const functionId = sessionStorage.getItem('functionId')

    useEffect(()=> {
        findFuncUnit(functionId).then(res=>{
            setCaseInfo(res);
            setWorkItemId(res?.testCase?.workItemId)
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
    },[functionId])

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
        updateFuncUnit(params).then(()=>{
            findFuncUnit(functionId).then(res=>{
                setCaseInfo(res);
            })
        })
    }

    const tabItem = [
        {
            label: `详细信息`,
            key: '1',
            children: <>
                <div className={"case-title_weight"}>
                    <div>基本信息</div>
                </div>
                <DetailCommon
                    type={true}
                    detailInfo={caseInfo}
                    updateCase={updateCase}
                    form={form}
                />
                <Demand
                    workItemId={workItemId}
                    caseInfo={caseInfo}
                    updateFn={updateFuncUnit}
                />
                <div className={"case-title_weight"}>关联缺陷</div>
                <WorkItemBindList caseId={functionId} />
            </>
        },{
            label: `用例步骤`,
            key: '2',
            children:<FunctionStepList />
        }
    ]


    return(
        <>
            <CaseContentCommon
                tabItem={tabItem}
            />
        </>
    )
}

export default inject('funcUnitStore')(observer(FunctionDetail));