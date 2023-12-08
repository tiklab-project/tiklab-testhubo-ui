import { observable,  action} from "mobx";
import {Axios} from "thoughtware-core-ui";


/**
 * 定义
 * http
 * json stepAssertCommon
 */
class JsonParamStore {

    @observable jsonSchemaData;

    /**
     * 通过id查询单个json
     */
    @action
    findJsonParam = async (id) => {
        this.jsonParamId = id;
        const params = new FormData();
        params.append('id', id);

        return await Axios.post("/jsonParam/findJsonParam",params)
    }

    /**
     * 更新json
     */
    @action
    updateJsonParam = async (params) =>  await Axios.post("/jsonParam/updateJsonParam",params)

}

let jsonParamStore =  new JsonParamStore();
export default jsonParamStore;
