/**
 * @description：APP测试详情页
 * @date: 2021-09-7 11:13
 */
import React, {useState} from 'react';
import {Drawer, Form, Input, Button,Divider} from 'antd'
import {inject, observer} from "mobx-react";
import AllStep from "./allStep";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};

const TestReportApp= (props) => {
    const {testInstanceStore,instanceId,testType} = props;
    const {findApiResultByInstanceId,findResultByInstanceId} = testInstanceStore;

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [stepList,setStepList] = useState([]);

    //弹窗显示
    const showDrawer = () => {
        if(testType === 'API') {
            findApiResultByInstanceId(instanceId).then(res=>{
                setFieldsValues(res)
                setStepList(res.stepList)
            })
        }else {
            findResultByInstanceId(instanceId).then(res=>{
                setStepList(res.objectList)
                setFieldsValues(res)
            })
        }
        setVisible(true);
    };

    // 关闭弹框
    const onClose = () => {
        setVisible(false);
        setStepList([])
    }


    const setFieldsValues = (res)=>{
        form.setFieldsValue({
            result:res.result==='succeed'?'成功':'失败',
            testNumber:res.testNumber,
            percentText:res.percentText,
            testPassNumber:res.testPassNumber,
            testNotPassNumber:res.testNotPassNumber
        })
    }


    return (
        <>
            {
                props.name==='执行测试'
                    ?<Button className="important-btn" onClick={showDrawer}>{props.name}</Button>
                    :<a style={{marginRight:10}}  onClick={showDrawer}>{props.name}</a>
            }

            <Drawer
                title="测试详情"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={1200}
                destroyOnClose={true}
            >
                <div className='test-WebUnitInstance'>
                    <div className='test-report-detail'>
                        <Form
                            initialValues={{ remember: true }}
                            form={form}
                            preserve={false}
                            {...layout}
                            // layout="inline"
                            labelCol={{ style: { width: '100%', height: '30px' } }} //label样式
                            labelAlign="left" //label样式
                        >
                            <div className='test-detail-from'>
                                <div className={'test-detail-form-item'}>
                                    <span className='test-detail-form-label'>测试结果</span>
                                    <Form.Item name="result"><Input /></Form.Item>
                                </div>
                                <div className={'test-detail-form-item'}>
                                    <span className='test-detail-form-label'>步骤数</span>
                                    <Form.Item name="testNumber"><Input /></Form.Item>
                                </div>
                                <div className={'test-detail-form-item'}>
                                    <span className='test-detail-form-label'>测试通过率</span>
                                    <Form.Item name="percentText"><Input /></Form.Item>
                                </div>
                                <div className={'test-detail-form-item'}>
                                    <span className='test-detail-form-label'>通过步骤数</span>
                                    <Form.Item name="testPassNumber"><Input /></Form.Item>
                                </div>
                                <div className={'test-detail-form-item'}>
                                    <span className='test-detail-form-label'>未通过步骤数</span>
                                    <Form.Item name="testNotPassNumber"><Input /></Form.Item>
                                </div>
                            </div>
                        </Form>
                        <Divider />
                        <div className='test-detail-step-title'>步骤</div>
                        <div className='test-detail-step-list'>
                            <AllStep
                                dataSource={stepList}
                                type={testType}
                            />
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
}

export default inject('appStepStore','testInstanceStore')(observer(TestReportApp));
