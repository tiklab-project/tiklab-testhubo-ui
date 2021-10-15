
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Input, Button, Form } from 'antd';

const { TextArea } = Input;

const RawParam = (props) => {
    const { rawParamStore,radioValue }  = props;
    const { 
        createRawParam, 
        updateRawParam, 
        findRawParam, 
        rawParamInfo 
    } = rawParamStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();

    const stepId = localStorage.getItem('stepId') ;

    useEffect(()=>{
        findRawParam(stepId).then((res)=>{
            if(res !== null){
                form.setFieldsValue({
                    raw: res.raw,
                })
            }
            
        })
    },[radioValue])

    // 提交保存
    const onFinish = (values) => {
        const data = toJS(rawParamInfo)
        if(data === null){
            createRawParam(values)
        }else{
            updateRawParam(values)
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
                name='raw'
            >
                <TextArea autoSize={true}  onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default inject('rawParamStore')(observer(RawParam));
