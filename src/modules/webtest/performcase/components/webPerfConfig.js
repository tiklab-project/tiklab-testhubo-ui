import React, {useEffect, useState} from "react";
import {Button, InputNumber, Radio, Checkbox, Form, Input} from "antd";
import {inject, observer} from "mobx-react";

const layout = {
    labelCol: {span: 2},
    wrapperCol: {span: 22},
};


const WebPerfConfig = (props) =>{
    const {webPerfStore,agentConfigStore,webPerfTestDispatchStore} = props;
    const {findWebPerf,updateWebPerf} = webPerfStore;
    const {findAgentConfigList} = agentConfigStore;
    const {getAgent} = webPerfTestDispatchStore;

    const [form] = Form.useForm();
    const [exeMode, setExeMode] = useState();
    const [agentConfigList, setAgentConfigList] = useState();


    const webPerfId = sessionStorage.getItem("webPerfId")
    const repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findWebPerf(webPerfId).then(res=>{
            form.setFieldsValue({
                threadCount:res.threadCount,
                executeType:res.executeType,
                executeCount:res.executeCount
            })
        })
    },[webPerfId])

    useEffect(()=>{
        findAgentConfigList(repositoryId).then(res=>{
            setAgentConfigList(res)
        })
    },[repositoryId])


    //并发数
    const changeThread=(threadCount)=> {
        let param = {
            id:webPerfId,
            threadCount: threadCount,
            testCase:{
                id:webPerfId
            }
        }
        updateWebPerf(param)
    }

    //执行次数
    const changeExeCount=(executeCount)=> {
        let param = {
            id:webPerfId,
            executeCount: executeCount,
            testCase:{
                id:webPerfId
            }
        }
        updateWebPerf(param)
    }

    const changeRadio = (id)=>{
        getAgent(id)
    }

    const showClient = (data)=>{
        return data&&data.map(item=>{
            return (
                <div className={"perform-client-item"}>
                    <div>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-web`}></use>
                        </svg>
                    </div>
                    <div>
                        <div>名称：{item.name}</div>
                        <div>地址：{item.url}</div>
                        {/*<div className={"perform-client-item-status"}>*/}
                        {/*    状态：<span className={"perform-client-item-status-icon"}>{item.online}</span>*/}
                        {/*</div>*/}
                    </div>
                    <div className={"perform-client-item-check"}>
                        <Radio onChange={(e)=>changeRadio(item.id)} />
                    </div>
                </div>
            )
        })
    }



    return(
        <>
            <Form
                form={form}
                preserve={false}
                {...layout}
            >
                <Form.Item
                    label="并发数"
                    name="threadCount"
                >
                    <InputNumber
                        min={1}
                        max={10}
                        onChange={changeThread}
                    />
                </Form.Item>
                <Form.Item
                    label="执行方式"
                    name="executeType"
                >
                    <Radio.Group onChange={(e)=>setExeMode(e.target.value)} value={exeMode}>
                        <Radio value={0}>按执行次数</Radio>
                        {/*<Radio value={1}>按执行时间</Radio>*/}
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="执行次数"
                    name="executeCount"
                >
                    <InputNumber
                        min={1}
                        max={10}
                        onChange={changeExeCount}
                    />
                </Form.Item>
                <Form.Item
                    label="节点"
                    name="agent"
                >
                    {
                        showClient(agentConfigList)
                    }
                </Form.Item>

            </Form>
        </>
    )
}

export default inject("webPerfStore","agentConfigStore","webPerfTestDispatchStore")(observer(WebPerfConfig));