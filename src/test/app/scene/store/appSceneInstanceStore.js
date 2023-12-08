import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


class AppSceneInstanceStore {

    @observable appSceneInstanceList = [];
    @observable params

    @action
    findAppSceneInstancePage = async (value) => {
        let params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/appSceneInstance/findAppSceneInstancePage",params );
        if(res.code === 0) {
            this.appSceneInstanceList = res.data.dataList;
        }
        
        return res
    }

    @action
    findAppSceneInstanceList = async (id) =>{
        let param = {
            "testcaseId":id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await Axios.post("/appSceneInstance/findAppSceneInstanceList",param);
        if(res.code===0){
            this.appSceneInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findAppSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/appSceneInstance/findAppSceneInstance",param)
        if(res.code === 0){
            return res.data;
        }
    }

    @action
    deleteAppSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/appSceneInstance/deleteAppSceneInstance",param)
    }


}


let appSceneInstanceStore = new AppSceneInstanceStore();
export default appSceneInstanceStore;