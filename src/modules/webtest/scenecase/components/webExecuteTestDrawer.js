import React, {useState} from "react";
import {Button, Divider, Drawer, Form, Input, Spin, Table} from "antd";


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const WebExecuteTestDrawer =(props)=>{
    const {webSceneStore,webSceneId} = props;
    const {webSceneTestDispatch} = webSceneStore;

    const [visible, setVisible] = useState(false);
    const [spinning, setSpinning] = useState(true);
    const [webStepList, setWebStepList] = useState([]);

    const [form] = Form.useForm();

    let columns= [
        {
            title: '操作方法',
            width: '20%',
            dataIndex: 'actionType',
        },
        {
            title: '参数',
            width: '20%',
            dataIndex: 'parameter',
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '20%',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationValue',
            width: '20%',
        },
        {
            title: '是否通过',
            width: '20%',
            dataIndex: 'result',
            render: (text) => (
                text===1
                    ?<div  className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div  className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },
    ]

    const showDrawer = () => {
        webSceneTestDispatch({webSceneId:webSceneId}).then(res=>{

            if(res.code !==0) return;

            let data = res.data;
            setWebStepList(data.webUnitResultList);

            let instance = data.webSceneInstance;
             form.setFieldsValue({
                 result:instance?.result,
                 stepNum:instance?.stepNum,
                 passNum:instance?.passNum,
                 failNum:instance?.failNum,
                 passRate:instance?.passRate,
                 totalDuration:instance?.totalDuration
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
            <Button className={"important-btn"}  onClick={showDrawer}> 测试 </Button>
            <Drawer
                title="WEB场景测试"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={1240}
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
                        <div className='table-list-box' style={{margin:"10px"}}>
                            <Table
                                columns={columns}
                                dataSource={webStepList}
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

export default WebExecuteTestDrawer;