import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Menu, Dropdown, Avatar, Tooltip} from "antd";
import {AppLink} from "tiklab-licence-ui"
import {getUser} from "tiklab-core-ui";
import HeaderMenu from "./HeaderMenu";
import logo from "../../assets/img/teston-log.png";
import {QuestionCircleOutlined, RightOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import MessageDrawer from "../../setting/message/MessageDrawer";


/**
 * 页面头部
 */
const HeaderContent = props => {
    const {logout} = props;

    const { i18n } = useTranslation();
    const [languageData, setLanguageData] = useState(i18n.languages);

    let userInfo = getUser();

    const onClickLan = ({ key }) => {
        i18n.changeLanguage(languageData[key])
    };

    // 帮助项
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

    /**
     * 渲染帮助项
     */
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

    /**
     * 语言包选项
     */
    const lanMenu = (list) =>{
        return list&&list.map(item=>{
            return <div className={"header-lan-box-item"} key={item} onClick={()=>onClickLan(item)}>{item}</div>
        })
    }

    //去往系统设置页
    const toSystem = () =>{
        props.history.push("/systemManagement/systemRole")
    }


    return(
        <div className="frame-header">
            <div className={"pi-header-left"}>
                <div  className={"recovery-item"}>
                    {props.AppLink}
                </div>
                <div className={'frame-header-logo'}>
                    {logo && <img src={logo} alt='logo' />}
                </div>
                <HeaderMenu {...props}/>
            </div>

            <div className={'frame-header-right-box'}>
                <div className={"header-right-item"}  data-title-bottom={"设置"}>
                    <SettingOutlined className={"header-icon-item"} onClick={toSystem}/>
                </div>
                <div className={"header-right-item"} data-title-bottom={"消息"}>
                    <MessageDrawer />
                </div>
                <div className={"recovery-item"}>
                    {props.HelpLink}
                </div>
                <div >
                    {props.AvatarLink}
                </div>

            </div>
        </div>
    )
}


export default HeaderContent;
