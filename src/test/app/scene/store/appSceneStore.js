import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


class AppSceneStore {

    @observable appSceneList = [];
    @observable appSceneInfo;
    @observable testCaseInfo;
    @observable startStatus;

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
            this.testCaseInfo = res.data.testCase
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
    appSceneTestDispatch = async (param)=> await Axios.post("/appSceneTestDispatch/execute", param)


    /**
     * 返回当前执行的状态 0：未开始，1：进行中
     */
    @action
    appSceneTestStatus = async () => {
        let res = await Axios.post("/appSceneTestDispatch/status")
        this.startStatus = res.data
        return res
    }

    /**
     * app测试的结果
     */
    @action
    appSceneTestResult = async (param) =>  await Axios.post("/appSceneTestDispatch/result", param)


    @action
    setStartStatus = (status) =>{
        this.startStatus = status
    }
}


export default new AppSceneStore();
