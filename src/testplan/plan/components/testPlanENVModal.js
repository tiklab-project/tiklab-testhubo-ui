/**
 * @description：测试计划中关联用例
 * @date: 2021-08-20 17:00
 */
import React, { useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Select, Tooltip} from 'antd';
import IconBtn from "../../../common/iconBtn/IconBtn";

const {Option} = Select

// 添加与编辑
const TestPlanENVModal = (props) => {
    const { testPlanStore,apiEnvStore,appEnvStore} = props;
    const {findApiEnvList,apiEnvList,getTestEnvUrl,envUrl} = apiEnvStore;
    const {findAppEnvList,appEnvList,getAppEnv} = appEnvStore;

    const {setTestDrawerVisible} = testPlanStore
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    let repositoryId = sessionStorage.getItem("repositoryId")


    // 弹框展示
    const showModal = () => {
        form.setFieldsValue({
            api:envUrl
        })


        findAppEnvList(repositoryId)
        findApiEnvList(repositoryId)

        setVisible(true)
    };

    // 关闭弹框
    const onCancel = () => { setVisible(false) };

    const onFinish = async () => {
        let values = await form.validateFields()

        getTestEnvUrl(values.api)
        getAppEnv(values.app)

        setVisible(false)
        setTestDrawerVisible(true)
    }

    return (
        <>
            <IconBtn
                className="important-btn"
                name={"测试"}
                onClick={showModal}
            />
            <Modal
                destroyOnClose={true}
                title='测试设置'
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="开始测试"
                cancelText="取消"
                centered
                width={500}
                // footer={false}
            >
                <Form
                    form={form}
                    preserve={false}
                    layout={"vertical"}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="接口环境"
                        rules={[{ required: true, message:"请选择环境"}]}
                        name="api"
                    >
                        <Select
                            bordered={false}
                            className={"quartz-select-box"}
                            placeholder={"未设置环境"}
                        >
                            {
                                apiEnvList&&apiEnvList.map(item=>{
                                    return (
                                        <Option key={item.id} value={item.preUrl}>
                                            <Tooltip placement="leftTop" title={item.preUrl}> {item.name} </Tooltip>
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="APP环境"
                        // rules={[{ required: true, }]}
                        name="app"
                    >
                        <Select
                            bordered={false}
                            className={"quartz-select-box"}
                            placeholder={"未设置环境"}
                        >
                        {
                            appEnvList&&appEnvList.map(item=>{
                                return (
                                    <Option key={item.id} value={item.id}>
                                        <Tooltip placement="leftTop" title={item.id}> {item.name} </Tooltip>
                                    </Option>
                                )
                            })
                        }
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default inject('apiEnvStore',"testPlanStore","appEnvStore")(observer(TestPlanENVModal));
