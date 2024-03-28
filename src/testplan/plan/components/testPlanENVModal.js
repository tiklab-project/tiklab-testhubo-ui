/**
 * @description：测试计划中关联用例
 * @date: 2021-08-20 17:00
 */
import React, { useState} from 'react';
import { observer, inject } from "mobx-react";
import {Empty, Form, Modal, Select, Tooltip} from 'antd';
import IconBtn from "../../../common/iconBtn/IconBtn";
import testPlanDetailStore from "../store/testPlanDetailStore";
import {CASE_TYPE} from "../../../common/dictionary/dictionary";
import {messageFn} from "../../../common/messageCommon/MessageCommon";
import webImg from "../../../assets/img/web-plan.png";

const {Option} = Select

// 添加与编辑
const TestPlanENVModal = (props) => {
    const { testPlanStore,apiEnvStore,appEnvStore} = props;
    const {findApiEnvList,apiEnvList,getTestEnvUrl,envUrl} = apiEnvStore;
    const {findAppEnvList,appEnvList,getAppEnv} = appEnvStore;
    const {getCaseTypeNum} = testPlanDetailStore

    const {setTestDrawerVisible} = testPlanStore
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [showApiEnv, setShowApiEnv] = useState(false);
    const [showAppEnv, setShowAppEnv] = useState(false);

    const repositoryId = sessionStorage.getItem("repositoryId")
    const testPlanId = sessionStorage.getItem("testPlanId")

    // 弹框展示
    const showModal =async () => {
        //可执行用例
        let isExecutable = false;
        let isShowApiEnv = false;
        let isShowAppEnv = false;

        let caseTypeObj = await getCaseTypeNum(testPlanId)
        for (let key of Object.keys(caseTypeObj)) {
            if (key.includes("api") || key.includes("app") || key.includes("web")) {
                isExecutable = true;

                switch (key) {
                    case CASE_TYPE.API_UNIT:
                    case CASE_TYPE.API_SCENE:
                    case CASE_TYPE.API_PERFORM:
                        isShowApiEnv = true;
                        break;
                    case CASE_TYPE.APP_SCENE:
                        isShowAppEnv = true;
                        break;
                    default:
                        break;
                }

                // 如果已经找到需要的信息，就退出循环
                if (isShowApiEnv && isShowAppEnv) {
                    break;
                }
            }
        }


        if(isExecutable){
            if(isShowApiEnv){
                setShowApiEnv(true)
                findApiEnvList(repositoryId)
                form.setFieldsValue({
                    api:envUrl
                })
            }

            if(isShowAppEnv){
                setShowAppEnv(true)
                findAppEnvList(repositoryId)
            }

            setVisible(true)
        }else {
            messageFn("warning","暂无可执行用例")
        }
    };

    // 关闭弹框
    const onCancel = () => {
        setShowApiEnv(false)
        setShowAppEnv(false)
        setVisible(false)
    };

    const onFinish = async () => {
        let values = await form.validateFields()

        getTestEnvUrl(values.api)
        getAppEnv(values.app)

        setVisible(false)
        setTestDrawerVisible(true)
    }


    const showApiForm = ()=>{
        if(showApiEnv){
            return<Form.Item
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
        }
    }

    const showAppForm = ()=>{
        if(showAppEnv){
            return <Form.Item
                label="APP环境"
                rules={[{ required: true, message:"请选择环境"}]}
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
        }
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
                    {
                        showApiForm()
                    }
                    {
                        showAppForm()
                    }

                    {
                        showAppEnv||showApiEnv
                            ?null
                            :<Empty
                                imageStyle={{height: 120}}
                                description={<span> WEB用例直接执行</span>}
                                image={webImg}
                            />

                    }
                </Form>
            </Modal>
        </>
    );
};

export default inject('apiEnvStore',"testPlanStore","appEnvStore")(observer(TestPlanENVModal));
