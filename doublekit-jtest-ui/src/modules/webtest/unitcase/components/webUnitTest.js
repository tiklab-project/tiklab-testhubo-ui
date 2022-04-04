import React, {useEffect, useState} from "react";

import {Divider, Form, Input, Table} from "antd";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const WebUnitTest = (props) =>{
    const {showResponse} = props;

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
        },
    ]


    const list = [
        {
            id: "step1",
            actionType:"open",
            parament:"url/a/b/c",
            location:"",
            locationPrice:"",
            result:"1"
        },
        {
            id: "step2",
            actionType:"click",
            parament:"",
            location:"id",
            locationPrice:"btn",
            result:"1"
        },
        {
            id: "step3",
            actionType:"click",
            parament:"",
            location:"className",
            locationPrice:"css",
            result:"0"
        },
    ]


    useEffect(()=>{

    },[])



    return(
        <>
            <div className='test-report-detail'>
                <div>测试</div>
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
                        dataSource={list}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                </div>
            </div>
        </>
    )
}

export default WebUnitTest;