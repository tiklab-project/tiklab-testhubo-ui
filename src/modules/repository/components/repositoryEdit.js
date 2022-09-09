import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';
import {getUser} from "tiklab-core-ui";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const RepositoryEdit = (props) => {
    const { repositoryStore, repositoryId } = props;
    const {
        findRepositoryList,
        findRepository,
        createRepository,
        updateRepository,
        menuSelected
    } = repositoryStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => {
        if(props.name === "编辑"){
            findRepository(repositoryId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    desc:res.desc
                })
            })
        }
        setVisible(true);
    };

    // 提交
    const onFinish =async () => {
        let values =  await form.validateFields()
        if(props.name === "添加项目" ){
            createRepository(values).then(()=> {
                menuSelected("create")
                props.history.push("/repository/create")
            });
        }else{
            values.id=repositoryId;
            updateRepository(values).then(()=>findRepositoryList({userId:userId}));
        }
        setVisible(false);
    };

    const userId = getUser().userId;


    const onCancel = () => { setVisible(false) };

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
                    form={form}
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
                        label="说明"
                        name="desc"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('repositoryStore')(observer(RepositoryEdit));
