import { observable,  action } from "mobx";
import {
	deleteEnvironment,
	createEnvironment,
	findEnvironment,
	updateEnvironment,
	findEnvironmentPage,
	findEnvironmentList
} from '../api/environmentApi';

export class EnvironmentStore {
	@observable environmentList = [];
	@observable environmentId ;
	@observable repositoryId;

	@action
	findEnvironmentList = (id) => {
		this.repositoryId=id;
		const params = {
			repositoryId:id,
			orderParams: [{
				name:'name',
				orderType:'asc'
			}],
		}
		const that = this;
		return new Promise(function(resolve, reject){
			findEnvironmentList(params).then(res => {
				if(res.code === 0) {
					that.environmentList = res.data;
					resolve(res);
				}
			})
		})
	}

	@action
	deleteEnvironment = (id) => {
		const param = new FormData();
		param.append('id', id);
		deleteEnvironment(param).then(() => {
			this.findEnvironmentList(this.repositoryId)
        })
	}

    @action
	createEnvironment = (values) => {
		createEnvironment(values).then(res => {
			if(res.code === 0) {
				this.findEnvironmentList(this.repositoryId)
			}
        }).catch(error => {
            console.log(error)
        })
	}

	@action
	updateEnvironment = (values) => {
		values.id = this.environmentId;
		updateEnvironment(values).then((res) => {
			if(res.code === 0) {
				this.findEnvironmentList(this.repositoryId)
			}
        })
	}

	@action
	findEnvironment = (id) => {
		this.environmentId = id;
		const param = new FormData();
		param.append('id', id);
        return new Promise(function(resolve, reject){
            findEnvironment(param).then(res => {
				if( res.code === 0){
                	resolve(res.data);
				}
            })
        })
	}


}

export const ENVIRONMENT_STORE = 'environmentStore';

