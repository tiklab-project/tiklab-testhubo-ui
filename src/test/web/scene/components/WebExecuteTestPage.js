import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../common/CaseBread";
import UIResultCommon from "../../../common/UIResultCommon";
import {Col, Drawer, Empty, Form, List, Row, Tag} from "antd";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import emptyImg from "../../../../assets/img/empty.png";
import {CASE_TYPE} from "../../../../common/dictionary/dictionary";
import {messageFn} from "../../../../common/messageCommon/MessageCommon";

const WebExecuteTestPage = (props) =>{
    const {webSceneStore} = props;
    const {webSceneTestStatus,webSceneTestDispatch,webSceneTestResult,setStartStatus,startStatus} = webSceneStore;

    const webSceneId = sessionStorage.getItem("webSceneId")
    const repositoryId = sessionStorage.getItem('repositoryId')
    const [spinning, setSpinning] = useState(true);
    const [webStepList, setWebStepList] = useState([]);
    const [open, setOpen] = useState(false);
    const [start, setStart] = useState(false);
    const ref = useRef();
    const [form] = Form.useForm();

    useEffect(async ()=>{
        if(start){
            testResult()
        }
        return () => ref.current = null
    },[start])

    const showDrawer = async () => {
        let res = await webSceneTestResult({webSceneId:webSceneId})
        //如果执行状态为0:未开始
        if(res.code===0&&res.data.status===0){
            let param = {
                repositoryId:repositoryId,
                webSceneId:webSceneId,
            }

            //开始执行
            webSceneTestDispatch(param)
            setStart(true)
            setOpen(true);
        }else {
            let msg = res.msg
            let errorMsg = msg.split(":")[1]
            if(errorMsg.includes("Could not connect")){
                errorMsg="无法连接agent"
            }

            return messageFn("error",errorMsg)
        }
    };

    const onClose = () => {
        setWebStepList([])
        setSpinning(true)
        setOpen(false);
        setStart(false)
    };


    const testResult = () =>{
        ref.current =  setInterval(async ()=>{
            //获取执行结果
            let res = await webSceneTestResult({webSceneId:webSceneId})

            if(res.code===0){
                let data = res.data;
                setWebStepList(data?.stepCommonInstanceList);

                let instance = data?.webSceneInstance;
                form.setFieldsValue({
                    result:instance?.result,
                    stepNum:instance?.stepNum,
                    passNum:instance?.passNum,
                    failNum:instance?.failNum,
                    passRate:instance?.passRate,
                    totalDuration:instance?.totalDuration
                })

                setSpinning(false)


                if(data.status===0){
                    setStart(false)
                    clearInterval(ref.current)
                    messageFn("success","执行完成")
                }
            }
        },1000);
    }



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


    return(
        <>
            <a onClick={showDrawer}>
                <IconBtn
                    className="important-btn"
                    icon={"fasong-copy"}
                    name={"测试"}
                />
            </a>
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
                <div className={"content-box-center"}>
                    <CaseBread
                        breadItem={["WEB场景测试"]}
                        icon={"api1"}
                        setOpen={setOpen}
                    />
                    <UIResultCommon
                        spinning={spinning}
                        form={form}
                        showList={showStepListView}
                    />
                </div>
            </Drawer>
        </>
    )
}

export default inject('webSceneStore')(observer(WebExecuteTestPage))