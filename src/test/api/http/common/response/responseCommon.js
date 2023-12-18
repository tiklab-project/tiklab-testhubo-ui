import React from "react";
import {Tabs} from "antd";
import ResponseBodyCommon from "./responseBodyCommon";
import ResHeaderCommon from "./resHeaderCommon";
const {TabPane} = Tabs;

//展示响应结果
const ResponseCommon = (props) =>{
    const {error}  = props

    return(
        <div style={{margin:"0 10px",overflow: "auto",height: "calc( 100% - 42px )"}}>
            <div >{props?.detail}</div>

            <Tabs defaultActiveKey="1"  >
                {
                    error
                        ? <TabPane tab="异常信息" key="error">
                            <div style={{display:"flex","justifyContent":"center"}}>
                                <div
                                    style={{
                                        background: "#ffefca",
                                        padding: "5px",
                                        borderRadius: "5px",
                                        fontSize: "12px",
                                        margin:"50px 0 "
                                    }}
                                >异常消息：{error}</div>

                            </div>
                        </TabPane>

                        :<>
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
                        </>
                }



            </Tabs>
        </div>
    )
}

export default ResponseCommon