import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class WebSceneInstanceStore {

    @observable webSceneInstanceList = [];
    @observable instanceId = '';
    @observable	totalRecord = "";
    @observable params


    @action
    findWebSceneInstancePage = async (value) => {
        this.params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/webSceneInstance/findWebSceneInstancePage",this.params );
        if(res.code === 0) {
            this.webSceneInstanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
        }
        return res
    }

    @action
    findWebSceneInstanceList = async (id) =>{
        let param = {
            "webSceneId":id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/webSceneInstance/findWebSceneInstanceList",param);
        if(res.code===0){
            this.webSceneInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findWebSceneInstance = async (id) => {
        this.instanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/webSceneInstance/findWebSceneInstance",param)
        if(res.code === 0){

            return res.data;
        }
    }


    @action
    deleteWebSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/webSceneInstance/deleteWebSceneInstance",param)
    }


}


let webSceneInstanceStore = new WebSceneInstanceStore();
export default webSceneInstanceStore;