import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 仓库 stepAssertCommon
 */
export class RepositoryStore {
    @observable repositoryList = [];
    @observable repositoryInfo = {};
    @observable totalRecord ;
    @observable envUrlId;

    /**
     * 按分页查询仓库列表
     */
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

    /**
     * 查询我参数的仓库列表
     */
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
    
    /**
     * 获取仓库列表
     */
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

    /**
     * 查询我关注的仓库列表
     */
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

    /**
     * 通过id查询单个仓库
     */
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

    /**
     * 仓库概况
     */
    @action
    findRepositoryTotal = async (id) =>{
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/repository/findRepositoryTotal",param);
        if(res.code === 0){
            return res.data;
        }
    }

    /**
     * 创建仓库
     */
    @action
    createRepository = async (values) =>  await Axios.post("/repository/createRepository",values)

    /**
     * 更新仓库
     */
    @action
    updateRepository = async (values) =>  await Axios.post("/repository/updateRepository",values)

    /**
     * 删除仓库
     */
    @action
    deleteRepository = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/repository/deleteRepository",param)
    }


    /**
     * 设置最近访问的仓库
     */
    @action
    repositoryRecent = async (values) => {
        const res = await Axios.post("/repositoryRecent/repositoryRecent",values);
        if(res.code === 0 ) {
            return res.data;
        }
    }

    /**
     * 查询最近访问的仓库列表
     */
    @action
    findRepositoryRecentList = async (userId) => {
        let params = {
            userId:userId,
            orderParams:[{name:'updateTime', orderType:'desc'}],
        }
        const res = await Axios.post("/repositoryRecent/findRepositoryRecentList",params)
        if(res.code === 0 ) {
            return res.data;
        }
    }

}

export const REPOSITORY_STORE = 'repositoryStore';
