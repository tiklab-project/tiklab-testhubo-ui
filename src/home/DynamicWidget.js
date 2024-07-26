import React, {useEffect, useState} from "react";
import {Axios, getUser} from "thoughtware-core-ui";
import {inject, observer} from "mobx-react";
import {Empty, Space, Timeline} from "antd";
import Profile from "../common/Profile";
import emptyImg from "../assets/img/empty.png";

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

    const showTimeLine = (list) =>{
        return list&&list.map((item,index)=>{
            const {actionType,action,user,createTime,data} = item
            return<Timeline.Item key={index}>
                <div>
                    <div>{createTime}</div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center",margin:"15px 0"}}>
                        <Space>
                            <Profile userInfo={user}/>
                            <div style={{color:"#959595"}}>{user?.nickname || user?.name}</div>
                        </Space>
                        <div>{actionType?.name}</div>
                        <div>{action}</div>
                    </div>
                </div>
            </Timeline.Item>
        })
    }

    return (
        <Timeline mode="left">
            {
                list
                    ?showTimeLine(list)
                    :<Empty
                        imageStyle={{ height: 120 }}
                        description={<span>暂无动态</span>}
                        image={emptyImg}
                    />
            }
        </Timeline>
    );
}

export default inject("repositoryStore")(observer(DynamicWidget));