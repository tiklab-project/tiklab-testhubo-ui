/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {Form, Divider,Input,Breadcrumb} from "antd";
import './webTestcase.scss';
import {inject, observer} from "mobx-react";
import WebStep from "../../unitcase/components/webUnitStepList";
import TestReportWeb from './testReportWeb'

const WebTestcase = (props) => {
    const {testcaseStore} = props;
    const {findTestcase,updateTestcase} = testcaseStore;
    const [form] =  Form.useForm();
    const [editTitle,setEditTitle] = useState();
    const [updataValue,setUpdataValue] = useState();

    const testcaseId = localStorage.getItem('testcaseId')

    useEffect(()=> {
        findTestcase(testcaseId).then(res=>{
            setEditTitle(res.name);
            setUpdataValue(res)
            form.setFieldsValue({
                name:res.name,
                type:res.type,
                person:res.user.name,
                updateTime:res.updateTime
            })
        })
    },[])

    const updateTitle = (value) =>{
        const param = {
            name:value.target.innerText,
            type:updataValue.type,
            desc:updataValue.desc,
            id:updataValue.id,
            repository:{
                id:updataValue.repository.id
            }
        }
        updateTestcase(param)
    }

    const toTestcase = () => props.history.push('/repositorypage/Testcase')

    return(
        <>
            <div className='breadcrumb'>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item ><a onClick={toTestcase}>测试用例 </a></Breadcrumb.Item>
                    <Breadcrumb.Item>webUI</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={'testcase-webUI-form'}>
                <div className="web-form-header">
                    <div
                        className='teststep-title'
                        contentEditable={true}
                        suppressContentEditableWarning  //去掉contentEditable 提示的页面警告
                        onBlur={updateTitle}
                    >
                        {editTitle}
                    </div>
                    <div>
                        <TestReportWeb testcaseId={testcaseId} name={'测试历史'} />
                        <TestReportWeb testcaseId={testcaseId} name={'执行测试'} />
                    </div>
                    
                </div>
                <Form
                    className={'web-form2'}
                    layout="inline"
                    form={form}
                >
                    <Form.Item label="类型" name="type">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="创建人" name="person">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="更新时间" name="updateTime">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                </Form>
            </div>
            <Divider  />
            <WebStep/>
        </>
    )
}

export default inject('testcaseStore')(observer(WebTestcase));
