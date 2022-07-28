
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input} from 'antd';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

// 添加与编辑
const FuncSceneEdit = (props) => {
    const {funcSceneStore, categoryStore,funcSceneId  } = props;
    const {findFuncSceneList,findFuncScene,createFuncScene,updateFuncScene} = funcSceneStore;
    const {findCategoryListTree} = categoryStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);


    const caseType=localStorage.getItem("caseType");
    const testType=localStorage.getItem("testType");
    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        if(props.type==="edit"){
            findFuncScene(funcSceneId).then(res=>{
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

            createFuncScene(values).then(()=> {
                findPage();
                findCategoryPage()
            })
        }else {
            values.id=funcSceneId;
            values.testCase={
                id:funcSceneId,
                name:values.name,
                desc:values.desc
            }
            delete values.name
            delete values.desc

            updateFuncScene(values).then(()=> {
                findPage();
                findCategoryPage()
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
        findFuncSceneList(param)
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

export default inject("funcSceneStore","categoryStore")(observer(FuncSceneEdit));