import {observable,action} from "mobx";
import {
    findRepositoryPage,
    findRepository,
    createRepository,
    deleteRepository,
    updateRepository
}from '../api/repositoryApi';


export class RepositoryStore {
    @observable repositoryList = [];
    @observable repositoryInfo = {};
    @observable totalRecord ;
    @observable envUrl;
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
            return this.repositoryList = res.data.dataList;
        }
    }

    @action
    findRepository = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findRepository(param)
        if(res.code === 0){
            this.envUrl = res.data.testEnvironment!==null?res.data.testEnvironment.id:null
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
