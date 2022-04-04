import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Button, Collapse, Divider, Form, Input, Table} from "antd";
import BackCommon from "../../../common/backCommon";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};



const AppUnitInstance = (props) =>{
    const {appUnitInstanceStore} = props;
    const {findAppUnitInstanceList,instanceList,findAppUnitInstance} = appUnitInstanceStore;

    const [selected, setSelected] = useState();
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

    const unitcaseId = sessionStorage.getItem("unitcaseId")

    useEffect(()=>{
        findAppUnitInstanceList(1)
    },[])

    const clickFindInstance = id =>{
        setSelected(id)
        findAppUnitInstance(id).then(res=>{

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
                            <span style={{margin:" 0 10px 0 0"}}>步骤数：{item.stepNum}</span>
                            <span>{item.time}</span>
                        </div>

                        <div>{item.name}</div>
                    </div>
                </div>
            )
        })
    }



    const toUnitDetail =()=>{
        props.history.push("/repositorypage/apptest/unitdetail")
    }

    return(
        <>
            <BackCommon clickBack={toUnitDetail}/>
            <div className={"unit-instance"}>
                <div className={"test-detail-history"}>
                    <div className={"header-item"}>历史列表</div>
                    {
                        showInstanceListView(instanceList)
                    }
                </div>
                <div className={"unit-instance-detail"}>
                    <div className={"header-item"}>历史详情</div>
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
                    <div className={"header-item"}>步骤列表</div>
                    <div className='test-detail-step-list'>
                        <Table
                            columns={columns}
                            dataSource={list}
                            rowKey={record => record.id}
                            pagination={false}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default inject("appUnitInstanceStore")(observer(AppUnitInstance));