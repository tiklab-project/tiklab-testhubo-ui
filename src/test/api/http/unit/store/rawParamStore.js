import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


export class RawParamStore {

    @observable rawParamInfo = [];


    @action
    findRawParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/rawParam/findRawParam",param);
        if( res.code ===0){
            return res.data;
        }
    }

    @action
    createRawParam = async (values) =>  await Axios.post("/rawParam/createRawParam",values);


    @action
    updateRawParam = async (values) => await Axios.post("/rawParam/updateRawParam",values)



}

let rawParamStore = new RawParamStore();
export default rawParamStore;
