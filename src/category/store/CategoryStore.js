import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * 模块
 */
export class CategoryStore{
    @observable categoryList = [];
    @observable categoryTableList=[]

    /**
     * 查询模块树
     * 包含用例
     */
    @action
    findCategoryListTree = async (value,categoryName) => {
        const params = {
            name:categoryName,
            orderParams:[{ name:'name',  orderType:'desc' }],
            ...value,
        }

        const res = await Axios.post("/category/findCategoryListTree",params)
        if(res.code === 0) {
           this.categoryList = res.data;
           return res.data;
        }
    }

    /**
     * 查询模块树
     */
    @action
    findCategoryListTreeTable = async (id,categoryName) => {
        const params = {
            name:categoryName,
            repositoryId:id,
            orderParams:[{ name:'name',  orderType:'asc' }],
        }

        const res = await Axios.post("/category/findCategoryListTreeTable",params)
        if(res.code === 0) {
            this.categoryTableList = res.data;
            return res.data;
        }
    }

    /**
     * 通过id查询单个模块
     */
    @action
    findCategory = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/category/findCategory",param)
        if(res.code === 0) {
            return  res.data;
        }
    }

    /**
     * 创建模块
     */
    @action
    createCategory = async (values) =>  await Axios.post("/category/createCategory",values)

    /**
     * 更新模块
     */
    @action
    updateCategory = async (values) =>  await Axios.post("/category/updateCategory",values)

    /**
     * 删除模块
     */
    @action
    deleteCategory = async (categoryId) => {
        const param = new FormData();
        param.append('id', categoryId);

        await Axios.post("/category/deleteCategory",param)
    }

}

const categoryStore =  new CategoryStore();
export default categoryStore;
