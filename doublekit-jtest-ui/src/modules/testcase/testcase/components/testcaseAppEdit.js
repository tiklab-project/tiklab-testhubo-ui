import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Input} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const TestcaseAppEdit = (props) => {
    const { testcaseStore, testcaseId } = props;
    const {
        findTestcase,
        createTestcase,
        updateTestcase
    } = testcaseStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const [testcaseAppId,setTestcaseAppId]=useState('')

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.name === "编辑"){
            findTestcase(testcaseId).then((res)=>{
                let testCaseApp = res.testCaseApp;
                setTestcaseAppId(testCaseApp.id)
                form.setFieldsValue({
                    name: res.name,
                    type:res.type,
                    desc:res.desc,
                    platformName:testCaseApp.platformName,
                    appiumSever:testCaseApp.appiumSever,
                    deviceName:testCaseApp.deviceName,
                    udId:testCaseApp.udId,
                    appPackage:testCaseApp.appPackage,
                    appActivity:testCaseApp.appActivity
                })
            })
        }
    };

    const repositoryId = localStorage.getItem('repositoryId');
    const userId = document.cookie.split(";")[4].split("=")[1];
    console.log('cookie',userId)

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();
        values.repository={id:repositoryId};
        values.type = "APP";
        values.user={id:userId}
        let testCaseApp={
            platformName:values.platformName,
            appiumSever:values.appiumSever,
            deviceName:values.deviceName,
            udId:values.udId,
            appPackage:values.appPackage,
            appActivity:values.appActivity,
        }
        if(props.name === "APP" ){
            values.testCaseApp=testCaseApp
            createTestcase(values);
        }else{
            values.id=testcaseId;
            values.testCaseApp = {...testCaseApp,id:testcaseAppId}
            updateTestcase(values);
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            <a onClick={showModal}>{props.name}</a>
            <Modal
                destroyOnClose={true}
                title={props.name}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                    {...layout}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true, }]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="type"
                    >
                        <Input defaultValue='APP' disabled />
                    </Form.Item>
                    <Form.Item label="平台" name="platformName"><Input /></Form.Item>
                    <Form.Item label="appium地址" name="appiumSever"><Input /></Form.Item>
                    <Form.Item label="设备名" name="deviceName"><Input /></Form.Item>
                    <Form.Item label="设备地址" name="udId"><Input /></Form.Item>
                    <Form.Item label="App包名" name="appPackage"><Input /></Form.Item>
                    <Form.Item label="App入口" name="appActivity"><Input /></Form.Item>
                    <Form.Item label="说明" name="desc"><Input /></Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default inject('testcaseStore')(observer(TestcaseAppEdit));
