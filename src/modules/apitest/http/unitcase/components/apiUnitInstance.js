import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Button, Collapse, Input} from "antd";
import BackCommon from "../../../../common/backCommon";

const {TextArea} = Input;
const { Panel } = Collapse;

const ApiUnitInstance = (props) =>{
    const {apiUnitInstanceStore} = props;
    const {findApiUnitInstanceList,apiUnitInstanceList,findApiUnitInstance} = apiUnitInstanceStore;

    const [selected, setSelected] = useState();
    const [requestInstance,setRequestInstance]=useState({})
    const [responseInstance, setResponseInstance] = useState();
    const [statusCode, setStatusCode] = useState("");
    const [result, setResult] = useState("");
    const [testTime, setTestTime] = useState();

    const apiUnitId = sessionStorage.getItem("apiUnitId")

    useEffect(()=>{
        findApiUnitInstanceList(apiUnitId)
    },[])

    const clickFindInstance = id =>{
        setSelected(id)
        findApiUnitInstance(id).then(res=>{
            setStatusCode(res.statusCode);
            setResult(res.result)
            setRequestInstance(res.requestInstance);
            setResponseInstance(res.responseInstance);
            setTestTime(res.createTime)
        })
    }

    const showInstanceListView = (data) =>{
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

    const changeCollapse = () =>{

    }

    const toUnitDetail =()=>{
        props.history.push("/repositorypage/apitest/unitdetail")
    }

    return(
        <>
            <BackCommon clickBack={toUnitDetail}/>
            <div className={"unit-instance"}>
                <div className={"test-detail-history"}>
                    <div className={"header-item"}>历史列表</div>
                    {
                        showInstanceListView(apiUnitInstanceList)
                    }
                </div>
                <div className={"unit-instance-detail"}>
                    <div className={"header-item"}>历史详情</div>
                    <div>
                        <div>
                            <span>请求地址:  </span>
                            <span>{requestInstance?.requestUrl}</span>
                        </div>
                        <div>
                            <span>请求方式:  </span>
                            <span>{requestInstance?.requestType}</span>
                        </div>
                        <div>
                            <span>状态码:  </span>
                            <span>{statusCode}</span>
                        </div>
                        <div>
                            <span>测试结果:  </span>
                            <span>{result=== "1" ? '成功' : '失败'}</span>
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
                                <TextArea
                                    autoSize={{minRows: 4, maxRows: 10 }}
                                    value={responseInstance?.responseBody}
                                />
                            </Panel>
                            <Panel header="响应头" key="2" >
                                <TextArea
                                    autoSize={{minRows: 4, maxRows: 10 }}
                                    value={responseInstance?.responseHeader}
                                />
                            </Panel>
                            <Panel header="请求体" key="3" >
                                <TextArea
                                    autoSize={{minRows: 4, maxRows: 10 }}
                                    value={requestInstance?.requestParam}
                                />
                            </Panel>
                            <Panel header="请求头" key="4" >
                                <TextArea
                                    autoSize={{minRows: 4, maxRows: 10 }}
                                    value={requestInstance?.requestHeader}
                                />
                            </Panel>
                            <Panel header="断言" key="5" >
                                <TextArea
                                    autoSize={{minRows: 4, maxRows: 10 }}
                                    value={requestInstance?.responseHeader}
                                />
                            </Panel>
                        </Collapse>
                    </div>

                </div>
            </div>
        </>
    )
}

export default inject("apiUnitInstanceStore")(observer(ApiUnitInstance));