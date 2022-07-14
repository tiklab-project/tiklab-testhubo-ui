import { observable,  action } from "mobx";
import {
    findWebPerfPage,
    createWebPerf,
    findWebPerf,
    updateWebPerf,
    deleteWebPerf,
    findWebPerfListByTestCase
} from '../api/webPerfApi'

export class WebPerformStore {
    @observable webPerfList = [];
    @observable webPerfInfo;

    @action
    findWebPerfList = async (value) => {

        const res = await findWebPerfListByTestCase(value);

        if(res.code === 0) {
            this.webPerfList = res.data;
            return res.data
        }
    }

    @action
    findWebPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebPerf(param);
        if( res.code === 0){
            this.webPerfInfo = res.data;
            return res.data;
        }
    }


    @action
    createWebPerf = async (values) =>  await createWebPerf(values)
    

    @action
    updateWebPerf = async (values) =>  await updateWebPerf(values)

    @action
    deleteWebPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteWebPerf(param)
    }

}

export const WEB_PERFORM_STORE = 'webPerformStore';
