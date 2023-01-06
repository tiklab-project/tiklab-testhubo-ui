import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Dropdown, Input, Menu, Popconfirm} from "antd";
import {CaretDownOutlined, CaretRightOutlined} from "@ant-design/icons";
import CategoryEdit from "./categoryEdit";

const LeftTree = (props) =>{
    const {categoryStore} = props;
    const {findCategoryListTree,categoryList,deleteCategory} = categoryStore;

    const [clickKey, setClickKey] = useState();
    const [expandedTree, setExpandedTree] = useState([]);

    const repositoryId = sessionStorage.getItem("repositoryId");

    useEffect(()=>{
        findTreeList()
    },[repositoryId])

    const findTreeList = () =>{
        const params = { repositoryId:repositoryId}
        findCategoryListTree(params)
    }

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

        props.history.push('/repositorypage/testcase/list');
    }

    //目录悬浮的操作项
    const menu = (id)=>(
        <Menu>
            <Menu.Item  key={2}>
                <CategoryEdit findList={findTreeList} name="添加目录"   type="add"  categoryId={id}/>
            </Menu.Item>
            <Menu.Item  key={3}>
                <CategoryEdit findList={findTreeList}  name="编辑"  type="edit"  categoryId={id}/>
            </Menu.Item>
            <Menu.Item  key={4}>
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>delCategory(id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <a>删除</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    const delCategory = (id)=>{

        deleteCategory(id)
    }

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
                    <span style={{fontSize: 13}}>({item.caseNum})</span>
                </span>
                {
                    categoryAct(item.id)
                }
            </div>
        )
    }


    //递归渲染分类列表
    const tree = (data = [],deep) => {
        return(
            data && data.map((item) => {
                let deep = 1;
                if(item.children&&item.children.length>0  ){
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
                                    <span style={{fontSize: 13}}>({item.caseNum})</span>
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
            <Menu.Item>
                <CategoryEdit findList={findTreeList}  name="添加目录"  type="add" />
            </Menu.Item>
        </Menu>
    );


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

            <ul>
                {
                    tree(categoryList)
                }
            </ul>
        </>
    )
}

export default inject("categoryStore")(observer(LeftTree));