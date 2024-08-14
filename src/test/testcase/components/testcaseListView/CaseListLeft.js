import React, {useEffect, useState} from "react";
import {Input, Space, Tooltip,Select} from "antd";
import DropdownAdd from "../DropdownAdd";
import IconCommon from "../../../../common/IconCommon";
import {RedoOutlined} from "@ant-design/icons";
import CaseList from "./CaseList";
import {inject, observer} from "mobx-react";
import PaginationCommon from "../../../../common/pagination/Page";
import {useHistory} from "react-router";
import {switchCaseTypeFn} from "../testCaseTableFn";
import AdvancedFilter from "./AdvancedFilter";
import {debounce} from "../../../../common/utils/commonFn";

const {Option} = Select;

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


    const history = useHistory()
    let repositoryId = sessionStorage.getItem("repositoryId")
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState();
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectCategory, setSelectCategory] = useState(null);
    const [clickItemId, setClickItemId] = useState();
    const [diffTypeCaseNum, setDiffTypeCaseNum] = useState();

    useEffect(async ()=>{
        let list = await findPage()
        if(list&&list.length>0){
            setClickItemId(list[0]?.id)
            switchCaseTypeFn(list[0], history)
        }
    },[repositoryId,testType])

    useEffect(()=>{
        findDiffTypeCaseNum(repositoryId).then(res=>{
            setDiffTypeCaseNum(res)
        })
    },[repositoryId])


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

    //点击测试类型筛选项查找
    const selectKeyFun = (key)=>{
        setTestType(key)
        setCurrentPage(1)
    }

    /**
     * 状态搜索
     */
    const selectStatus = (key)=>{
        setCurrentPage(1)
        let param = {status: key}
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


    const items = [
        {
            title: `全部`,
            key: `all`,
            number:diffTypeCaseNum?.all||0
        },
        {
            title: `功能 `,
            key: `function`,
            number:diffTypeCaseNum?.function||0
        },
        {
            title: `接口 `,
            key: `api`,
            number:diffTypeCaseNum?.api||0
        },
        {
            title: `性能 `,
            key: `perform`,
            number:diffTypeCaseNum?.perform||0
        },
        {
            title: `UI `,
            key: `ui`,
            number:diffTypeCaseNum?.ui||0
        },
    ];

    return(
        <>
            <div className={"case-list-left-top"}>
                <div className={"display-flex-between"}>
                    <div style={{fontSize:"16px",fontWeight:"600"}}>用例</div>
                    <Space>
                        <div className={"icon-bg-grey"} >
                        <DropdownAdd
                            icon={true}
                            findPage={findPage}
                            categoryStore={categoryStore}
                            {...props}
                        />
                        </div>
                        <div className={"icon-bg-grey"} >
                            <div>
                                <IconCommon
                                    className={"icon-m edit-icon"}
                                    icon={"shituqiehuan"}
                                    onClick={()=> {
                                        localStorage.setItem("CASE_VIEW","table")
                                        history.push(`/project/${repositoryId}/testcase`)
                                    }}
                                />
                            </div>
                        </div>
                    </Space>
                </div>
                <div className={"display-flex-between"} style={{padding:"10px 0 0"}}>
                    <Input
                        placeholder={`搜索用例名`}
                        onPressEnter={onSearch}
                        className='case-search-input'
                        width={280}
                        prefix={<IconCommon
                            icon={"sousuo"}
                            className={"icon-s"}
                        />}
                        addonAfter={<AdvancedFilter
                            findPage={findPage}
                            setSelectCategory={setSelectCategory}
                            testType={testType}
                        />}
                        onChange={debounce(onSearch,500) }
                        allowClear
                    />

                </div>

                <div className={"filter-box"}>
                    <Select
                        placeholder={"用例类型"}
                        bordered={false}
                        className={"select-testcase-box"}
                        onSelect={selectKeyFun}
                        optionLabelProp="label"
                    >

                        {
                            items.map(item=>{
                                return<Option
                                    key={item.key}
                                    value={item.key}
                                    label={item.title}
                                    className={"select-testcase-content"}
                                >
                                    {item.title}
                                    <span className={"font-12"}> {item.number}</span>
                                </Option>
                            })
                        }
                    </Select>
                    <Select
                        bordered={false}
                        className={"select-testcase-box"}
                        placeholder={"状态"}
                        onSelect={selectStatus}
                    >
                        <Option value={null}>全部</Option>
                        <Option value={0}>未开始</Option>
                        <Option value={1}>进行中</Option>
                        <Option value={2}>结束</Option>
                    </Select>
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