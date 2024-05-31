import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../common/CaseBread";
import UIResultCommon from "../../../common/UIResultCommon";
import {Col, Drawer, Empty, List, Row, Tag} from "antd";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import emptyImg from "../../../../assets/img/empty.png";
import {CASE_TYPE, testExecuteStatus} from "../../../../common/dictionary/dictionary";
import {messageFn} from "../../../../common/messageCommon/MessageCommon";
import {PlayCircleOutlined} from "@ant-design/icons";
import webSceneStore from "../store/webSceneStore";

const WebExecuteTestPage = (props) =>{
    const {stepNum,type,webSceneId} = props;
    const {webSceneTestDispatch,webSceneTestResult} = webSceneStore;

    const repositoryId = sessionStorage.getItem('repositoryId')
    const ref = useRef();
    const [spinning, setSpinning] = useState(true);
    const [instanceInfo, setInstanceInfo] = useState();
    const [webStepList, setWebStepList] = useState([]);
    const [open, setOpen] = useState(false);
    const [start, setStart] = useState(false);

    useEffect( ()=>{
        if(start){
            ref.current =  setInterval(async ()=>{
                //获取执行结果
                let res = await webSceneTestResult({webSceneId:webSceneId})

                if(res.code===0){
                    let data = res.data;
                    setWebStepList(data?.stepCommonInstanceList);
                    setInstanceInfo(data?.webSceneInstance);

                    setSpinning(false)

                    if (data?.webSceneInstance?.status !== testExecuteStatus.TEST_STATUS_START) {
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
            },1000);
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

        setOpen(true);
        setStart(true);

        let param = {
            repositoryId:repositoryId,
            webSceneId:webSceneId,
        }
        let res = await webSceneTestDispatch(param)
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
        setWebStepList([])
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
                        item.type===CASE_TYPE.WEB_SCENE
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

    const showIcon=() =>{
        if(type==="quick"){
            return <PlayCircleOutlined
                style={{fontSize:"18px"}}
                onClick={showDrawer}
            />
        }

        return<a onClick={showDrawer}>
            <IconBtn
                className="important-btn"
                icon={"fasong-copy"}
                name={"测试"}
            />
        </a>;
    }

    return(
        <>
            {showIcon()}
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
                    breadItem={["WEB场景测试"]}
                    icon={"diannao1"}
                    setOpen={setOpen}
                />
                <UIResultCommon
                    spinning={spinning}
                    instanceInfo={instanceInfo}
                    showList={showStepListView}
                />
            </Drawer>
        </>
    )
}

export default observer(WebExecuteTestPage)