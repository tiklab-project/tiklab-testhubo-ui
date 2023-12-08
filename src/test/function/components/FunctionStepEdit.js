import React from 'react';
import { observer } from "mobx-react";
import {Form,  Button, Input, Space,Modal} from 'antd';
import funcUnitStepStore from "../store/funcUnitStepStore";

const { TextArea } = Input;

/**
 * 添加
 */
const FunctionStepEdit = ({findList,type,stepId}) => {
    const {createFuncUnitStep} = funcUnitStepStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);

    /**
     * 展示添加项
     */
    const showModal = async () => {
        setVisible(true)
    };

    const functionId = sessionStorage.getItem('functionId')

    /**
     * 提交
     */
    const onFinish =async () => {
        let values =  await form.validateFields();
        values.funcUnitId=functionId

        await createFuncUnitStep(values)
        await findList();

        setVisible(false)
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            <Button className={"important-btn"} onClick={showModal}>添加步骤</Button>
            <Modal
                destroyOnClose={true}
                title={type==="add"?"添加步骤":"编辑步骤"}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={500}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="描述"
                        rules={[{ required: true, message:'名称未添加'}]}
                        name="described"
                    >
                        <TextArea
                            placeholder="描述"
                            autoSize={{minRows:2,maxRows:4}}
                        />
                    </Form.Item>
                    <Form.Item
                        label="预期结果"
                        name="expect"
                    >
                        <TextArea
                            placeholder="预期结果"
                            autoSize={{minRows:2,maxRows:4}}
                        />
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    label="实际结果"*/}
                    {/*    name="actual"*/}
                    {/*>*/}
                    {/*    <TextArea*/}
                    {/*        placeholder="预期结果"*/}
                    {/*        autoSize={{minRows:2,maxRows:4}}*/}
                    {/*    />*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </>

    );
};

export default observer(FunctionStepEdit);
