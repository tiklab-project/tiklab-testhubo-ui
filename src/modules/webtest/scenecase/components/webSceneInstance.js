import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Divider, Form, Input, Table} from "antd";
import BackCommon from "../../../common/backCommon";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const WebSceneInstance = (props) =>{
    const {webSceneInstanceStore} = props;
    const {findWebSceneInstanceList,instanceList,findWebSceneInstance} = webSceneInstanceStore;

    const [selected, setSelected] = useState();
    const [webStepList, setWebStepList] = useState([]);

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
            dataIndex: 'parameter',
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
            dataIndex: 'locationValue',
            width: '15%',
            align:'center',
        },
        {
            title: '是否通过',
            width: '8%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text===1
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        },
    ]

    const webSceneId = sessionStorage.getItem("webSceneId")

    useEffect(()=>{
        findWebSceneInstanceList(webSceneId)
    },[])

    const clickFindInstance = id =>{
        setSelected(id)
        findWebSceneInstance(id).then(res=>{

            setWebStepList(res.stepList);

            form.setFieldsValue({
                result:res.result,
                stepNum:res.stepNum,
                passNum:res.passNum,
                failNum:res.failNum,
                passRate:res.passRate,
                totalDuration:res.totalDuration
            })

        })
    }


    const showInstanceListView = (data) =>{
        return data&&data.map(item=>{
            return (
                <div className={`history-item ${selected===item.id?"history-item-selected":""}`} key={item.id} onClick={()=>clickFindInstance(item.id)}>
                    {
                        item.result===1
                            ?<div className='history-item-result '>
                                <div className={"isSucceed"}>通过</div>
                            </div>
                            :<div className='history-item-result '>
                                <div className={"isFailed"}>未通过</div>
                            </div>
                    }
                    <div className='history-item-detail'>
                        <div>{item.createTime}</div>
                        <div>
                            <span style={{margin:" 0 10px 0 0"}}>用例数：{item.stepNum}</span>
                            <span>{item.time}</span>
                        </div>

                        <div>{item.name}</div>
                    </div>
                </div>
            )
        })
    }



    const toSceneDetail =()=>{
        props.history.push("/repositorypage/webtest/scenedetail")
    }

    return(
        <>
            <BackCommon clickBack={toSceneDetail}/>
            <div className={"scene-instance-contant"}>
                <div className={"test-detail-history"}>
                    <div className={"header-item"}>历史列表</div>
                    {
                        showInstanceListView(instanceList)
                    }
                </div>
                <div className={"history-detail history-detail-box"}>
                    <div className={"unit-instance-detail"}>
                        <div className={"header-item"}>步骤总详情</div>
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
                        <Divider />
                        <div className={"header-item"}>步骤列表</div>
                        <div className='test-detail-step-list'>
                            <Table
                                columns={columns}
                                dataSource={webStepList}
                                rowKey={record => record.id}
                                pagination={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default inject("webSceneInstanceStore")(observer(WebSceneInstance));