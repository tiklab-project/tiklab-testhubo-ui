import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import ApiUnitEditPageCommon from "../../../test/api/http/unit/components/apiUnitEditPageCommon";


const PlanToApiUnitPage = (props) =>{
    const {apiUnitStore,testPlanStore} = props;
    const {findTestPlan} = testPlanStore;
    const {findApiUnit} = apiUnitStore;

    const [detailInfo,setDetailInfo]=useState();
    const [apiUnitName, setApiUnitName] = useState();
    const testPlanId = sessionStorage.getItem('testPlanId');
    const apiUnitId = sessionStorage.getItem('apiUnitId');
    useEffect(()=>{
        findTestPlan(testPlanId).then(res=>{
            setDetailInfo(res);
        })
    },[testPlanId])

    useEffect(async ()=>{
        let res = await findApiUnit(apiUnitId)
        setApiUnitName(res.testCase.name);


    },[apiUnitId])


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
                    <Breadcrumb.Item onClick={toTestPlanDetail} className={"first-item"}>{detailInfo?.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>{apiUnitName}</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <ApiUnitEditPageCommon {...props} />

        </div>
    )
}

export default inject("testPlanStore","apiUnitStore")(observer(PlanToApiUnitPage));