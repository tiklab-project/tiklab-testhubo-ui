import React, {useState} from "react"
import {Divider, Drawer, Form, Input, Table} from "antd";


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const AppPerformInstanceModal=(props) => {
    const {allData} = props;

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    let columns= [
        {
            title: '步骤数',
            width: '10%',
            dataIndex: 'stepNum',
            align:'center',
        },
        {
            title: '通过率',
            width: '10%',
            dataIndex: 'pass',
            align:'center',
        },
        {
            title: '通过步骤数',
            dataIndex: 'passNum',
            width: '8%',
            align:'center',
        },
        {
            title: '未通过步骤数',
            dataIndex: 'outNum',
            width: '15%',
            align:'center',
        },
        {
            title: '是否通过',
            width: '8%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text==='1'
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        }
    ]

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
                    <div className={"header-item"}>用例总详情</div>
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
                                <span className='test-detail-form-label'>用例数</span>
                                <Form.Item name="stepNum"><Input /></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>测试通过率</span>
                                <Form.Item name="pass"><Input /></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>通过用例数</span>
                                <Form.Item name="passNum"><Input /></Form.Item>
                            </div>
                            <div className={'test-detail-form-item'}>
                                <span className='test-detail-form-label'>未通过用例数</span>
                                <Form.Item name="outNum"><Input /></Form.Item>
                            </div>
                        </div>
                    </Form>
                    <Divider />
                    <div className={"scene-step-detail"}>
                        <div className={"header-item"}>用例列表</div>
                        <Table
                            columns={columns}
                            dataSource={allData?.stepList}
                            rowKey={record => record.id}
                            pagination={false}
                        />
                    </div>
                </div>
            </Drawer>

        </>
    )
}

export default AppPerformInstanceModal;
