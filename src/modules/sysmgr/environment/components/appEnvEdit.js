
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span:19},
};

const {Option} = Select;

// 添加与编辑app环境
const AppEnvEdit = (props) => {
    const { appEnvStore, appEnvId } = props;
    const { 
        findAppEnv,
        createAppEnv,
        updateAppEnv,
        findAppEnvPage
     } = appEnvStore;

    const [form] = Form.useForm();
    
    const [visible, setVisible] = React.useState(false);

    let repositoryId = sessionStorage.getItem("repositoryId");

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.type === "edit"){
            findAppEnv(appEnvId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    platformName:res.platformName,
                    appiumSever:res.appiumSever,
                    deviceName:res.deviceName,
                    appPackage:res.appPackage,
                    appActivity:res.appActivity
                })
            })
        }
    };


    // 提交
    const onFinish = async () => {
        const values = await form.validateFields();

        if(props.type === "add" ){
            createAppEnv(values).then(()=> findAppEnvPage(repositoryId));
        }else{
            values.id=appEnvId;
            updateAppEnv(values).then(()=> findAppEnvPage(repositoryId));
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
        {
            props.type === 'add'
                ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                : <a style={{'cursor':'pointer'}} onClick={showModal}>{props.name}</a>
        }
        
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
                form={form}
                preserve={false}
                {...layout}
            >
                <Form.Item label="环境名称" name="name"><Input /></Form.Item>
                {/*<Form.Item label="appium路径" name="mainjsPath"><Input /></Form.Item>*/}
                <Form.Item label="appiumSever" name="appiumSever"><Input /></Form.Item>
                <Form.Item label="platformName" name="platformName">
                    <Select>
                        <Option value={"Android"}>Android</Option>
                        {/*<Option value={"IOS"}>IOS</Option>*/}
                    </Select>
                </Form.Item>
                <Form.Item label="deviceName" name="deviceName"><Input /></Form.Item>
                {/*<Form.Item label="设备地址" name="udId"><Input /></Form.Item>*/}
                <Form.Item label="appPackage" name="appPackage"><Input /></Form.Item>
                <Form.Item label="appActivity" name="appActivity"><Input /></Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export default inject('appEnvStore')(observer(AppEnvEdit));
