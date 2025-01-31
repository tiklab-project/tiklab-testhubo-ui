import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal,  Input, Select, TreeSelect} from 'antd';
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";

const {Option} = Select;

// 添加与编辑
const ApiUnitEdit = (props) => {
    const { apiUnitStore, categoryStore,findPage} = props;
    const {createApiUnit} = apiUnitStore;
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

        if(props.type === "add" ){
            values.testCase={
                category:{id:categoryId},
                repositoryId:repositoryId,
                name:values.name,
                testType:"api",
                caseType:"api-unit",
                desc:values.desc
            }

            delete values?.category
            delete values.name
            delete values.desc

            createApiUnit(values).then(res=>{
                if(res.code===0){
                    findPage&&findPage()
                    sessionStorage.setItem(`apiUnitId`,res.data);
                    props.history.push(`/project/${res.data}/apiUnit`)
                }else {
                    messageFn("error",'创建失败');
                }
            });
        }


        setVisible(false);
    };



    const changeCategory=(value)=> {
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
                width={500}
            >
                <Form
                    form={form}
                    preserve={false}
                    layout={"vertical"}
                    initialValues={{ methodType: "get" }}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true,  message:"请添加名称" }]}
                        name="name"
                    >
                        <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        rules={[{ required: true, message:"请添加名称" }]}
                        name="methodType"
                    >
                        <Select>
                            <Option value='post'>post</Option>
                            <Option value='get'>get</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        rules={[{ required: true, message:"请添加地址" }]}
                        name="path"
                    >
                        <Input placeholder="请输入地址"/>
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

export default inject('apiUnitStore',"categoryStore")(observer(ApiUnitEdit));
