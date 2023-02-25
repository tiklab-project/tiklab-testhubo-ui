import React from "react";
import {Form, Input} from "antd";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const ApiSceneTest = (props) =>{
    const {showResponse} = props;
    const [form] = Form.useForm();

    return(
        <>
            <div className={`test-response-after  ${showResponse === true? 'test-response-show':'test-response-hide'}`}>
                <div className={"apiscene-test"}>
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
                            <div className={`test-detail-form-item isSucceed`}>
                                <span className='test-detail-form-label'>测试结果</span>
                                <Form.Item name="result"><Input disabled/></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>耗时</span>
                                <Form.Item name="elapsedTime"><Input disabled/></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>步骤数</span>
                                <Form.Item name="testNumber"><Input disabled/></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>测试通过率</span>
                                <Form.Item name="percentText"><Input disabled/></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>通过步骤数</span>
                                <Form.Item name="testPassNumber"><Input disabled/></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>未通过步骤数</span>
                                <Form.Item name="testNotPassNumber"><Input disabled/></Form.Item>
                            </div>
                        </div>
                    </Form>


                </div>
            </div>
            <div className={`test-response-before  ${showResponse === true? 'test-response-hide':'test-response-show'}`}>
                <div className="test-response-before-alert">
                    点击<span>测试</span>按钮发送请求
                </div>
            </div>
        </>
    )
}

export default ApiSceneTest;