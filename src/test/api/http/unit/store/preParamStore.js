import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class PreParamStore {


    @action
    findPreScript = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/preScript/findPreScript",param);
        if( res.code === 0){
            return  res.data;
        }
    }

    @action
    createPreScript = async (values) => await Axios.post("/preScript/createPreScript",values);

    @action
    updatePreScript = async (values) =>  await Axios.post("/preScript/updatePreScript",values);


}

let preParamStore=new PreParamStore();
export default preParamStore;
