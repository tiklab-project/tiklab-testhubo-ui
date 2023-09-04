import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/DetailCommon";
import FuncUnitStepTable from "../../../test/function/components/FuncUnitStepTable";

const PlanToFuncUnitPage = (props) =>{
    const {testPlanStore,funcUnitStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;
    const {findTestPlan} = testPlanStore;

    const [funcUnit, setFuncUnit] = useState();
    const [testPlanName, setTestPlanName] = useState();
    const funcUnitId = sessionStorage.getItem('functionId');
    const testPlanId = sessionStorage.getItem('testPlanId');


    useEffect(()=>{
        findFuncUnit(funcUnitId).then(res=>{
            setFuncUnit(res);
        })
    },[funcUnitId])

    useEffect(async ()=>{
        let res = await findTestPlan(testPlanId)
        setTestPlanName(res.name);

    },[testPlanId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:setFuncUnit.id,
            testCase: {
                ...setFuncUnit.testCase,
                name:value,
            }
        }
        updateFuncUnit(param).then(()=>{
            findFuncUnit(funcUnitId).then(res=>{
                setFuncUnit(res);
            })
        })
    }

    const toTestPlan = () =>{
        props.history.push("/repository/plan")
    }


    const toTestPlanDetail = () =>{
          props.history.push(`/repository/plan/${testPlanId}`)
    }


    return(
        <div className={"content-box-center"}>
            <div style={{"display":"flex","justifyContent":"space-between","margin":"5px  0 0 0"}}>
                <Breadcrumb className={"breadcrumb-box"} style={{padding: "10px 0"}}>
                    <Breadcrumb.Item onClick={toTestPlan} className={"first-item"}>测试计划</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={toTestPlanDetail} className={"first-item"}>{testPlanName}</Breadcrumb.Item>
                    <Breadcrumb.Item>{funcUnit?.testCase.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <DetailCommon
                detailInfo={funcUnit}
                updateTitle={updateTitle}
            />

            <FuncUnitStepTable />
        </div>
    )
}

export default inject("funcUnitStore","testPlanStore")(observer(PlanToFuncUnitPage));