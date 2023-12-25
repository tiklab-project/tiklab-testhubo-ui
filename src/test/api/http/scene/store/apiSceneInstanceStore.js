import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


export class ApiSceneInstanceStore {

    @observable apiSceneInstanceList = [];
    @observable apiSceneInstanceInfo;
    @observable apiSceneId;

    @action
    findApiSceneInstancePage = async (value) => {
        const params = {
            ...value,
            type:"api-scene",
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await Axios.post("/instance/findInstancePage",params);
        if(res.code === 0) {
            this.apiSceneInstanceList = res.data.dataList;
        }

        return res
    }



    @action
    findApiSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiSceneInstance/findApiSceneInstance",param);
        if( res.code === 0){
            this.apiSceneInstanceInfo = res.data;
            return   res.data;
        }
    }


    @action
    deleteApiSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/instance/deleteInstance",param)

    }

}

let apiSceneInstanceStore = new ApiSceneInstanceStore();
export default apiSceneInstanceStore;
