/**
 * @description：
 * @date: 2021-08-13 10:51
 */
import {observable,action} from "mobx";
import {
    performCase,
    performCaseWeb,
    findCaseWebResult,
    performCaseApp,
    findCaseAppResult
} from '../api/performCaseApi';

// 接口的执行测试
export class PerformCaseStore {

    @observable performCaseInfo;
    @observable performCaseWebInfo;
    @observable executeType;

    @action
    performCase = async (param) => {
        const res = await performCase(param);
        if(res.code === 0){
            this.performCaseInfo = res.data;
            return res.data
        }
    }

    @action
    performCaseWeb = async (param) => {
        const res = await performCaseWeb(param);
        if(res.code === 0){
            console.log(res.data)
            return res.data
        }
    }

    @action
    findCaseWebResult = async (param) => {
        const res = await findCaseWebResult(param);
        if(res.code === 0){
            return res.data
        }
    }

    @action
    performCaseApp = async (param) => {
        const res = await performCaseApp(param);
        if(res.code === 0){
            return res.data
        }
    }

    @action
    findCaseAppResult = async (param) => {
        const res = await findCaseAppResult(param);
        if(res.code === 0){
            return res.data
        }
    }




}

export const PERFORMCASE_STORE = 'performCaseStore';
