import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";

export class QuartzPlanStore {
    @observable quartzPlanList = [];

    @action
    findQuartzPlanList = async (param) => {
        const params = {
            ...param,
        };
        const res = await Axios.post("/quartzPlan/findQuartzPlanList",params)
        if(res.code === 0) {
            this.quartzPlanList = res.data;
            return res.data
        }
    }

    @action
    findQuartzPlan = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/quartzPlan/findQuartzPlan",param)
        if(res.code === 0){
            return res.data;
        }
    }

    @action
    createQuartzPlan = async (values) => await Axios.post("/quartzPlan/createQuartzPlan",values)

    @action
    updateQuartzPlan = async (values) => await Axios.post("/quartzPlan/updateQuartzPlan",values)

    @action
    deleteQuartzPlan = async (id) => {
        const param = new FormData();
        param.append('id', id);

         await Axios.post("/quartzPlan/deleteQuartzPlan",param)
    }
}


let quartzPlanStore = new QuartzPlanStore()
export default quartzPlanStore;
