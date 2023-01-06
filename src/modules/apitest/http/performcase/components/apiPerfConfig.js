import React, {useEffect, useState} from "react";
import {Button, InputNumber, Radio, Checkbox, Form, Input} from "antd";
import {inject, observer} from "mobx-react";

const layout = {
    labelCol: {span: 2},
    wrapperCol: {span: 22},
};

//压力测试配置
const ApiPerfConfig = (props) =>{
    const {apiPerfStore,agentConfigStore} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;
    const {findAgentConfigList} = agentConfigStore;

    const [form] = Form.useForm();
    const [exeMode, setExeMode] = useState();
    const [agentConfigList, setAgentConfigList] = useState();


    const apiPerfId = sessionStorage.getItem("apiPerfId")
    const repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findApiPerf(apiPerfId).then(res=>{
            form.setFieldsValue({
                threadCount:res.threadCount,
                executeType:res.executeType,
                executeCount:res.executeCount
            })
        })
    },[apiPerfId])

    useEffect(()=>{
        findAgentConfigList(repositoryId).then(res=>{
            setAgentConfigList(res)
        })
    },[repositoryId])

    //并发数
    const changeThread=(threadCount)=> {
        let param = {
            id:apiPerfId,
            threadCount: threadCount,
            testCase:{
                id:apiPerfId
            }
        }
        updateApiPerf(param)
    }

    //执行次数
    const changeExeCount=(executeCount)=> {
        let param = {
            id:apiPerfId,
            executeCount: executeCount,
            testCase:{
                id:apiPerfId
            }
        }
        updateApiPerf(param)
    }

    //执行类型
    const changeExeType=(executeType)=> {
        setExeMode(executeType)

        let param = {
            id:apiPerfId,
            executeType: executeType,
            testCase:{
                id:apiPerfId
            }
        }
        updateApiPerf(param)
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
                    {/*<div className={"perform-client-item-check"}>*/}
                    {/*    <Checkbox onChange={(e)=>onChange(e,item.id)} />*/}
                    {/*</div>*/}
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
                        max={100}
                        onChange={changeThread}
                    />
                </Form.Item>
                <Form.Item
                    label="执行次数"
                    name="executeCount"
                >
                    <InputNumber
                        min={1}
                        max={10000}
                        onChange={changeExeCount}
                    />
                </Form.Item>
                <Form.Item
                    label="执行方式"
                    name="executeType"
                >
                    <Radio.Group onChange={(e)=>changeExeType(e.target.value)} value={exeMode}>
                        <Radio value={0}>循环</Radio>
                        <Radio value={1}>随机</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="节点"
                    name="executeCount"
                >
                    {
                        showClient(agentConfigList)
                    }
                </Form.Item>

            </Form>
        </>
    )
}

export default inject("apiPerfStore","agentConfigStore")(observer(ApiPerfConfig));