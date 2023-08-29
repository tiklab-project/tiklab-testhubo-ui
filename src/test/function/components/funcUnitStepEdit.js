import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Space} from 'antd';
import funcUnitStepStore from "../store/funcUnitStepStore";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

// 添加与编辑
const FuncUnitStepEdit = ({setData}) => {
    const {
        createFuncUnitStep,
        findFuncUnitStepList
    } = funcUnitStepStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {
        setVisible(true)
    };

    const functionId = sessionStorage.getItem('functionId')

    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields();
        values.funcUnitId=functionId
        createFuncUnitStep(values).then(()=> {
            findFuncUnitStepList(functionId).then(list=>{
                setData(list)
            })
        })
        setVisible(false)
        form.resetFields();
    };


    return (
        <div className={"function-edit_content"}>
            <Button
                className={`important-btn  ${visible?"function-edit_hide":"function-edit_show"}`}
                onClick={showModal}
            >
                添加步骤
            </Button>
            <div  className={`function-edit_form ${visible?"function-edit_show":"function-edit_hide"}`} >
                <Form
                    form={form}
                    onFinish={onFinish}
                    preserve={true}
                    layout="inline"
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
                    <Form.Item className={"function-edit_submit"}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <Button  onClick={()=>setVisible(false)}>
                                取消
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>

            </div>



        </div>
    );
};

export default observer(FuncUnitStepEdit);
