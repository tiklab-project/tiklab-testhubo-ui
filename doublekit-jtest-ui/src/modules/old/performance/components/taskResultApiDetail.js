/**
 * @description：
 * @date: 2021-08-26 17:17
 */
import React from "react";
import {Tabs} from "antd";
import ReactJson from "react-json-view";
import {inject, observer} from "mobx-react";

const {TabPane} = Tabs;

const TaskResultApiDetail = (props) => {
    const {performanceStore} = props;
    const {testcaseResData,testcaseReqData} = performanceStore;

    return(
        <Tabs type={'card'} className={'task-result-tabs'} >
            <TabPane tab="请求" key="requestHeader">
                <ReactJson
                    src={testcaseReqData}
                    name={null}
                    // theme="monokai"
                    displayDataTypes={false}
                    enableClipboard={false}
                    collapseStringsAfterLength={'integer'}
                />
            </TabPane>
            <TabPane tab="响应" key="requestBody">
                <ReactJson
                    src={testcaseResData}
                    name={null}
                    // theme="monokai"
                    displayDataTypes={false}
                    enableClipboard={false}
                />
            </TabPane>

        </Tabs>
    )
}
export default inject('performanceStore')(observer(TaskResultApiDetail))
