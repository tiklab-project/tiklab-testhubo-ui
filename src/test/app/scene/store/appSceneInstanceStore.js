import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


class AppSceneInstanceStore {

    @observable appSceneInstanceList = [];
    @observable params

    @action
    findAppSceneInstancePage = async (value) => {
        let params = {
            ...value,
            type:"app-scene",
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/instance/findInstancePage",params );
        if(res.code === 0) {
            this.appSceneInstanceList = res.data.dataList;
        }
        
        return res
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



}


let appSceneInstanceStore = new AppSceneInstanceStore();
export default appSceneInstanceStore;