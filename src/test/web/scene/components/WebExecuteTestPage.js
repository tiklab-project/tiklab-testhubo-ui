import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../common/CaseBread";
import UIResultCommon from "../../../common/UIResultCommon";
import {Drawer, Form} from "antd";
import IconBtn from "../../../../common/iconBtn/IconBtn";

const WebExecuteTestPage = (props) =>{
    const {webSceneStore,webSceneId} = props;
    const {webSceneTestStatus,webSceneTestDispatch,webSceneTestResult,setStartStatus,startStatus} = webSceneStore;

    const repositoryId = sessionStorage.getItem('repositoryId')
    const [spinning, setSpinning] = useState(true);
    const [webStepList, setWebStepList] = useState([]);
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const [form] = Form.useForm();

    useEffect(async ()=>{
        if(startStatus === 1){
            testResult()
        }
        return () => ref.current = null
    },[startStatus])

    const showDrawer = async () => {
        webSceneTestStatus().then(res =>{
            //如果执行状态为0:未开始
            if(res.code===0&&res.data===0){
                let param = {
                    repositoryId:repositoryId,
                    webSceneId:webSceneId,
                    webDriver:"chrome"
                }
                //开始执行
                webSceneTestDispatch(param)
                setStartStatus(1)
            }
        });

        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const testResult = () =>{
        ref.current =  setInterval(async ()=>{
            //获取执行结果
            let res = await webSceneTestResult({webSceneId:webSceneId,webDriver:"chrome"})

            if(res.code===0){
                let data = res.data;
                setWebStepList(data?.webUnitResultList);

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

                //获取执行状态，是否结束
                webSceneTestStatus().then(res =>{
                    if(res.code!==0){
                        clearInterval(ref.current)
                        return
                    }
                    if(res.data===0){
                        setStartStatus(res.data)
                        clearInterval(ref.current)

                        //如果状态变回0 还要走一遍
                        webSceneTestResult({webSceneId:webSceneId,webDriver:"chrome"})
                    }
                })
            }
        },3000);
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
                width={"70%"}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                <div className={"content-box-center"}>
                    <CaseBread
                        title={"WEB场景测试"}
                        icon={"jiekou1"}
                        setOpen={setOpen}
                    />
                    <UIResultCommon
                        spinning={spinning}
                        form={form}
                        dataList={webStepList}
                    />
                </div>
            </Drawer>
        </>
    )
}

export default inject('webSceneStore')(observer(WebExecuteTestPage))