import React from "react";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const UIResultCommon = (props) =>{
    const {spinning,instanceInfo,showList} = props

    return(
        <div style={{height:"calc(100% - 50px)"}}>
            <Spin spinning={spinning}>
                <div className={"unit-instance-detail"}>
                    <div className={"header-item"}>步骤总详情</div>
                    <div style={{padding:"10px 0 "}}>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                {
                                    instanceInfo?.instance?.status==="start"
                                        ? <>
                                            <div>状态</div>
                                            <Spin indicator={<LoadingOutlined style={{fontSize: 24,margin:"15px 40px"}} spin/>} />
                                        </>

                                        : <>
                                            <div>测试结果</div>
                                            <div className={"history-detail-all-item-value"}>
                                                {
                                                    instanceInfo?.instance?.status==="success"&&"成功"
                                                }
                                                {
                                                    instanceInfo?.instance?.status==="fail"&&"失败"
                                                }
                                            </div>
                                        </>
                                }

                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>步骤数</div>
                                <div className={"history-detail-all-item-value"}>{instanceInfo?.stepNum}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>通过率</div>
                                <div className={"history-detail-all-item-value"}>{instanceInfo?.passRate}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>通过数</div>
                                <div className={"history-detail-all-item-value"}>{instanceInfo?.passNum}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>未通过</div>
                                <div className={"history-detail-all-item-value"}>{instanceInfo?.failNum}</div>
                            </div>
                        </div>

                    </div>
                    <div className={"header-item"}>步骤列表</div>
                    <div className='table-list-box' style={{margin:"10px"}}>
                        {showList()}
                    </div>
                </div>
            </Spin>
        </div>
    )
}
export default UIResultCommon;