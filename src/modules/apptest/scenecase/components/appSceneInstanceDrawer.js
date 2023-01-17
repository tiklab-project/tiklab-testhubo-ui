import React, {useState} from "react";
import { Drawer, Form, Input, Spin, Table} from "antd";
import IconCommon from "../../../common/iconCommon";
import {inject, observer} from "mobx-react";


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const AppSceneInstanceDrawer =(props)=>{
    const {appSceneInstanceStore,appSceneInstanceId} = props;
    const { findAppSceneInstance } = appSceneInstanceStore;

    const [visible, setVisible] = useState(false);
    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);

    const [form] = Form.useForm();

    let columns= [
        {
            title: '操作方法',
            width: '10%',
            dataIndex: 'actionType',
        },
        {
            title: '参数',
            width: '15%',
            dataIndex: 'parameter',
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '10%',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationValue',
            width: '30%',
        },
        {
            title: '是否通过',
            width: '10%',
            dataIndex: 'result',
            render: (text) => (
                text===1
                    ?<div  className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div  className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },
    ]

    const showDrawer = async () => {
        let res = await findAppSceneInstance(appSceneInstanceId)

        form.setFieldsValue({
            result:res?.result===1?"成功":"失败",
            stepNum:res?.stepNum,
            passNum:res?.passNum,
            failNum:res?.failNum,
            passRate:res?.passRate,
        })

        setAppStepList(res.stepList)
        setVisible(true);
        setSpinning(false);
    };

    const onClose = () => {
        setVisible(false);

        setSpinning(true);
        setAppStepList([])
    };

    return (
        <>
            <IconCommon
                icon={"lishi"}
                className={"icon-s "}
                style={{margin:"5px 0 0 0",cursor:"pointer"}}
                onClick={showDrawer}
            />
            <Drawer
                title="App场景历史"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={1240}
                maskClosable={false}
                destroyOnClose={true}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            >
                <Spin spinning={spinning}>
                    <div className={"unit-instance-detail"}>
                        <div className={"header-item"}>步骤总详情</div>
                        <div style={{padding:"10px 0 "}}>
                            <Form
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
                                        <Form.Item name="passRate"><Input /></Form.Item>
                                    </div>
                                    <div className={'test-detail-form-item'}>
                                        <span className='test-detail-form-label'>通过步骤数</span>
                                        <Form.Item name="passNum"><Input /></Form.Item>
                                    </div>
                                    <div className={'test-detail-form-item'}>
                                        <span className='test-detail-form-label'>未通过步骤数</span>
                                        <Form.Item name="failNum"><Input /></Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className={"header-item"}>步骤列表</div>
                        <div className='table-list-box' style={{margin: "10px"}}>
                            <Table
                                columns={columns}
                                dataSource={appStepList}
                                rowKey={record => record.index}
                                pagination={false}
                            />
                        </div>
                    </div>
                </Spin>
            </Drawer>
        </>
    );
}

export default inject("appSceneInstanceStore")(observer(AppSceneInstanceDrawer));