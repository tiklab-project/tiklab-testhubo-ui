import React, {useEffect, useState} from "react";
import CaseBread from "../../../common/CaseBread";
import apiPerfInstanceStore from "../../../test/api/http/perf/store/apiPerfInstanceStore";
import ApiPerfInstanceDetail from "../../../test/api/http/perf/components/ApiPerfInstanceDetail";

const PlanToApiPerfInstance = () =>{

    const { findApiPerfInstance } = apiPerfInstanceStore;
    const [allData, setAllData] = useState();
    const apiPerfInstanceId = sessionStorage.getItem("apiPerfInstanceId")
    const [loading, setLoading] = useState(true);

    useEffect(async ()=>{
        let res = await findApiPerfInstance(apiPerfInstanceId)
        setAllData(res)
        setLoading(false)
    },[apiPerfInstanceId])

    return(
        <>
            <CaseBread
                breadItem={["历史详情","接口性能"]}
                router={"/repository/plan/instance"}
            />
            <ApiPerfInstanceDetail
                result={allData}
                loading={loading}
            />
        </>
    )
}

export default PlanToApiPerfInstance