import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class WebPerfInstanceStore {
    @observable webPerfInstanceList = [];

    @action
    findWebPerfInstancePage = async (value) => {
        let params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/webPerfInstance/findWebPerfInstancePage",params);
        if(res.code === 0) {
            this.webPerfInstanceList = res.data.dataList;
        }
        return res
    }

    @action
    findWebPerfInstanceList = async (id) =>{
        let param = {
            "apiPerfId":id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/webPerfInstance/findWebPerfInstanceList",param);
        if(res.code===0){
            this.webPerfInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findWebPerfInstance = async (id) => {

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/webPerfInstance/findWebPerfInstance",param)
        if(res.code === 0){
              return res.data;
        }
    }

    @action
    deleteWebPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/webPerfInstance/deleteWebPerfInstance",param)

    }


}


let webPerfInstanceStore = new WebPerfInstanceStore();
export default webPerfInstanceStore;