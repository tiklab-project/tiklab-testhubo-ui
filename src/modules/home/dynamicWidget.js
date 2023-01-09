import React, {useEffect, useState} from "react";
import {Empty, List, Skeleton} from "antd";
import {Axios, getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import emptyImg from "../../assets/img/empty.png";


const DynamicWidget = (props) =>{
    const {screen,repositoryStore} = props;
    const {findRepositoryJoinList} = repositoryStore;

    const [initLoading, setInitLoading] = useState(true);
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
            content:screen?screen:contentList,
            pageParam: {
                pageSize: 8,
                currentPage:1
            },
        }
        findList(params).then(res=>{
            setList(res);
            setInitLoading(false);
        })
    }, []);


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
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={list}
            locale={{
                emptyText: <Empty
                    imageStyle={{ height: 120 }}
                    description={<span>暂无动态</span>}
                    image={emptyImg}
                />,
            }}
            renderItem={(item) => (
                <List.Item >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            description={<div  dangerouslySetInnerHTML={{__html: item.data}} />}
                        />
                        <div>{item.timestamp}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default inject("repositoryStore")(observer(DynamicWidget));