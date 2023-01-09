import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import {inject, observer} from "mobx-react";
import {renderRoutes} from "react-router-config";
import ApiEnvSelect from "../../sysmgr/environment/components/apiEnvSelect";
const {TabPane} = Tabs;


const TabsNav = (props) =>{
    const { testcaseStore,categoryStore } = props;
    const {findCategory} = categoryStore;
    const { tabList,activeKey,setTabList,setActiveKey} = testcaseStore;
    const router = props.route.routes;

    let testType = localStorage.getItem("testType")
    let categoryId =sessionStorage.getItem("categoryId")

    useEffect(async ()=>{
        let res = await findCategory(categoryId)
        setActiveKey(res.id);
        setTabList([res])
    },[categoryId])


    const onChange = (newActiveKey) => {

        setActiveKey(newActiveKey);

        let tabItem = tabList.filter(item=>item.id===newActiveKey)[0]

        toDiffPage(tabItem)
    };

    //根据条件跳到不同的页面
    const toDiffPage = (tabItem) =>{
        if(tabItem.testType){

            switch (tabItem.testType) {
                case "api":
                    switchCaseType(tabItem);
                    break;
                case "web":
                    switchCaseType(tabItem);
                    break;
                case "app":
                    switchCaseType(tabItem);
                    break;
                case "func":
                    switchCaseType(tabItem);
                    break;
            }
        }else {
            localStorage.setItem("testType","isList")
            props.history.push(`/repositorypage/testcase/list`)
        }

    }

    const switchCaseType = (record)=>{
        localStorage.setItem("testType",record.testType)
        switch (record.caseType) {
            case "unit":
                sessionStorage.setItem(`${record.testType}UnitId`,record.id);
                props.history.push(`/repositorypage/testcase/${record.testType}-unitdetail`)
                break;
            case "scene":
                sessionStorage.setItem(`${record.testType}SceneId`,record.id);
                props.history.push(`/repositorypage/testcase/${record.testType}-scenedetail`)
                break;
            case "perform":
                sessionStorage.setItem(`${record.testType}PerfId`,record.id);
                props.history.push(`/repositorypage/testcase/${record.testType}-performdetail`)
                break;
        }
    }


    //tab 删除
    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        tabList.forEach((item, i) => {
            if (item.id === targetKey) {
                lastIndex = i - 1;
            }
        });

        const newPanes = tabList.filter((item) => item.id !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                let tabItem = newPanes[lastIndex]
                newActiveKey = tabItem.id;

                toDiffPage(tabItem)
            } else {
                newActiveKey = newPanes[0].id;
            }
        }
        setTabList(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (targetKey, action) => {
        if (action === 'remove') {
            remove(targetKey);
        }
    };

    return(
        <Tabs
            hideAdd
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            tabBarExtraContent={testType==="api"?<ApiEnvSelect />:null}
        >
            {
                tabList&&tabList.map((item,index )=> (
                    <TabPane
                        tab={item.name}
                        key={item.id}
                        forceRender
                        closable={!!item.testType}
                        // className={"tab-pane"}
                    >
                        {
                            renderRoutes(router)
                        }
                    </TabPane>
                ))
            }

        </Tabs>
    )
}

export default inject("categoryStore","testcaseStore")(observer(TabsNav));