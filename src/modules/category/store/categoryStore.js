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
    @observable categoryTableList=[]
    @observable categoryInfo = [];
    @observable repositoryId = '';
    @observable categoryId= '';
    @observable categoryName='';

    @action
    findCategoryListTree = async (value,categoryName) => {
        const params = {
            name:categoryName,
            orderParams:[{ name:'name',  orderType:'desc' }],
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
        const params = {
            name:categoryName,
            repositoryId:id,
            orderParams:[{ name:'name',  orderType:'asc' }],
        }

        const res = await findCategoryListTreeTable(params)
        if(res.code === 0) {
            this.categoryTableList = res.data;
            return res.data;
        }
    }

    @action
    findCategory = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findCategory(param)
        if(res.code === 0) {
            return  res.data;
        }
    }

    @action
    createCategory = async (values) =>  await createCategory(values)


    @action
    updateCategory = async (values) =>  await updateCategory(values)

    @action
    deleteCategory = async (categoryId) => {
        const param = new FormData();
        param.append('id', categoryId);

        await deleteCategory(param)
    }

}


export const CATEGORY_STORE = 'categoryStore';
