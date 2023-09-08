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


    return(
        <div className={"content-box-center"}>

            <ApiUnitEditPageCommon {...props} />

        </div>
    )
}

export default inject("testPlanStore","apiUnitStore")(observer(PlanToApiUnitPage));