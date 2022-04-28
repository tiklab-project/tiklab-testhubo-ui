
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import {Input, Button, Form, Select} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

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

    const apiUnitId = sessionStorage.getItem('apiUnitId') ;

    useEffect(()=>{
        findRawParam(apiUnitId).then((res)=>{
            if(res !== null){
                form.setFieldsValue({
                    raw: res.raw,
                    type:res.type
                })
            }else{
                form.setFieldsValue({
                    raw: null,
                    type:null
                })
            }
            
        })
    },[apiUnitId])

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
                <TextArea  autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setFocus(true)}/>
            </Form.Item>
            
        </Form>
    )
}

export default inject('rawParamStore')(observer(RawParam));
