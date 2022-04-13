/*
 * @Description: 接口定义中后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 18:03:26
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button, Form } from 'antd';
const { TextArea } = Input;

const PreParam = (props) => {
    const { preParamStore }  = props;

    const { 
        createPreScript, 
        updatePreScript, 
        findPreScript, 
        preScriptInfo
    } = preParamStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();
    const apiUnitId =sessionStorage.getItem('apiUnitId');

    useEffect(()=>{
        findPreScript(apiUnitId).then((res)=>{
            form.setFieldsValue({
                scriptex: res.scriptex,
            })
        })
    },[apiUnitId])

    /**
     * 提交数据
     * @param {*} values 
     */
    const onFinish = (values) => {
        if(preScriptInfo){
            updatePreScript(values)
        }else{
            createPreScript(values)
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
            <Form.Item name='scriptex' >
                <TextArea autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default inject("preParamStore")(observer(PreParam));
