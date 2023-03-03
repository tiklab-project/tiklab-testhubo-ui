import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import {Tabs} from "antd";
import errorImg from "../../../../../assets/img/error.png"
import sendImg from "../../../../../assets/img/send.png"
import ResponseInfo from "../../common/request/responseInfo";
import ResponseBodyCommon from "../../common/response/responseBodyCommon";
import ResHeaderCommon from "../../common/response/resHeaderCommon";
import AssertResponseCommon from "../../common/response/assertResponseCommon";
import { processResHeader} from "../../common/response/testResponseFnCommon";
import {assertIsOrNotSuccess} from "../../common/response/assertFn";

const {TabPane} = Tabs

const ApiUnitTestResult =(props)=>{
    const { showResponse,testResponse ,assertList} = props;



    const isErrorTest = (response)=>{

        if(response&&response.errMessage){
            return (
                <div className="test-response-error">
                    <div>
                        <div  className={"test-response-before-img-box"}>
                            <img  className={"test-response-before-img"} src={errorImg} alt={"errorImg"}/>
                        </div>
                        <span>Error : {response.errMessage}</span>
                    </div>
                </div>
            )
        }else {
            return (
                <>
                    {showResponseBox(response)}
                </>
            )
        }
    }

    const showResponseBox = (response)=>{
        if (!response) return;

        let req = response.requestInstance;
        let res = response.responseInstance;

        let time = response.elapsedTime;
        let status = response.statusCode;

        let reqHeaders = req.requestHeader;
        let headers = res.responseHeader;

        let body = res.responseBody;

        //大小
        let size = body.length;


        let allAssertResult;
        try {
            const assertNeedData = {
                "status":status,
                "header":headers,
                "body":JSON.parse(body),
                "assertList":assertList
            }

            // 断言值的比较，结果返回 1，-1
            allAssertResult=assertIsOrNotSuccess(assertNeedData)

        }catch {}


        return(
            <Tabs
                defaultActiveKey="1"
                tabBarExtraContent={
                    <ResponseInfo
                        status={status}
                        time={time}
                        size={size}
                        result={allAssertResult}
                    />
                }
            >
                <TabPane tab="响应体" key="1">
                    <ResponseBodyCommon responseBodyData={body} />
                </TabPane>
                <TabPane tab="响应头" key="2">
                    <ResHeaderCommon headers={processResHeader(headers)}/>
                </TabPane>
                <TabPane tab="请求头" key="3">
                    <ResHeaderCommon headers={processResHeader(reqHeaders)}/>
                </TabPane>
                <TabPane tab="断言" key="5">
                    <AssertResponseCommon assertList={assertList} />
                </TabPane>
            </Tabs>
        )
    }

    return(
        <>
            <div className={`test-response-before  ${showResponse === true? 'test-response-hide':'test-response-show'}`}>
                <div className="test-response-error">
                    <div>
                        <div  className={"test-response-before-img-box"}>
                            <img  className={"test-response-before-img"} src={sendImg} alt={"sendImg"}/>
                        </div>
                        <span>  点击 发送 按钮发送请求  </span>
                    </div>
                </div>
            </div>
            <div className={`test-response-after  ${showResponse === true? 'test-response-show':'test-response-hide'}`} >
                {isErrorTest(testResponse)}
            </div>
        </>
    )
}
export default ApiUnitTestResult;