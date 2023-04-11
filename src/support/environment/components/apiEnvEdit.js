
import React from 'react';
import { observer, inject } from "mobx-react";
import { Form, Modal, Button, Input } from 'antd';
import IconCommon from "../../../common/IconCommon";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};


// 添加与编辑空间
const ApiEnvEdit = (props) => {
    const { apiEnvStore, apiEnvId } = props;
    const { 
        findApiEnv,
        createApiEnv,
        updateApiEnv,
        findApiEnvList
     } = apiEnvStore;

    const [form] = Form.useForm();
    
    const [visible, setVisible] = React.useState(false);

    let repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.type === "edit"){
            findApiEnv(apiEnvId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    preUrl:res.preUrl
                })
            })
        }
    };
    
    // 提交
    const onFinish =async () => {
        let values = await form.validateFields()

        if(props.type === "add" ){
            values.repositoryId=repositoryId;
            createApiEnv(values).then(()=>{
                findApiEnvList(repositoryId);
            });
        }else{
            values.id=apiEnvId;
            updateApiEnv(values).then(()=>{
                findApiEnvList(repositoryId);
            });
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
        {
            props.type === 'add'
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
            // footer={null}
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
                    label="环境名称"
                    rules={[{ required: true, message: '环境名' }]}
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="环境地址"
                    rules={[{ required: true, message: '环境地址' }]}
                    name="preUrl"
                >
                     <Input />
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export default inject('apiEnvStore')(observer(ApiEnvEdit));
