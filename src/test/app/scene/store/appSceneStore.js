import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


class AppSceneStore {

    @observable appSceneList = [];
    @observable appSceneInfo;
    @observable caseName;

    @action
    findAppSceneList = async (value) => {

        const res = await Axios.post("/appSceneCase/findAppSceneCaseListByTestCase",value);

        if(res.code === 0) {
            this.appSceneList = res.data;

            return res.data
        }
    }

    @action
    findAppScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/appSceneCase/findAppSceneCase",param);
        if( res.code === 0){
            this.appSceneInfo = res.data;
            this.caseName = res.data.testCase.name
            return res.data;
        }
    }

    @action
    createAppScene = async (values) =>  await Axios.post("/appSceneCase/createAppSceneCase",values)

    @action
    updateAppScene = async (values) => await Axios.post("/appSceneCase/updateAppSceneCase",values)

    @action
    deleteAppScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/appSceneCase/deleteAppSceneCase",param)

    }

    /**
     * 执行app场景测试
     */
    @action
    appSceneTestDispatch = async (appSceneId)=> {
        //请求参数
        let param = {
            appSceneId:appSceneId,
            appTestConfig: {
                appiumSever:"127.0.0.1:4723",
                deviceName:"127.0.0.1:62001",
                platformName:"Android",
                appPackage:"com.tencent.mobileqq",
                appActivity:"com.tencent.mobileqq.activity.SplashActivity"
            }
        }

        return await Axios.post("/appSceneTestDispatch/execute", param)
    }

    /**
     * 返回当前执行的状态 0：未开始，1：进行中
     */
    @action
    appSceneTestStatus = async (appSceneId) => {
        let res = await Axios.post("/appSceneTestDispatch/status")
        //如果执行状态为0:未开始
        if(res.code===0&&res.data===0){
            //开始执行
            this.appSceneTestDispatch(appSceneId).then(res=>{
                if (res.code === 0) {
                    //执行会返回1:进行中
                    return res.data
                }
            })
        }

        return 0
    }

    /**
     * app测试的结果
     */
    @action
    appSceneTestResult = async () => await Axios.post("/appSceneTestDispatch/result")


}


export default new AppSceneStore();
