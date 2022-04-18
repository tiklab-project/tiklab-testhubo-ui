import React, {useState} from "react"
import {Divider, Drawer, Form, Input} from "antd";


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const WebPerformInstanceModal=(props) => {
    const {allData} = props;

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);


    const showDrawer = () => {
        form.setFieldsValue({
            result:allData.result,
            stepNum:allData.stepNum,
            pass:allData.pass,
            passNum:allData.passNum,
            outNum:allData.outNum
        })
        setVisible(true);
    }

    // 关闭弹框
    const onClose = () => {
        setVisible(false);
    }

    return (
        <>
            <a style={{marginRight:10}}  onClick={showDrawer}>{props.name}</a>
            <Drawer
                title={props.name}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={1200}
                destroyOnClose={true}
            >
                <div className={"scene-step-detail"}>
                    <div className={"header-item"}>用例详情</div>
                    <Form
                        initialValues={{ remember: true }}
                        form={form}
                        preserve={false}
                        {...layout}
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
                                <Form.Item name="stepNum"><Input /></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>测试通过率</span>
                                <Form.Item name="pass"><Input /></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>通过步骤数</span>
                                <Form.Item name="passNum"><Input /></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>未通过步骤数</span>
                                <Form.Item name="outNum"><Input /></Form.Item>
                            </div>
                        </div>
                    </Form>
                    <Divider />
                    <div className={"header-item"}>步骤列表</div>
                    <div className={"scene-step-detail"}>
                        <div className={"header-item"}>用例详情</div>
                        <div className={"scene-step-detail-box"}>
                            <div className={"scene-step-detail-contant"}>
                                <div className={"scene-step-detail-item"}>
                                    <div>结果</div>
                                    <div className={"scene-step-detail-item-value"}>{allData.result}</div>
                                </div>

                                <div className={"scene-step-detail-item"}>
                                    <div>步骤数</div>
                                    <div className={"scene-step-detail-item-value"}>{allData.step}</div>
                                </div>
                                <div className={"scene-step-detail-item"}>
                                    <div>测试通过率</div>
                                    <div className={"scene-step-detail-item-value"}>{allData.passRate}</div>
                                </div>
                            </div>
                            <div className={"scene-step-detail-contant"}>

                                <div className={"scene-step-detail-item"}>
                                    <div>通过步骤数</div>
                                    <div className={"scene-step-detail-item-value"}>{allData.successNum}</div>
                                </div>
                                <div className={"scene-step-detail-item"}>
                                    <div>未通过步骤数</div>
                                    <div className={"scene-step-detail-item-value"}>{allData.errorNum}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>

        </>
    )
}

export default WebPerformInstanceModal;
