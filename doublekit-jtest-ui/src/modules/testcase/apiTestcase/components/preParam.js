/*
 * @Description: 接口定义中后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 18:03:26
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx'
import { PREPARAM_STORE } from '../store/preParamStore';
import { Input, Button, Form } from 'antd';
const { TextArea } = Input;

const PreParam = (props) => {
    const { preParamStore,radioValue }  = props;

    const { 
        createPreScript, 
        updatePreScript, 
        findPreScript, 
        preScriptInfo
    } = preParamStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();

    const stepId =localStorage.getItem('stepId') ;
    useEffect(()=>{
        findPreScript(stepId).then((res)=>{
            if(res.code === 0){
                const data = res.data;
                if(data !== null){
                    form.setFieldsValue({
                        scriptex: data.scriptex,
                    })
                }
            }
        })
    },[radioValue])

    /**
     * 提交数据
     * @param {*} values 
     */
    const onFinish = (values) => {
        const data = toJS(preScriptInfo)
        if(data === null){
            createPreScript(values)
        }else{
            updatePreScript(values)
        }

        setFocus(false)
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
        >
            <div className={` ${focus === true ? 'textArea-focus' : 'textArea-blur'}`}>
                <div className='mock-textarea'>
                    <Form.Item>
                        <Button>格式化</Button>
                        <Button  htmlType="submit" >保存</Button> 
                    </Form.Item>
                </div>
            </div>
            <Form.Item
                name='scriptex'
            >
                <TextArea autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default inject(PREPARAM_STORE)(observer(PreParam));
