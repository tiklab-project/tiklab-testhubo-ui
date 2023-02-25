import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';
import IconCommon from "../../../common/iconCommon";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const AgentConfigEdit = (props) => {
    const { agentConfigStore, agentConfigId } = props;
    const {
        findAgentConfig,
        createAgentConfig,
        updateAgentConfig,
        findAgentConfigList
    } = agentConfigStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const repositoryId= sessionStorage.getItem('repositoryId')

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
            values.repositoryId=repositoryId;
            createAgentConfig(values).then(()=>findAgentConfigList(repositoryId));
        }else{
            values.id=agentConfigId;
            updateAgentConfig(values).then(()=>findAgentConfigList(repositoryId));
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.type === "add"
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

export default inject('agentConfigStore')(observer(AgentConfigEdit));
