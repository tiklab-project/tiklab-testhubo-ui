import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';
import IconCommon from "../../../common/IconCommon";
import funcUnitStepStore from "../store/funcUnitStepStore";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const FuncUnitStepEdit = (props) => {
    const { funcUnitStepId,findPage } = props;
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

    const functionId = sessionStorage.getItem('functionId')

    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields();
        values.funcUnitId=functionId

        if(props.name === "添加步骤" ){
            createFuncUnitStep(values).then(()=>findPage(functionId))
        }else{
            values.id=funcUnitStepId;
            updateFuncUnitStep(values).then(()=>findPage(functionId))
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.name === "添加步骤"
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

export default observer(FuncUnitStepEdit);
