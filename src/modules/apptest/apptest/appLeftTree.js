import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Dropdown, Input, Menu} from "antd";
import {CaretDownOutlined, CaretRightOutlined} from "@ant-design/icons";
import AppUnitEdit from "../unitcase/components/appUnitEdit";
import AppSceneEdit from "../scenecase/components/appSceneEdit";
import AppPerfEdit from "../performcase/components/appPerfEdit";

const AppLeftTree = (props) =>{
    const {categoryStore} = props;
    const {findCategoryListTree,categoryList} = categoryStore;

    const [clickKey, setClickKey] = useState();
    const [expandedTree, setExpandedTree] = useState([]);

    const testType = localStorage.getItem("testType");
    const repositoryId = sessionStorage.getItem("repositoryId");

    useEffect(()=>{
        const params = {
            testType:testType,
            repositoryId:repositoryId
        }
        findCategoryListTree(params)
    },[testType,repositoryId])


    const isExpandedTree = (key) =>  expandedTree.some(item => item === key)

    //展开闭合 分类
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const openIcon={
        icon:'file-open',
        preIcon:<CaretDownOutlined/>
    }
    const closeIcon ={
        icon:'folder-close',
        preIcon:<CaretRightOutlined/>
    }

    //保存分类id，跳往分类页
    const onCategory = (item) =>{
        setClickKey(item.id);
        setOpenOrClose(item.id);

        sessionStorage.setItem('categoryId',item.id);

    }

    //保存接口id，跳往接口详情页
    const onNode = (item) => {
        setClickKey(item.id);

        switch (item.caseType){
            case "unit":
                sessionStorage.setItem('appUnitId',item.id);
                props.history.push('/repositorypage/apptest/unitdetail');
                break;
            case "scene":
                sessionStorage.setItem('appSceneId',item.id);
                props.history.push('/repositorypage/apptest/scenedetail');
                break;
            case "perform":
                sessionStorage.setItem('appPerfId',item.id);
                props.history.push('/repositorypage/apptest/performdetail');
                break;
        }
    }

    //目录悬浮的操作项
    const menu = (id)=>(
        <Menu>
            <Menu.Item key={1}>
                <AppUnitEdit
                    name={"添加Unit用例"}
                    caseType={"unit"}
                    isCategory={true}
                    categoryId={id}
                />
            </Menu.Item>
            <Menu.Item key={2}>
                <AppSceneEdit
                    name={"添加场景用例"}
                    caseType={"scene"}
                    isCategory={true}
                    categoryId={id}
                />
            </Menu.Item>
            <Menu.Item key={3}>
                <AppPerfEdit
                    name={"添加压测用例"}
                    caseType={"perform"}
                    isCategory={true}
                    categoryId={id}
                />
            </Menu.Item>
        </Menu>
    );

    //目录悬浮项
    const categoryAct = (id) => {
        return (
            <div className={'category-action'}>
                <div className={'category-action-more'}>
                    <Dropdown overlay={()=>menu(id)}>
                        <div className={'category-action-more-box'} >...</div>
                    </Dropdown>
                </div>
            </div>
        )
    }

    //子集前面的图标
    const showIcon = (type) =>{
        switch (type) {
            case "unit":
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-layers"/>
                    </svg>
                )
            case "scene":
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-changjing"/>
                    </svg>
                )
            case "perform":
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-jiqun-mianxing"/>
                    </svg>
                )
        }
    }


    //设置有子集的li
    const expendTreeLi = (item,icon) => {
        return(
            <div className={'cate-li'}>
                <span
                    className={`categoryNav-li tree-childspan  ${item.id === clickKey? 'action-li':''}`}
                    onClick={()=> onCategory(item)}

                >
                    {icon.preIcon}
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon-${icon.icon}`}/>
                    </svg>
                    {item.name}
                </span>
                {
                    categoryAct(item.id)
                }
            </div>
        )
    }


    //接口
    const methodView = (data) => {
        return data&&data.map(item=>{
            return(
                <li
                    key={item.id}
                    className={`methodli categoryNav-li tree-childspan  ${item.id === clickKey? 'action-li':''}`}
                    onClick={()=>onNode(item)}
                >
                    {
                        showIcon(item.caseType)
                    }
                    {/*<RequestType type={item.requestType}/>*/}
                    {item.name}
                </li>
            )
        })
    }


    //递归渲染分类列表
    const tree = (data = [],deep) => {
        return(
            data && data.map((item) => {
                let deep = 1;
                if(item.children&&item.children.length>0 || item.nodeList&&item.nodeList.length>0 ){
                    return (
                        <li key={item.id} >
                            {
                                isExpandedTree(item.id)
                                    ?expendTreeLi(item,openIcon)
                                    :expendTreeLi(item,closeIcon)
                            }
                            <ul
                                className={!isExpandedTree(item.id) ? 'tree-hidden' : null}
                                key={item.id}
                                style={{paddingLeft: `${deep * 10 + 5}px`}}
                            >
                                {
                                    tree(item.children,deep+1)
                                }
                                {
                                    methodView(item.nodeList)
                                }
                            </ul>
                        </li>
                    )
                }else{
                    return(
                        <li  key={item.id} >
                            <div className={'cate-li'} >
                            <span
                                onClick={()=>onCategory(item)}
                                className={`categoryNav-li tree-span ${item.id === clickKey? 'action-li':''}`}
                            >
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-folder-close"/>
                                </svg>
                                {item.name}
                            </span>
                                {
                                    categoryAct(item.id)
                                }
                            </div>
                        </li>
                    )
                }
            })
        )
    }



    const addMenu = (
        <Menu>
            <Menu.Item key={1}>
                <AppUnitEdit name={"添加Unit用例"} caseType={"unit"}/>
            </Menu.Item>
            <Menu.Item key={2}>
                <AppSceneEdit name={"添加场景用例"} caseType={"scene"}/>
            </Menu.Item>
            <Menu.Item key={3}>
                <AppPerfEdit name={"添加压测用例"} caseType={"perform"}/>
            </Menu.Item>
        </Menu>
    );

    const screenItem = [
        {
            name:"全部",
            key: "all"
        },{
            name:"单元",
            key:"unit"
        },{
            name:"场景",
            key:"scene"
        },{
            name:"压力",
            key:"perform"
        }
    ]


    const [selectedScreen, setSelectedScreen] = useState("all");

    //点击：全部、单元、场景、压力 进行筛选
    const findCategoryList = (caseType) =>{
        setSelectedScreen(caseType)

        let params = {
            testType:testType,
            repositoryId:repositoryId
        }

        if (caseType==="all"){
            params = Object.assign(params)
        }else {
            params = Object.assign(params,{caseType:caseType})
        }

        findCategoryListTree(params)
    }

    //筛选项
    const showScreen = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    className={`left-tree-screen-item ${item.key === selectedScreen?"left-tree-screen-item-selected":null}`}
                    key={item.key}
                    onClick={()=>findCategoryList(item.key)}
                >
                    {item.name}
                </div>
            )
        })
    }

    return(
        <>
            <div className={"left-tree-header"}>
                <Input />
                <Dropdown overlay={addMenu}   >
                    <div className={"left-tree-header-add"}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-tianjia-"/>
                        </svg>
                    </div>
                </Dropdown>
            </div>
            <div className={"left-tree-screen"}>
                {showScreen(screenItem)}
            </div>

            <ul>
                {
                    tree(categoryList)
                }
            </ul>
        </>
    )
}

export default inject("categoryStore")(observer(AppLeftTree));