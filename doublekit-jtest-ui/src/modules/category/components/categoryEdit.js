import React, { Fragment, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Form, Input, Button} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 目录的编辑与添加
const CategoryEdit =(props)=>{
    const { categoryStore } = props;
    const {
        findCategory,
        createCategory,
        updateCategory,
    } = categoryStore;

    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();


    const [parentCategory,setParentCategory] = useState()

    const repositoryId = localStorage.getItem('repositoryId');
    // 弹框展示
    const showModal = () => {
        setVisible(true);
        if(props.name === "编辑"){
            findCategory(props.categoryId).then((res)=>{
                setParentCategory(res.parentCategory?.id)
                form.setFieldsValue({
                    name: res.name,
                    desc:res.desc
                })
            })
        }
    };


    // 收起弹框
    const hideModal = () => {setVisible(false)};

    // 弹框提交
    const onFinish = () => {
        form.validateFields().then((values)=>{
            values.repository = {
                id:repositoryId,
            }
            if(props.name === '添加模块'||props.name === '添加子模块'){
                values.parentCategory = {
                    id:props.categoryId,
                }
                createCategory(values);
            }else{
                values.parentCategory={
                    id:parentCategory
                }
                values.id=props.categoryId
                updateCategory(values);
            }
        })
        setVisible(false)
    };

    return(
        <Fragment>
            {
                props.name ==='添加模块'
                    ?<Button  className="important-btn" onClick={showModal}>{props.name}</Button>
                    :<a onClick={showModal}>{props.name}</a>
            }
            <Modal
                title="添加模块"
                visible={visible}
                onCancel={hideModal}
                destroyOnClose={true}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    {...layout}
                    name="basic"
                    form={form}
                    preserve={false}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="目录名称"
                        name="name"
                        rules={[{ required: true, message: 'Please input your catalogename!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="目录名称" name="desc"><Input /></Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )

}

export default inject('categoryStore')(observer(CategoryEdit));
