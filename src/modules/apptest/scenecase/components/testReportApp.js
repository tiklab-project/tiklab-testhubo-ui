/**
 * @description：APP测试详情页
 * @date: 2021-09-7 11:13
 */
import React, {useState} from 'react';
import {Drawer, Form, Input, Button,Divider,Table} from 'antd'
import {inject, observer} from "mobx-react";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};

const TestReportApp= (props) => {
    const {performCaseStore,appStepStore,testInstanceStore,testcaseId} = props;
    const {performCaseApp,findCaseAppResult} = performCaseStore;
    const {selectItem} = appStepStore
    const {findInstancesReposter,findResultByInstanceId} = testInstanceStore

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    let columns= [
        {
            title: '操作方法',
            width: '8%',
            dataIndex: 'testMethod',
            align:'center',
        },
        {
            title: '参数',
            width: '10%',
            dataIndex: 'parament',
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
            dataIndex: 'locationPrice',
            width: '30%',
            // align:'center',
            ellipsis:true
        },
        {
            title: '是否通过',
            width: '8%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text==='succeed'
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        },

    ]

    const repositoryId = localStorage.getItem('repositoryId');
    const userId = document.cookie.split(";")[4].split("=")[1];
    const [historyData,setHistoryData] = useState({});
    const [stepList,setStepList] = useState([]);

    //弹窗显示
    const showDrawer = () => {
        onHistory(testcaseId)
        if(props.name === '执行测试'){
            let performParam = {
                repositoryId:repositoryId,
                testCaseId:testcaseId,
                appStepList:selectItem,
                userId:userId
            }
            performCaseApp(performParam);
            let resultParam = {
                testCaseId:testcaseId,
                userId:userId
            }
            let timer = setInterval(()=>{
                findCaseAppResult(resultParam).then(res=>{
                    if (res.executeType === 'end') {
                        clearInterval(timer)
                        onHistory(testcaseId)
                    }
                    if(res&&res.executeType!=='end') {
                        setStepList(res.objectList);
                        setFieldsValues(res)
                    }
                })
            },2000)

        }

        setVisible(true);
    };

    //历史查找
    const onHistory = (id) => {
        findInstancesReposter(id).then(res=>{
            setHistoryData(res);
        });
    }

    // 关闭弹框
    const onClose = () => {
        setVisible(false);
        setHistoryData({})
        setStepList([])
    }

    const onHistoryItem = (id) =>{
        findResultByInstanceId(id).then(res=>{
            debugger
            setStepList(res.objectList)
            setFieldsValues(res)
        })
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

    //历史记录
    const historyView = (data) => {
        return data.length>0&&data.map(item=>{
            return <div className='history-item' key={item.id} onClick={()=>onHistoryItem(item.id)}>
                {
                    item.result=== 'succeed'
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
                    ?<Button className="important-btn" onClick={showDrawer}>{props.name}</Button>
                    :<a style={{marginRight:10}}  onClick={showDrawer}>{props.name}</a>
            }

            <Drawer
                title={props.name}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={1200}
                destroyOnClose={true}
            >
                <div className='test-detail-contant '>
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

export default inject('performCaseStore','appStepStore','testInstanceStore')(observer(TestReportApp));