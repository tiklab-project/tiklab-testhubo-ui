import React, { Fragment ,useState } from 'react';
import { renderRoutes } from "react-router-config";
import { Layout, Menu, Row, Col } from 'antd';
import { DownOutlined,UpOutlined} from '@ant-design/icons';
import { PrivilegeSystem } from "doublekit-privilege-ui";
import './sysMana.scss'

const { Sider, Content } = Layout;

const SystemManagement = (props) => {

    const router = [
        {
            title: '组织中心',
            icon: 'laptop',
            key: "/systemManagement/organ",
            encoded: "SysOrgaCon",
            children: [
                {
                    title: "组织管理",
                    icon: 'laptop',
                    key: '/systemManagement/organ/org',
                    encoded: "SysOrga",

                },
                {
                    title: '用户管理',
                    icon: 'laptop',
                    key: '/systemManagement/organ/user',
                    encoded: "SysUser",
                },
            ]
        },
        {
            title: '系统权限中心',
            icon: 'laptop',
            key: "/systemManagement/system",
            encoded: "SysPrisystem",
            children: [
                {
                    title: '功能管理',
                    icon: 'laptop',
                    key: '/systemManagement/systemFeature',
                    encoded: "SysFeatruestem",
                },
                {
                    title: '角色管理',
                    icon: 'laptop',
                    key: '/systemManagement/systemRole',
                    encoded: "SysRoleSystem",
                }
            ]
        },
        {
            title: '项目权限中心',
            icon: 'laptop',
            key: "/systemManagement/project",
            encoded: "SysPriProject",
            children: [
                {
                    title: '功能管理',
                    icon: 'laptop',
                    key: '/systemManagement/privilege',
                    encoded: "SysFeatrueProject",
                },
                {
                    title: '角色管理',
                    icon: 'laptop',
                    key: '/systemManagement/role',
                    encoded: "SysRoleProject",
                }
            ]
        },
        {
            title: "消息中心",
            icon: 'laptop',
            key: '/systemManagement/message',
            encoded: "SysMessage",
            children: [
                {
                    title: '消息管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageManagement',
                    encoded: "SysMessageManagement",
                },
                {
                    title: '消息模板管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageTemplate',
                    encoded: "SysMessageTemplate",
                },
                {
                    title: '消息类型管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageType',
                    encoded: "SysMessageType",
                },
                {
                    title: '发送方式管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageSendType',
                    encoded: "SysMessageSendType",
                }
            ]
        },
        {
            title: '认证设置',
            icon: 'laptop',
            key: '/systemManagement/authConfig',
            encoded: "authConfig",
        }
    ]

    const [selectKey,setSelectKey] = useState('/systemManagement/envMana')

    const select = (key)=>{
        setSelectKey(key)
        props.history.push(key)
    }

    // 树的展开与闭合
    const [expandedTree, setExpandedTree] = useState([])

    const isExpandedTree = (key) => {
        return expandedTree.some(item => item ===key)
    }

    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    // 无子级菜单处理
    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeSystem code={data.encoded}  key={data.key}>
                <li
                    key={data.key}
                    className={` orga-aside-li ${data.key=== selectKey ? "orga-aside-select" : ""}`}
                    onClick={()=>select(data.key)}
                    style={{paddingLeft:`${deep*20+5}px`}}
                >
                    <div className={'aside-li'} >
                        {data.title}
                    </div>
                </li>
            </PrivilegeSystem>
        )
    }


     // 子级菜单处理
     const renderSubMenu = ({title,key,children,encoded},deep)=> {
        return (
              <PrivilegeSystem code={encoded} disabled ={"hidden"} key={key}>
                  <li key={key} title={title} >
                      <div className="orga-aside-item aside-li"
                           onClick={() => setOpenOrClose(key)}
                           style={{paddingLeft:`${deep*20+5}px`}}
                      >
                          <span to={key}>
                              {title}
                          </span>
                          <div className="orga-aside-item-icon">
                              {
                                  children ?
                                  (isExpandedTree(key)
                                       ? <DownOutlined  style={{fontSize: "12px"}}/>
                                       : <UpOutlined  style={{fontSize: "12px"}}/>
                                  ): ""
                              }
                          </div>
                      </div>

                      <ul key={key} title={title} className={`orga-aside-ul ${isExpandedTree(key) ? null: 'orga-aside-hidden'}`}>
                          {
                              children && children.map(item =>{
                                  let deep = 1;
                                  return item.children && item.children.length
                                      ? renderSubMenu(item,deep)
                                      : renderMenu(item,deep)
                                  })
                          }
                      </ul>
                  </li>
               </PrivilegeSystem>
        )
    }


    const routers = props.route.routes
    return (
        <Fragment>
            <Layout className = 'sysmana-layout'>
                <Sider className = 'sysmana-sider' width={200}>
                    <div className="doublekit-orga-aside">
                        <ul style={{padding: 0}} >
                            {
                                router && router.map(firstItem => {
                                    return firstItem.children && firstItem.children.length > 0 ?
                                            renderSubMenu(firstItem) : renderMenu(firstItem)
                                })
                            }
                        </ul>
                    </div>
                </Sider>
                <Content className = 'sysmana-content'>
                    {renderRoutes(routers)}
                </Content>
            </Layout>
        </Fragment>
    )
}


export default SystemManagement;
