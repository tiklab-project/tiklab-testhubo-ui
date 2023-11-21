import React from "react";
import {Col, Empty, Form, Input, List, Row, Skeleton, Spin, Table, Tag} from "antd";
import emptyImg from "../../assets/img/empty.png";
import {MenuOutlined} from "@ant-design/icons";
import IconCommon from "../../common/IconCommon";
import {CASE_TYPE} from "../../common/dictionary/dictionary";

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
            return  <Tag color="error">未通过</Tag>
        }

        if(result===1){
            return  <Tag color="success">通过</Tag>
        }

        if(result===2){
            return  <Tag color="default">未执行</Tag>
        }
    }


    const showIfStep = (item) =>(
        <Row
            className={"step-item-content"}
            style={{ width: "100%"}}
        >
            <Col span={1}>
                <div>{item.sort}</div>
            </Col>
            <Col span={4}>
            </Col>
            <Col span={15}><Tag color={"processing"}>if 条件判断</Tag></Col>
            <Col style={{marginLeft: "auto",height:"20px"}}>
                <div>{showResult(item.result)}</div>
            </Col>
        </Row>
    )

    const showWebStep = (instance,item) =>(
        <Row
            className={"step-item-content"}
            style={{ width: "100%"}}
        >
            <Col span={1}>
                <div>{item.sort}</div>
            </Col>
            <Col span={4}>
                <div>{instance?.name}</div>
            </Col>
            <Col span={15}>
                {instance?.actionType
                    ?<div className={"display-flex-gap"}>
                        <div style={{fontSize:"12px",color:"#aaa" }}>操作: </div>
                        <div >{instance?.actionType}</div>

                        {
                            instance?.parameter
                                ?<>
                                    <div style={{fontSize:"12px",color:"#aaa" }}>参数: </div>
                                    <div>{instance?.parameter}</div>
                                </>
                                :null
                        }

                    </div>
                    :null

                }
                {instance?.location
                    ?<div className={"display-flex-gap "}>
                        <div style={{fontSize:"12px",color:"#aaa" }}>定位: </div>
                        <div>{instance?.location}</div>
                        {
                            instance?.locationValue
                                ?<>
                                    <div style={{fontSize:"12px",color:"#aaa" }}>参数: </div>
                                    <div>{instance?.locationValue}</div>
                                </>
                                :null
                        }
                    </div>
                    :null
                }

            </Col>
            <Col style={{marginLeft: "auto",height:"20px"}}>
                <div>{showResult(item.result)}</div>
            </Col>
        </Row>
    )



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
                        <List
                            className="demo-loadmore-list"
                            // loading={initLoading}
                            itemLayout="horizontal"
                            dataSource={dataList}
                            locale={{
                                emptyText: <Empty
                                    imageStyle={{ height: 120 }}
                                    description={<span>暂无历史步骤</span>}
                                    image={emptyImg}
                                />,
                            }}
                            renderItem={(item) =>(
                                <List.Item className={"home-list-api"} >
                                    {
                                        item.webSceneInstanceStep
                                            ?showWebStep(item.webSceneInstanceStep,item)
                                            :showIfStep(item)
                                    }
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </Spin>
        </div>
    )
}
export default UIResultCommon;