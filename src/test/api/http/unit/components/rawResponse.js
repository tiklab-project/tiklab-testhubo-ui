
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import {Input, Button, Form, Select} from 'antd';
import rawResponseStore from "../store/rawResponseStore";
import {useParams} from "react-router";

const { TextArea } = Input;
const { Option } = Select;

const RawResponse = (props) => {
    const {  radioValue }  = props;

    const { 
        createRawResponse, 
        updateRawResponse, 
        findRawResponse, 
        rawResponseInfo 
    } = rawResponseStore;

    const [focus, setFocus] = useState(false);
    
    const [form] = Form.useForm();
    const {id} = useParams()

    useEffect(()=>{
        findRawResponse(id).then((res)=>{
            if( res.data.code === 0){
                const data = res.data.data;
                if(data !== null){
                    form.setFieldsValue({
                        raw: data.raw,
                        type:res.type
                    })
                }
            } 
        })
    },[radioValue,id])

    // 提交保存
    const onFinish = (values) => {
        const data = toJS(rawResponseInfo)
        if(data === null){
            createRawResponse(values)
        }else{
            updateRawResponse(values)
        }
        setFocus(false)
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
        >
            <div className={` ${focus === true ? 'teston-show' : 'teston-hide'}`}>
                <div className='mock-textarea'>
                    <Form.Item name='type'>
                        <Select style={{ width: 100 }} >
                            <Option value="json">Json</Option>
                            <Option value="text">Text</Option>
                            {/*<Option value="html">html</Option>*/}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button>格式化</Button>
                        <Button  htmlType="submit" >保存</Button> 
                    </Form.Item>
                </div>
            </div>
            <Form.Item
                name='raw'
            >
                <TextArea autoSize={{ minRows: 4, maxRows: 10 }}  onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default observer(RawResponse);
