import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


class AppSceneStepStore {
    @observable appSceneStepList = [];
    @observable appSceneStepInfo = {};
    @observable categoryId;

    @action
    bindAppUnit = async (selectItem) => {
        let bindList = [];
        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                appScene: {id: this.appSceneId},
                appUnit: {id:selectItem[i]}
            });
        }

        await Axios.post("/appSceneStep/bindAppUnit",bindList)

    }

    @action
    findAppSceneStepList = async (id) => {
        this.appSceneId=id;
        const params = {
            appSceneId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await Axios.post("/appSceneStep/findAppSceneStepList",params)
        if(res.code === 0) {

            this.appSceneStepList=res.data
            return res.data
        }
    }


    @action
    findAppSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/appSceneStep/findAppSceneStep",param);
        if(res.code === 0){
            this.appSceneStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppSceneStep = async (values) => await Axios.post("/appSceneStep/createAppSceneStep",values)


    @action
    updateAppSceneStep = async (values) =>  await Axios.post("/appSceneStep/updateAppSceneStep",values)

    @action
    deleteAppSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/appSceneStep/deleteAppSceneStep",param);

    }

  
}

let appSceneStepStore = new AppSceneStepStore();
export default appSceneStepStore;
