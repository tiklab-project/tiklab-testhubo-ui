import React, {useState} from "react";
import TestResultCommon from "../../../../common/testResultCommon";
import TestResponseBody from "./testResponseBody";
import {inject, observer} from "mobx-react";
import TestResponseHeader from "./testResponseHeader";
import TestRequestHeader from "./testRequestHeader";
import TestRequestBody from "./testRequestBody";
import TestResponseAssert from "./testResponseAssert";
import {Button, Drawer,message} from "antd";

const ApiUnitTestResult =(props)=>{
    const { apiUnitTestDispatchStore,apiEnvStore } = props;
    const { apiUnitExecute } = apiUnitTestDispatchStore;
    const { envUrl } = apiEnvStore;
    const [visible, setVisible] = useState(false);


    let apiUnitId = sessionStorage.getItem("apiUnitId");

    const [bodyResult, setBodyResult] = useState();
    const [headerResult, setHeaderResult] = useState();
    const [assertResult, setAssertResult] = useState();
    const [requestBody, setRequestBody] = useState();
    const [requestHeader, setRequestHeader] = useState();
    const [time, setTime] = useState();
    const [status, setStatus] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const showDrawer = () => {
        if(envUrl){
            apiUnitExecute(apiUnitId,envUrl).then(res=>{
                setErrorMessage(res.errMessage);

                setTime(res.elapsedTime);
                setStatus(res.statusCode);

                setRequestBody(res.requestInstance.requestParam);
                setRequestHeader(res.requestInstance.requestHeader);

                setBodyResult(JSON.parse(res.responseInstance.responseBody));
                setHeaderResult(res.responseInstance.responseHeader);

            })


            setVisible(true);
        }else {
            message.error('请选择环境地址');
        }

    };

    const onClose = () => {
        setVisible(false);
    };

    return(
        <>
            <Button className="important-btn"  onClick={showDrawer}>测试</Button>
            <Drawer
                title="测试结果"
                placement={"bottom"}
                onClose={onClose}
                visible={visible}
                height={400}
            >
                {
                    errorMessage!==null
                        ?<div>{errorMessage}</div>
                        :<TestResultCommon
                            responseBody={<TestResponseBody bodyResult={bodyResult}/>}
                            responseHeader={<TestResponseHeader headerResult={headerResult}/>}
                            requestHeader={<TestRequestHeader requestHeader={requestHeader}/>}
                            requestBody={<TestRequestBody requestBody={requestBody}/>}
                            assertResult={<TestResponseAssert />}
                            time={time}
                            status={status}
                        />
                }

            </Drawer>

        </>
    )
}
export default inject("apiUnitTestDispatchStore","apiEnvStore")(observer(ApiUnitTestResult));