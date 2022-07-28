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
            orderParams: [{name:'id', orderType:'asc'}],
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

            this.repositoryName = res.data.name
            this.repositoryInfo = res.data;
            return res.data;
        }
    }

    @action
    createRepository = async (values) =>  await createRepository(values)


    @action
    updateRepository = async (values) =>  await  updateRepository(values)

    @action
    deleteRepository = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await deleteRepository(param)
    }

}

export const REPOSITORY_STORE = 'repositoryStore';
