import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


class AppPerfInstanceStore {

    @observable appPerfInstanceList = [];


    @action
    findAppPerfInstancePage = async (value) => {
        let params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/appPerfInstance/findAppPerfInstancePage",params );
        if(res.code === 0) {
            this.appPerfInstanceList = res.data.dataList;
        }
        return res
    }

    @action
    findAppPerfInstanceList = async (id) =>{
        let param = {
            "appPerfId":id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await Axios.post("/appPerfInstance/findAppPerfInstanceList",param);
        if(res.code===0){
            this.appPerfInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findAppPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/appPerfInstance/findAppPerfInstance",param)
        if(res.code === 0){
              return res.data;
        }
    }
    

    @action
    deleteAppPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/appPerfInstance/deleteAppPerfInstance",param)
    }


}


let appPerfInstanceStore = new AppPerfInstanceStore();
export default appPerfInstanceStore;