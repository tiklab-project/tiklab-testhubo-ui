import React, {useEffect, useState} from "react";
import {Button, InputNumber, Radio, Checkbox, Form, Input} from "antd";
import {inject, observer} from "mobx-react";

const layout = {
    labelCol: {span: 2},
    wrapperCol: {span: 22},
};


const ApiPerformCofig = (props) =>{
    const {apiPerfStore} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;

    const [form] = Form.useForm();
    const [exeMode, setExeMode] = useState();


    const apiPerfId = sessionStorage.getItem("apiPerfId")

    useEffect(()=>{
        findApiPerf(apiPerfId).then(res=>{
            form.setFieldsValue({
                threadCount:res.threadCount,
                executeType:res.executeType,
                executeCount:res.executeCount
            })
        })
    },[apiPerfId])

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
            </Form>
        </>
    )
}

export default inject("apiPerfStore")(observer(ApiPerformCofig));