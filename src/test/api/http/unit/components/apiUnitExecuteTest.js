import React, {useEffect, useState} from "react";
import ResponseCommon from "../../common/response/responseCommon";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import {TextMethodType} from "../../common/methodType";
import {observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import apiUnitTestDispatchStore from "../store/apiUnitTestDispatchStore";




const ApiUnitExecuteTest = () =>{
    const {apiUnitTestResult} = apiUnitTestDispatchStore;
    const [data, setData] = useState();
    useEffect(()=>{
        setData(apiUnitTestResult)

        return () => {
            // 组件unmount时清空
            setData(null);
        }

    },[apiUnitTestResult])

    //响应结果基础信息项
    const detail = [
        {
            title:"请求地址:",
            value:data?.requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:data?.requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:data?.statusCode,
            key:"statusCode"
        },{
            title:"测试结果:",
            value:data?.result ? '成功' : '失败',
            key:"result"
        },
    ]

    //响应结果基础信息展示
    const showDetail = (data) =>{
        return data.map(item=>{
            return(
                <div key={item.key} className={"history-detail-item-box"}>
                    <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                        <span className={"history-detail-item-box-title"}>{item.title}</span>
                    </div>

                    <span className={"history-detail-item-box-value"}>{item.value}</span>

                </div>
            )
        })
    }


    return(
        <>
            <CaseBread title={"接口测试"}/>
            <ResponseCommon
                detail={showDetail(detail)}
                resBody={data?.responseInstance?.responseBody}
                resHeader={processResHeader(data?.responseInstance?.responseHeader)}
                reqHeader={processResHeader(data?.requestInstance?.requestHeader)}
            />
        </>

    )
}

export default observer(ApiUnitExecuteTest);