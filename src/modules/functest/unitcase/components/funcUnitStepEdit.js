import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const FuncUnitStepEdit = (props) => {
    const { funcUnitStepStore, funcUnitStepId,findPage } = props;
    const {
        findFuncUnitStep,
        createFuncUnitStep,
        updateFuncUnitStep
    } = funcUnitStepStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {
        
        if(props.type === "edit"){
            findFuncUnitStep(funcUnitStepId).then((res)=>{
                form.setFieldsValue({
                    described: res.described,
                    expect:res.expect,
                    actual:res.actual,
                })
            })
        }

        setVisible(true);
    };

    const funcUnitId = sessionStorage.getItem('funcUnitId')

    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields();
        values.funcUnitId=funcUnitId

        if(props.name === "添加步骤" ){
            createFuncUnitStep(values).then(()=>findPage(funcUnitId))
        }else{
            values.id=funcUnitStepId;
            updateFuncUnitStep(values).then(()=>findPage(funcUnitId))
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
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                    {...layout}
                >
                    <Form.Item
                        label="描述"
                        rules={[{ required: true, message:'名称未添加'}]}
                        name="described"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="预期结果"
                        name="expect"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="实际结果"
                        name="actual"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('funcUnitStepStore')(observer(FuncUnitStepEdit));
