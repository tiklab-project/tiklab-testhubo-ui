import React, {useEffect, useState} from "react";
import {Button, InputNumber, Radio, Checkbox, Form, Input} from "antd";
import {inject, observer} from "mobx-react";

const layout = {
    labelCol: {span: 2},
    wrapperCol: {span: 22},
};


const AppPerfConfig = (props) =>{
    const {appPerfStore} = props;
    const {findAppPerf,updateAppPerf} = appPerfStore;

    const [form] = Form.useForm();
    const [exeMode, setExeMode] = useState();


    const appPerfId = sessionStorage.getItem("appPerfId")

    useEffect(()=>{
        findAppPerf(appPerfId).then(res=>{
            form.setFieldsValue({
                threadCount:res.threadCount,
                executeType:res.executeType,
                executeCount:res.executeCount
            })
        })
    },[appPerfId])

    //并发数
    const changeThread=(threadCount)=> {
        let param = {
            id:appPerfId,
            threadCount: threadCount,
            testCase:{
                id:appPerfId
            }
        }
        updateAppPerf(param)
    }

    //执行次数
    const changeExeCount=(executeCount)=> {
        let param = {
            id:appPerfId,
            executeCount: executeCount,
            testCase:{
                id:appPerfId
            }
        }
        updateAppPerf(param)
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
                        max={1}
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
                        max={100}
                        onChange={changeExeCount}
                    />
                </Form.Item>
            </Form>
        </>
    )
}

export default inject("appPerfStore")(observer(AppPerfConfig));