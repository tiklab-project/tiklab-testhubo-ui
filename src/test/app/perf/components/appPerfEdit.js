
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Input, TreeSelect} from 'antd';

// 添加与编辑
const AppPerfEdit = (props) => {
    const {appPerfStore,categoryStore  } = props;
    const {createAppPerf}=appPerfStore;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;

    const [form] = Form.useForm();

    const [categoryId, setCategoryId] = useState();
    const [visible, setVisible] = React.useState(false);

     const repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
         findCategoryListTreeTable(repositoryId)

         setVisible(true);
    };

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();

        if(props.type==="add"){
            values.testCase={
                category:{id:categoryId},
                repositoryId:repositoryId,
                name:values.name,
                testType:"perform",
                caseType:"app-perform",

            }

            delete values?.category
            delete values.name

            createAppPerf(values).then((res)=> {
                if(res.code===0){
                    sessionStorage.setItem(`appPerfId`,res.data);
                    props.history.push(`/repository/app-perform/${res.data}`)
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
                open={visible}
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
                        rules={[{ required: true, }]}
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

export default inject("appPerfStore","categoryStore")(observer(AppPerfEdit));