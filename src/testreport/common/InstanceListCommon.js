import React, {useEffect, useState} from "react";
import {Empty, Input, Space, Table, Tag} from "antd";
import { observer} from "mobx-react";
import instanceStore from "../store/InstanceStore";
import IconCommon from "../../common/IconCommon";
import PaginationCommon from "../../common/pagination/Page";
import emptyImg from "../../assets/img/empty.png"
import {CASE_TYPE} from "../../common/dictionary/dictionary";
import ApiUnitInstanceSinglePage from "../../test/api/http/unit/components/apiUnitInstanceSinglePage";
import ApiSceneInstanceSinglePage from "../../test/api/http/scene/components/apiSceneInstanceSinglePage";
import ApiPerfInstanceSinglePage from "../../test/api/http/perf/components/ApiPerfInstanceSinglePage";
import WebSceneInstanceSinglePage from "../../test/web/scene/components/WebSceneInstanceSinglePage";
import AppSceneInstanceSinglePage from "../../test/app/scene/components/AppSceneInstanceSinglePage";
import {useHistory} from "react-router";
import MenuSelect from "../../common/menuSelect/MenuSelect";
import {CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import CaseTypeSelect from "../../test/testcase/components/CaseTypeSelect";

const InstanceListCommon = (props) =>{
    const {belongId,type} = props;
    const {
        findInstancePage,
        instanceList,
        deleteInstance
    } = instanceStore;


    const exeColumn={
        title: '序号',
        dataIndex: 'executeNumber',
        key: "executeNumber",
        width: "10%",
        render:(text,record)=>(showTitle(text,record))
    }
    const nameColumn =[
        {
            title: '名称',
            dataIndex: 'name',
            key: "name",
            width: "15%",
            render:(text,record)=>(showTitle(text,record))
        },{
            title: '类型',
            dataIndex: 'type',
            key: "type",
            width: "8%",
            render:(text,record)=>(<div className={"case-table-case-type"}>{showType(text, record)}</div>)
        }
    ]
    const column = [
        {
            title: '详情',
            dataIndex: "detail",
            key: "detail",
            width: "55%",
            render:(text,record)=>(showDetail(record))
        },
        {
            title: `测试人`,
            dataIndex: ["createUser","nickname"],
            key: "name",
            width: "7%",
        },
        {
            title: `测试时间`,
            dataIndex: "createTime",
            key: "createTime",
            width: "10%",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 120,
            render: (text, record) => (
                <IconCommon
                    className={"icon-s edit-icon"}
                    icon={"shanchu3"}
                    onClick={() => deleteInstance(record.id).then(()=>findPage())}
                />
            )
        },
    ]

    const [selectItem, setSelectItem] = useState("all");
    const history = useHistory()
    const repositoryId = sessionStorage.getItem("repositoryId")
    const [typeList, setTypeList] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(async ()=>{
        await findPage()
    },[])

    const findPage = async (params) => {
        let param={
            typeList:typeList,
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage
            },
            ...params
        };

        if(type===CASE_TYPE.TEST_REPORT){
            param = {
                repositoryId:repositoryId,
                ...param
            }
        }else {
            param = {
                belongId:belongId,
                type:type,
                ...param
            }
        }

        let res = await findInstancePage(param)
        if(res.code===0){
            setTotalPage(res.data.totalPage)
        }
    }

    // 分页
    const onTableChange = async (current) => {
        setCurrentPage(current)
        const newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: current
            },
        }

        await findPage(newParams)
    }

    /**
     * 类型展示
     */
    const showType = (text, record) => {
        switch (record.type) {
            case CASE_TYPE.API_UNIT:
                return "接口单元"
            case CASE_TYPE.API_SCENE:
                return "接口场景"
            case CASE_TYPE.API_PERFORM:
                return "接口性能"
            case CASE_TYPE.WEB:
                return "WEB场景"
            case CASE_TYPE.APP:
                return "APP场景"
            case CASE_TYPE.TEST_PLAN:
                return "测试计划"
        }
    }



    /**
     * 根据类型展示不同的界面
     */
    const showTitle = (text,record)=>{
        switch (record.type) {
            case CASE_TYPE.API_UNIT:
                return <ApiUnitInstanceSinglePage apiUnitInstanceId={record.id} name={text}/>
            case CASE_TYPE.API_SCENE:
                return <ApiSceneInstanceSinglePage apiSceneInstanceId={record.id} name={text}/>
            case CASE_TYPE.API_PERFORM:
                return <ApiPerfInstanceSinglePage name={text} apiPerfInstanceId={record.id}/>
            case CASE_TYPE.WEB:
                return <WebSceneInstanceSinglePage webSceneInstanceId={record.id} name={text}/>
            case CASE_TYPE.APP:
                return <AppSceneInstanceSinglePage appSceneInstanceId={record.id} name={text}/>
            case CASE_TYPE.TEST_PLAN:

                if(type === CASE_TYPE.TEST_REPORT){
                    return <span
                        className={"link-text"}
                        onClick={() => {
                            sessionStorage.setItem("testPlanInstanceId",record.id)
                            history.push(`/repository/report/${record.id}`)
                        }}
                    >
                    {text}
                </span>
                }else {
                    return <span
                        className={"link-text"}
                        onClick={() => {
                            sessionStorage.setItem("testPlanInstanceId",record.id)
                            history.push(`/plan/${record.id}`)
                        }}
                    >
                    {text}
                </span>
                }

        }
    }

    const showDetail = (record)=>{
        let content = JSON.parse(record.content);
        let isNotReportType;
        if(type===CASE_TYPE.TEST_REPORT){
            isNotReportType=record.type
        }else {
            isNotReportType=type
        }

        switch (isNotReportType) {
            case CASE_TYPE.API_UNIT:
                return apiUnitContent(content,record)
            case CASE_TYPE.API_SCENE:
                return apiSceneContent(content,record)
            case CASE_TYPE.API_PERFORM:
                return apiPerformContent(content,record)
            case CASE_TYPE.WEB:
                return webSceneContent(content,record)
            case CASE_TYPE.APP:
                return appSceneContent(content,record)
            case CASE_TYPE.TEST_PLAN:
                return testPlanContent(content,record)
        }
    }

    const apiUnitContent = (content,record) => (
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div>
                <div className={"display-flex-gap"}>
                    <div style={{fontSize: "12px", color: "#aaa"}}> 请求类型:</div>
                    <div>{content.requestType}</div>
                    {
                        content.statusCode
                            ? <>
                                <div style={{fontSize: "12px", color: "#aaa"}}> 状态码:</div>
                                <div>{content.statusCode}</div>
                            </>
                            :null
                    }
                    {
                        content.elapsedTime
                            ? <>
                                <div style={{fontSize: "12px", color: "#aaa"}}> 时间:</div>
                                <div>{content.elapsedTime} ms</div>
                            </>
                            :null
                    }

                </div>
                <div className={"display-flex-gap"}>
                    <div style={{fontSize: "12px", color: "#aaa"}}> 请求地址:</div>
                    <div>{content.url}</div>
                </div>
            </div>
        </div>
    )

    const apiSceneContent = (content,record) => (
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div className={"display-flex-gap"}>
                <div style={{fontSize: "12px", color: "#aaa"}}> 总数:</div>
                <div>{content.testNumber}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 耗时:</div>
                <div>{content.elapsedTime}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过数:</div>
                <div>{content.passNumber}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过率:</div>
                <div>{content.passRate}</div>
            </div>

        </div>
    )

    const apiPerformContent = (content,record) =>(
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div className={"display-flex-gap"}>
                <div style={{fontSize: "12px", color: "#aaa"}}> 总数:</div>
                <div>{content.total}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过数:</div>
                <div>{content.passNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过率:</div>
                <div>{content.passRate}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 错误数:</div>
                <div>{content.failNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 失败率:</div>
                <div>{content.errorRate}</div>
            </div>
        </div>
    )

    const webSceneContent = (content,record)=>(
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div className={"display-flex-gap"}>
                <div style={{fontSize: "12px", color: "#aaa"}}> 总数:</div>
                <div>{content.stepNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 耗时:</div>
                <div>{content.totalDuration}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过数:</div>
                <div>{content.passNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过率:</div>
                <div>{content.passRate}</div>
            </div>
        </div>
    )

    const appSceneContent = (content,record) =>(
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div className={"display-flex-gap"}>
                <div style={{fontSize: "12px", color: "#aaa"}}> 总数:</div>
                <div>{content.stepNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过率:</div>
                <div>{content.passRate}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 通过数:</div>
                <div>{content.passNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> 失败数:</div>
                <div>{content.failNum}</div>
            </div>
        </div>
    )

    const testPlanContent = (content,record) =>(
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div>
                <div className={"display-flex-gap"}>
                    <div style={{fontSize: "12px", color: "#aaa"}}> 总用例:</div>
                    <div>{content.total}</div>
                    <div style={{fontSize: "12px", color: "#aaa"}}> 可执行用例:</div>
                    <div>{content.executableCaseNum}</div>
                </div>
                <div className={"display-flex-gap"}>
                    <div style={{fontSize: "12px", color: "#aaa"}}> 通过数:</div>
                    <div>{content.passNum}</div>
                    <div style={{fontSize: "12px", color: "#aaa"}}> 通过率:</div>
                    <div>{content.passRate}</div>
                    <div style={{fontSize: "12px", color: "#aaa"}}> 错误数:</div>
                    <div>{content.failNum}</div>
                    <div style={{fontSize: "12px", color: "#aaa"}}> 失败率:</div>
                    <div>{content.errorRate}</div>
                </div>
            </div>

        </div>
    )

    const showResult = (status)=>{
        switch (status) {
            case 0:
            case "success":
                return <CheckCircleTwoTone twoToneColor={"#52c41a"}/>
            case "fail": return <CloseCircleTwoTone twoToneColor={"red"}/>
            case "start": return <LoadingOutlined twoToneColor={"blue"} />
            default: return <LoadingOutlined twoToneColor={"blue"} />
        }


    }

    //搜索
    const onSearch = async (e) =>{
        setCurrentPage(1)
        let param = {name: e.target.value}

        await findPage(param)
    }


    /**
     * 点击筛选项查找
     */
    const selectFn = async (item)=>{
        let key= item.key
        setSelectItem(key)

        let param
        if(key!=="all"){
            if(key==="api"){
                param = {"typeList":["api-scene","api-unit"]};
            }else if(key==="ui"){
                param = {"typeList":["app-scene","web-scene"]};
            }else {
                param = {"type":key};
            }
            setTypeList(param.typeList)
        }else {
            setTypeList([])
        }

        await findPage(param)
    }


    //项目筛选列表
    const items = [
        {
            title: '所有',
            key: `all`,
        },
        {
            title: '接口',
            key: `api`,
        },
        {
            title: 'UI',
            key: `ui`,
        },{
            title: '性能',
            key: `api-perform`,
        },{
            title: '计划',
            key: `test-plan`,
        }
    ];


    const instanceSelectPage = async (list) =>{
        let param
        if(selectItem==="api"){
            if(list.length===0){
                param = {"typeList":["api-scene","api-unit"]};
            }else {
                param = {
                    typeList:list
                }
            }
        }

        if (selectItem==="ui"){
            if(list.length===0){
                param = {"typeList":["app-scene","web-scene"]};
            }else {
                param = {
                    typeList:list
                }
            }
        }

        setTypeList(param.typeList)
        await findPage(param)
    }


    return(
        <>
            {
                type===CASE_TYPE.TEST_REPORT
                    ? <>
                        <div className='header-box-space-between'>
                            <div className={'header-box-title'}>测试报告</div>
                        </div>
                        <div className='header-box-space-between'>
                            <MenuSelect
                                menuItems={items}
                                selectFn={selectFn}
                                selected={selectItem}
                                style={{width: "300px"}}
                            />

                            <Space>
                                <>
                                    {
                                        selectItem==="api"||selectItem==="ui"
                                            ?<CaseTypeSelect testType={selectItem} findPage={instanceSelectPage}/>
                                            :null
                                    }
                                </>

                                <Input
                                    placeholder={`搜索用例`}
                                    onPressEnter={onSearch}
                                    className='search-input-common'
                                    prefix={<SearchOutlined/>}
                                />
                            </Space>

                        </div>
                    </>
                    :null
            }

            <div className={"table-list-box"}>
                <Table
                    columns={type === CASE_TYPE.TEST_REPORT ? [...nameColumn, ...column] : [exeColumn, ...column]}
                    dataSource={instanceList}
                    rowKey={record => record.id}
                    pagination={false}
                    locale={{
                        emptyText: <Empty
                            imageStyle={{height: 120}}
                            description={<span>暂无历史</span>}
                            image={emptyImg}
                        />,
                    }}
                />
                <PaginationCommon
                    currentPage={currentPage}
                    totalPage={totalPage}
                    changePage={onTableChange}
                />
            </div>
        </>

    )
}

export default observer(InstanceListCommon);