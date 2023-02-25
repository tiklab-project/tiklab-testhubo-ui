/*
 * @Description: 
 * @Author: sunxiancheng
 * @LastEditTime: 2021-10-13 17:05:48
 */
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';
import IconCommon from "../../../common/iconCommon";

const {Option} = Select;

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};

// 添加与编辑空间
const WebEnvEdit = (props) => {
    const { webEnvStore, webEnvId } = props;
    const { 
        findWebEnv,
        createWebEnv,
        updateWebEnv
     } = webEnvStore;

    const [form] = Form.useForm();
    
    const [visible, setVisible] = React.useState(false);
    const [allData, setAllData] = useState();

    // 弹框展示
    const showModal = () => {
        if(props.type === "edit"){
            findWebEnv(webEnvId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    webDriver:res.webDriver
                })

                setAllData(res)
            })
        }
        setVisible(true);
    };
    
    // 提交
    const onFinish = async () => {
        const values = await form.validateFields();

        if(props.type === "add" ){
            createWebEnv(values);
        }else{
            values.id=allData?.id
            updateWebEnv(values);
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
        {
            props.type === 'add'
                ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                : <IconCommon
                    icon={"bianji11"}
                    className={"icon-s edit-icon"}
                    onClick={showModal}
                />
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
                layout={"vertical"}
            >
                <Form.Item
                    label="环境名称"
                    rules={[{ required: true, message: '填写环境名称' }]}
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="WebDriver"
                    rules={[{ required: true, message: '选择WebDriver' }]}
                    name="webDriver"
                >
                     <Select>
                         <Option value={"chrome"}>Chrome</Option>
                         {/*<Option value={"firefox"}>FireFox</Option>*/}
                     </Select>
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export default inject('webEnvStore')(observer(WebEnvEdit));
