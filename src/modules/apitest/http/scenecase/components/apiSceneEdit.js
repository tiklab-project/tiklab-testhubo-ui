
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const ApiSceneEdit = (props) => {
    const { apiSceneStore, apiSceneId,findPage,testType,caseType,categoryId } = props;
    const {findApiScene,createApiScene,updateApiScene} = apiSceneStore

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {

        if(props.name==="编辑"){
            findApiScene(apiSceneId).then(res=>{
                form.setFieldsValue({
                    name:res.testCase.name,
                })
            })
        }

        setVisible(true);
    };

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();

        values.testCase={
            category:{id:categoryId},
            name:values.name,
            testType:testType,
            caseType:caseType,
            desc:values.desc
        }
        delete values.name
        delete values.desc

        if(props.name==="添加用例"){
            createApiScene(values).then(res=>{
                if(res.code===0){
                    findPage()
                }
            })
        }else {
            values.id=apiSceneId;
            updateApiScene(values).then(res=>{
                if(res.code===0){
                    findPage();
                }
            })
        }

        setVisible(false);
    };

    const onCancel = () => setVisible(false);

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

export default inject("apiSceneStore")(observer(ApiSceneEdit));