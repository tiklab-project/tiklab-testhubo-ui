import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/DetailCommon";
import FunctionContent from "../../../test/function/components/FunctionContent";

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

            <DetailCommon
                detailInfo={funcUnit}
                updateTitle={updateTitle}
            />

            {/*<FunctionContent />*/}
        </div>
    )
}

export default inject("funcUnitStore","testPlanStore")(observer(PlanToFuncUnitPage));