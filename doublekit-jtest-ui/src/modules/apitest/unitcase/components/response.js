import React from "react";
import TestResultCommon from "../../../common/testResultCommon";
import TestResponseBody from "./testResponseBody";
import {inject, observer} from "mobx-react";
import TestResponseHeader from "./testResponseHeader";
import TestRequestHeader from "./testRequestHeader";
import TestRequestBody from "./testRequestBody";
import TestResponseAssert from "./testResponseAssert";

const Response =(props)=>{
    const { stepStore, showResponse } = props;
    const { status, time } = stepStore;

    return(
        <TestResultCommon
            status={status}
            time={time}
            showResponse={showResponse}
            responseBody={<TestResponseBody />}
            responseHeader={<TestResponseHeader />}
            requestHeader={<TestRequestHeader />}
            requestBody={<TestRequestBody />}
            assertResult={<TestResponseAssert />}
        />
    )
}
export default inject("stepStore")(observer(Response));