import React, {useEffect, useState} from "react";
import {Dropdown, Input, Menu, Popconfirm} from "antd";
import {CaretDownOutlined, CaretRightOutlined} from "@ant-design/icons";
import StepEdit from "./apiUnitEdit";
import {inject, observer} from "mobx-react";

const ApiUnitCategory = (props) =>{
    const {categoryStore,addRouter} = props;
    const {findCategoryListTree,categoryList} = categoryStore;
    const [clickKey, setClickKey] = useState();
    const [expandedTree, setExpandedTree] = useState([]);

    const testType = localStorage.getItem("testType");
    const caseType = localStorage.getItem("caseType");
    const repositoryId = sessionStorage.getItem("repositoryId");

    console.log(testType,caseType,repositoryId)

    useEffect(()=>{
        const params = {
            testType:testType,
            caseType:caseType,
            repositoryId:repositoryId
        }
        findCategoryListTree(params)
    },[testType,caseType,repositoryId])



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

        addRouter('/repository/apitest/unitcase');
    }

    //保存接口id，跳往接口详情页
    const onNode = (item) => {
        setClickKey(item.id);

        sessionStorage.setItem('apiUnitId',item.id);
        addRouter('/repository/apitest/unitdetail');
    }

    //目录悬浮的操作项
    const menu = (id)=>(
        <Menu>
            <Menu.Item >
                <StepEdit name="添加用例"  unitcaseId={id}/>
            </Menu.Item>
            <Menu.Item>
                <Popconfirm
                    title="确定删除？"
                    // onConfirm={() =>delCategory(id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <a>删除</a>
                </Popconfirm>
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
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon-api`}/>
                    </svg>
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




    // const toCategoryManag = () =>{
    //     props.history.push("/repository/category")
    // }

    // const menu = (
    //     <Menu>
    //         <Menu.Item>
    //             <a onClick={toCategoryManag}>目录管理</a>
    //         </Menu.Item>
    //     </Menu>
    // );


    return(
        <>
            <div className={"category-nav-header"}>
                <Input />
                {/*<Dropdown overlay={menu}  className="ws-detail-dropdown" >*/}
                {/*    <Button>+</Button>*/}
                {/*</Dropdown>*/}
            </div>

            <ul>
                {
                    tree(categoryList)
                }
            </ul>
        </>
    )
}

export default inject("categoryStore")(observer(ApiUnitCategory));
