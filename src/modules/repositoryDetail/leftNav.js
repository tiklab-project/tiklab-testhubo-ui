import React from "react";

const LeftNav = (props) =>{

    const menuData = [
        {
            "icon":"layers",
            "name":"概况",
            "key":"detail",
            "router":"/repositorypage/detail"
        },{
            "icon":"jiekou",
            "name":"API",
            "key":"api",
            "router":"/repositorypage/apitest"
        },{
            "icon":"web",
            "name":"WEB",
            "key":"web",
            "router":"/repositorypage/webtest"
        },{
            "icon":"jiedianapp",
            "name":"APP",
            "key":"app",
            "router":"/repositorypage/apptest"
        },{
            "icon":"kuaijieyingyon",
            "name":"功能测试",
            "key":"func",
            "router":"/repositorypage/functest"
        },{
            "icon":"tianjiadaofenzu",
            "name":"模块管理",
            "key":"category",
            "router":"/repositorypage/category"
        },{
            "icon":"jihua",
            "name":"测试计划",
            "key":"testplan",
            "router":"/repositorypage/testplan"
        }
    ]

    const leftRouter = localStorage.getItem("leftRouter")

    const clickAddRouter = (item) =>{

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter",item.router);

        //点击导航设置设置类型，用于category查找。testType：api,web,app,function;
        localStorage.setItem("testType",item.key );

        //设置tab，初始选择的unitcase， caseType：unit,scene,perform
        localStorage.setItem("caseType","unit")

        props.history.push(item.router)
    }

    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.router}
                    className={`ws-detail-left-nav-item `}
                    onClick={()=>clickAddRouter(item)}
                >
                    <div className={`ws-detail-left-nav-item-box ${leftRouter===item.router?"selectlink":null}`}>
                        <div className={"ws-detail-left-nav-item-detail"}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-${item.icon}`}/>
                            </svg>
                        </div>
                        <div  className={"ws-detail-left-nav-item-detail"}>
                            {item.name}
                        </div>
                    </div>
                </li>
            )
        })
    }


    const settingMenu=[
        {
            title: '环境管理',
            icon: 'icon-modular',
            key: '/repositorypage/envMana',
        },
        {
            title: 'Agent配置',
            key: '/repositorypage/agent',
            icon: 'icon-modular',
        },{
            title: '项目成员',
            key: '/repositorypage/domainRole',
            icon: 'icon-chengyuan',
        },{
            title: '项目权限',
            key: '/repositorypage/domainPrivilege',
            icon: 'icon-quanxian',
        }
    ]

    const showSetting = (data) =>{
        return data&&data.map(item=>{
            return (
                <li key={item.key} style={{  margin:"0 auto"}} >
                    <div className={`nav-setting-item`}
                         key={item.key}
                         onClick={()=>selectKeyFun(item.key)}
                    >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#${item.icon}`} />
                        </svg>
                        <span >
                            {item.title}
                        </span>
                    </div>
                </li>
            )
        })
    }

    const selectKeyFun = (key)=>{
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter","setting");

        props.history.push(key);
    }



    return(
        <div>
            {/*<div className={"ws-detail-left-nav-ws "}>*/}
            {/*    <Avatar icon={<UserOutlined />} />*/}
            {/*</div>*/}
            <ul className={"ws-detail-left-nav"}>
                {
                    showMenuItem(menuData)
                }
            </ul>

            <div className={"ws-nav-setting"}>
                <div className={`ws-detail-left-nav-item`} >
                    <div className={`ws-detail-left-nav-item-box  ws-detail-left-nav-item-setting`}>
                        <div className={"ws-detail-left-nav-item-detail"}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-setting`}/>
                            </svg>
                        </div>
                        <div  className={"ws-detail-left-nav-item-detail"}>设置</div>
                    </div>
                </div>
                <div className={`nav-setting-box `}>
                    <ul className="nav-setting-menu">
                        {
                            showSetting(settingMenu)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeftNav;