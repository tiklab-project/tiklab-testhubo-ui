import React, {useEffect, useState} from "react";
import {Dropdown, Space} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import IconCommon from "../../common/IconCommon";
import {useHistory} from "react-router";
import "./repositoryDetailStyle.scss"
import LeftNavCommon from "../../common/leftMenu/LeftNavCommon";

/**
 * 左侧导航展示
 */
const LeftNav = (props) =>{
    const {repositoryStore,systemRoleStore,testcaseStore} = props;
    const {findRepository,findRepositoryList,repositoryList,repositoryRecent} = repositoryStore;

    const {setTestType} = testcaseStore;

    const menuData = [
        {
            "icon":"layers",
            "name":"概况",
            "key":"overview",
            "router":"/repository/detail"
        }, {
            "icon":"test-case-group",
            "name":"测试用例",
            "key":"testcase",
            "router":"/repository/testcase"
        },
        {
            "icon":"jihua",
            "name":"测试计划",
            "key":"testplan",
            "router":"/repository/plan"
        },{
            "icon":"baogao",
            "name":"测试报告",
            "key":"report",
            "router":"/repository/report"
        }
    ]

    const [visible, setVisible] = useState(false);
    const [repositoryIcon, setRepositoryIcon] = useState();
    let userId = getUser().userId
    const repositoryId = sessionStorage.getItem("repositoryId")
    const history = useHistory()

    useEffect(()=>{
        findRepository(repositoryId).then(res=>{
            setRepositoryIcon(res.iconUrl)
        })
        findRepositoryList({userId:userId})

        systemRoleStore.getInitProjectPermissions(userId, repositoryId)
    },[])


    /**
     * 点击左侧导航事件
     */
    const clickAddRouter = (item) =>{
        //设置用例列表筛选项
        setTestType(null)

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter",item.router);

        if(item.key==="overview"){
            history.push(`/repository/detail/${repositoryId}`)
        }else {
            history.push(item.router)
        }
    }


    /**
     * 展示切换的仓库
     */
    const toggleRepositorys = (
        <div className={"ws-hover-box"}>
            <div style={{ padding: "10px"}}>
                <div className={"ws-hover-box-title"}>切换仓库</div>
                <div style={{height:"169px"}}>
                    {
                        repositoryList&&repositoryList.map((item,index)=> {
                            if(index>3) return
                                return <div className={"ws-hover-item"} key={item.id} onClick={() => toggleRepository(item.id)}>
                                    <Space>
                                        <img src={item.iconUrl} alt={"icon"} className={"repository-icon"} width={20}/>
                                        {item.name}
                                    </Space>
                                </div>
                            }
                        )
                    }
                </div>
            </div>


            <a className={"ws-toggle-repository_more"} onClick={()=>history.push("/repository-page")}>查看更多</a>
        </div>
    )

    /**
     * 切换仓库
     */
    const toggleRepository = (repositoryId)=>{

        sessionStorage.setItem("repositoryId",repositoryId);

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repository/detail")

        //最近仓库
        let params = {
            repository: {id:repositoryId},
            userId:userId
        }
        repositoryRecent(params)

        props.history.push(`/repository/detail/${repositoryId}`);

        setVisible(false)
    }

    /**
     * 点击设置
     */
    const clickSetting = ()=>{
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter","setting");

        props.history.push("/repository/setting/detail");
    }



    const showToggleRepository = ()=> (
        <li className={`ws-detail-left-nav-item-repository `} >
            <Dropdown
                overlay={toggleRepositorys}
                trigger={['click']}
                visible={visible}
                onOpenChange={()=>setVisible(!visible)}
            >
                <div className={"ws-icon-box"}>
                    <span style={{"cursor":"pointer",margin:" 0 0 0 16px"}}>
                         <img src={repositoryIcon} alt={"icon"} className={"repository-icon icon-bg-border"}/>
                    </span>
                    <IconCommon
                        style={{"cursor":"pointer"}}
                        className={"icon-s"}
                        icon={"xiala"}
                    />
                </div>
            </Dropdown>
        </li>
    )

    return(
        <LeftNavCommon
            menuData={menuData}
            clickAddRouter={clickAddRouter}
            clickSetting={clickSetting}
            diffHeader={showToggleRepository}
        />
    )
}

export default inject("repositoryStore","systemRoleStore","testcaseStore")(observer(LeftNav));