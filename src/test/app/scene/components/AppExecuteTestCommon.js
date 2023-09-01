import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Form, Input, Spin, Table} from "antd";
import {messageFn} from "../../../../common/messageCommon/MessageCommon";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};

/**
 * app测试页公共页面
 */
const AppExecuteTestCommon = (props, ref) =>{
    const {appSceneStore,appSceneId,setStart,start} = props;
    const {appSceneTestStatus,appSceneTestResult} = appSceneStore;

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
    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);
    const [form] = Form.useForm();

    useEffect(async ()=>{
        if(start === 1){
            ref.current =  setInterval(async ()=>{
                //获取执行结果
                let res = await appSceneTestResult(appSceneId)
                let data = res.data;
                if(res.code===0&& !data.errMsg){
                    setAppStepList(data.appSceneInstanceStepList);

                    let instance = data.appSceneInstance;
                    form.setFieldsValue({
                        result:instance?.result===1?"成功":"失败",
                        stepNum:instance?.stepNum,
                        passNum:instance?.passNum,
                        failNum:instance?.failNum,
                        passRate:instance?.passRate,
                    })

                    setSpinning(false)

                    //获取执行状态，是否结束
                    appSceneTestStatus().then(res =>{
                        if(res.code===0&&res.data===0){
                            setStart(res.data)
                            clearInterval(ref.current)
                        }
                    })
                }

                if(res.data.errMsg){
                    messageFn("error",data.errMsg)

                    clearInterval(ref.current)
                }

            },3000);
        }
        return () => ref.current = null
    },[start])


    return(
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
                        dataSource={appStepList}
                        rowKey={record => record.index}
                        pagination={false}
                    />
                </div>
            </div>
        </Spin>
    )
}

export default AppExecuteTestCommon;