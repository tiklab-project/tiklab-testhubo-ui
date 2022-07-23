import { observable,  action } from "mobx";
import {
    findAppPerfPage,
    createAppPerf,
    findAppPerf,
    updateAppPerf,
    deleteAppPerf,
    findAppPerfListByTestCase
} from '../api/appPerfApi'

export class AppPerfStore {
    @observable appPerfList = [];
    @observable appPerfInfo;

    @action
    findAppPerfList = async (value) => {

        const res = await findAppPerfListByTestCase(value);

        if(res.code === 0) {
            this.appPerfList = res.data;
            return res.data
        }
    }

    @action
    findAppPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppPerf(param);
        if( res.code === 0){
            this.appPerfInfo = res.data;
            return res.data;
        }
    }


    @action
    createAppPerf = async (values) =>  await createAppPerf(values)


    @action
    updateAppPerf = async (values) =>  await updateAppPerf(values)

    @action
    deleteAppPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteAppPerf(param)
    }

}

export const APP_PERF_STORE = 'appPerfStore';
