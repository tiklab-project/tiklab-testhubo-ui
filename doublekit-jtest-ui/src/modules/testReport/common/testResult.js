/**
 * @description：
 * @date: 2021-08-13 10:03
 */
import React, {useState} from 'react';
import {Table, Form, Input, Modal, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import ReactJson from 'react-json-view';

const {TabPane} = Tabs;
const { TextArea } = Input;
const layout = {
    labelCol: {span: 3},
    wrapperCol: {span: 21},
};

const TestResult = (props) => {
    const {testInstanceStore,Id} =props;
    const {findApiInstanceDetail} = testInstanceStore;
    const [form] = Form.useForm();
    const columns = [
        {
            title: '来源',
            dataIndex: 'source',
            width: '15%',
            align:'center',
            render:(text,record) => ( setSelectValue(record.source))
        },{
            title: '属性',
            dataIndex: 'propertyName',
            width: '25%',
            align:'center',
        },{
            title: '比较符',
            width: '10%',
            dataIndex: 'comparator',
            align:'center',

        },{
            title: '值',
            width: '25%',
            dataIndex: 'value',
            align:'center',
        },{
            title: '结果',
            width: '15%',
            dataIndex: 'result',
            align:'center',
            render: (text) => {
                return text === 1 ? '成功' : '失败'
            }
        },
    ]


    const [visible, setVisible] = React.useState(false);
    const [assertList, setAssertList] = useState([])
    const [requestInstance,setRequestInstance]=useState({})
    const [responseInstance,setResponseInstance]=useState({})

    // 弹框展示
    const showModal = () => {
        setVisible(true);
        findApiInstanceDetail(Id).then((res)=>{
            setAssertList(res.assertInstanceList)
            setRequestInstance(res.requestInstance);
            setResponseInstance(res.responseInstance);
            form.setFieldsValue({
                requestType:res.requestInstance.requestType,
                url:res.requestInstance.requestBase,
                statusCode:res.statusCode,
                result: res.result === 1 ? '成功' : '失败',
                errMessage:res.errMessage
            })
        })
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
            <a onClick={showModal}>{props.name}</a>
            <Modal
                destroyOnClose={true}
                title={props.name}
                visible={visible}
                onCancel={onCancel}
                footer={false}
                width={650}
                centered
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    form={form}
                    preserve={false}
                    {...layout}
                >
                    <Form.Item label="请求方式" name="requestType">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="请求路径" name="url">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="状态码" name="statusCode">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="测试结果" name="result">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="错误信息" name="errMessage">
                        <TextArea rows={4} disabled/>
                    </Form.Item>
                    <div>输出结果</div>
                    <Tabs
                        defaultActiveKey="1"
                        type="card"
                    >
                        <TabPane tab="请求" key="1">
                            <ReactJson
                                src={requestInstance}
                                name={null}
                                displayDataTypes={false}
                                enableClipboard={false}
                            />
                        </TabPane>
                        <TabPane tab="响应" key="2">
                            <ReactJson
                                src={responseInstance}
                                name={null}
                                // theme="monokai"
                                displayDataTypes={false}
                                enableClipboard={false}
                            />
                        </TabPane>
                        <TabPane tab="断言" key="3">
                            <Table
                                dataSource={assertList}
                                columns={columns}
                                rowKey = {record => record.id}
                            />
                        </TabPane>
                    </Tabs>
                </Form>
            </Modal>
        </>
    )
}

export default inject('testInstanceStore')(observer(TestResult));
