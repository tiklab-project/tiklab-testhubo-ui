import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


class AppPerfStore {
    @observable appPerfList = [];
    @observable appPerfInfo;

    @action
    findAppPerfList = async (value) => {

        const res = await Axios.post("/appPerfCase/findAppPerfCaseListByTestCase",value);

        if(res.code === 0) {
            this.appPerfList = res.data;
            return res.data
        }
    }

    @action
    findAppPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/appPerfCase/findAppPerfCase",param);
        if( res.code === 0){
            this.appPerfInfo = res.data;
            return res.data;
        }
    }


    @action
    createAppPerf = async (values) =>  await Axios.post("/appPerfCase/createAppPerfCase",values)


    @action
    updateAppPerf = async (values) =>  await Axios.post("/appPerfCase/updateAppPerfCase",values)

    @action
    deleteAppPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/appPerfCase/deleteAppPerfCase",param)
    }

}

export default new AppPerfStore();
