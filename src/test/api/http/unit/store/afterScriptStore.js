
import { action } from "mobx";
import {Axios} from "thoughtware-core-ui";

class AfterScriptStore {
    @action
    findAfterScript = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/afterScript/findAfterScript",param);
        if( res.code === 0 ){
            return res.data;
        }
    }

    @action
    createAfterScript = async (values) =>  await Axios.post("/afterScript/createAfterScript",values);


    @action
    updateAfterScript = async (values) =>  await Axios.post("/afterScript/updateAfterScript",values);

}
let afterScriptStore = new AfterScriptStore();
export default afterScriptStore;
