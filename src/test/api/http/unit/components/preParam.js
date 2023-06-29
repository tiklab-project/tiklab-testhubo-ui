/*
 * @Description: 接口定义中后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 18:03:26
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button, Form } from 'antd';
import preParamStore from "../store/preParamStore";
const { TextArea } = Input;

const PreParam = (props) => {

    const { 
        createPreScript, 
        updatePreScript, 
        findPreScript
    } = preParamStore;

    const [showBtn, setShowBtn] = useState(false);
    const [dataSource, setDataSource] = useState();
    const [form] = Form.useForm();

    const apiUnitId =sessionStorage.getItem('apiUnitId');

    useEffect(()=>{
        findPreScript(apiUnitId).then((data)=>{
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
            updatePreScript(param)
        }else{
            values.apiUnit=apiUnitId;
            values.id =apiUnitId;
            createPreScript(values)
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

export default observer(PreParam);
