import React, {useEffect, useRef, useState} from "react";
import CaseBread from "../../../../common/CaseBread";
import UIResultCommon from "../../../common/UIResultCommon";
import {Drawer, Form} from "antd";
import appSceneStore from "../store/appSceneStore";
import {observer} from "mobx-react";
import IconBtn from "../../../../common/iconBtn/IconBtn";


const AppExecuteTestPage =({appSceneId})=>{

    const {appSceneTestStatus,appSceneTestDispatch,appSceneTestResult,setStartStatus,startStatus} = appSceneStore;

    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const [form] = Form.useForm();

    const showDrawer = async () => {
        appSceneTestStatus().then(res =>{
            //如果执行状态为0:未开始
            if(res.code===0&&res.data===0){
                //开始执行
                appSceneTestDispatch(appSceneId)
                setStartStatus(1)
            }
        });

        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(async ()=>{
        if(startStatus === 1){
            testResult()
        }
        return () => ref.current = null
    },[startStatus])


    const testResult = () =>{
        ref.current =  setInterval(async ()=>{
            //获取执行结果
            let res = await appSceneTestResult(appSceneId)

            if(res.code===0){
                let data = res.data;
                setAppStepList(data?.appSceneInstanceStepList);

                let instance = data?.appSceneInstance;
                form.setFieldsValue({
                    result:instance?.result===1?"成功":"失败",
                    stepNum:instance?.stepNum,
                    passNum:instance?.passNum,
                    failNum:instance?.failNum,
                    passRate:instance?.passRate,
                })

                setSpinning(false)

                //获取执行状态，是否结束
                appSceneTestStatus().then(res =>{
                    if(res.code!==0){
                        clearInterval(ref.current)
                        return
                    }
                    if(res.data===0){
                        setStartStatus(res.data)
                        clearInterval(ref.current)

                        //如果状态变回0 还要走一遍
                        appSceneTestResult(appSceneId)
                    }
                })
            }
        },3000);
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
                contentWrapperStyle={{top:48,height:"calc(100% - 52px)"}}
                closable={false}
            >
                <div className={"content-box-center"}>
                    <CaseBread title={"APP场景测试"}/>
                    <UIResultCommon
                        spinning={spinning}
                        form={form}
                        dataList={appStepList}
                    />
                </div>
            </Drawer>
        </>
    );
}

export default observer(AppExecuteTestPage);