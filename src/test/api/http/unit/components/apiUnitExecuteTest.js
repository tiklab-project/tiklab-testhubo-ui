import React from "react";
import ResponseCommon from "../../common/response/responseCommon";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import {TextMethodType} from "../../common/methodType";
import {observer} from "mobx-react";

import apiUnitTestDispatchStore from "../store/apiUnitTestDispatchStore";
import CaseBread from "../../../../../common/CaseBread";

const {apiUnitTestResult} = apiUnitTestDispatchStore;

const ApiUnitExecuteTest = () =>{


    //响应结果基础信息项
    const detail = [
        {
            title:"请求地址:",
            value:apiUnitTestResult?.requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:apiUnitTestResult?.requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:apiUnitTestResult?.statusCode,
            key:"statusCode"
        },{
            title:"测试结果:",
            value:apiUnitTestResult?.result ? '成功' : '失败',
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

                    {
                        item.key==="methodType"
                            ? <TextMethodType type={apiUnitTestResult?.requestInstance?.requestType} />
                            :<span className={"history-detail-item-box-value"}>{item.value}</span>
                    }

                </div>
            )
        })
    }


    return(
        <>
            <CaseBread title={"接口测试"}/>
            <ResponseCommon
                detail={showDetail(detail)}
                resBody={apiUnitTestResult?.responseInstance?.responseBody}
                resHeader={processResHeader(apiUnitTestResult?.responseInstance?.responseHeader)}
                reqHeader={processResHeader(apiUnitTestResult?.requestInstance?.requestHeader)}
            />
        </>

    )
}

export default observer(ApiUnitExecuteTest);