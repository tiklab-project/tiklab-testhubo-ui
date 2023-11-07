import React, {useEffect, useState} from "react";
import {Empty, Spin} from "antd";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import emptyImg from "../assets/img/empty.png";
import "./homestyle.scss"

/**
 * 最近访问的仓库
 */
const RepositoryRecentHome = (props) =>{
    const {repositoryStore} = props;
    const {findRepositoryRecentList,repositoryRecent}=repositoryStore;

    const [dataList, setDataList] = useState([]);
    const [spinning, setSpinning] = useState(true);

    const userId = getUser().userId;

    useEffect(async ()=>{
        let list = await findRepositoryRecentList(userId)

        let newList
        if(list&&list.length>5){
            newList = list.slice(0,4);
        }else {
            newList=list;
        }
        setSpinning(false)
        setDataList(newList)
    },[userId])

    /**
     * 去往详情页
     */
    const toDetail = (repositoryId) => {
        sessionStorage.setItem("repositoryId",repositoryId)

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repository/detail")

        let params = {
            repository: {id:repositoryId},
            userId:userId
        }
        repositoryRecent(params);

        props.history.push(`/repository/detail/${repositoryId}`);
    }

    /**
     * 渲染最近访问项
     */
    const showRecent=(list)=>{
        return list&&list.map(item=>{
            return(
                <div key={item.id} className={"home-recent-item"} onClick={()=>toDetail(item.id)}>
                    <div className={"home-recent-item-left"}>
                        <img src={item.iconUrl} alt={"icon"} className={"ws-img-icon icon-bg-border"}/>
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
        <Spin spinning={spinning}>
            <div className={"home-recent-box"}>
                {
                    // dataList&&dataList.length>0
                    //     ?showRecent(dataList)
                    //     : <Empty
                    //         description={<span>暂无访问</span>}
                    //         image={emptyImg}
                    //     />
                    showRecent(dataList)
                }
            </div>

        </Spin>

    )
}

export default inject("repositoryStore")(observer(RepositoryRecentHome));