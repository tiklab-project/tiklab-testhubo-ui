import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class WebSceneStore {

    @observable webSceneList = [];
    @observable webSceneInfo;

    @action
    findWebSceneList = async (value) => {

        const res = await Axios.post("/webSceneCase/findWebSceneCaseListByTestCase",value);

        if(res.code === 0) {
            this.webSceneList = res.data;
            return res.data
        }
    }

    @action
    findWebScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/webSceneCase/findWebSceneCase",param);
        if( res.code === 0){
            this.webSceneInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebScene = async (values) =>  await Axios.post("/webSceneCase/createWebSceneCase",values)

    @action
    updateWebScene = async (values) => await Axios.post("/webSceneCase/updateWebSceneCase",values)

    @action
    deleteWebScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

         await Axios.post("/webSceneCase/deleteWebSceneCase",param)

    }

    /**
     * 执行web场景测试
     */
    @action
    webSceneTestDispatch = async (data)=> await Axios.post("/webSceneTestDispatch/execute",data)

    /**
     * 返回当前执行的状态 0：未开始，1：进行中
     */
    @action
    webSceneTestStatus = async () => await Axios.post("/webSceneTestDispatch/status")

    /**
     * web测试的结果
     */
    @action
    webSceneTestResult = async () => await Axios.post("/webSceneTestDispatch/result")

}

export default new WebSceneStore();
