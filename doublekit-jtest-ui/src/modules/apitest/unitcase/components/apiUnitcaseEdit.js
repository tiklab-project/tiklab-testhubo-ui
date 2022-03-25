import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';

const {Option} = Select;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const ApiUnitcaseEdit = (props) => {
    const { stepStore, stepId } = props;
    const {findStep, createStep, updateStep} = stepStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.name === "编辑"){
            findStep(stepId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    stepType:res.stepType,
                    path:res.path,
                    desc:res.desc
                })
            })
        }
    };

    const testcaseId = localStorage.getItem('testcaseId')

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();
        values.testCase={id:testcaseId};
        if(props.name === "添加用例" ){
            createStep(values);
        }else{
            values.id=stepId;
            updateStep(values);
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.btn === "btn"
                    ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                    : <a onClick={showModal}>{props.name}</a>
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
                        rules={[{ required: true, }]}
                        name="stepType"
                    >
                        <Select>
                            <Option value='post'>post</Option>
                            <Option value='get'>get</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        rules={[{ required: true }]}
                        name="path"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="desc"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('stepStore')(observer(ApiUnitcaseEdit));
