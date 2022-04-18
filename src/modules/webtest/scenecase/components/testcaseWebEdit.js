import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Input} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const TestcaseWebEdit = (props) => {
    const { testcaseStore, testcaseId } = props;
    const {
        findTestcase,
        createTestcase,
        updateTestcase
    } = testcaseStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.name === "编辑"){
            findTestcase(testcaseId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    type:res.type,
                    desc:res.desc
                })
            })
        }
    };

    const repositoryId = localStorage.getItem('repositoryId')

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();
        values.repository={id:repositoryId};
        values.type = "WEB";
        if(props.name === "WEB" ){
            createTestcase(values);
        }else{
            values.id=testcaseId;
            updateTestcase(values);
        }
        setVisible(false);
    };

    //关闭弹窗
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
                        <Input defaultValue='WEB' disabled />
                    </Form.Item>
                    <Form.Item label="说明" name="desc"><Input /></Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('testcaseStore')(observer(TestcaseWebEdit));
