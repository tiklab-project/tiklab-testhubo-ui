import React, {useEffect, useState} from "react";
import {Empty, Table} from "antd";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import emptyImg from "../../../assets/img/empty.png";

const RepositoryRecentHome = (props) =>{
    const {repositoryRecentStore} = props;

    const {findRepositoryRecentList,recentList,repositoryRecent}=repositoryRecentStore;
    const [dataList, setDataList] = useState([]);

    const userId = getUser().userId;

    useEffect(async ()=>{
        let list = await findRepositoryRecentList(userId)

        let newList
        if(list&&list.length>5){
            newList = list.slice(0,4);
        }else {
            newList=list;
        }

        setDataList(newList)
    },[userId])

    // 去往详情页
    const toDetail = (repositoryId) => {
        sessionStorage.setItem("repositoryId",repositoryId)

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repository/detail")

        let params = {
            repository: {id:repositoryId},
            userId:userId
        }
        repositoryRecent(params);

        props.history.push('/repository');
    }


    const showRecent=(list)=>{
        return list&&list.map(item=>{
            return(
                <div key={item.id} className={"home-recent-item"} onClick={()=>toDetail(item.id)}>
                    <div className={"home-recent-item-left"}>
                        <img src={item.iconUrl} alt={"icon"} className={"ws-img-icon"}/>
                        <div className={"home-recent-item-left-name"}>{item.name}</div>
                    </div>
                    <div style={{display:"flex","justifyContent":"space-between"}}>
                        <div className={"home-recent-item-num"}>
                            <div className={"home-recent-item-num-title"}>测试计划</div>
                            <div>{item.planNum}</div>
                        </div>
                        <div className={"home-recent-item-num"}>
                            <div className={"home-recent-item-num-title"}>成员数</div>
                            <div>{item.memberNum}</div>
                        </div>
                    </div>

                </div>
            )
        })
    }



    return(
        <div className={"home-recent-box"}>
            {
                dataList&&dataList.length>0
                    ?showRecent(dataList)
                    : <Empty
                        description={<span>暂无访问</span>}
                        image={emptyImg}
                    />
            }
        </div>
    )
}

export default inject("repositoryRecentStore")(observer(RepositoryRecentHome));