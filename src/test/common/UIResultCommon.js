import React from "react";
import {Form, Input, Spin} from "antd";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};

const UIResultCommon = (props) =>{
    const {spinning,form,showList} = props

    return(
        <div style={{height:"calc(100% - 50px)"}}>
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
                        {showList()}
                    </div>
                </div>
            </Spin>
        </div>
    )
}
export default UIResultCommon;