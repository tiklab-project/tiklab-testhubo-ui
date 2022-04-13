import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select, message} from 'antd';

const {Option} = Select;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const ApiUnitEdit = (props) => {
    const { apiUnitStore, apiUnitId } = props;
    const {findApiUnit, createApiUnit, updateApiUnit,findApiUnitPage} = apiUnitStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {
        if(props.name === "编辑"){
            findApiUnit(apiUnitId).then((res)=>{
                form.setFieldsValue({
                    name: res.testCase.name,
                    methodType:res.methodType,
                    path:res.path,
                    desc:res.testCase.desc
                })
            })
        }

        setVisible(true);
    };

    const testType = localStorage.getItem("testType");
    const caseType = localStorage.getItem("caseType");

    const categoryId = sessionStorage.getItem("categoryId")

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();
        values.categoryId=categoryId;

        values.testCase={
            name:values.name,
            testType:testType,
            caseType:caseType,
            desc:values.desc
        }

        delete values.name
        delete values.desc

        if(props.name === "添加用例" ){
            createApiUnit(values).then(res=>{
                if(res.code===0){
                    findApiUnitPage(categoryId)
                }else {
                    message.error('This is an error message');
                }
            });
        }else{
            values.id=apiUnitId;
            updateApiUnit(values).then(res=>{
                if(res.code===0){
                    findApiUnitPage(categoryId)
                }else {
                    message.error('This is an error message');
                }
            });;
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
                        name="methodType"
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

export default inject('apiUnitStore')(observer(ApiUnitEdit));
