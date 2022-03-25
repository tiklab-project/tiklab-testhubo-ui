import {observable,action} from "mobx";
import {
    findRepositoryPage,
    findRepositoryList,
    findRepository,
    createRepository,
    deleteRepository,
    updateRepository
}from '../api/repositoryApi';


export class RepositoryStore {
    @observable repositoryList = [];
    @observable repositoryInfo = {};
    @observable totalRecord ;
    @observable envUrlId;
    @observable repositoryName;

    @action
    findRepositoryPage = async (param) => {
        const params = {
            ...param,
            orderParams: [{name:'name', orderType:'asc'}],
        }

        const res = await findRepositoryPage(params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            this.repositoryList = res.data.dataList;
            return res.data.dataList
        }
    }

    @action
    findRepositoryList = async (userId) => {
        this.params = {
            // userId:userId,
            orderParams:[{name:'name', orderType:'asc'}],
        }
        const res = await findRepositoryList(this.params)
        if(res.code === 0 ) {
            this.repositoryList = res.data;
            return res.data;
        }
    }


    @action
    findRepository = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findRepository(param)
        if(res.code === 0){
            this.envUrlId = res.data.testEnvironment!==null?res.data.testEnvironment.id:null;
            this.envUrl = res.data.testEnvironment?res.data.testEnvironment.prepositionUrl:null;
            this.repositoryName = res.data.name
            return this.repositoryInfo = res.data;
        }
    }

    @action
    createRepository = async (values) => {
        const res = await createRepository(values)
        if (res.code === 0) {
            this.findRepositoryPage()
        }
    }

    @action
    updateRepository = (values) => {
        return  updateRepository(values).then((res) => {
            if(res.code === 0){
                this.findRepositoryPage();
            }
        })
    }

    @action
    deleteRepository = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteRepository(param)
        if(res.code === 0){
            this.findRepositoryPage();
        }
    }

}

export const REPOSITORY_STORE = 'repositoryStore';
