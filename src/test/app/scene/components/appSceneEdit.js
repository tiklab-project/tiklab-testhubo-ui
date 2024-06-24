
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal,Input, TreeSelect} from 'antd';


// 添加与编辑
const AppSceneEdit = (props) => {
    const { appSceneStore,categoryStore,findPage } = props;
    const {createAppScene} = appSceneStore;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;
    
    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false);
    const [categoryId, setCategoryId] = useState();
    
    
    const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        findCategoryListTreeTable(repositoryId)
        
        setVisible(true);
    };


    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();

        if(props.type ==="add"){
            values.testCase={
                category:{id:categoryId},
                repositoryId:repositoryId,
                name:values.name,
                testType:"ui",
                caseType:"app-scene",
                desc:values.desc
            }

            delete values?.category
            delete values.name
            delete values.desc

            createAppScene(values).then((res)=> {
                if(res.code===0){
                    findPage&&findPage()
                    sessionStorage.setItem(`appSceneId`,res.data);
                    props.history.push(`/repository/app-scene/${res.data}`)
                }
            })
        }

        setVisible(false);
    };



    //获取分组id
    const changeCategory=(value)=> {
        //获取最后数组最后一位值
        setCategoryId(value)
    }

    const onCancel = () => { setVisible(false) };

    return (
        <>
            <a onClick={showModal}>{props.name}</a>

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
                    layout={"vertical"}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true, message: '请输入名称!' }]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="模块"
                        name="category"
                    >
                        <TreeSelect
                            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                            style={{  width: '100%'}}
                            value={categoryId}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            placeholder="请选择模块"
                            allowClear
                            treeDefaultExpandAll
                            onChange={changeCategory}
                            treeData={categoryTableList}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject("appSceneStore","categoryStore")(observer(AppSceneEdit));