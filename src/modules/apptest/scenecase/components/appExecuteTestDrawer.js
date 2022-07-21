import React, {useState} from "react";
import {Button, Divider, Drawer, Form, Input, Spin, Table} from "antd";


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const AppExecuteTestDrawer =(props)=>{
    const {appSceneStore,appSceneId} = props;
    const {appSceneTestDispatch} = appSceneStore;

    const [visible, setVisible] = useState(false);
    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);

    const [form] = Form.useForm();

    let columns= [
        {
            title: '操作方法',
            width: '8%',
            dataIndex: 'actionType',
            align:'center',
        },
        {
            title: '参数',
            width: '10%',
            dataIndex: 'parameter',
            align:'center',
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '8%',
            align:'center',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationValue',
            width: '15%',
            align:'center',
        },
        {
            title: '是否通过',
            width: '8%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text===1
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        },
    ]

    const showDrawer = () => {
        appSceneTestDispatch({appSceneId:appSceneId}).then(res=>{

            if(res.code !==0) return;

            let data = res.data;
            setAppStepList(data.appSceneInstanceStepList);

            let instance = data.appSceneInstance;
             form.setFieldsValue({
                 result:instance?.result,
                 stepNum:instance?.stepNum,
                 passNum:instance?.passNum,
                 failNum:instance?.failNum,
                 passRate:instance?.passRate,
             })

            setSpinning(false)
        })


        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}> 测试 </Button>
            <Drawer
                title="App测试详情"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={1240}
                maskClosable={false}
            >
                <Spin spinning={spinning}>
                    <div className={"unit-instance-detail"}>
                        <div className={"header-item"}>步骤总详情</div>
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
                        <Divider />
                        <div className={"header-item"}>步骤列表</div>
                        <div className='test-detail-step-list'>
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

export default AppExecuteTestDrawer;