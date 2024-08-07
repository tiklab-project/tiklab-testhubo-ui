import React, {useEffect, useRef, useState} from "react";
import {Checkbox , Tooltip, TreeSelect} from "antd";
import {inject, observer} from "mobx-react";
import CaseTypeSelect from "../CaseTypeSelect";
import IconCommon from "../../../../common/IconCommon";

const AdvancedFilter = (props) =>{
    const {findPage,setSelectCategory,categoryStore,testType} = props
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;

    let repositoryId = sessionStorage.getItem("repositoryId")
    const [visible, setVisible] = useState(false);
    const filterRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // 检查点击的目标是否在下拉框内
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setVisible(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []); // 空数组表示仅在组件挂载和卸载时执行


    useEffect(()=>{
        findCategoryListTreeTable(repositoryId)
    },[repositoryId])

    const toggle = () =>{
        setVisible(!visible)
    }



    //模块赛选
    const changeCategory=(categoryId)=> {
        let param;
        if(categoryId==="null"){
            setSelectCategory(null)
            param = {
                categoryId:null,
            }
        }else {
            setSelectCategory(categoryId)
            param = {
                categoryId:categoryId
            }
        }

        findPage(param)
    }

    const caseSelectPage = (value) =>{
        let param = {
            testType:testType,
            caseTypeList:value
        }

        findPage(param)
    }

    const apiOptions = [
        {
            label: '接口单元',
            value: 'api-unit',
        },
        {
            label: '接口场景',
            value: 'api-scene',
        },
    ];
    const uiOptions = [
        {
            label: '接口单元',
            value: 'api-unit',
        },
        {
            label: '接口场景',
            value: 'api-scene',
        },
    ];

    return(
        <div className={"advanced-filter-box"} ref={filterRef}>
            <Tooltip placement="right" title={"高级筛选"}>
                <div
                    onClick={toggle}
                    className={"advanced-filter-btn"}
                >
                    <IconCommon
                        icon={"shaixuan"}
                        className={"icon-s"}
                    />
                    {/*高级筛选*/}
                </div>
            </Tooltip>

            <div className={`advanced-filter-toggle-box  ${visible === false ? 'teston-hide' : 'teston-show'}`}>
                <div style={{margin:"10px 0 "}}>
                    <div className={"advanced-filter-item-title"}>模块 : </div>
                    <TreeSelect
                        fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                        style={{  width: '220px'}}
                        dropdownStyle={{maxHeight: 400,overflow: 'auto'}}
                        className={"filter-select-box-item"}
                        placeholder="模块"
                        allowClear
                        treeDefaultExpandAll
                        onChange={changeCategory}
                        treeData={[{name:"所有",id:"null"},...categoryTableList]}
                    />
                </div>
                <div style={{margin:"10px 0 "}}>
                    <div className={"advanced-filter-item-title"}>接口 : </div>
                    <Checkbox.Group
                        style={{margin: "0 10px"}}
                        disabled={testType!=="api"}
                        options={apiOptions}
                        onChange={caseSelectPage}
                    />

                </div>
                <div style={{margin:"10px 0 "}}>
                    <div className={"advanced-filter-item-title"}>UI : </div>
                    <Checkbox.Group
                        style={{margin: "0 10px"}}
                        disabled={testType!=="ui"}
                        options={uiOptions}
                        onChange={caseSelectPage}
                    />

                </div>


            </div>

        </div>
    )
}

export default inject("categoryStore")(observer(AdvancedFilter));