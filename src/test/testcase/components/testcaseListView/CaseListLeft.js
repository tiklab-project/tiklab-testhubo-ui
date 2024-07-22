import React, {useEffect, useState} from "react";
import {Input, Space, Tooltip} from "antd";
import DropdownAdd from "../DropdownAdd";
import IconCommon from "../../../../common/IconCommon";
import MenuSelect from "../../../../common/menuSelect/MenuSelect";
import {RedoOutlined, SearchOutlined} from "@ant-design/icons";
import CaseList from "./CaseList";
import {inject, observer} from "mobx-react";
import PaginationCommon from "../../../../common/pagination/Page";
import {useHistory} from "react-router";
import {switchCaseTypeFn} from "../testCaseTableFn";
import AdvancedFilter from "./AdvancedFilter";

const CaseListLeft = (props) =>{
    const {testcaseStore,categoryStore} = props;
    const {
        findTestCaseList,
        testcaseList,
        deleteTestCase,
        testType,
        testCaseRecent,
        findDiffTypeCaseNum,
        isApiUnitBind,
        isCaseExist,
        isApiSceneBind,
        setTestType
    } = testcaseStore;


    const items = [
        {
            title: `所有 `,
            key: `all`,
        },
        {
            title: `功能 `,
            key: `function`,
        },
        {
            title: `接口 `,
            key: `api`,
        },
        {
            title: `性能 `,
            key: `perform`,
        },
        {
            title: `UI `,
            key: `ui`,
        },
    ];

    const history = useHistory()
    let repositoryId = sessionStorage.getItem("repositoryId")
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState();
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectCategory, setSelectCategory] = useState(null);
    const [clickItemId, setClickItemId] = useState();

    useEffect(async ()=>{
        let list = await findPage()
        if(list&&list.length>0){
            setClickItemId(list[0]?.id)
            switchCaseTypeFn(list[0], history)
        }
    },[repositoryId,testType])


    //点击测试类型筛选项查找
    const selectKeyFun = (item)=>{
        let key = item.key
        setTestType(key)
        setCurrentPage(1)
    }

    const findPage = async (params) =>{
        setLoading(true)
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            testType:testType==="all"?null:testType,
            repositoryId:repositoryId,
            categoryId:selectCategory,
            ...params
        }
        let res = await findTestCaseList(param)

        setLoading(false)
        setTotalPage(res.totalPage);
        setTotalRecord(res.totalRecord)

        return res.dataList
    }

    /**
     * 搜索框搜索
     */
    const onSearch = (e) =>{
        setCurrentPage(1)
        let param = {name: e.target.value}

        findPage(param)
    }

    /**
     * 分页
     */
    const onTableChange = (current) => {
        setCurrentPage(current)

        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:current
            },
            testType:testType==="all"?null:testType
        }

        findPage(param)
    }


    return(
        <>
            <div className={"case-list-left-top"}>
                <div className={"display-flex-between"}>
                    <div style={{fontSize:"16px",fontWeight:"600"}}>用例</div>
                    <Space>
                        <DropdownAdd
                            icon={true}
                            findPage={findPage}
                            categoryStore={categoryStore}
                            {...props}
                        />

                        <Tooltip title={"切换表格视图"} placement={"right"}>
                            <div>
                                <IconCommon
                                    className={"icon-m edit-icon"}
                                    icon={"shituqiehuan"}
                                    onClick={()=> {
                                        localStorage.setItem("CASE_VIEW","table")
                                        history.push(`/repository/testcase/${repositoryId}`)
                                    }}
                                />
                            </div>
                        </Tooltip>
                    </Space>
                </div>
                <MenuSelect
                    menuItems={items}
                    selectFn={selectKeyFun}
                    selected={testType}
                    style={{width: "280px"}}
                />

                <div className={"display-flex-between"} style={{padding:"10px 0 0"}}>
                    <Input
                        placeholder={`搜索用例名`}
                        onPressEnter={onSearch}
                        className='search-input-common'
                        width={280}
                        prefix={<SearchOutlined />}
                        addonAfter={
                            <AdvancedFilter
                                findPage={findPage}
                                setSelectCategory={setSelectCategory}
                                testType={testType}
                            />
                        }
                    />

                </div>

            </div>
            <div className={"case-list-left-list-box"}>
                <CaseList
                    testcaseList={testcaseList}
                    loading={loading}
                    clickItemId={clickItemId}
                    setClickItemId={setClickItemId}
                />
                <div className={"case-list-bottom"}>
                    <div className={"case-list-bottom-total"}>共{totalRecord||0}条</div>
                    <PaginationCommon
                        currentPage={currentPage}
                        totalPage={totalPage}
                        changePage={onTableChange}
                    />
                    <div className={"case-list-bottom-reload"}>
                        <Tooltip title={"刷新列表"} placement={"right"}>
                            <RedoOutlined onClick={()=> findPage()}/>
                        </Tooltip>

                    </div>

                </div>
            </div>
        </>
    )
}
export default inject("testcaseStore","categoryStore")(observer(CaseListLeft));