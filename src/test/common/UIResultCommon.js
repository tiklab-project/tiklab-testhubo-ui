import React from "react";
import {Form, Input, Spin, Table} from "antd";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};

const UIResultCommon = (props) =>{
    const {spinning,form,dataList} = props


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
            render: (text) => (showResult(text))
        },
    ]

    const showResult = (result) =>{
        if(result===0){
            return <div  className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
        }

        if(result===1){
            return <div  className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
        }

        if(result===2){
            return <div  className={"history-item-result isNotRun"} style={{margin:0}}>未执行</div>
        }
    }


    return(
        <div style={{height:"calc(100% - 52px)"}}>
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
                            dataSource={dataList}
                            rowKey={record => record.index}
                            pagination={false}
                        />
                    </div>
                </div>
            </Spin>
        </div>
    )
}
export default UIResultCommon;