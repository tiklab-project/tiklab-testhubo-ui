
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const WebUnitEdit = (props) => {
    const { webUnitStore,caseType,testType,findPage,webUnitId,categoryStore} = props;
    const { createWebUnit,updateWebUnit ,findWebUnit} = webUnitStore
    const {findCategoryListTree} = categoryStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = localStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {

        if(props.type==="edit"){
            findWebUnit(webUnitId).then(res=>{
                form.setFieldsValue({
                    name:res.testCase.name,
                    desc:res.testCase.desc
                })
            })
        }

        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();


        if(props.type!=="edit"){
            values.testCase={
                category:{id:categoryId},
                name:values.name,
                testType:testType,
                caseType:caseType,
                desc:values.desc
            }
            delete values.name
            delete values.desc

            createWebUnit(values).then(()=> {
                findPage();

                const params = {
                    testType:testType,
                    caseType:caseType,
                    repositoryId:repositoryId
                }
                findCategoryListTree(params)
            })
        }else {
            values.id=webUnitId;
            values.testCase={
                id:webUnitId,
                name:values.name,
                desc:values.desc
            }
            updateWebUnit(values).then(()=> {
                debugger
                findPage()
                const params = {
                    testType:testType,
                    caseType:caseType,
                    repositoryId:repositoryId
                }
                findCategoryListTree(params)
            })
        }


        setVisible(false);
    };

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
                    name="basic"
                    initialValues={{ remember: true }}
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                    {...layout}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true, }]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="desc"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject("webUnitStore","categoryStore")(observer(WebUnitEdit));