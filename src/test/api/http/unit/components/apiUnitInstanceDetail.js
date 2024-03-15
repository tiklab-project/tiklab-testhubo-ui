import React from "react";
import {TextMethodType} from "../../common/methodType";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import ResponseCommon from "../../common/response/responseCommon/responseCommon";

const ApiUnitInstanceDetail = (props) =>{
    const {detail,allData} = props


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
                            ? <TextMethodType type={allData?.requestInstance?.requestType} />
                            :<span className={"history-detail-item-box-value"}>{item.value}</span>
                    }

                </div>
            )
        })
    }


    return(
        <>
            <ResponseCommon
                error={allData?.errMessage}
                detail={showDetail(detail)}
                reqHeader={processResHeader(allData?.requestInstance?.requestHeader)}
                resBody={allData?.responseInstance?.responseBody}
                resHeader={processResHeader(allData?.responseInstance?.responseHeader)}
                assertList={allData?.responseInstance?.assertInstanceList}
            />
        </>
    )

}

export default ApiUnitInstanceDetail;