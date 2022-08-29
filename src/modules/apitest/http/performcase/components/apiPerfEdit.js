import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const ApiPerfEdit = (props) => {
    const { apiPerfStore,categoryStore,apiPerfId,caseType } = props;
    const { findApiPerfList,findApiPerf,createApiPerf,updateApiPerf}= apiPerfStore;
    const {findCategoryListTree}=categoryStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);

    const testType=localStorage.getItem("testType");
    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        if(props.type==="edit"){
            findApiPerf(apiPerfId).then(res=>{
                form.setFieldsValue({
                    name:res.testCase.name,
                    desc:res.testCase.desc,
                });
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
            
            createApiPerf(values).then(res=>{
                if(res.code===0){
                    findPage();
                    findCategoryPage()
                }
            })
        }else {
            values.id=apiPerfId;
            values.testCase={
                id:apiPerfId,
                name:values.name,
                desc:values.desc
            }
            delete values.name
            delete values.desc
            
            updateApiPerf(values).then(res=>{
                if(res.code===0){
                    findPage();
                    findCategoryPage()
                }
            })
        }

        setVisible(false);
    };

    const findPage=()=>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findApiPerfList(param)
    }

    const findCategoryPage = () =>{
        const params = {
            testType:testType,
            caseType:caseType,
            repositoryId:repositoryId
        }
        findCategoryListTree(params)
    }
    

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

export default inject("apiPerfStore","categoryStore")(observer(ApiPerfEdit));