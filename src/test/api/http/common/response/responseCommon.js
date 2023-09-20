import React from "react";
import {Tabs} from "antd";
import ResponseBodyCommon from "./responseBodyCommon";
import ResHeaderCommon from "./resHeaderCommon";
const {TabPane} = Tabs;

//展示响应结果
const ResponseCommon = (props) =>{

    return(
        <div style={{margin:"0 10px",overflow: "hidden",height: "calc( 100% - 48px )"}}>
            <div >{props?.detail}</div>

            <Tabs defaultActiveKey="1"  >
                <TabPane tab="响应体" key="1">
                    <ResponseBodyCommon
                        responseBodyData={props?.resBody}
                    />
                </TabPane>
                <TabPane tab="响应头" key="2">
                    <ResHeaderCommon
                        headers={props?.resHeader}
                    />
                </TabPane>
                <TabPane tab="请求头" key="3">
                    <ResHeaderCommon
                        headers={props?.reqHeader}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default ResponseCommon