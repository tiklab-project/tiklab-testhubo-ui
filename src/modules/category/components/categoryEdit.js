import React, { Fragment, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Form, Input, Button} from 'antd';

// 目录的编辑与添加
const CategoryEdit =(props)=>{
    const { categoryStore,categoryId } = props;
    const {
        findCategory,
        createCategory,
        updateCategory,
    } = categoryStore;

    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();

    const [curCategoryId, setCurCategoryId] = useState();

    const repositoryId = sessionStorage.getItem('repositoryId');

    // 弹框展示
    const showModal = async () => {
        if(props.type === "edit"){
            let res = await findCategory(categoryId)
            form.setFieldsValue({ name: res.name })

            setCurCategoryId(res.id)
        }

        setVisible(true);
    };

    // 收起弹框
    const hideModal = () => {setVisible(false)};

    // 弹框提交
    const onFinish = async () => {
        let values = await form.validateFields();
        values.repository = { id:repositoryId }

        if(props.type === 'edit'){
            values.id=curCategoryId
            updateCategory(values).then(()=>{
                props.findList()
            });
        }else{
            values.parentCategory = { id:categoryId }
            createCategory(values).then(()=>{
                props.findList()
            });
        }

        setVisible(false)
    };

    return(
        <Fragment>
            <a onClick={showModal}>{props.name}</a>
            <Modal
                title={props.type==="edit"?"编辑":"添加"}
                visible={visible}
                onCancel={hideModal}
                destroyOnClose={true}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    form={form}
                    preserve={false}
                    onFinish={onFinish}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="目录名称"
                        name="name"
                        rules={[{ required: true, message: '请输入目录名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )

}

export default inject('categoryStore')(observer(CategoryEdit));
