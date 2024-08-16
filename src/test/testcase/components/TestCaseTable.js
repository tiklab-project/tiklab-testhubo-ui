import React, {useEffect, useState} from "react";
import {Empty, Input, Space, Table, Tooltip, TreeSelect} from "antd";
import {inject, observer} from "mobx-react";
import {showCaseTypeTable, showCaseTypeView, showTextStatus} from "../../../common/caseCommon/CaseCommonFn";
import DropdownAdd from "./DropdownAdd";
import "../../common/styles/caseContantStyle.scss"
import "../../common/styles/unitcase.scss"
import CaseInstanceSingleDrawer from "../../common/CaseInstanceSingleDrawer";
import PaginationCommon from "../../../common/pagination/Page";
import MenuSelect from "../../../common/menuSelect/MenuSelect";
import CaseTypeSelect from "./CaseTypeSelect";
import {messageFn} from "../../../common/messageCommon/MessageCommon";
import {CASE_TYPE} from "../../../common/dictionary/dictionary";
import {rowStyle, showCreateUser, ShowDeleteView, ShowQuickExe, SwitchCaseTypeView} from "./testCaseTableFn";
import IconCommon from "../../../common/IconCommon";
import {useHistory} from "react-router";
import PageContent from "../../../common/pageContent/PageContent";
import {debounce} from "../../../common/utils/commonFn";


const TestCaseTable = (props) => {
    const {testcaseStore,categoryStore} = props;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;
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

    const column = [
        {
            title:`名称`,
            dataIndex: 'name',
            key: "name",
            width:"28%",
            ellipsis: true,
            render: (text,record) =>(
                <Space className={"case-table-name"}>
                    <div>{showCaseTypeView(record.caseType)}</div>
                    <SwitchCaseTypeView record={record} testCaseRecent={testCaseRecent} repositoryId={repositoryId} />
                </Space>
            )
        },
        {
            title: `用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            width:"10%",
            render: (text) =>(<div className={"case-table-case-type"}>{showCaseTypeTable(text)}</div>)
        },
        {
            title: `最近执行`,
            dataIndex: "recentInstance",
            key: "recentInstance",
            width:"10%",
            render:(text,record)=>(<CaseInstanceSingleDrawer caseData={record} {...props}/>)
        }, {
            title: `状态`,
            dataIndex: "status",
            key: "status",
            width:"10%",
            render:(text)=><div className={"case-table-status"}>{showTextStatus(text,"12px")}</div>
        },
        {
            title: `模块`,
            dataIndex: ["category","name"],
            key: "category",
            width:"11%",
            ellipsis: true,
            render: (text) => (text||"未设置")
        },
        {
            title: `负责人`,
            dataIndex:  ["director","name"],
            key: "user",
            width:"11%",
            ellipsis: true,
            render: (text, record) => (showCreateUser(record.director))
        },
        {
            title: `创建时间`,
            dataIndex: 'createTime',
            key: "createTime",
            width:"11%",
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 50,
            render: (text, record) => (
                <Space size="small">
                    <ShowQuickExe record={record} {...props}/>
                    <ShowDeleteView record={record} deleteFn={deleteFn} />
                </Space>
            )
        },
    ]

    const history = useHistory()
    const [tableLoading,setTableLoading] = useState(true);
    const [selectCategory, setSelectCategory] = useState(null);
    const [totalPage, setTotalPage] = useState();
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [diffTypeCaseNum, setDiffTypeCaseNum] = useState();
    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findPage()
    },[repositoryId,testType])

    useEffect(()=>{
        findCategoryListTreeTable(repositoryId)
    },[repositoryId])

    useEffect(()=>{
        findDiffTypeCaseNum(repositoryId).then(res=>{
            setDiffTypeCaseNum(res)
        })
    },[repositoryId])

    const findPage = (params) =>{
        setTableLoading(true)
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
        findTestCaseList(param).then((res)=>{
            setTotalPage(res.totalPage);
            setTotalRecord(res.totalRecord)
            setTableLoading(false)
        })
    }


    /**
     * 删除用例
     * @param record
     * @returns {Promise<void>}
     */
    const deleteFn =async (record) =>{
        let isBind;
        let bindMsg;

        switch (record.caseType) {
            case CASE_TYPE.API_UNIT:
                isBind = await isApiUnitBind(record.id);
                bindMsg = "该用例已被接口场景或测试计划绑定，无法删除！";
                break;
            case CASE_TYPE.API_SCENE:
                isBind = await isApiSceneBind(record.id);
                bindMsg = "该用例已被接口性能或测试计划绑定，无法删除！";
                break;
            default:
                isBind = await isCaseExist(record.id);
                bindMsg = "该用例已被测试计划绑定，无法删除！";
                break;
        }

        if (isBind) {
            messageFn("warning", bindMsg);
        } else {
            await deleteTestCase(record.id, record.caseType);
            await findPage();
        }
    }

    //点击测试类型筛选项查找
    const selectKeyFun = (item)=>{
        let key = item.key
        setTestType(key)
        setCurrentPage(1)
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

    // 分页
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

    //搜索
    const onSearch = (e) =>{
        setCurrentPage(1)
        let param = {name: e.target.value}

        findPage(param)
    }

    const items = [
        {
            title: <span>
                <span>所有 </span>
                <span className={"font-12"}>{diffTypeCaseNum?.all||0}</span>
            </span>,
            key: `all`,
        },
        {
            title: <span>
                <span>功能 </span>
                <span className={"font-12"}>{diffTypeCaseNum?.function||0}</span>
            </span>,
            key: `function`,
        },
        {
            title: <span>
                <span>接口 </span>
                <span className={"font-12"}>{diffTypeCaseNum?.api||0}</span>
            </span>,
            key: `api`,
        },
        {
            title: <span>
                <span>UI </span>
                <span className={"font-12"}>{diffTypeCaseNum?.ui||0}</span>
            </span>,
            key: `ui`,
        },
        {
            title: <span>
                <span>性能 </span>
                <span className={"font-12"}>{diffTypeCaseNum?.perform||0}</span>
            </span>,
            key: `perform`,
        }
    ];

    const caseSelectPage = (value) =>{
        let param = {
            testType:testType,
            caseTypeList:value
        }

        findPage(param)
    }

    return(
        <PageContent>
            <div className={"content-box-center"} >
                <div  className={"header-box-space-between"} >
                    <div className={'header-box-title'}>测试用例</div>
                    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                        <DropdownAdd
                            findPage={findPage}
                            categoryStore={categoryStore}
                            {...props}
                        />
                    </div>
                </div>

                <div className={"dynamic-select-box"}>
                    <MenuSelect
                        menuItems={items}
                        selectFn={selectKeyFun}
                        selected={testType}
                        style={{width: "320px"}}
                    />

                    <Space>
                        <>
                            {
                                testType==="api"||testType==="ui"
                                    ?<CaseTypeSelect findPage={caseSelectPage} testType={testType}/>
                                    :null
                            }
                        </>

                        <Input
                            placeholder={`搜索用例名`}
                            onPressEnter={onSearch}
                            className='search-input-common'
                            prefix={<IconCommon
                                icon={"sousuo"}
                                className={"icon-s"}
                            />}
                            onChange={debounce(onSearch,500) }
                            allowClear
                        />
                        <TreeSelect
                            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                            style={{  width: '150px'}}
                            dropdownStyle={{maxHeight: 400,overflow: 'auto'}}
                            className={"filter-select-box-item"}
                            placeholder="模块"
                            allowClear
                            treeDefaultExpandAll
                            onChange={changeCategory}
                            treeData={[{name:"所有",id:"null"},...categoryTableList]}
                        />


                        <Tooltip title={"切换列表视图"} placement={"top"}>
                            <div style={{background:"#f8f8f8", padding:"0 5px",border: "1px solid #f6efef"}}>
                                <IconCommon
                                    className={"icon-m edit-icon"}
                                    icon={"shituqiehuan"}
                                    onClick={()=> {
                                        localStorage.setItem("CASE_VIEW","list")
                                        history.push(`/project/${repositoryId}/testcaseList`)
                                    }}
                                />
                            </div>
                        </Tooltip>
                    </Space>
                </div>
                <div className={"table-list-box"}>
                    <Table
                        columns={column}
                        dataSource={testcaseList}
                        rowKey = {record => record.id}
                        pagination={false}
                        loading={tableLoading}
                        onRow={(record) => ({style: rowStyle(record.caseType)})}
                        locale={{
                            emptyText: <Empty
                                imageStyle={{height: 100}}
                                description={<span>暂无用例</span>}
                            />,
                        }}
                    />
                    <PaginationCommon
                        currentPage={currentPage}
                        totalPage={totalPage}
                        changePage={onTableChange}
                        totalRecord={totalRecord}
                        findPage={findPage}
                    />
                </div>
            </div>
        </PageContent>
    )
}

export default inject("testcaseStore","categoryStore")(observer(TestCaseTable))