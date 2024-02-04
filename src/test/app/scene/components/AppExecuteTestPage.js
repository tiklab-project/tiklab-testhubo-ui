import React, {useEffect, useRef, useState} from "react";
import CaseBread from "../../../../common/CaseBread";
import UIResultCommon from "../../../common/UIResultCommon";
import {Col, Drawer, Empty, Form, List, Row, Tag} from "antd";
import appSceneStore from "../store/appSceneStore";
import {observer} from "mobx-react";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import emptyImg from "../../../../assets/img/empty.png";
import {messageFn} from "../../../../common/messageCommon/MessageCommon";


const AppExecuteTestPage =({appSceneId})=>{

    const {appSceneTestStatus,appSceneTestDispatch,appSceneTestResult,setStartStatus,startStatus} = appSceneStore;

    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const [form] = Form.useForm();
    const [start, setStart] = useState(false);

    const showDrawer = async () => {
        let res = await appSceneTestResult(appSceneId)

        //如果执行状态为0:未开始
        if(res.code===0&&res.data.status===0){
            //开始执行
            appSceneTestDispatch(appSceneId)
            setOpen(true);
            setStart(true)
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
        setAppStepList([])
        setSpinning(true)
        setOpen(false);
        setStart(false)
    };

    useEffect(async ()=>{
        if(start){
            testResult()
        }
        return () => ref.current = null
    },[start])


    const testResult = () =>{
        ref.current =  setInterval(async ()=>{
            //获取执行结果
            let res = await appSceneTestResult(appSceneId)

            if(res.code===0){
                let data = res.data;
                setAppStepList(data?.stepCommonInstanceList);

                let instance = data?.appSceneInstance;
                form.setFieldsValue({
                    result:instance?.result===1?"成功":"失败",
                    stepNum:instance?.stepNum,
                    passNum:instance?.passNum,
                    failNum:instance?.failNum,
                    passRate:instance?.passRate,
                })

                setSpinning(false)

                if(data.status===0){
                    setStart(false)
                    clearInterval(ref.current)
                    messageFn("success","执行完成")
                }
                // //获取执行状态，是否结束
                // appSceneTestStatus().then(res =>{
                //     if(res.code!==0){
                //         clearInterval(ref.current)
                //         return
                //     }
                //     if(res.data===0){
                //         //如果状态变回0 还要走一遍
                //         appSceneTestResult(appSceneId)
                //
                //     }
                //
                //     setSpinning(false)
                // })
            }
        },3000);
    }


    const showStepListView=()=>(
        <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            dataSource={appStepList}
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
                        item.type==="app-scene"
                            ?showWebStep(item.appSceneInstanceStep,item)
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
                    <CaseBread breadItem={["APP场景测试"]}/>
                    <UIResultCommon
                        spinning={spinning}
                        form={form}
                        showList={showStepListView}
                    />
                </div>
            </Drawer>
        </>
    );
}

export default observer(AppExecuteTestPage);