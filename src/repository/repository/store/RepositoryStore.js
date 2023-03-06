import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


export class RepositoryStore {
    @observable repositoryList = [];
    @observable repositoryInfo = {};
    @observable totalRecord ;
    @observable envUrlId;
    @observable selectedItem="all";

    @action
    findRepositoryPage = async (param) => {
        const params = {
            ...param,
            orderParams: [{name:'name', orderType:'asc'}],
        }

        const res = await Axios.post("/repository/findRepositoryPage",params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            this.repositoryList = res.data.dataList;
            return res.data.dataList
        }
    }

    @action
    findRepositoryJoinList = async (params) => {
        this.params = {
            ...params,
            orderParams:[{name:'name', orderType:'asc'}],
        }
        const res = await Axios.post("/repository/findRepositoryJoinList",this.params)
        if(res.code === 0 ) {
            this.repositoryList = res.data
            return res.data;
        }
    }

    @action
    findRepositoryList = async (params) => {
        this.params = {
            ...params,
            orderParams:[{name:'name', orderType:'asc'}],
        }
        const res = await Axios.post("/repository/findRepositoryList",this.params)
        if(res.code === 0 ) {
            this.repositoryList = res.data;
            return res.data;
        }
    }

    @action
    findRepositoryFollowList = async (value) => {
        this.params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await Axios.post("/repositoryFollow/findRepositoryFollowList",this.params)
        if(res.code === 0 ) {

            this.repositoryList = res.data

            return res.data;
        }
    }


    @action
    findRepository = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/repository/findRepository",param)
        if(res.code === 0){
            this.repositoryInfo = res.data;
            return res.data;
        }
    }

    @action
    findRepositoryTotal = async (id) =>{
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/repository/findRepositoryTotal",param);
        if(res.code === 0){
            return res.data;
        }
    }


    @action
    createRepository = async (values) =>  await Axios.post("/repository/createRepository",values)


    @action
    updateRepository = async (values) =>  await Axios.post("/repository/updateRepository",values)

    @action
    deleteRepository = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/repository/deleteRepository",param)
    }

    @action
    menuSelected = (selected)=>{
        this.selectedItem = selected;
    }
    
    

}

export const REPOSITORY_STORE = 'repositoryStore';
