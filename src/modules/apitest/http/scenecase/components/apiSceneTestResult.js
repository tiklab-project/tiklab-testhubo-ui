import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import {Button, Collapse, Drawer, Input} from "antd";

const {TextArea} = Input;
const { Panel } = Collapse;

const ApiSceneTestResult =(props)=>{
    const { apiSceneTestDispatchStore } = props;
    const { apiSceneExecute } = apiSceneTestDispatchStore;
    const [visible, setVisible] = useState(false);

    let envUrl = JSON.parse(localStorage.getItem("API_ENV_SELECTED")).label
    let apiSceneId = sessionStorage.getItem("apiSceneId");

    const [allData, setAllData] = useState();


    const showDrawer = () => {



        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const showStepListView = (data) =>{
        return data&&data.map(item=>{
            return (
                <div className={`history-item ${selected===item.id?"history-item-selected":""}`} key={item.id} onClick={()=>clickFindInstance(item.id)}>
                    {
                        item.result==="1"
                            ?<div className='history-item-result '>
                                <div className={"isSucceed"}>通过</div>
                            </div>
                            :<div className='history-item-result '>
                                <div className={"isFailed"}>未通过</div>
                            </div>
                    }
                    <div className='history-item-detail'>
                        <div>{item.createTime}</div>
                        <div>
                            <span style={{margin:" 0 10px 0 0"}}>{item.requestType}</span>
                            <span>{item.time}</span>
                        </div>

                        <div>{item.name}</div>
                    </div>
                </div>
            )
        })
    }



    return(
        <>
            <Button type="primary" onClick={showDrawer}>测试</Button>
            <Drawer
                title="测试结果"
                placement={"right"}
                onClose={onClose}
                visible={visible}
                width={1400}
            >
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>测试结果</div>
                                <div className={"history-detail-all-item-value"}>{allData?.result}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>耗时</div>
                                <div className={"history-detail-all-item-value"}>{allData?.time}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>步骤数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.step}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>测试通过率</div>
                                <div className={"history-detail-all-item-value"}>{allData?.error}</div>
                            </div>

                            <div className={"history-detail-all-item"}>
                                <div>通过步骤数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.error}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>未通过步骤数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.error}</div>
                            </div>
                        </div>
                    </div>
                    <div className={"history-item-box"}>
                        <div className={"scene-step-contant"}>
                            <div className={"header-item"}>步骤列表</div>
                            <div>
                                {
                                    showStepListView()
                                }
                            </div>
                        </div>
                        <div className={"scene-step-detail"}>
                            <div className={"header-item"}>场景详情</div>
                            <div>
                                <div>
                                    <span>请求地址:  </span>
                                    <span>{allData?.requestUrl}</span>
                                </div>
                                <div>
                                    <span>请求方式:  </span>
                                    <span>{allData?.requestType}</span>
                                </div>
                                <div>
                                    <span>状态码:  </span>
                                    <span>{allData}</span>
                                </div>
                                <div>
                                    <span>测试结果:  </span>
                                    <span>{allData=== "1" ? '成功' : '失败'}</span>
                                </div>
                                <div>
                                    <span>测试时间:  </span>
                                    <span>{allData}</span>
                                </div>
                                <Collapse
                                    defaultActiveKey={['1']}
                                    expandIconPosition={"right"}
                                    ghost
                                >
                                    <Panel header="响应体" key="1" >
                                        <TextArea
                                            autoSize={{minRows: 4, maxRows: 10 }}
                                            value={allData?.responseBody}
                                        />
                                    </Panel>
                                    <Panel header="响应头" key="2" >
                                        <TextArea
                                            autoSize={{minRows: 4, maxRows: 10 }}
                                            value={allData?.responseHeader}
                                        />
                                    </Panel>
                                    <Panel header="请求体" key="3" >
                                        <TextArea
                                            autoSize={{minRows: 4, maxRows: 10 }}
                                            value={allData?.requestParam}
                                        />
                                    </Panel>
                                    <Panel header="请求头" key="4" >
                                        <TextArea
                                            autoSize={{minRows: 4, maxRows: 10 }}
                                            value={allData?.requestHeader}
                                        />
                                    </Panel>
                                    <Panel header="断言" key="5" >
                                        <TextArea
                                            autoSize={{minRows: 4, maxRows: 10 }}
                                            value={allData?.responseHeader}
                                        />
                                    </Panel>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>



                

            </Drawer>

        </>
    )
}
export default inject("apiSceneTestDispatchStore")(observer(ApiSceneTestResult));