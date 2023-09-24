import React, {useState} from 'react';
import { observer } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';
import IconCommon from "../../../../common/IconCommon";
import variableStore from "../store/VariableStore";
const {
    findVariable,
    createVariable,
    updateVariable,
} = variableStore;

const {TextArea} = Input

// 添加与编辑
const VariableEdit = (props) => {
    const { variableId,belongId,findPage ,type} = props;

    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false);


    // 弹框展示
    const showModal = async () => {
        if(type === "edit") {
            const res = await findVariable(variableId)

            form.setFieldsValue({
                name: res.name,
                value: res.value,
                desc:res.desc
            })
        }
        setVisible(true);
    };

    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields()
        values.belongId=belongId;
        values.type="string"
        if(props.type === "edit" ){
            values.id=variableId;
            updateVariable(values).then(()=>findPage());
        }else{
            createVariable(values).then(()=>findPage());
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                type === "edit"
                    ?<IconCommon
                        icon={"bianji11"}
                        className={"icon-s edit-icon"}
                        onClick={showModal}
                    />
                    : <Button className="important-btn" onClick={showModal}>添加变量</Button>
            }

            <Modal
                destroyOnClose={true}
                title={ type==="edit"?"编辑":"添加变量"}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    form={form}
                    preserve={false}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true, message:'名称未添加'}]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="值"
                        rules={[{ required: true, message:'值'}]}
                        name="value"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="desc"
                    >
                        <TextArea autoSize={{minRows: 3, maxRows: 3 }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default observer(VariableEdit);
