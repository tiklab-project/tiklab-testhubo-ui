import React from 'react';
import { observer } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';
import IconCommon from "../../../common/IconCommon";
import agentConfigStore from "../store/AgentConfigStore";

// 添加与编辑
const AgentConfigEdit = (props) => {
    const { agentConfigId } = props;
    const {
        findAgentConfig,
        createAgentConfig,
        updateAgentConfig,
        findAgentConfigList
    } = agentConfigStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = async () => {
        if(props.type === "edit") {
            const res = await findAgentConfig(agentConfigId)

            form.setFieldsValue({
                name: res.name,
                url: res.url
            })
        }
        setVisible(true);
    };

    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields()
        if(props.type === "add" ){
            createAgentConfig(values).then(()=>findAgentConfigList());
        }else{
            values.id=agentConfigId;
            updateAgentConfig(values).then(()=>findAgentConfigList());
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.type === "add"
                    ? <Button className="important-btn" type="primary" onClick={showModal}>{props.name}</Button>
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
                    preserve={false}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true, message:'请添加名称'}]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="url"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default observer(AgentConfigEdit);
