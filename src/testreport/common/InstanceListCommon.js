import React, {useEffect, useState} from "react";
import {Empty, Input, Space, Table} from "antd";
import { observer} from "mobx-react";
import instanceStore from "../store/InstanceStore";
import PaginationCommon from "../../common/pagination/Page";
import emptyImg from "../../assets/img/empty.png"
import {CASE_TYPE} from "../../common/dictionary/dictionary";
import ApiUnitInstanceSinglePage from "../../test/api/http/unit/components/apiUnitInstanceSinglePage";
import ApiSceneInstanceSinglePage from "../../test/api/http/scene/components/apiSceneInstanceSinglePage";
import ApiPerfInstanceSinglePage from "../../test/api/http/perf/components/ApiPerfInstanceSinglePage";
import {useHistory} from "react-router";
import MenuSelect from "../../common/menuSelect/MenuSelect";
import {CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import CaseTypeSelect from "../../test/testcase/components/CaseTypeSelect";
import {TextMethodType} from "../../test/api/http/common/methodType";
import "./instanceListStyle.scss"
import ExtensionCommon from "../../common/ExtensionCommon";
import {rowStyle, ShowDeleteView} from "../../test/testcase/components/testCaseTableFn";

const InstanceListCommon = (props) =>{
    const {belongId,type,WebSceneInstanceSinglePage,AppSceneInstanceSinglePage} = props;
    const {
        findInstancePage,
        instanceList,
        deleteInstance,
        totalPage,
        tableLoading
    } = instanceStore;


    const exeColumn={
        title: '序号',
        dataIndex: 'executeNumber',
        key: "executeNumber",
        width: "20%",
        render:(text,record)=>(showTitle(text,record,"executeNumber"))
    }
    const nameColumn =[
        {
            title: '名称',
            dataIndex: 'name',
            key: "name",
            width: "25%",
            render:(text,record)=>(showTitle(text,record))
        },{
            title: '类型',
            dataIndex: 'type',
            key: "type",
            width: "10%",
            render:(text,record)=>(<div className={"case-table-case-type"}>{showType(text, record)}</div>)
        }
    ]
    const column = [
        {
            title: '报告概要',
            dataIndex: "detail",
            key: "detail",
            width: "30%",
            render:(text,record)=>(showDetail(record))
        },
        {
            title: `测试人`,
            dataIndex: ["createUser","nickname"],
            key: "name",
            width: "10%",
        },
        {
            title: `测试时间`,
            dataIndex: "createTime",
            key: "createTime",
            width: "15%",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: "10%",
            render: (text, record) => (<ShowDeleteView record={record} deleteFn={()=>deleteFn(record)} />)
        },
    ]

    const [selectItem, setSelectItem] = useState("all");
    const history = useHistory()
    const repositoryId = sessionStorage.getItem("repositoryId")
    const [typeList, setTypeList] = useState([]);
    const [pageSize] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);

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
                type:selectItem==="test-plan"||selectItem==="api-perform"?selectItem:null,
                ...param
            }
        }else {
            param = {
                belongId:belongId,
                type:type,
                ...param
            }
        }

        await findInstancePage(param)
    }

    const deleteFn = (record) => {
        deleteInstance(record.id, record.type).then(() => findPage())
    }

    // 分页
    const onTableChange = async (current) => {
        setCurrentPage(current)
        const newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: current
            },
            type:selectItem==="test-plan"||selectItem==="api-perform"?selectItem:null
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
            case CASE_TYPE.WEB_SCENE:
                return "WEB场景"
            case CASE_TYPE.APP_SCENE:
                return "APP场景"
            case CASE_TYPE.TEST_PLAN:
                return "测试计划"
        }
    }



    /**
     * 根据类型展示不同的界面
     */
    const showTitle = (text,record,executeNumber)=>{
        switch (record.type) {
            case CASE_TYPE.API_UNIT:
                return <ApiUnitInstanceSinglePage apiUnitInstanceId={record.id} name={`${text} ${executeNumber?'':`#${record.executeNumber}`}`}/>
            case CASE_TYPE.API_SCENE:
                return <ApiSceneInstanceSinglePage apiSceneInstanceId={record.id} name={`${text} ${executeNumber?'':`#${record.executeNumber}`}`}/>
            case CASE_TYPE.API_PERFORM:
                return <ApiPerfInstanceSinglePage apiPerfInstanceId={record.id} name={`${text} ${executeNumber?'':`#${record.executeNumber}`}`}/>
            case CASE_TYPE.WEB_SCENE:
                return <ExtensionCommon
                    name={`${text} ${executeNumber?'':`#${record.executeNumber}`}`}
                    extension={ WebSceneInstanceSinglePage&&<WebSceneInstanceSinglePage webSceneInstanceId={record.id} name={`${text} ${executeNumber?'':`#${record.executeNumber}`}`}/> }
                />

            case CASE_TYPE.APP_SCENE:
                return <ExtensionCommon
                    extension={AppSceneInstanceSinglePage&&<AppSceneInstanceSinglePage appSceneInstanceId={record.id} name={`${text} ${executeNumber?'':`#${record.executeNumber}`}`}/>}
                    name={`${text} ${executeNumber?'':`#${record.executeNumber}`}`}
                />
            case CASE_TYPE.TEST_PLAN:

                if(type === CASE_TYPE.TEST_REPORT){
                    return <span
                        className={"link-text"}
                        onClick={() => {
                            sessionStorage.setItem("testPlanInstanceId",record.id)
                            history.push(`/repository/report/${record.id}`)
                        }}
                    >
                        {text}  {executeNumber?'':`#${record.executeNumber}`}
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
            case CASE_TYPE.WEB_SCENE:
                return webSceneContent(content,record)
            case CASE_TYPE.APP_SCENE:
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
                    <TextMethodType type={content.requestType}/>
                    <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                    {
                        content.statusCode
                            ? <>
                                <div>{content.statusCode}</div>
                            </>
                            :null
                    }
                    <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                    {
                        content.elapsedTime
                            ? <>
                                {/*<div style={{fontSize: "12px", color: "#aaa"}}> 时间:</div>*/}
                                <div>{content.elapsedTime} ms</div>
                            </>
                            :null
                    }

                </div>
            </div>
        </div>
    )

    const apiSceneContent = (content,record) => (
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div className={"display-flex-gap"}>
                {/*<div style={{fontSize: "12px", color: "#aaa"}}> 总数:</div>*/}
                <div>{content.testNumber}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                {/*<div style={{fontSize: "12px", color: "#aaa"}}> 耗时:</div>*/}
                <div>{content.elapsedTime} ms</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                {/*<div style={{fontSize: "12px", color: "#aaa"}}> 通过数:</div>*/}
                <div className={"instance-green"}>{content.passNumber}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                {/*<div style={{fontSize: "12px", color: "#aaa"}}> 通过率:</div>*/}
                <div className={"instance-green"}>{content.passRate}</div>
            </div>

        </div>
    )

    const apiPerformContent = (content,record) =>(
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div className={"display-flex-gap"}>
                <div>{content.total}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                <div className={"instance-green"}>{content.passNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}} > /</div>
                <div className={"instance-green"}>{content.passRate}</div>
            </div>
        </div>
    )

    const webSceneContent = (content,record)=>(
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div className={"display-flex-gap"}>
                <div>{content.stepNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                <div>{content.totalDuration} ms</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                <div className={"instance-green"}>{content.passNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                <div className={"instance-green"}>{content.passRate}</div>
            </div>
        </div>
    )

    const appSceneContent = (content,record) =>(
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div className={"display-flex-gap"}>
                <div>{content.stepNum}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                <div className={"instance-green"}>{content.passRate}</div>
                <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                <div className={"instance-green"}>{content.passNum}</div>
            </div>
        </div>
    )

    const testPlanContent = (content,record) =>(
        <div className={"display-flex-gap"}>
            {showResult(record.status)}
            <div>
                <div className={"display-flex-gap"}>
                    <div>{content.executableCaseNum}</div>
                    <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                    <div className={"instance-green"}>{content.passNum}</div>
                    <div style={{fontSize: "12px", color: "#aaa"}}> /</div>
                    <div className={"instance-green"}>{content.passRate}</div>

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
        setCurrentPage(1)

        let param={
            typeList:[],
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            },
        }
        if(key!=="all"){
            if(key==="api"){
                param = {
                    ...param,
                    type:null,
                    typeList:["api-scene","api-unit"]
                };
            }else if(key==="ui"){
                param = {
                    ...param,
                    type:null,
                    typeList:["app-scene","web-scene"]
                };
            }else {
                param = {
                    "type":key,
                    ...param
                };
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
                                    placeholder={`搜索用例名`}
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
                    loading={tableLoading}
                    onRow={(record) => ({style: rowStyle(record.type)})}
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