import React, {useEffect, useState} from "react";
import {Empty, Space, Spin} from "antd";
import {getUser} from "thoughtware-core-ui";
import {inject, observer} from "mobx-react";
import "./homestyle.scss"
import RepositoryIcon from "../common/RepositoryIcon";

/**
 * 最近访问的项目
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
        localStorage.setItem("leftRouter","/repository/testcase")

        let params = {
            repository: {id:repositoryId},
            userId:userId
        }
        repositoryRecent(params);

        props.history.push(`/repository/testcase/${repositoryId}`);
    }

    /**
     * 渲染最近访问项
     */
    const showRecent=(list)=>{
        return list&&list.map(item=>{
            return(
                <div key={item.id} className={"home-recent-item"} onClick={()=>toDetail(item.id)}>
                    <div className={"home-recent-item-left"}>
                        <RepositoryIcon iconUrl={item.iconUrl} className={"repository-icon"}/>
                        <div className={"home-recent-item-left-name text-ellipsis"}>{item.name}</div>
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
                    dataList&&dataList.length>0
                        ?<>{showRecent(dataList)}</>
                        : <Empty description={<span>暂无访问</span>}/>
                }
            </div>

        </Spin>

    )
}

export default inject("repositoryStore")(observer(RepositoryRecentHome));