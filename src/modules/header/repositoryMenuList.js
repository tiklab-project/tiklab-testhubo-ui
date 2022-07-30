import React, {useEffect} from "react";
import {getUser} from "tiklab-core-ui"
import {inject, observer} from "mobx-react";

//顶部菜单栏，下拉框里的空间列表
const RepositoryMenuList = (props) =>{
    const {repositoryStore,changeCurrentLink,setClickIcon} = props;
    const {findRepositoryList,repositoryList}=repositoryStore;

    let userId = getUser().userId;

    useEffect(()=>{
        if(userId){
            findRepositoryList(userId)
        }
    },[userId])


    const showRepositoryListView = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.id}
                    onClick={()=>switchRepository(item.id)}
                    className={"header-workspace-list-item"}
                >
                    {item.name}
                </li>
            )
        })
    }

    // 去往详情页
    const switchRepository=(repositoryId)=>{
        sessionStorage.setItem("repositoryId",repositoryId)
        props.history.push('/repositorypage/detail');
        setClickIcon(false)
    }


    return(
        <>
            <ul style={{height: 130,overflow:"auto"}}>
                {
                    showRepositoryListView(repositoryList)
                }
            </ul>
            <div
                onClick={()=>changeCurrentLink("/repository/alllist")}
            >
                进入所有仓库
            </div>
        </>
    )
}

export default inject("repositoryStore")(observer(RepositoryMenuList));