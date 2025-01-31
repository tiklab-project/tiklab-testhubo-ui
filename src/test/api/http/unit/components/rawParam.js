
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {Input, Button, Form, Select} from 'antd';
import rawParamStore from "../store/rawParamStore";

const { TextArea } = Input;
const { Option } = Select;

const RawParam = ({apiUnitId}) => {
    const { 
        createRawParam, 
        updateRawParam, 
        findRawParam
    } = rawParamStore;

    const [focus, setFocus] = useState(false);
    const [dataSource, setDataSource] = useState();
    const [form] = Form.useForm();

    useEffect(()=>{
        findRawParam(apiUnitId).then((data)=>{
            if(data){
                form.setFieldsValue({
                    raw: data.raw,
                    type:data.type
                })

                setDataSource(data)
            }else{
                form.setFieldsValue({
                    raw: null,
                    type:"application/json"
                })
            }
            
        })
    },[apiUnitId])

    // 提交保存
    const onFinish = async () => {
        let values = await form.validateFields();
        let param = {
            id:apiUnitId,
            apiUnitId:apiUnitId,
            ...dataSource,
            ...values

        }
        await updateRawParam(param)

        setFocus(false)
    }


    return (
        <div className={"api-script-box"}>

            <Form form={form} >
                <div className={"api-script-pre-header"} style={{display:"flex",justifyContent:"end"}}>
                    <Form.Item name='type'>
                         <Select style={{
                             width: 100,
                             border: "none",
                             background: "#f7f7f7",
                             color: "#0078d4",
                         }} >
                            <Option value="application/json">Json</Option>
                            <Option value="text/plain">Text</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div style={{border:"1px solid #f0f0f0"}}>
                    <Form.Item name='raw'>
                        <TextArea autoSize={{minRows: 4, maxRows: 10 }} onFocus={()=>setFocus(true)}/>
                    </Form.Item>
                </div>
                <div className={`action-btn-box ${focus?"testhubo-show":"testhubo-hide"}`}>
                    <Button onClick={()=>setFocus(false)} style={{marginRight:"10px"}}> 取消</Button>
                    <Button onClick={onFinish} className={"important-btn"} type="primary"> 保存</Button>
                </div>
            </Form>
        </div>
    )
}

export default observer(RawParam);
