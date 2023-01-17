import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Divider, Empty, Form, Input, Table} from "antd";
import BackCommon from "../../../common/backCommon";
import EmptyTip from "../../../apitest/http/common/instance/emptyTip";
import emptyImg from "../../../../assets/img/empty.png";
import IconCommon from "../../../common/iconCommon";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 5},
};


const WebSceneInstance = (props) =>{
    const {webSceneInstanceStore} = props;
    const {findWebSceneInstanceList,instanceList,findWebSceneInstance,deleteWebSceneInstance} = webSceneInstanceStore;



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
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },
    ]

    const webSceneId = sessionStorage.getItem("webSceneId")
    const [form] = Form.useForm();
    const [selected, setSelected] = useState();
    const [webStepList, setWebStepList] = useState([]);
    const [allData, setAllData] = useState();
    const [showDetail, setShowDetail] = useState(false);

    useEffect(()=>{
        findWebSceneInstanceList(webSceneId)
    },[])

    const clickFindInstance = id =>{
        setSelected(id)
        findWebSceneInstance(id).then(res=>{
            setShowDetail(true)
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


    //删除历史
    const deleteFn = (id)=>{
        deleteWebSceneInstance(id).then(()=> findWebSceneInstanceList(webSceneId))
    }

    const showInstanceListView = (data) =>{
        return data&&data.map(item=>{
            return (
                <div className={"history-item-box"}>
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
                    <IconCommon
                        style={{"top": "22px"}}
                        icon={"shanchu1"}
                        className={"history-delete-icon icon-s"}
                        onClick={()=>deleteFn(item.id)}
                    />
                </div>
            )
        })
    }



    const toSceneDetail =()=>{
        props.history.push("/repositorypage/testcase/web-scene-detail")
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
                {
                    showDetail
                        ?<div className={"history-detail history-detail-box"}>
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
                                <div className={"scene-step-detail"}>
                                    <div className={"header-item"}>场景列表</div>
                                    <div className='table-list-box' style={{margin: "10px"}}>
                                        <Table
                                            columns={columns}
                                            dataSource={webStepList}
                                            rowKey={record => record.id}
                                            pagination={false}
                                            locale={{
                                                emptyText: <Empty
                                                    imageStyle={{ height: 120}}
                                                    description={<span>暂无测试步骤</span>}
                                                    image={emptyImg}
                                                />,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :<EmptyTip />
                }


            </div>
        </>
    )
}

export default inject("webSceneInstanceStore")(observer(WebSceneInstance));