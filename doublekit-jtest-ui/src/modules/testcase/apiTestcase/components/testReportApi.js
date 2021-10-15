/**
 * @description：web测试详情页
 * @date: 2021-09-7 11:13
 */
import React, {useState} from 'react';
import {Drawer, Form, Input, Button,Divider,Table} from 'antd'
import {inject, observer} from "mobx-react";
import TestResult from "../../../testReport/common/testResult";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};

const TestReportApi= (props) => {
    const {performCaseStore,stepStore,testInstanceStore,testcaseId} = props;
    const {performCase} = performCaseStore;
    const {selectItem} = stepStore
    const {findInstancesReposter,findApiResultByInstanceId} = testInstanceStore

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    let columns= [
        {
            title: '步骤名称',
            width: '25%',
            dataIndex: 'name',
            align:'center',
        },
        {
            title: '类型',
            width: '20%',
            dataIndex: 'stepType',
            align:'center',
        },
        {
            title: '路径',
            dataIndex: 'path',
            width: '25%',
            align:'center',
        },
        {
            title: '是否通过',
            width: '10%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text===200
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        },
        {
            title: '操作',
            width: '20%',
            dataIndex: 'action',
            align:'center',
            render: (text, record) => (
                <TestResult Id={record.id} name={'查看'}/>
            )
        }
    ]

    const repositoryId = localStorage.getItem('repositoryId');
    const userId = document.cookie.split(";")[4].split("=")[1];
    const [historyData,setHistoryData] = useState({});
    const [stepList,setStepList] = useState([]);
    const [isResult,setIsResult] = useState()
    //弹窗显示
    const showDrawer = () => {
        setVisible(true);
        if(props.name === '执行测试'){
            let param = {
                repositoryId:repositoryId,
                testCaseId:testcaseId,
                apiStepList:selectItem,
                userId:userId,
            }
            //执行测试接口
            performCase(param).then(res=>{
                let detail = res[0].testInstanceCollent;
                setHistoryData(res);
                setStepList(detail.stepList);
                setFieldsValues(detail)
            });
        }

        if(props.name === '测试历史') {
            findInstancesReposter(testcaseId).then(res=>{
                setHistoryData(res);
            })
        }
    };

    // 关闭弹框
    const onClose = () => {
        setVisible(false);
        setHistoryData({})
        setStepList([])
    }

    //历史详情
    const onHistoryItem = (id) =>{
        findApiResultByInstanceId(id).then(res=>{
            setStepList(res.stepList);
            setFieldsValues(res)
        })
    }

    const setFieldsValues = (res)=>{
        setIsResult(res.result)
        form.setFieldsValue({
            result:res.result==='succeed'?'成功':'失败',
            elapsedTime:res.elapsedTime,
            testNumber:res.testNumber,
            percentText:res.percentText,
            testPassNumber:res.testPassNumber,
            testNotPassNumber:res.testNotPassNumber
        })
    }

    //历史列表项
    const historyView = (data) => {
        return data.length>0&&data.map(item=>{
            return <div className='history-item' key={item.id} onClick={()=>onHistoryItem(item.id)}>
                {
                    item.result==='succeed'
                        ?<div className='history-item-result isSucceed'>通过</div>
                        :<div className='history-item-result isFailed'>未通过</div>
                }
                <div className='history-item-detail'>
                    <div>{item.createTime}</div>
                    <div>{item.user.name}</div>
                    <div>步骤数: {item.stepNum}</div>
                </div>
            </div>
        })
    }

    return (
        <>
            {
                props.name==='执行测试'
                    ?<Button className="important-btn" type="primary" onClick={showDrawer}>{props.name}</Button>
                    :<a style={{marginRight:10}}  onClick={showDrawer}>{props.name}</a>
            }

            <Drawer
                title="测试报告"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={1200}
                destroyOnClose={true}
            >
                <div className='test-detail-contant'>
                    <div className='test-detail-history'>
                        <div className='test-detail-history-title'>测试历史</div>
                        {
                            historyView(historyData)
                        }
                    </div>
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
                        <Divider />
                        <div className='test-detail-step-title'>步骤</div>
                        <div className='test-detail-step-list'>
                            <Table
                                columns={columns}
                                dataSource={stepList}
                                rowKey={record => record.id}
                                pagination={false}
                            />
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
}

export default inject('performCaseStore','stepStore','testInstanceStore')(observer(TestReportApi));
