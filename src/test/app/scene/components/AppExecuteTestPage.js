import React, {useEffect, useRef, useState} from "react";
import CaseBread from "../../../../common/CaseBread";
import UIResultCommon from "../../../common/UIResultCommon";
import {Col, Drawer, Empty, List, Row, Tag} from "antd";
import appSceneStore from "../store/appSceneStore";
import {inject, observer} from "mobx-react";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import emptyImg from "../../../../assets/img/empty.png";
import {messageFn} from "../../../../common/messageCommon/MessageCommon";


const AppExecuteTestPage =(props)=>{
    const {appEnvStore,appSceneId,stepNum} = props
    const {appSceneTestDispatch,appSceneTestResult} = appSceneStore;
    const {appEnv} = appEnvStore
    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const [start, setStart] = useState(false);
    const [instanceInfo, setInstanceInfo] = useState();

    useEffect( ()=>{
        if(start){
            ref.current =  setInterval(async ()=>{
                //获取执行结果
                let param = {
                    appSceneId:appSceneId,
                    appEnvId: appEnv
                }
                let res = await appSceneTestResult(param)

                if(res.code===0){
                    let data = res.data;
                    setAppStepList(data?.stepCommonInstanceList);
                    setInstanceInfo(data?.appSceneInstance);

                    setSpinning(false)

                    if(data.status===0){
                        clearInterval(ref.current);
                        setStart(false);
                        messageFn("success", "执行完成");
                    }
                }else {
                    // 出错时清理定时器
                    clearInterval(ref.current);
                    setStart(false);
                    messageFn("error", "执行失败");
                }
            },3000);
        }

        return () => {
            if (ref.current) {
                // 清理定时器
                clearInterval(ref.current);
            }
        };
    },[start])

    const showDrawer = async () => {
        if(stepNum===0){
            messageFn("warning","添加步骤")
            return
        }

        if(!appEnv){
            messageFn("warning","请选择环境")
            return
        }

        setOpen(true);
        setStart(true);

        //开始执行
        let param = {
            appSceneId:appSceneId,
            appEnvId: appEnv
        }
        let res = await appSceneTestDispatch(param)
        if(res.code!==0) {
            let msg = res.msg
            let errorMsg
            if(msg) {
                errorMsg = msg.split(":")[1]
                if (errorMsg.includes("Could not connect")) {
                    errorMsg = "无法连接agent"
                } else {
                    errorMsg = "执行异常"
                }
            }else {
                errorMsg = "执行异常"
            }

            messageFn("error",errorMsg)
        }
    };

    const onClose = () => {
        setAppStepList([])
        setSpinning(true)
        setOpen(false);
        setStart(false);
        setInstanceInfo(null);
    };

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
                        instanceInfo={instanceInfo}
                        showList={showStepListView}
                    />
                </div>
            </Drawer>
        </>
    );
}

export default inject("appEnvStore")(observer(AppExecuteTestPage));