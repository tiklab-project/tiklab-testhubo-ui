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
    const { apiUnitStore } = props;
    const { status, time } = apiUnitStore;
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
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
                    status={status}
                    time={time}
                    responseBody={<TestResponseBody />}
                    responseHeader={<TestResponseHeader />}
                    requestHeader={<TestRequestHeader />}
                    requestBody={<TestRequestBody />}
                    assertResult={<TestResponseAssert />}
                />
            </Drawer>

        </>
    )
}
export default inject("apiUnitStore")(observer(TestResultDrawer));