/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:05:48
 */
import React from 'react';
import { observer, inject } from "mobx-react";
import { Form, Modal, Button, Input } from 'antd';

// 添加与编辑空间
const EnvironmentEdit = (props) => {
    const { environmentStore, environmentId } = props;
    const {
        findEnvironment,
        createEnvironment,
        updateEnvironment
     } = environmentStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.type === "edit"){
            findEnvironment(environmentId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    prepositionUrl:res.prepositionUrl
                })
            })
        }
    };

    const repositoryId= localStorage.getItem('repositoryId')

    // 提交
    const onFinish = (values) => {
        values.repository={
            id:repositoryId
        }
        if(props.type === "add" ){
            createEnvironment(values);
        }else{
            updateEnvironment(values);
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
        {
            props.type === 'add' ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                                 : <a style={{'cursor':'pointer'}} onClick={showModal}>{props.name}</a>
        }

        <Modal
            destroyOnClose={true}
            title={props.name}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            centered
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                form={form}
                onFinish={onFinish}
                preserve={false}
            >
                <Form.Item
                    label="环境名称"
                    rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="环境地址"
                    rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}
                    name="prepositionUrl"
                >
                     <Input />
                </Form.Item>
                <div className={'modal-footer'}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </div>
            </Form>
        </Modal>
        </>
    );
};

export default inject('environmentStore')(observer(EnvironmentEdit));
