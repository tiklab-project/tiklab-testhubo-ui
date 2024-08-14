import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import apiUnitInstanceStore from "../../../test/api/http/unit/store/apiUnitInstanceStore";
import CaseBread from "../../../common/CaseBread";
import ApiUnitInstanceDetail from "../../../test/api/http/unit/components/apiUnitInstanceDetail";


const PlanToApiUnitInstance = (props) =>{

    const {findApiUnitInstance} = apiUnitInstanceStore;

    const [allData, setAllData] = useState();
    const apiUnitInstanceId= sessionStorage.getItem("apiUnitInstanceId")

    useEffect(()=>{
        findApiUnitInstance(apiUnitInstanceId).then(res=>{
            setAllData(res)
        })
    },[apiUnitInstanceId])


    //响应结果基础信息项
    const detail = [
        {
            title:"请求地址:",
            value:allData?.requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:allData?.requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:allData?.statusCode||"无",
            key:"statusCode"
        },{
            title:"测试结果:",
            value:allData?.result ? '成功' : '失败',
            key:"result"
        },{
            title:"测试时间:",
            value:allData?.createTime,
            key:"testTime"
        },
    ]


    return(
        <>
            <CaseBread
                breadItem={["历史详情","接口单元"]}
                router={"/project/plan/instance"}
            />

            <ApiUnitInstanceDetail
                detail={detail}
                allData={allData}
            />
        </>
    )

}

export default observer(PlanToApiUnitInstance);