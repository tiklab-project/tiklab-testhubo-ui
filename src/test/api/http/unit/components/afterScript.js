/*
 * @Description: 接口定义 后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:42:56
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button, Form } from 'antd';
import afterScriptStore from "../store/afterScriptStore";
const { TextArea } = Input;

const AfterScript = (props) => {

    const { 
        createAfterScript, 
        updateAfterScript, 
        findAfterScript
    } = afterScriptStore;


    const [showBtn, setShowBtn] = useState(false);
    const [dataSource, setDataSource] = useState();
    const [form] = Form.useForm();

    const  apiUnitId = sessionStorage.getItem('apiUnitId');

    useEffect(()=>{
        findAfterScript(apiUnitId).then((data)=>{
            if(data){
                form.setFieldsValue({
                    scriptex: data.scriptex,
                })

                setDataSource(data)
            }

        })
    },[apiUnitId])

    /**
     * 提交数据
     * @param {*} values 
     */
    const onFinish = async () => {
        let values = await form.validateFields();

        if(dataSource){
            let param = {
                ...dataSource,
                ...values
            }

            await updateAfterScript(param)
        }else{
            values.apiUnit=apiUnitId;
            values.id =apiUnitId;
            await createAfterScript(values)
        }

        setShowBtn(false)
    }

    return (
        <div className={"api-script-box"}>
            <div className={"api-script-pre-header"}> </div>
            <Form form={form} >
                <div style={{border:"1px solid #f0f0f0"}}>
                    <Form.Item name='scriptex'>
                        <TextArea autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setShowBtn(true)}/>
                    </Form.Item>
                </div>
                <div className={`action-btn-box ${showBtn?"textArea-focus":"textArea-blur"}`}>
                    <Button onClick={()=>setShowBtn(false)} style={{marginRight:"10px"}}> 取消</Button>
                    <Button onClick={onFinish} className={"important-btn"}> 保存</Button>
                </div>
            </Form>
        </div>
    )
}

export default observer(AfterScript);
