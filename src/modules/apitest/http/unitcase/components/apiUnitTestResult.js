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

        // let requestHeaders= req.requestHeader.split(";")[0];
        // let mediaType = requestHeaders["Content-Type"]


        let processHeaders = (headerArr)=>{
            let obj={};
            headerArr.map(item=>{
                let itemArr = item.split(":")
                let index0=itemArr[0];
                let index1 = itemArr[1]

                if(index0){
                    obj=Object.assign({},obj,{[index0] : index1})
                }
            })

            return obj
        }


        let headers = processHeaders(res.responseHeader.split("\n"));

        let body = res.responseBody;



        //大小
        let size = body.length;

        const assertNeedData = {
            "status":status,
            "header":headers,
            "body":JSON.parse(body),
            "assertList":assertList
        }

        // 断言值的比较，结果返回 1，-1
        let allAssertResult=assertIsOrNotSuccess(assertNeedData)

        //assert
        // let assertList = processAssert(response.assertList);
        // const assertNeedData ={
        //     "status":status,
        //     "header":headers,
        //     "body":body,
        //     "assertList":assertList
        // }
        //断言list，添加result 字段。用于测试结果中的断言回显
        // assertCommonStore.assertCompare(assertNeedData);

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
                {/*<TabPane tab="请求头" key="3">*/}
                {/*    /!*<ResHeaderCommon headers={processResHeader(requestHeaders)}/>*!/*/}
                {/*</TabPane>*/}
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