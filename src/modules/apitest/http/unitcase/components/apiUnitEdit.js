import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select, message} from 'antd';

const {Option} = Select;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const ApiUnitEdit = (props) => {
    const { apiUnitStore, apiUnitId,categoryStore,caseType } = props;
    const {
        findApiUnitList,
        findApiUnit,
        createApiUnit,
        updateApiUnit,
    } = apiUnitStore;
    const {findCategoryListTree} = categoryStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    const testType=localStorage.getItem("testType");
    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        if(props.type === "edit"){
            findApiUnit(apiUnitId).then((res)=>{
                form.setFieldsValue({
                    name: res.testCase.name,
                    methodType:res.methodType,
                    path:res.path,
                    desc:res.testCase.desc
                })
            })
        }

        setVisible(true);
    };

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();

        if(props.type !== "edit" ){
            values.testCase={
                category:{id:categoryId},
                name:values.name,
                testType:testType,
                caseType:caseType,
                desc:values.desc
            }

            delete values.name
            delete values.desc

            createApiUnit(values).then(res=>{
                if(res.code===0){
                    findPage()
                    findCategoryPage()
                }else {
                    message.error('This is an error message');
                }
            });
        }else{
            values.id=apiUnitId;
            values.testCase={
                id:apiUnitId,
                name:values.name,
                desc:values.desc
            }

            delete values.name
            delete values.desc

            updateApiUnit(values).then(res=>{
                if(res.code===0){
                    findPage()
                    findCategoryPage()
                }else {
                    message.error('This is an error message');
                }
            });
        }
        setVisible(false);
    };

    const findPage=()=>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findApiUnitList(param)
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
                        label="类型"
                        rules={[{ required: true, }]}
                        name="methodType"
                    >
                        <Select>
                            <Option value='post'>post</Option>
                            <Option value='get'>get</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        rules={[{ required: true }]}
                        name="path"
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

export default inject('apiUnitStore',"categoryStore")(observer(ApiUnitEdit));
