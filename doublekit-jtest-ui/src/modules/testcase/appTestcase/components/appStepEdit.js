/**
 * @description：appUI的添加与编辑
 * @date: 2021-09-06 16:16
 */
import React from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Select} from 'antd';

const {Option,OptGroup} = Select;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

const AppStepEdit = (props) => {
    const { appStepStore, appStepId } = props;
    const {
        findAppStep,
        createAppStep,
        updateAppStep,
        findAllLocation,
        findTestDictionariesList,
        locationList,
        fuctionList
    } = appStepStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);

    //定位器下拉选择框渲染
    const locationView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
            >
                {
                    data&&data.map(item=>{
                        return <Option key={item} value={item}>{item}</Option>
                    })
                }
                <Option>{' '}</Option>
            </Select>
        )
    }

    //操作方法下拉选择框渲染
    const functionView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
            >
                {
                    data&&data.map(item=>{
                        return <Option key={item.name} value={item.name}>
                            <div>{item.name}</div>
                            <div style={{color:'#a9a9a9',fontSize:12}}>{item.description}</div>
                        </Option>
                    })
                }
            </Select>
        )
    }

    // 弹框展示
    const showModal = () => {
        findAllLocation();
        findTestDictionariesList({type:'APP'});
        if(props.name === "编辑"){
            findAppStep(appStepId).then((res)=>{
                form.setFieldsValue({
                    location: res.location,
                    locationPrice:res.locationPrice,
                    testDictionaries:res.testDictionaries,
                    parament:res.parament,
                    stepAction:res.stepAction,
                    expectedResult:res.expectedResult
                })
            })
        }
        setVisible(true);
    };

    const testcaseId = localStorage.getItem('testcaseId')

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();
        values.testCase={id:testcaseId};
        // values.testDictionaries={
        //     code:values.function
        // }
        if(props.name === "添加步骤" ){
            createAppStep(values);
        }else{
            debugger
            values.id=appStepId;
            updateAppStep(values);
        }
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            {
                props.btn === "btn" ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
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
                width={600}
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
                        label="操作方法"
                        rules={[{ required: true }]}
                        name="testDictionaries"
                    >
                        {
                            functionView(fuctionList)
                        }
                    </Form.Item>
                    <Form.Item
                        label="参数"
                        name="parament"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="定位器"
                        name="location"
                    >
                        {
                            locationView(locationList)
                        }
                    </Form.Item>
                    <Form.Item
                        label="定位器的值"
                        name="locationPrice"
                    >
                        <Input />
                    </Form.Item>

                    {/*<Form.Item label="步骤动作" name="stepAction"><Input /></Form.Item>*/}
                    <Form.Item
                        label="期望"
                        name="expectedResult"
                    >
                        {/* <Select>
                            <Option value="ok">ok</Option>
                            <Option value="error">error</Option>
                            <OptGroup label="定位器">
                                <Option value="id=">id</Option>
                                <Option value="error">css</Option>
                                <Option value="error">ok</Option>
                                <Option value="error">error</Option>
                                <Option value="error">ok</Option>
                                <Option value="error">error</Option>
                                <Option value="error">ok</Option>
                            </OptGroup>
                        </Select> */}
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default inject('appStepStore')(observer(AppStepEdit));
