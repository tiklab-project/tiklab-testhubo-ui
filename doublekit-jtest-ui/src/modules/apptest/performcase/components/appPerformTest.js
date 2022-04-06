import React, {useEffect, useState} from "react";

import {Divider, Form, Input, Table} from "antd";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const AppPerformTest = (props) =>{
    const {showResponse} = props;

    const [form] = Form.useForm();
    const [allData, setAllData] = useState();
    const [performSelect, setPerformSelect] = useState();
    const [performDetail, setPerformDetail] = useState();


    useEffect(()=>{

    },[])


    //点击场景
    const clickFindPerform = item =>{
        // setPerformSelect(item.id);
        // setPerformDetail(item)
    }



    const showStepListView = (data)=>{
        return data&&data.map(item=>{
            return(
                <div
                    className={`history-step-item ${performSelect===item.id ? "history-item-selected":""}`}
                    key={item.id}
                    onClick={()=>clickFindPerform(item)}
                >
                    {
                        item.result===1
                            ?<div className='history-item-result '>
                                <div className={"isSucceed"}>通过</div>
                            </div>
                            :<div className='history-item-result '>
                                <div className={"isFailed"}>未通过</div>
                            </div>
                    }
                    <div>{item.name}</div>
                </div>
            )
        })
    }



    return(
        <>
            <div className={"scene-instance-contant"}>
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
                        <div className={"header-item"}>测试总详情</div>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>测试结果</div>
                                <div className={"history-detail-all-item-value"}>{allData?.thread}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>场景数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.times}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>测试通过率</div>
                                <div className={"history-detail-all-item-value"}>{allData?.error}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>通过场景数</div>
                                <div className={"history-detail-all-item-value"}></div>
                            </div>

                            <div className={"history-detail-all-item"}>
                                <div>未通过场景数</div>
                                <div className={"history-detail-all-item-value"}></div>
                            </div>
                        </div>
                    </div>
                    <div className={"history-item-box"}>
                        <div className={"scene-step-contant"}>
                            <div className={"header-item"}>场景列表</div>
                            <div>
                                {
                                    showStepListView(allData?.stepList)
                                }
                            </div>
                        </div>
                        <div className={"scene-step-detail"}>
                            <div className={"header-item"}>场景详情</div>
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
                            {/*<div className={"header-item"}>步骤列表</div>*/}
                            <div className={"scene-step-detail"}>
                                <div className={"header-item"}>用例详情</div>
                                <div className={"scene-step-detail-box"}>
                                    {
                                        performDetail
                                            ?<>
                                                <div className={"scene-step-detail-contant"}>
                                                    <div className={"scene-step-detail-item"}>
                                                        <div>结果</div>
                                                        <div className={"scene-step-detail-item-value"}>{performDetail.result}</div>
                                                    </div>
                                                    <div className={"scene-step-detail-item"}>
                                                        <div>耗时</div>
                                                        <div className={"scene-step-detail-item-value"}>{performDetail.time}</div>
                                                    </div>
                                                    <div className={"scene-step-detail-item"}>
                                                        <div>步骤数</div>
                                                        <div className={"scene-step-detail-item-value"}>{performDetail.step}</div>
                                                    </div>
                                                </div>
                                                <div className={"scene-step-detail-contant"}>
                                                    <div className={"scene-step-detail-item"}>
                                                        <div>测试通过率</div>
                                                        <div className={"scene-step-detail-item-value"}>{performDetail.passRate}</div>
                                                    </div>
                                                    <div className={"scene-step-detail-item"}>
                                                        <div>通过步骤数</div>
                                                        <div className={"scene-step-detail-item-value"}>{performDetail.successNum}</div>
                                                    </div>
                                                    <div className={"scene-step-detail-item"}>
                                                        <div>未通过步骤数</div>
                                                        <div className={"scene-step-detail-item-value"}>{performDetail.errorNum}</div>
                                                    </div>
                                                </div>
                                            </>
                                            :null

                                    }

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AppPerformTest;