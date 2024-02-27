import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


export class WebSceneInstanceStore {

    @observable webSceneInstanceList = [];
    @observable instanceId = '';
    @observable	totalRecord = "";
    @observable params


    @action
    findWebSceneInstancePage = async (value) => {
        this.params = {
            ...value,
            type:"web-scene",
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/instance/findInstancePage",this.params );
        if(res.code === 0) {
            this.webSceneInstanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
        }
        return res
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



}


let webSceneInstanceStore = new WebSceneInstanceStore();
export default webSceneInstanceStore;