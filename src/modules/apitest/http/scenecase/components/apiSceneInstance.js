import React, {useEffect, useState} from "react";
import BackCommon from "../../../../common/backCommon";
import {inject, observer} from "mobx-react";
import {Collapse, Input} from "antd";
import ReactJson from "react-json-view";

const {TextArea} = Input;
const { Panel } = Collapse

const ApiSceneInstance = (props) =>{
    const {apiSceneInstanceStore} = props;
    const {findApiSceneInstanceList,apiSceneInstanceList,findApiSceneInstance} = apiSceneInstanceStore;

    useEffect(()=>{
        findApiSceneInstanceList()
    },[])

    const [selected, setSelected] = useState();
    const [allData, setAllData] = useState();
    const [stepSelect, setStepSelect] = useState();

    const clickFindInstance = id =>{
        setSelected(id)
        findApiSceneInstance(id).then(res=>{
            setAllData(res)
            // setRequestType(res.requestType);
            // setStatusCode(res.statusCode);
            // setResult(res.result)
            // setRequestInstance(res.requestInstance);
            // setTestTime(res.createTime)
        })
        setStepSelect(null)
    }

    const clickFindStep = id =>{
        setStepSelect(id)

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
                        <div>{item.createTime}</div>
                        <span>{item.name}</span>
                        <div>步骤数:{item.num}</div>
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
                    {
                        showInstanceListView(apiSceneInstanceList)
                    }
                </div>
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
                        <div className={"header-item"}>测试总详情</div>
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
                            <div className={"header-item"}>场景列表</div>
                            <div>
                                {
                                    showStepListView(allData?.stepList)
                                }
                            </div>
                        </div>
                        <div className={"scene-step-detail"}>
                            <div className={"header-item"}>场景详情</div>
                            <div>
                                <div>
                                    <span>请求地址:  </span>
                                    {/*<span>{requestInstance.requestBase}</span>*/}
                                </div>
                                <div>
                                    <span>请求方式:  </span>
                                    {/*<span>{requestType}</span>*/}
                                </div>
                                <div>
                                    <span>状态码:  </span>
                                    {/*<span>{statusCode}</span>*/}
                                </div>
                                <div>
                                    <span>测试结果:  </span>
                                    {/*<span>{result=== 1 ? '成功' : '失败'}</span>*/}
                                </div>
                                <div>
                                    <span>测试时间:  </span>
                                    {/*<span>{testTime}</span>*/}
                                </div>
                                <Collapse
                                    defaultActiveKey={['1']}
                                    // onChange={changeCollapse}
                                    expandIconPosition={"right"}
                                    ghost
                                >
                                    <Panel header="响应体" key="1" >
                                        {/*{*/}
                                        {/*    JSON.parse(requestInstance.responseBody) instanceof Object*/}
                                        {/*        ?<ReactJson*/}
                                        {/*            src={requestInstance.responseBody}*/}
                                        {/*            name={null}*/}
                                        {/*            style={{fontFamily:"sans-serif"}}*/}
                                        {/*            displayDataTypes={false}*/}
                                        {/*            enableClipboard={false}*/}
                                        {/*            displayObjectSize={false}*/}
                                        {/*        />*/}
                                        {/*        :*/}
                                        {/*        <TextArea*/}
                                        {/*            autoSize={{minRows: 4, maxRows: 10 }}*/}
                                        {/*            value={requestInstance.responseBody}*/}
                                        {/*        />*/}
                                        {/*}*/}
                                        <ReactJson
                                            // src={requestInstance.responseBody?JSON.parse(requestInstance.responseBody):{}}
                                            name={null}
                                            style={{fontFamily:"sans-serif"}}
                                            displayDataTypes={false}
                                            enableClipboard={false}
                                            displayObjectSize={false}
                                        />
                                        {/*<TextArea*/}
                                        {/*    autoSize={{minRows: 4, maxRows: 10 }}*/}
                                        {/*    value={requestInstance.responseBody}*/}
                                        {/*    />*/}
                                    </Panel>
                                    <Panel header="响应头" key="2" >
                                        <TextArea
                                            autoSize={{minRows: 4, maxRows: 10 }}
                                            // value={requestInstance.responseHeader}
                                        />
                                    </Panel>
                                    <Panel header="请求体" key="3" >
                                        <TextArea
                                            autoSize={{minRows: 4, maxRows: 10 }}
                                            // value={requestInstance.requestBody}
                                        />
                                    </Panel>
                                    <Panel header="请求头" key="4" >
                                        <TextArea
                                            autoSize={{minRows: 4, maxRows: 10 }}
                                            // value={requestInstance.requestHeader}
                                        />
                                    </Panel>
                                    <Panel header="断言" key="5" >
                                        <TextArea
                                            autoSize={{minRows: 4, maxRows: 10 }}
                                            // value={requestInstance.responseHeader}
                                        />
                                    </Panel>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default inject("apiSceneInstanceStore")(observer(ApiSceneInstance));