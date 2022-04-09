import { observable,  action } from "mobx";
import {
    findCategory,
    createCategory,
    deleteCategory,
    updateCategory,
    findCategoryListTree,
    findCategoryListTreeTable
} from '../api/categoryApi';
export class CategoryStore{
    @observable categoryList = [];
    @observable categoryInfo = [];
    @observable repositoryId = '';
    @observable categoryId= '';
    @observable categoryName='';

    @action
    findCategoryListTree = async (value,categoryName) => {
        this.repositoryId = value.id;
        const params = {
            name:categoryName,
            orderParams:[{ name:'name',  orderType:'asc' }],
            ...value,
        }

        const res = await findCategoryListTree(params)
        if(res.code === 0) {
           this.categoryList = res.data;
           return res.data;
        }
    }

    @action
    findCategoryListTreeTable = async (id,categoryName) => {
        this.repositoryId = id;
        const params = {
            name:categoryName,
            repositoryId:id,
            orderParams:[{ name:'name',  orderType:'asc' }],
        }

        const res = await findCategoryListTreeTable(params)
        if(res.code === 0) {
            this.categoryList = res.data;
            return res.data;
        }
    }

    @action
    findCategory = async (id) => {
        this.categoryId = id;
        const param = new FormData();
        param.append('id', id);

        const res = await findCategory(param)
        if(res.code === 0) {
            return this.categoryInfo = res.data;

        }

    }

    @action
    createCategory = async (values) => {
        const res = await createCategory(values)
        if(res.code === 0){
            this.findCategoryListTree(this.repositoryId)
        }
    }

    @action
    updateCategory = async (values) => {
        const res = await updateCategory(values)
        if(res.code === 0){
            this.findCategoryListTree(this.repositoryId)
        }

    }

    @action
    deleteCategory = async (categoryId) => {
        const param = new FormData();
        param.append('id', categoryId);
        const res = await deleteCategory(param)
        if(res.code === 0){
            this.findCategoryListTree(this.repositoryId)
        }
    }

}


export const CATEGORY_STORE = 'categoryStore';
