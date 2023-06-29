import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


class AppSceneStore {

    @observable appSceneList = [];
    @observable appSceneInfo;

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
    appSceneTestDispatch = async (data)=> await Axios.post("/appSceneTestDispatch/execute",data)

    /**
     * 返回当前执行的状态 0：未开始，1：进行中
     */
    @action
    appSceneTestStatus = async () => await Axios.post("/appSceneTestDispatch/status")

    /**
     * app测试的结果
     */
    @action
    appSceneTestResult = async () => await Axios.post("/appSceneTestDispatch/result")


}


export default new AppSceneStore();
