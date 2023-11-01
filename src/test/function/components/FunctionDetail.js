import React, {useEffect, useState} from "react";
import Demand from "../../../integrated/teamwire/workItem/components/Demand";
import WorkItemBindList from "../../../integrated/teamwire/defect/components/WorkItemBindList";
import {inject, observer} from "mobx-react";
import {Form} from "antd";
import DetailCommon from "../../../common/DetailCommon";
import CaseContentCommon from "../../common/CaseContentCommon";
import FunctionStepList from "./FunctionStepList";
import FuncUnitStepTable from "./FunctionStepTable";

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

            </>
        },{
            label: `用例步骤`,
            key: '2',
            children: <div style={{padding:"10px 0"}}><FuncUnitStepTable /></div>
        },{
            label: `关联缺陷`,
            key: '3',
            children: <WorkItemBindList caseId={functionId} />
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