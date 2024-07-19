import React, {useEffect} from "react";
import {Space, Tooltip, TreeSelect} from "antd";
import {inject, observer} from "mobx-react";
import CaseTypeSelect from "../CaseTypeSelect";
import IconCommon from "../../../../common/IconCommon";

const AdvancedFilter = (props) =>{
    const {findPage,setSelectCategory,categoryStore,testType} = props
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findCategoryListTreeTable(repositoryId)
    },[repositoryId])

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

    return(
        <div>
            <Tooltip placement="right" title={"高级筛选"}>
                <div
                    // onClick={toggle}
                    style={{
                        cursor: "pointer",
                        width: "20px",
                        height: "23px",
                        color: "#a3a3a3",
                        fontSize: "15px"
                    }}
                >
                    <IconCommon
                        icon={"shaixuan"}
                        className={"icon-s edit-icon"}
                    />
                </div>
            </Tooltip>

            <div>
                <Space>
                    <div>模块 : </div>
                    <TreeSelect
                        fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                        style={{  width: '150px'}}
                        dropdownStyle={{maxHeight: 400,overflow: 'auto'}}
                        className={"dynamic-select-box-item"}
                        placeholder="模块"
                        allowClear
                        treeDefaultExpandAll
                        onChange={changeCategory}
                        treeData={[{name:"所有",id:"null"},...categoryTableList]}
                    />
                </Space>

                {
                    testType==="api"||testType==="ui"
                        ?<Space>
                            <div>模块 : </div>
                            <CaseTypeSelect findPage={caseSelectPage} testType={testType}/>
                        </Space>
                        :null
                }

            </div>

        </div>
    )
}

export default inject("categoryStore")(observer(AdvancedFilter));