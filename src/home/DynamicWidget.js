import React, {useEffect, useState} from "react";
import {Axios, getUser} from "thoughtware-core-ui";
import {inject, observer} from "mobx-react";
import DynamicList from "../common/templateList/TemplateList";

/**
 * 首页中动态
 */
const DynamicWidget = (props) =>{
    const {screen,repositoryStore} = props;
    const {findRepositoryJoinList} = repositoryStore;

    const [list, setList] = useState([]);

    useEffect(async () => {
        let repositoryList=[];
        if(!screen){
            let res = await findRepositoryJoinList({userId: getUser().userId})
            res.map(item=>{
                repositoryList.push( item.id)
            })
        }
        let contentList = { repositoryId:repositoryList }

        let params = {
            data:screen?screen:contentList,
            pageParam: {
                pageSize: 8,
                currentPage:1
            },
        }
        findList(params).then(res=>{
            setList(res);
        })
    }, []);

    /**
     * 查询日志列表
     */
    const findList = async (value) => {
        const params = {
            ...value,
            bgroup:"teston"
        }
        let data = await Axios.post('/oplog/findlogpage', params)

        let list = data.data.dataList;

        //datalist 处理
        let newArr = []
        let newList = (data)=>{
            return data&&data.map(item=>{
                newArr.push({
                    ...item,
                    content: {...JSON.parse(item.content)}
                })
            })
        }
        newList(list)

        return newArr;
    };

    return (
        <DynamicList dynamicList={list}/>
    );
}

export default inject("repositoryStore")(observer(DynamicWidget));