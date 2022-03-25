import React, {useEffect, useState} from "react";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import {inject, observer} from "mobx-react";
import {Button, Collapse, Input} from "antd";
import ReactJson from "react-json-view";

const {TextArea} = Input;
const { Panel } = Collapse;

const ApiUnitcaseInstance = (props) =>{
    const {apiUnitInstanceStore} = props;
    const {findInstanceList,instanceList,findInstance} = apiUnitInstanceStore;

    const [selected, setSelected] = useState();
    const [requestInstance,setRequestInstance]=useState({})
    const [requestType, setRequestType] = useState("");
    const [statusCode, setStatusCode] = useState("");
    const [result, setResult] = useState();
    const [testTime, setTestTime] = useState();

    const unitcaseId = sessionStorage.getItem("unitcaseId")

    useEffect(()=>{
        findInstanceList("1")
    },[])

    const clickFindInstance = id =>{
        setSelected(id)
        findInstance(id).then(res=>{
            setRequestType(res.requestType);
            setStatusCode(res.statusCode);
            setResult(res.result)
            setRequestInstance(res.requestInstance);
            setTestTime(res.createTime)
        })
    }

    const showInstanceListView = (data) =>{
        return data&&data.map(item=>{
            return (
                <div className={`history-item ${selected===item.id?"history-item-selected":""}`} key={item.id} onClick={()=>clickFindInstance(item.id)}>
                    {
                        item.result===1
                            ?<div className='history-item-result isSucceed'>通过</div>
                            :<div className='history-item-result isFailed'>未通过</div>
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

    const changeCollapse = () =>{

    }

    const toUnitDetail =()=>{

    }

    return(
        <>
            <BreadcrumbCommon
                breadArray={["API","用例历史"]}
                component={<Button onClick={toUnitDetail}>返回</Button>}
            />
            <div className={"unit-instance"}>
                <div className={"test-detail-history"}>
                    {
                        showInstanceListView(instanceList)
                    }
                </div>
                <div className={"unit-instance-detail"}>
                    <div>
                        <span>请求地址:  </span>
                        <span>{requestInstance.requestBase}</span>
                    </div>
                    <div>
                        <span>请求方式:  </span>
                        <span>{requestType}</span>
                    </div>
                    <div>
                        <span>状态码:  </span>
                        <span>{statusCode}</span>
                    </div>
                    <div>
                        <span>测试结果:  </span>
                        <span>{result=== 1 ? '成功' : '失败'}</span>
                    </div>
                    <div>
                        <span>测试时间:  </span>
                        <span>{testTime}</span>
                    </div>
                    <Collapse
                        defaultActiveKey={['1']}
                        onChange={changeCollapse}
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
                                src={requestInstance.responseBody?JSON.parse(requestInstance.responseBody):{}}
                                name={null}
                                style={{fontFamily:"sans-serif"}}
                                displayDataTypes={false}
                                enableClipboard={false}
                                displayObjectSize={false}
                            />
                            {/*<TextArea*/}
                            {/*    autoSize={{minRows: 4, maxRows: 10 }}*/}
                            {/*    value={requestInstance.responseBody}*/}
                            {/*/>*/}
                        </Panel>
                        <Panel header="响应头" key="2" >
                            <TextArea
                                autoSize={{minRows: 4, maxRows: 10 }}
                                value={requestInstance.responseHeader}
                            />
                        </Panel>
                        <Panel header="请求体" key="3" >
                            <TextArea
                                autoSize={{minRows: 4, maxRows: 10 }}
                                value={requestInstance.requestBody}
                            />
                        </Panel>
                        <Panel header="请求头" key="4" >
                            <TextArea
                                autoSize={{minRows: 4, maxRows: 10 }}
                                value={requestInstance.requestHeader}
                            />
                        </Panel>
                        <Panel header="断言" key="5" >
                            <TextArea
                                autoSize={{minRows: 4, maxRows: 10 }}
                                value={requestInstance.responseHeader}
                            />
                        </Panel>
                    </Collapse>



                </div>
            </div>
        </>
    )
}

export default inject("apiUnitInstanceStore")(observer(ApiUnitcaseInstance));