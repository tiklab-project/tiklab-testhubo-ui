import { observable,  action } from "mobx";
import {findUserSelectPage} from '../api/userSelectApi';

export class UserSelectStore {
    @observable userSelectList = [];
    @observable userSelectId ;
    @observable param;
    @observable totalRecord;

    @action
    findUserSelectPage = async (param) => {
        this.param = param
        const params = {
            orderParams: [{ name:'name', orderType:'asc' }],
            ...param
        };
        const res = await findUserSelectPage(params);
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            return this.userSelectList = res.data.dataList;
        }
    }

    @action
    getUserId = (id) => {
        this.userSelectId = id
    }

}

export const USERSELECT_STORE = 'userSelectStore';

