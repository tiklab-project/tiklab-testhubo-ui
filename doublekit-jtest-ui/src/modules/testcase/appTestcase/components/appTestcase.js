
/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {Form, Divider, Input, Breadcrumb, Button} from "antd";
import {inject, observer} from "mobx-react";
import './appStyle.scss'
import AppStep from "./appStep";
import TestReportApp from "./testReportApp";

const AppTestcase = (props) => {
    const {testcaseStore} = props;
    const {findTestcase,updateTestcase} = testcaseStore;
    const [form] =  Form.useForm();
    const [editTitle,setEditTitle] = useState();
    const [updataValue,setUpdataValue] = useState();

    const testcaseId = localStorage.getItem('testcaseId')

    useEffect(()=> {
        findTestcase(testcaseId).then(res=>{
            setEditTitle(res.name);
            setUpdataValue(res);
            let testCaseApp = res.testCaseApp
            form.setFieldsValue({
                name:res.name,
                type:res.type,
                person:res.user.name,
                updateTime:res.updateTime,
                platformName:testCaseApp.platformName,
                appiumSever:testCaseApp.appiumSever,
                deviceName:testCaseApp.deviceName,
                udId:testCaseApp.udId,
                appPackage:testCaseApp.appPackage,
                appActivity:testCaseApp.appActivity
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
                    <Breadcrumb.Item>APP</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={'testcase-detail-form'}>
                <div className="testcase-detail-form-header">
                    <div
                        className='teststep-title'
                        contentEditable={true}
                        suppressContentEditableWarning  //去掉contentEditable 提示的页面警告
                        onBlur={updateTitle}
                    >
                        {editTitle}
                    </div>
                    <div>
                        <TestReportApp testcaseId={testcaseId} name={'测试历史'} />
                        <TestReportApp testcaseId={testcaseId} name={'执行测试'} />
                    </div>

                </div>
                <Form
                    className={'testcase-detail-form2'}
                    layout="inline"
                    form={form}
                >
                    <Form.Item label="平台" name="platformName">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="appium地址" name="appiumSever">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="设备名" name="deviceName">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="设备地址" name="udId">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="App包名" name="appPackage">
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="App入口" name="appActivity">
                        <Input disabled bordered={false}/>
                    </Form.Item>
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
            <AppStep/>
        </>
    )
}

export default inject('testcaseStore')(observer(AppTestcase));
