import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class WebPerfStore {
    @observable webPerfList = [];
    @observable webPerfInfo;

    @action
    findWebPerfList = async (value) => {

        const res = await Axios.post("/webPerfCase/findWebPerfCaseListByTestCase",value);

        if(res.code === 0) {
            this.webPerfList = res.data;
            return res.data
        }
    }

    @action
    findWebPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/webPerfCase/findWebPerfCase",param);
        if( res.code === 0){
            this.webPerfInfo = res.data;
            return res.data;
        }
    }


    @action
    createWebPerf = async (values) =>  await Axios.post("/webPerfCase/createWebPerfCase",values)
    

    @action
    updateWebPerf = async (values) =>  await Axios.post("/webPerfCase/updateWebPerfCase",values)

    @action
    deleteWebPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/webPerfCase/deleteWebPerfCase",param)
    }

}

export default new WebPerfStore();
