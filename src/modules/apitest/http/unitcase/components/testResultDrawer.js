import React, {useState} from "react";
import TestResultCommon from "../../../../common/testResultCommon";
import TestResponseBody from "./testResponseBody";
import {inject, observer} from "mobx-react";
import TestResponseHeader from "./testResponseHeader";
import TestRequestHeader from "./testRequestHeader";
import TestRequestBody from "./testRequestBody";
import TestResponseAssert from "./testResponseAssert";
import {Button, Drawer} from "antd";

const TestResultDrawer =(props)=>{
    const { apiUnitTestDispatchStore } = props;
    const { apiUnitExecute,apiUnitTestResult } = apiUnitTestDispatchStore;
    const [visible, setVisible] = useState(false);

    let envUrl = JSON.parse(localStorage.getItem("API_ENV_SELECTED")).label
    let apiUnitId = sessionStorage.getItem("apiUnitId");

    const [bodyResult, setBodyResult] = useState({});
    const [headerResult, setHeaderResult] = useState({});
    const [assertResult, setAssertResult] = useState({});
    const [requestBody, setRequestBody] = useState({});
    const [responseHeader, setResponseHeader] = useState({});

    const showDrawer = () => {


        apiUnitExecute(apiUnitId,envUrl).then(res=>{
            setBodyResult(JSON.parse(res.responseInstance.responseBody));
            setHeaderResult(res.responseInstance.responseHeader);
        })


        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return(
        <>
            <Button type="primary" onClick={showDrawer}>测试</Button>
            <Drawer
                title="测试结果"
                placement={"bottom"}
                onClose={onClose}
                visible={visible}
                height={400}
            >
                <TestResultCommon
                    responseBody={<TestResponseBody bodyResult={bodyResult}/>}
                    responseHeader={<TestResponseHeader headerResult={headerResult}/>}
                    requestHeader={<TestRequestHeader requestHeader={apiUnitTestResult}/>}
                    requestBody={<TestRequestBody requestBody={apiUnitTestResult}/>}
                    assertResult={<TestResponseAssert />}
                />
            </Drawer>

        </>
    )
}
export default inject("apiUnitTestDispatchStore")(observer(TestResultDrawer));