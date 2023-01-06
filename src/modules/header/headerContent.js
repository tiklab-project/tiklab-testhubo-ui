import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Col, Row, Menu, Dropdown} from "antd";
import {Profile, WorkAppConfig} from "tiklab-eam-ui"
import {getUser} from "tiklab-core-ui"
import {inject, observer} from "mobx-react";
import HeaderMenu from "./headerMenu";
import logo from "../../assets/img/teston-log.png";
import {QuestionCircleOutlined, RightOutlined, SettingOutlined} from "@ant-design/icons";
import MessageDrawer from "../sysmgr/message/messageDrawer";

const HeaderContent = props => {
    const {logout} = props;

    const { i18n } = useTranslation();
    const [languageData, setLanguageData] = useState(i18n.languages);

    let userInfo = getUser();

    const onClickLan = ({ key }) => {
        i18n.changeLanguage(languageData[key])
    };

    const helpItem = [
        {
            label: '文档',
            key: 'doc' ,
            icon:<svg className="icon-s user-header-icon-hover" aria-hidden="true" >
                <use xlinkHref= {`#icon-icon_bangzhuwendang`} />
            </svg>
        },
        {
            label: '社区支持',
            key: 'help',
            icon:<svg className="icon-s user-header-icon-hover" aria-hidden="true" >
                <use xlinkHref= {`#icon-shequ`} />
            </svg>
        },
        {
            label: '在线工单',
            key: 'order' ,
            icon:<svg className="icon-s user-header-icon-hover" aria-hidden="true" >
                <use xlinkHref= {`#icon-gongdan`} />
            </svg>
        },
        {
            label: '在线客服',
            key: 'service' ,
            icon:<svg className="icon-s user-header-icon-hover" aria-hidden="true" >
                <use xlinkHref= {`#icon-kefu`} />
            </svg>
        },
    ]

    //帮助与支持
    const helpMenu = (
        <Menu style={{padding:10,width:180}} >
            {
                helpItem.map(item=>{
                    return(
                        <Menu.Item  key={item.key} icon={item.icon}>{item.label}</Menu.Item>
                    )
                })
            }
        </Menu>
    );

    //语言包选项
    const lanMenu = (list) =>{
        return list&&list.map(item=>{
            return <div className={"header-lan-box-item"} key={item} onClick={()=>onClickLan(item)}>{item}</div>
        })
    }

    //去往系统设置页
    const toSystem = () =>{
        props.history.push("/systemManagement")
    }


    return(
        <div className="frame-header">
            <div className={"pi-header-left"}>
                <WorkAppConfig isSSO={false}/>
                {/*<div className={"pi-header-right-item"}><WorkAppConfig isSSO={false}/></div>*/}
                <div className={'frame-header-logo'}>
                    {logo && <img src={logo} alt='logo' />}
                </div>
                <HeaderMenu {...props}/>
            </div>

            <div className={'frame-header-right-box'}>

                <div className={"frame-header-right-detail"}>
                    <div className={"header-right-item"} >
                        {/*<svg className="icon-l user-header-icon-hover" aria-hidden="true"  onClick={toSystem}>*/}
                        {/*    <use xlinkHref= {`#icon-setting`} />*/}
                        {/*</svg>*/}
                        <SettingOutlined className={"header-icon-item"} onClick={toSystem}/>
                    </div>
                    <div className={"header-right-item"}>
                        <MessageDrawer />
                    </div>
                    <Dropdown overlay={helpMenu}  placement="bottomRight" >
                        {/*<svg className="icon-l user-header-icon-hover" aria-hidden="true" >*/}
                        {/*    <use xlinkHref= {`#icon-bangzhu`} />*/}
                        {/*</svg>*/}
                        <div className={"header-right-item"} >
                            <QuestionCircleOutlined  className={"header-icon-item"} />
                        </div>
                    </Dropdown>
                    <div className={"header-right-item"}>
                        <div className={"toggle-hover"}>
                            <div className="user-header-icon-hover">
                                <Profile userInfo={getUser()}/>
                            </div>
                            <div className={"toggle-hidden-box header-user-box"}>
                                <div className={"user-detail-box"}>
                                    <div className={"user-detail-item  user-detail-item-icon"}>
                                        <div className="header-user-icon">
                                            <Profile userInfo={getUser()}/>
                                        </div>
                                    </div>
                                    <div className={"user-detail-item"}>
                                        <div className={"user-detail-item-name"}>{userInfo.name}</div>
                                        <div>{userInfo.email}</div>
                                    </div>
                                </div>

                                <div className={"user-hidden-item-lan"}>
                                    <div  style={{"display": "flex", "alignItems": "center","justifyContent":"space-between"}}>
                                        <div style={{"display": "flex", "alignItems": "center"}}>
                                            <svg className="icon-s user-header-icon" aria-hidden="true">
                                                <use xlinkHref= {`#icon-yuyan`} />
                                            </svg>
                                            <span>语言</span>
                                        </div>
                                        <RightOutlined />
                                    </div>

                                    <div className={"header-lan-box"}>
                                        {
                                            lanMenu(languageData)
                                        }
                                    </div>
                                </div>

                                <div className={"user-hidden-item"} onClick={logout}>
                                    <svg className="icon-s user-header-icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-tuichu`} />
                                    </svg>
                                    <span>退出登录</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default inject("userMessageStore")(observer(HeaderContent));
