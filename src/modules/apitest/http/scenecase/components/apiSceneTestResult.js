import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import {Button, Collapse, Drawer, Input, Spin} from "antd";

const {TextArea} = Input;
const { Panel } = Collapse;

const ApiSceneTestResult =(props)=>{
    const { apiSceneTestDispatchStore } = props;
    const { apiSceneExecute } = apiSceneTestDispatchStore;
    const [visible, setVisible] = useState(false);

    let envUrl
    try{
        envUrl =JSON.parse(localStorage.getItem("API_ENV_SELECTED")).label
    }catch (e) {
        envUrl =null

    }

    let apiSceneId = sessionStorage.getItem("apiSceneId");


    const [allData, setAllData] = useState();
    const [selected, setSelected] = useState();
    const [selectedStepData, setSelectedStepData] = useState();
    const [loading, setLoading] = useState(true);


    const showDrawer = () => {
        apiSceneExecute(apiSceneId, envUrl).then(res=>{
            setAllData(res);
            setLoading(false);
        })

        setVisible(true);

    };

    const onClose = () => {
        setVisible(false);
    };

    const clickFindInstance = id =>{
        setSelected(id)
        setSelectedStepData(allData?.stepList.find(item=>item.id === id))
    }


    const showStepListView = (data) =>{
        return data&&data.map((item,index)=>{
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
                        <div>{item.apiUnit.path}</div>
                        <div>
                            <span style={{margin:" 0 10px 0 0"}}>{item?.requestInstance?.requestType}</span>
                            <span>{item.elapsedTime}</span>
                        </div>

                        <div>{item?.apiUnit.testCase.name}</div>
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
                <Spin spinning={loading}>
                    <div className={"history-detail history-detail-box"}>
                        <div className={"history-detail-all"}>
                            <div className={"history-detail-all-box"}>
                                <div className={"history-detail-all-item"}>
                                    <div>测试结果</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.result==="1"?"成功":"失败"}</div>
                                </div>
                                <div className={"history-detail-all-item"}>
                                    <div>耗时</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.elapsedTime}ms</div>
                                </div>
                                <div className={"history-detail-all-item"}>
                                    <div>步骤数</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.testNumber}</div>
                                </div>
                                <div className={"history-detail-all-item"}>
                                    <div>测试通过率</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.passRate}</div>
                                </div>

                                <div className={"history-detail-all-item"}>
                                    <div>通过步骤数</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.passNumber}</div>
                                </div>
                                <div className={"history-detail-all-item"}>
                                    <div>未通过步骤数</div>
                                    <div className={"history-detail-all-item-value"}>{allData?.failNumber}</div>
                                </div>
                            </div>
                        </div>
                        <div className={"history-item-box"}>
                            <div className={"scene-step-contant"}>
                                <div className={"header-item"}>步骤列表</div>
                                <div>
                                    {
                                        showStepListView(allData?.stepList)
                                    }
                                </div>
                            </div>
                            <div className={"scene-step-detail"}>
                                <div className={"header-item"}>场景详情</div>
                                {
                                    selectedStepData
                                        ?<div>
                                            <div>
                                                <span>接口名称:  </span>
                                                <span>{selectedStepData?.apiUnit.testCase.name}</span>
                                            </div>
                                            <div>
                                                <span>请求地址:  </span>
                                                <span>{selectedStepData?.requestInstance.requestUrl}</span>
                                            </div>
                                            <div>
                                                <span>请求方式:  </span>
                                                <span>{selectedStepData?.requestInstance.requestType}</span>
                                            </div>
                                            <div>
                                                <span>状态码:  </span>
                                                <span>{selectedStepData?.statusCode}</span>
                                            </div>
                                            <div>
                                                <span>测试结果:  </span>
                                                <span>{selectedStepData?.result=== "1" ? '成功' : '失败'}</span>
                                            </div>
                                            <Collapse
                                                defaultActiveKey={['1']}
                                                expandIconPosition={"right"}
                                                ghost
                                            >
                                                <Panel header="响应体" key="1" >
                                                    <TextArea
                                                        autoSize={{minRows: 4, maxRows: 10 }}
                                                        value={selectedStepData?.responseInstance?.responseBody}
                                                    />
                                                </Panel>
                                                <Panel header="响应头" key="2" >
                                                    <TextArea
                                                        autoSize={{minRows: 4, maxRows: 10 }}
                                                        value={selectedStepData?.responseInstance?.responseHeader}
                                                    />
                                                </Panel>
                                                <Panel header="请求体" key="3" >
                                                    <TextArea
                                                        autoSize={{minRows: 4, maxRows: 10 }}
                                                        value={selectedStepData?.requestInstance?.requestParam}
                                                    />
                                                </Panel>
                                                <Panel header="请求头" key="4" >
                                                    <TextArea
                                                        autoSize={{minRows: 4, maxRows: 10 }}
                                                        value={selectedStepData?.requestInstance.requestHeader}
                                                    />
                                                </Panel>
                                                <Panel header="断言" key="5" >
                                                    <TextArea
                                                        autoSize={{minRows: 4, maxRows: 10 }}
                                                        value={selectedStepData?.responseHeader}
                                                    />
                                                </Panel>
                                            </Collapse>
                                        </div>
                                        :null
                                }

                            </div>
                        </div>
                    </div>
                </Spin>
            </Drawer>

        </>
    )
}
export default inject("apiSceneTestDispatchStore")(observer(ApiSceneTestResult));