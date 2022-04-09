import React, {useState} from "react";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {getUser} from "doublekit-core-ui"

const HeaderMenu = (props) =>{
    const {repositoryStore} = props;
    const {findRepositoryList,repositoryList} = repositoryStore;

    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const [clickIcon, setClickIcon] = useState(false);

    let userId = getUser().userId;
    useState(()=>{
        findRepositoryList(userId)
    },[userId])

    const menuRouter = [
        {
            to:'/',
            title:'主页',
            key: 'home'
        },
        {
            to:'/repository/alllist',
            title:'项目',
            key: 'Repository'
        },
        {
            to:'/systemManagement',
            title:'系统管理',
            key: 'systemManagement'
        }
    ]

    // 切换空间
    const switchRepository=(id)=>{
        sessionStorage.setItem('repositoryId',id);

        localStorage.setItem("leftRouter","/repositorypage/detail");

        props.history.push({pathname:'/repositorypage'});

        setClickIcon(false)
    }

    const showRepositoryListView = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.id}
                    onClick={()=>switchRepository(item.id)}
                    className={"header-repository-list-item"}
                >
                    {item.name}
                </li>
            )
        })
    }

    const menuView = (data) => {
        return data&&data.map(item => {
            if(item.key==="Repository"){
                return(
                    <div
                        className={"header-repository-item"}
                        key={item.key}
                    >
                        <div

                            className={currentLink === item.to ? 'portal-header-link-active' : null}
                            onClick={()=>setClickIcon(!clickIcon)}
                        >
                            {item.title}

                            <span >
                                {clickIcon === true ?<DownOutlined />:<UpOutlined />}
                            </span>
                        </div>
                        <div
                            className={`header-repositoryBox ${ clickIcon === true ? "showRepository" : "hideRepository" }`}
                        >
                            <ul style={{height: 130}}>
                                {showRepositoryListView(repositoryList)}
                            </ul>
                            <div
                                onClick={()=>changeCurrentLink(item)}
                            >
                                进入所有空间
                            </div>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div
                        key={item.key}
                        onClick={ () => changeCurrentLink(item)}
                        className={currentLink === item.to ? 'portal-header-link-active' : null}
                    >
                        {item.title}
                    </div>
                )
            }

        })
    }

    const changeCurrentLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
        setClickIcon(false)
    }

    return(
        <>
            {menuView(menuRouter)}
        </>
    )
}
export default inject("repositoryStore")(observer(HeaderMenu));