import React, {useState} from "react";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui"
import RepositoryMenuList from "./repositoryMenuList";

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
            to:'/repository/all',
            title:'项目',
            key: 'Repository'
        },
        // {
        //     to:'/systemManagement',
        //     title:'系统管理',
        //     key: 'systemManagement'
        // }
    ]

    // 切换空间
    const switchRepository=(id)=>{
        sessionStorage.setItem('repositoryId',id);

        localStorage.setItem("leftRouter","/repositorypage/detail");

        props.history.push({pathname:'/repositorypage'});

        setClickIcon(false)
    }

    const menuView = (data) => {
        return data&&data.map(item => {
            if(item.key==="Repository"){
                return(
                    <div
                        className={"header-workspace-item"}
                        key={item.key}
                    >
                        <div
                            onClick={()=>setClickIcon(!clickIcon)}
                        >
                            {item.title}
                            <span >{clickIcon === true ?<DownOutlined />:<UpOutlined />}</span>
                        </div>
                        <div
                            className={`header-workspaceBox ${ clickIcon === true ? "showRepository" : "hideRepository" }`}
                        >
                            <RepositoryMenuList
                                {...props}
                                changeCurrentLink={changeCurrentLink}
                                setClickIcon={setClickIcon}
                            />
                        </div>
                    </div>
                )
            }else{
                return(
                    <div
                        key={item.key}
                        onClick={ () => changeCurrentLink(item.to)}
                        className={currentLink === item.to ? 'portal-header-link-active' : null}
                    >
                        {item.title}
                    </div>
                )
            }

        })
    }

    const changeCurrentLink = item => {
        setCurrentLink(item)
        props.history.push(item)
        setClickIcon(false)
    }

    return(
        <>
            {menuView(menuRouter)}
        </>
    )
}
export default inject("repositoryStore")(observer(HeaderMenu));