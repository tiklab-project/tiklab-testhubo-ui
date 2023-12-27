import React, {useState} from "react";
import {Col, Drawer, Empty, Form, List, Row, Tag} from "antd";
import {observer} from "mobx-react";
import webSceneInstanceStore from "../store/webSceneInstanceStore";
import UIResultCommon from "../../../common/UIResultCommon";
import CaseBread from "../../../../common/CaseBread";
import emptyImg from "../../../../assets/img/empty.png";
import {CASE_TYPE} from "../../../../common/dictionary/dictionary";


const WebSceneInstanceSinglePage =({webSceneInstanceId,name})=>{
    const { findWebSceneInstance } = webSceneInstanceStore;

    const [spinning, setSpinning] = useState(true);
    const [webStepList, setWebStepList] = useState([]);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        let res = await findWebSceneInstance(webSceneInstanceId)

        form.setFieldsValue({
            result:res?.result===1?"成功":"失败",
            stepNum:res?.stepNum,
            passNum:res?.passNum,
            failNum:res?.failNum,
            passRate:res?.passRate,
        })

        setWebStepList(res.stepList)

        setSpinning(false);
        setOpen(true);
    }

    const onClose = () => {
        setSpinning(true);
        setWebStepList([])
        setOpen(false);
    };


    const showStepListView=()=>(
        <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            dataSource={webStepList}
            locale={{
                emptyText: <Empty
                    imageStyle={{ height: 120 }}
                    description={<span>暂无历史步骤</span>}
                    image={emptyImg}
                />,
            }}
            renderItem={(item) =>(
                <List.Item style={{padding:0}}>
                    {
                        item.type===CASE_TYPE.WEB
                            ?showWebStep(item.webSceneInstanceStep,item)
                            :showIfStep(item)
                    }
                </List.Item>
            )}
        />
    )


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



    return (
        <>
            <span className={"link-text"} onClick={showDrawer} >{name}</span>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={900}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <CaseBread
                    breadItem={["历史详情"]}
                    icon={"api1"}
                    setOpen={setOpen}
                />
                <UIResultCommon
                    spinning={spinning}
                    form={form}
                    showList={showStepListView}
                />
            </Drawer>
        </>
    );
}

export default observer(WebSceneInstanceSinglePage);