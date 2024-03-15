import React, {useEffect, useState} from "react";
import CaseBread from "../../../common/CaseBread";
import ApiSceneInstanceDetail from "../../../test/api/http/scene/components/apiSceneInstance";
import apiSceneInstanceStore from "../../../test/api/http/scene/store/apiSceneInstanceStore";

const PlanToApiSceneInstance = () =>{

    const { findApiSceneInstance } = apiSceneInstanceStore;
    const [allData, setAllData] = useState();
    const apiSceneInstanceId = sessionStorage.getItem("apiSceneInstanceId")

    useEffect(async ()=>{
        let res = await findApiSceneInstance(apiSceneInstanceId)
        setAllData(res)
    },[apiSceneInstanceId])

    return(
        <>
            <CaseBread
                breadItem={["历史详情","接口场景"]}
                router={"/repository/plan/instance"}
            />
            <ApiSceneInstanceDetail  allData={allData}/>
        </>
    )
}

export default PlanToApiSceneInstance