import React, {useEffect, useState} from "react";
import BackCommon from "../../../../common/backCommon";
import {inject, observer} from "mobx-react";
import {Collapse, Input} from "antd";

const {TextArea} = Input;
const { Panel } = Collapse

const ApiSceneInstance = (props) =>{
    const {apiSceneInstanceStore,apiUnitInstanceStore} = props;
    const {findApiSceneInstanceList,apiSceneInstanceList,findApiSceneInstance} = apiSceneInstanceStore;
    const {findApiUnitInstance} = apiUnitInstanceStore;

    let apiSceneId = sessionStorage.getItem("apiSceneId");

    useEffect(()=>{
        findApiSceneInstanceList(apiSceneId)
    },[apiSceneId])

    const [selected, setSelected] = useState();
    const [sceneInstanceData, setSceneInstanceData] = useState();
    const [stepSelect, setStepSelect] = useState();
    const [stepData, setStepData] = useState();

    const clickFindInstance = id =>{
        setSelected(id)
        findApiSceneInstance(id).then(res=>{
            setSceneInstanceData(res)
        })
        setStepSelect(null)
        setStepData(null)
    }

    const clickFindStep = id =>{
        setStepSelect(id)
        findApiUnitInstance(id).then(res=>{
            setStepData(res)
        })
    }

    const showInstanceListView = (data) =>{
        return data&&data.map(item=>{
            return (
                <div
                    className={`history-item ${selected===item.id?"history-item-selected":""}`}
                    key={item.id}
                    onClick={()=>clickFindInstance(item.id)}
                >
                    {
                        item.result===1
                            ?<div className='history-item-result isSucceed'>通过</div>
                            :<div className='history-item-result isFailed'>未通过</div>
                    }
                    <div className='history-item-detail'>
                        <div>{item?.createTime}</div>
                        <span>{item.createUser?.name}</span>
                        <div>步骤数:{item?.testNumber}</div>
                    </div>
                </div>
            )
        })
    }

    const showStepListView = (data)=>{
        return data&&data.map(item=>{
            return(
                <div
                    className={`history-step-item ${stepSelect===item.id?"history-item-selected":""}`}
                    key={item.id}
                    onClick={()=>clickFindStep(item.id)}
                >
                    {
                        item.result===1
                            ?<div className='history-item-result isSucceed'>通过</div>
                            :<div className='history-item-result isFailed'>未通过</div>
                    }
                    <div>{item.name}</div>
                </div>
            )
        })
    }

    const toUnitDetail =()=>{
        props.history.push("/repositorypage/apitest/scenedetail")
    }

    return(
        <>
            <BackCommon clickBack={toUnitDetail}/>
            <div className={"scene-instance-contant"}>
                <div className={"test-detail-history"}>
                    <div className={"header-item"}>历史列表</div>
                    <div className={"history-list"}>
                        {
                            showInstanceListView(apiSceneInstanceList)
                        }
                    </div>

                </div>
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
                        <div className={"header-item"}>测试总详情</div>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>测试结果</div>
                                <div className={"history-detail-all-item-value"}>{sceneInstanceData?.result===1?"成功":"失败"}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>耗时</div>
                                <div className={"history-detail-all-item-value"}>{sceneInstanceData?.elapsedTime}ms</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>步骤数</div>
                                <div className={"history-detail-all-item-value"}>{sceneInstanceData?.testNumber}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>测试通过率</div>
                                <div className={"history-detail-all-item-value"}>{sceneInstanceData?.passRate}</div>
                            </div>

                            <div className={"history-detail-all-item"}>
                                <div>通过步骤数</div>
                                <div className={"history-detail-all-item-value"}>{sceneInstanceData?.passNumber}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>未通过步骤数</div>
                                <div className={"history-detail-all-item-value"}>{sceneInstanceData?.failNumber}</div>
                            </div>
                        </div>
                    </div>
                    <div className={"history-item-box"}>
                        <div className={"scene-step-contant"}>
                            <div className={"header-item"}>步骤列表</div>
                            <div>
                                {
                                    showStepListView(sceneInstanceData?.stepList)
                                }
                            </div>
                        </div>
                        <div className={"scene-step-detail"}>
                            <div className={"header-item"}>步骤详情</div>
                            {stepData
                                ?<div>
                                    {
                                        stepData.errMessage
                                            ?<div style={{color:"red"}}>
                                                <span>错误信息:  </span>
                                                <span>{stepData.errMessage}</span>
                                            </div>
                                            :null
                                    }

                                    <div>
                                        <span>请求地址:  </span>
                                        <span>{stepData.requestInstance?.requestUrl}</span>
                                    </div>
                                    <div>
                                        <span>请求方式:  </span>
                                        <span>{stepData.requestInstance?.requestType}</span>
                                    </div>
                                    <div>
                                        <span>状态码:  </span>
                                        <span>{stepData.statusCode}</span>
                                    </div>
                                    <div>
                                        <span>测试结果:  </span>
                                        <span>{stepData.result=== "1" ? '成功' : '失败'}</span>
                                    </div>
                                    <div>
                                        <span>测试时间:  </span>
                                        <span>{stepData.createTime}</span>
                                    </div>
                                    <Collapse
                                        defaultActiveKey={['1']}
                                        // onChange={changeCollapse}
                                        expandIconPosition={"right"}
                                        ghost
                                    >
                                        <Panel header="响应体" key="1" >
                                            <TextArea
                                                autoSize={{minRows: 4, maxRows: 10 }}
                                                value={stepData.responseInstance?.responseBody}
                                            />
                                        </Panel>
                                        <Panel header="响应头" key="2" >
                                            <TextArea
                                                autoSize={{minRows: 4, maxRows: 10 }}
                                                value={stepData.responseInstance?.responseHeader}
                                            />
                                        </Panel>
                                        <Panel header="请求体" key="3" >
                                            <TextArea
                                                autoSize={{minRows: 4, maxRows: 10 }}
                                                value={stepData.requestInstance?.requestParam}
                                            />
                                        </Panel>
                                        <Panel header="请求头" key="4" >
                                            <TextArea
                                                autoSize={{minRows: 4, maxRows: 10 }}
                                                value={stepData.requestInstance?.responseHeader}
                                            />
                                        </Panel>
                                        <Panel header="断言" key="5" >
                                            <TextArea
                                                autoSize={{minRows: 4, maxRows: 10 }}
                                                value={stepData.requestInstance?.responseHeader}
                                            />
                                        </Panel>
                                    </Collapse>
                                </div>
                                :null
                            }

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default inject("apiSceneInstanceStore","apiUnitInstanceStore")(observer(ApiSceneInstance));