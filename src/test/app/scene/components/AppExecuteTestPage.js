import React, {useEffect, useRef, useState} from "react";
import CaseBread from "../../../../common/CaseBread";
import UIResultCommon from "../../../common/UIResultCommon";
import {Form} from "antd";
import appSceneStore from "../store/appSceneStore";
import {observer} from "mobx-react";


const AppExecuteTestPage =(props)=>{
    const {appSceneTestStatus,appSceneTestDispatch,appSceneTestResult,setStartStatus,startStatus} = appSceneStore;

    const appSceneId = sessionStorage.getItem('appSceneId')
    const repositoryId = sessionStorage.getItem('repositoryId')
    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);
    const ref = useRef();
    const [form] = Form.useForm();

    useEffect(()=>{
        appSceneTestStatus().then(res =>{
            //如果执行状态为0:未开始
            if(res.code===0&&res.data===0){
                //开始执行
                appSceneTestDispatch(appSceneId)
                setStartStatus(1)
            }
        });

    },[])


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
        <div className={"content-box-center"}>
            <CaseBread title={"APP场景测试"}/>
            <UIResultCommon
                spinning={spinning}
                form={form}
                dataList={appStepList}
            />
        </div>
    );
}

export default observer(AppExecuteTestPage);