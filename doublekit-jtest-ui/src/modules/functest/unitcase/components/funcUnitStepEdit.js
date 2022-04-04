import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';

const {Option} = Select;
const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const FunctionalStepEdit = (props) => {
    const { functionalTestStepStore, functionalStepId } = props;
    const {
        findFunctionalStep,
        createFunctionalStep,
        updateFunctionalStep
    } = functionalTestStepStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const testcaseId = localStorage.getItem('testcaseId')
    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.name === "编辑"){
            findFunctionalStep(functionalStepId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    expectResult:res.expectResult,
                    actualResult:res.actualResult,
                })
            })
        }
    };

    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields();
        values.testCase={id:testcaseId};
        if(props.name === "添加步骤" ){
            createFunctionalStep(values)
        }else{
            values.id=functionalStepId;
            updateFunctionalStep(values);
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.name === "添加步骤"
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
                        rules={[{ required: true, message:'名称未添加'}]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="预期结果"
                        name="expectResult"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="实际结果"
                        name="actualResult"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('functionalTestStepStore')(observer(FunctionalStepEdit));
