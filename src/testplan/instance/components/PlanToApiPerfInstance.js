import React, {useEffect, useState} from "react";
import CaseBread from "../../../common/CaseBread";
import apiPerfInstanceStore from "../../../test/api/http/perf/store/apiPerfInstanceStore";
import ApiPerfInstanceDetail from "../../../test/api/http/perf/components/ApiPerfInstanceDetail";

const PlanToApiPerfInstance = () =>{

    const { findApiPerfInstance } = apiPerfInstanceStore;
    const [allData, setAllData] = useState();
    const apiPerformInstanceId = sessionStorage.getItem("apiPerformInstanceId")

    useEffect(async ()=>{
        let res = await findApiPerfInstance(apiPerformInstanceId)
        setAllData(res)
    },[apiPerformInstanceId])

    return(
        <>
            <CaseBread
                breadItem={["历史详情","接口性能"]}
                router={"/repository/plan/instance"}
            />
            <ApiPerfInstanceDetail  allData={allData}/>
        </>
    )
}

export default PlanToApiPerfInstance