import React, {useEffect, useState} from "react";
import {productImg, productWhiteImg} from "thoughtware-core-ui";
import {useHistory} from "react-router";
import {productTitle} from "thoughtware-core-ui/es/utils/product";
import "./LeftMenuCommonStyle.scss"
import {CaretLeftOutlined, CaretRightOutlined, QuestionCircleOutlined, SettingOutlined} from "@ant-design/icons";
import MessageDrawer from "../../setting/message/MessageDrawer";
import {Dropdown, Tooltip} from "antd";
import IconCommon from "../IconCommon";
import {Profile} from 'thoughtware-licence-ui/es/commons'
import {useTheme} from "../hooks/useTheme";


const LeftMenuCommon = (props) =>{
    const {
        menuData,
        diffHeader,
        repositoryId,
        isFirst,
        settingRouter,
        HelpLink,AppLink,AvatarLink
    } = props
    const history = useHistory()
    const leftRouter = localStorage.getItem("leftRouter")
    const [isExpanded, setIsExpanded] = useState(false);
    const [moreMenu, setMoreMenu] = useState([]);
    const [visibleMenuItems, setVisibleMenuItems] = useState([]);
    const [visible, setVisible] = useState(false);
    const [themeColor, setThemeColor] = useTheme();

    const resizeUpdate = () => {
        const documentHeight = window.innerHeight;
        const menuHeight = documentHeight - 180;
        const menuNum = Math.floor(menuHeight / 65);

        if (menuData.length > menuNum) {
            setVisibleMenuItems(menuData.slice(0, menuNum - 1));
            setMoreMenu(menuData.slice(menuNum - 1));
        } else {
            setVisibleMenuItems(menuData);
            setMoreMenu([]);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", resizeUpdate);
        resizeUpdate(); // 初始化调用
        return () => {
            window.removeEventListener('resize', resizeUpdate);
        };
    }, []);


    /**
     * 点击路由
     */
    const clickToPage = (item) => {
        history.push(item.router)
        localStorage.setItem("leftRouter",item.router);

        if(item.key==="overview"){
            history.push(`${item.router}/${repositoryId}`)
        }else if(item.key==="testcase"){
            let caseView = localStorage.getItem("CASE_VIEW")
            if(caseView==="list"){
                history.push(`${item.router}-list/${repositoryId}`)
            }else {
                history.push(`${item.router}/${repositoryId}`)
            }
        }else {
            history.push(item.router)
        }
    };

    /**
     * 导航
     */
    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.key}
                    className={`menu-box-nav-item `}
                    onClick={()=>clickToPage(item)}
                >
                    <div
                        className={`menu-box-nav-item-${themeColor}
                            ${leftRouter===item.router?`select-link-${themeColor}`:""}
                            ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}
                        `}>
                        <div className={"menu-box-nav-item-detail"}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-${item.icon}`}/>
                            </svg>
                        </div>
                        <div  className={"menu-box-nav-item-detail menu-box-nav-item-title"}>
                            {item.name}
                        </div>
                    </div>
                </li>
            )
        })
    }

    /**
     * 更多列表
     */
    const showMore = (
        <div className={"more-menu-box"} style={{left:`${isExpanded?"200px":"75px"}`}}>
            {
                moreMenu.map(item=>{
                    return(
                        <div
                            className={`more-menu-box-item ${leftRouter===item.router?"more-menu-box-item-action":""}`}
                            onClick={()=>clickToPage(item)}
                        >
                            <div >
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref= {`#icon-${item.icon}`}/>
                                </svg>
                            </div>
                            <div  >
                                {item.name}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

    /**
     * 更多
     */
    const moreItem = () => (
        <li
            key={"more"}
            className={`menu-box-nav-item `}
        >
            <Dropdown
                overlay={showMore}
                trigger={['click']}
                visible={visible}
                onOpenChange={()=>setVisible(!visible)}
                placement="top"
            >
                <div
                    className={`menu-box-nav-item-box ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}`}>
                    <div className={"menu-box-nav-item-detail"}>
                        <svg className="icon-m" aria-hidden="true">
                            <use xlinkHref= {`#icon-gengduo`}/>
                        </svg>
                    </div>
                </div>
            </Dropdown>
        </li>
    )

    //设置主题
    const changeTheme = (type) =>{
        const themeMap = {
            black: "theme-black",
            blue: "theme-blue",
            default: "theme-default"
        };

        const theme = themeMap[type] || themeMap.default;

        setThemeColor(theme);
    }


    return(
        <div className={`menu-box ${isExpanded?"menu-box-expended":"menu-box-not-expended"} ${themeColor}`}>
            {
                isFirst&&<div style={{width:`${isExpanded&&"200px"}`}} className={'product-logo-box'} onClick={()=>clickToPage({router:"/home"})}>
                    <img src={themeColor==="theme-default"?productWhiteImg.teston:productImg.teston} alt='logo' className={"product-logo"}/>
                    {
                        isExpanded&&<div className={"productName"} >{productTitle.teston}</div>
                    }
                </div>
            }
            <div className={"menu-box-flex"}  style={{height:`${isFirst?"calc(100% - 63px)":"100%"}`}}>
                <ul className={"menu-box-nav"}>
                    {
                        diffHeader&&diffHeader(isExpanded,themeColor)
                    }
                    {
                        showMenuItem(visibleMenuItems)
                    }
                    {
                        moreMenu&&moreMenu.length>0
                            &&moreItem()
                    }
                </ul>

                <div className={`menu-box-bottom`}>
                    {
                        isFirst
                            ?null
                            :isExpanded
                                ?<div className={`menu-box-bottom-item-${themeColor} menu-box-bottom-item`} onClick={()=>clickToPage({router:settingRouter})}>
                                    <SettingOutlined style={{fontSize:"18px"}}/>
                                    {isExpanded && <div>设置</div>}
                                </div>
                                : <Tooltip placement="right" title={"设置"}>
                                    <div className={`menu-box-bottom-item-${themeColor} menu-box-bottom-item menu-box-bottom-item-not-isExpanded`}
                                         onClick={()=>clickToPage({router:settingRouter})}
                                    >
                                        <SettingOutlined style={{fontSize:"18px"}}/>
                                    </div>
                                </Tooltip>
                    }

                    {
                        isFirst&&<MessageDrawer isExpanded={isExpanded} themeColor={themeColor}/>
                    }

                    {
                        HelpLink&& <HelpLink
                            bgroup={'teston'}
                            iconComponent= {
                                isExpanded
                                    ?<div className={`menu-box-bottom-item-${themeColor} menu-box-bottom-item`}>
                                        <QuestionCircleOutlined style={{fontSize:"18px"}}/>
                                        {isExpanded && <div>帮助</div>}
                                    </div>
                                    : <Tooltip placement="right" title={"帮助"}>
                                        <div className={`menu-box-bottom-item-${themeColor} menu-box-bottom-item menu-box-bottom-item-not-isExpanded`}>
                                            <QuestionCircleOutlined style={{fontSize:"18px"}}/>
                                        </div>
                                    </Tooltip>
                            }
                        />
                    }
                    {
                        AppLink&& <AppLink
                            bgroup={'teston'}
                            translateX={isExpanded?200:75}
                            iconComponent={
                                isExpanded
                                    ?<div className={`menu-box-bottom-item-${themeColor} menu-box-bottom-item`}>
                                        <IconCommon
                                            icon={`${themeColor==="theme-default"?"jiugongge":"jiugongge1"}`}
                                            className={"icon-s"}
                                        />
                                        {isExpanded && <div>应用导航</div>}
                                    </div>
                                    : <Tooltip placement="right" title={"应用导航"}>
                                        <div className={`menu-box-bottom-item-${themeColor} menu-box-bottom-item menu-box-bottom-item-not-isExpanded`}>
                                            <IconCommon
                                                icon={`${themeColor==="theme-default"?"jiugongge":"jiugongge1"}`}
                                                className={"icon-s"}
                                            />
                                        </div>
                                    </Tooltip>
                            }
                        />
                    }
                    {
                        AvatarLink&&<AvatarLink
                            changeTheme={changeTheme}
                            iconComponent={
                                <div className={`menu-box-bottom-item-${themeColor} menu-box-bottom-item`} style={{padding:"10px 21px"}}>
                                    <Profile />
                                    {isExpanded && <div >个人中心</div>}
                                </div>
                            }
                            {...props}
                        />
                    }

                </div>
            </div>

            <div className={"menu-box-right-border"}>
                <div className={"menu-box-isexpanded"} onClick={()=>setIsExpanded(!isExpanded)}>
                    {
                        isExpanded?<CaretLeftOutlined />:<CaretRightOutlined />
                    }
                </div>
            </div>

        </div>
    )
}

export default LeftMenuCommon