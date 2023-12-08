import {  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

class ResponseResultStore {

    @action
    findResponseResult = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/responseResult/findResponseResult",param);
        if( res.code === 0){
            return res.data;
        }
    }

    @action
    updateResponseResult = async (values) => await Axios.post("/responseResult/updateResponseResult",values)


}

let responseResultStore = new ResponseResultStore();
export default responseResultStore;
