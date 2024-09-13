import React from 'react'
import {Redirect} from "react-router";
import LazyComponent from "./common/Lazy";

//---平台
import {Directory, Orga, UserGroup, User,} from "thoughtware-user-ui";
import {NoAccess, ProjectFeature, ProjectRole, SystemFeature, SystemRole,ProjectVirtualRole} from "thoughtware-privilege-ui"
import {ExcludeProductUser, NotFound} from "thoughtware-eam-ui";
import {BackupRestore, LogTemplate, LogType, MyLog} from "thoughtware-security-ui";
import {MessageNotice, MessageSendType, MessageType} from "thoughtware-message-ui";
import {ProductAuth} from "thoughtware-licence-ui";
import SettingHome from "./setting/system/SettingHome";

//---内部
let PortalHeader = LazyComponent(() => import("./home/header/PortalContent"));
let LoginOut = LazyComponent(() => import("./home/header/LoginOut"));
let LoginContent = LazyComponent(() => import("./login/LoginContent"));
let Home = LazyComponent(() => import("./home/Home"));

let Repository = LazyComponent(() => import("./repository/repository/components/Repository"));
let RepositoryAddPage = LazyComponent(() => import("./repository/repository/components/RepositoryAddPage"));
let RepositoryDetailPage = LazyComponent(() => import("./repository/overview/RepositoryOverView"));
let RepositoryDetailLayout = LazyComponent(() => import("./repository/common/RepositoryDetailLayout"));
let RepositorySettingMenu = LazyComponent(() => import("./repository/setting/RepositorySettingMenu"));
let RepositorySetting = LazyComponent(() => import("./repository/setting/RepositorySetting"));

let CategoryList = LazyComponent(() => import("./category/components/CategoryList"));

let TestCaseTable = LazyComponent(() => import("./test/testcase/components/TestCaseTable"));
let TestcaseListMain = LazyComponent(() => import( "./test/testcase/components/testcaseListView/TestcaseListMain"));

let ApiUnitContent = LazyComponent(() => import("./test/api/http/unit/components/apiUnitContent"));
let ApiUnitInstanceList = LazyComponent(() => import("./test/api/http/unit/components/apiUnitInstanceList"));
let ApiUnitContentListView  = LazyComponent(() => import( "./test/api/http/unit/components/listView/ApiUnitContentListView"));
let ApiUnitInstanceListView = LazyComponent(() => import( "./test/api/http/unit/components/listView/apiUnitInstanceListView"));

let ApiSceneContent = LazyComponent(() => import("./test/api/http/scene/components/apiSceneContent"));
let ApiSceneContentListView = LazyComponent(() => import("./test/api/http/scene/components/listView/apiSceneContentListView"));

let ApiPerfContent = LazyComponent(() => import("./test/api/http/perf/components/ApiPerfContent"));
let ApiPerformToUnitPage =LazyComponent(() => import( "./test/api/http/perf/components/apiPerformToUnitPage"));
let ApiPerformToScenePage = LazyComponent(() => import("./test/api/http/perf/components/apiPerformToScenePage"));
let ApiPerfContentListView = LazyComponent(() => import( "./test/api/http/perf/components/listView/ApiPerfContentListView"));;
let ApiPerformToUnitPageListView = LazyComponent(() => import( "./test/api/http/perf/components/listView/ApiPerformToUnitPageListView"));
let ApiPerformToScenePageListView = LazyComponent(() => import( "./test/api/http/perf/components/listView/apiPerformToScenePageListView"));

let FuncUnitDetail = LazyComponent(() => import("./test/function/components/FunctionContent"));
let FunctionContentListView = LazyComponent(() => import("./test/function/components/listView/FunctionContentListView"));

let PlanDetailContent = LazyComponent(()=>import("./testplan/common/PlanDetailContent"))
let TestPlan = LazyComponent(() => import("./testplan/plan/components/testPlan"));
let TestPlanBindCaseList = LazyComponent(() => import("./testplan/plan/components/testPlanBindCaseList"));
let TestPlanInstanceList = LazyComponent(() => import("./testplan/instance/components/testPlanInstanceList"));

let TestPlanBindCaseInstanceList = LazyComponent(() => import("./testplan/instance/components/testPlanBindCaseInstanceList"));
let PlanToApiUnitPage = LazyComponent(() => import("./testplan/common/planToCase/planToApiUnitPage"));
let PlanToApiScenePage = LazyComponent(() => import("./testplan/common/planToCase/planToApiScenePage"));
let PlanToApiPerformPage = LazyComponent(() => import("./testplan/common/planToCase/planToApiPerformPage"));
let PlanToFuncUnitPage = LazyComponent(() => import("./testplan/common/planToCase/planToFuncUnitPage"));
let PlanSetting = LazyComponent(() => import( "./testplan/setting/PlanSetting"));
let QuartzPlanList = LazyComponent(() => import( "./testplan/quartz/components/QuartzPlanList"));

let TestReportList = LazyComponent(() => import("./testreport/components/testReportList"));
let TestReportDetail = LazyComponent(() => import("./testreport/components/testReportDetail"));

let StatisticsMenu = LazyComponent(() => import( "./statistics/common/StatisticsMenu"));
let NewCreateCaseStatistics = LazyComponent(() => import( "./statistics/newcreatecase/NewCreateCaseStatistics"));
let CaseTestStatistics = LazyComponent(() => import( "./statistics/casetest/CaseTestStatistics"));

let ProjectAllDefectList = LazyComponent(() => import( "./integrated/teamwire/defect/components/ProjectAllDefectList"));

let EnvContent = LazyComponent(() => import("./support/environment/components/envContent"));
let AgentConfigList = LazyComponent(() => import("./support/agent/components/AgentConfigList"));
let WorkspaceBindList = LazyComponent(() => import("./integrated/common/integratedPage"));

let SystemContent = LazyComponent(() => import("./setting/system/SystemContent"));
let Version = LazyComponent(() => import("./setting/version/Version"));
let DomainRole = LazyComponent(() => import("./repository/setting/DomainRole"));
let DomainPrivilege = LazyComponent(() => import("./repository/setting/DomainPrivilege"));

const routers =  [
    {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/index"}/>,
    },
    {
        path: "/login",
        component: LoginContent,
        exact: true,
        key:'LoginContent',
    },
    {
        path: "/logout",
        component: LoginOut,
        exact: true,
        key:'logout',
    },
    {
        exact: true,
        path: '/404',
        render: props => <NotFound {...props} homePath={'/'}/>
    },
    {
        exact: true,
        path: '/noaccess',
        render: props => <NoAccess {...props} homePath={'/'} />
    },
    {
        path:"/no-auth",
        exact: true,
        render:(props)=>{
            return <ExcludeProductUser {...props}/>
        }
    },
    {
        component: PortalHeader,
        path: '/',
        routes:[
            {
                path: "/index",
                component: Home,
                exact: true,
            },
            {
                path: "/project",
                component: Repository,
                exact: true,
            },
            {
                path: "/projectAdd",
                component: RepositoryAddPage,
                exact: true,
            },
            {
                path:'/setting',
                component:SystemContent,
                routes:[
                    {
                        path: "/setting/home",
                        component: SettingHome,
                        exact: true,
                    },
                    //成员与部门
                    {
                        path: "/setting/orga",
                        exact: true,
                        render:(props)=> <div className={"table-list-box"}><Orga {...props} bgroup={'testhubo'}/></div>
                    },{
                        path: "/setting/user",
                        exact: true,
                        render:(props)=> <div className={"table-list-box"}><User {...props} bgroup={'testhubo'}/></div>
                    },{
                        path: "/setting/dir",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false} bgroup={"testhubo"}/>,
                    },{
                        path: "/setting/userGroup",
                        key:'authConfig',
                        exact: true,
                        render: () => <UserGroup />,
                    },
                    {
                        path: "/setting/agent",
                        key:'agent',
                        exact: true,
                        component: AgentConfigList
                    },
                    //权限
                    {
                        path: "/setting/systemRole",
                        key:'SystemRole',
                        render: () => <div className={"table-list-box"}><SystemRole group={'system'} bgroup={"testhubo"}/></div>,
                    },
                    //消息
                    {
                        path: "/setting/messageNotice",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"testhubo"} />
                    },
                    {
                        path: "/setting/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"testhubo"}/>

                    },

                    {
                        path: "/setting/backups",
                        exact: true,
                        render:()=> <BackupRestore />
                    },{
                        path: "/setting/productAuth",
                        exact: true,
                        render:()=> <ProductAuth  />
                    },

                    //日志
                    {
                        path: "/setting/log",
                        key:'log',
                        exact: true,
                        render:(props)=>  <MyLog {...props} bgroup={"testhubo"}/>,
                    },
                    //版本
                    {
                        path: "/setting/version",
                        key:'version',
                        exact: true,
                        component:Version
                    },
                    //产品授权
                    // {
                    //     path: "/setting/product",
                    //     key:'version',
                    //     exact: true,
                    //     render:(props)=><ProductAuth />
                    // },


                    {
                        path: "/setting/baseSystemRole",
                        exact: true,
                        render: () => <SystemRole isBase={true} group={'system'} bgroup={"testhubo"}/>,
                    },
                    {
                        path: "/setting/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        render: () => <SystemFeature isBase={true} bgroup={"testhubo"}/>,
                    },
                    {
                        path: "/setting/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        render: (props) => <ProjectFeature isBase={true} {...props} bgroup={"testhubo"}/>,
                    },
                    {
                        path: "/setting/virtual-role",
                        key:'ProjectRole',
                        exact: true,
                        render: (props) => <ProjectVirtualRole {...props}/>,
                    },
                    {
                        path: "/setting/role",
                        key:'ProjectRole',
                        exact: true,
                        render: (props) => <ProjectRole isBase={true} {...props} bgroup={"testhubo"}/>,
                    },
                    {
                        path: "/setting/messageSendTypeBase",
                        key:'messageSendTypeBase',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"testhubo"} isBase={true}/>
                    },
                    {
                        path: "/setting/message-notice-base",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"testhubo"} isBase={true}/>
                    },
                    {
                        path: "/setting/messageType",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageType bgroup={"testhubo"} />

                    },
                    {
                        path: "/setting/logTemplate",
                        key:'logTemplate',
                        exact: true,
                        render:(props)=>  <LogTemplate {...props} bgroup={"testhubo"}/>,
                    },{
                        path: "/setting/logType",
                        key:'logTemplate',
                        exact: true,
                        render:()=>  <LogType bgroup={"testhubo"}/>,
                    },
                    {
                        path:"/setting",
                        exact: true,
                        key:'ridenvtest',
                        component: ()=><Redirect to='/setting/systemRole'/>,
                    },
                ]
            },
            {
                path:"/plan",
                component: PlanDetailContent,
                routes: [
                    {
                        path: "/plan/:id/case",
                        exact: true,
                        component: TestPlanBindCaseList,
                    },
                    {
                        path: "/plan/:id/apiUnit",
                        exact: true,
                        component: PlanToApiUnitPage,
                    },
                    {
                        path: "/plan/:id/apiScene",
                        exact: true,
                        component: PlanToApiScenePage,
                    },
                    {
                        path: "/plan/:id/apiPerform",
                        exact: true,
                        component: PlanToApiPerformPage,
                    },
                    {
                        path: "/plan/:id/function",
                        exact: true,
                        component: PlanToFuncUnitPage,
                    },

                    {
                        path: "/plan/:id/quartz",
                        exact: true,
                        component: QuartzPlanList,
                    },
                    {
                        path: "/plan/:id/setting",
                        exact: true,
                        component: PlanSetting,
                    },
                    {
                        path: "/plan/:id/instance",
                        exact: true,
                        component: TestPlanInstanceList,
                    },
                    {
                        path: "/plan/:id/instanceInfo",
                        exact: true,
                        component: TestPlanBindCaseInstanceList,
                    },
                ]
            },
            {
                component:RepositoryDetailLayout,
                routes:[
                    {
                        path: "/project/:id/overview",
                        exact: true,
                        component: RepositoryDetailPage,
                    },
                    {
                        path: "/project/:id/testcase",
                        exact: true,
                        component: TestCaseTable,
                    },
                    {
                        path: "/project/:projectId/testcase/apiUnit/:caseId",
                        exact: true,
                        component: ApiUnitContent,
                    },
                    {
                        path: "/project/:projectId/testcase/apiUnitInstance",
                        exact: true,
                        component: ApiUnitInstanceList,
                    },

                    {
                        path: "/project/:projectId/testcase/apiScene/:caseId",
                        exact: true,
                        component: ApiSceneContent,
                    },

                    {
                        path: "/project/:projectId/testcase/apiPerform/:caseId",
                        exact: true,
                        component: ApiPerfContent,
                    },
                    {
                        path: "/project/:projectId/testcase/performToUnit",
                        exact: true,
                        component: ApiPerformToUnitPage ,
                    },
                    {
                        path: "/project/:projectId/testcase/performToScene",
                        exact: true,
                        component: ApiPerformToScenePage ,
                    },
                    {
                        path: "/project/:projectId/testcase/function/:caseId",
                        exact: true,
                        component: FuncUnitDetail,
                    },


                    {
                        path: "/project/:projectId/testcaseList",
                        component: TestcaseListMain,
                        routes: [
                            {
                                path: "/project/:projectId/testcaseList/apiUnit/:caseId",
                                exact: true,
                                component: ApiUnitContentListView,
                            },
                            {
                                path: "/project/:projectId/testcaseList/apiUnitInstance",
                                exact: true,
                                component: ApiUnitInstanceListView,
                            },

                            {
                                path: "/project/:projectId/testcaseList/apiScene/:caseId",
                                exact: true,
                                component: ApiSceneContentListView,
                            },
                            {
                                path: "/project/:projectId/testcaseList/apiPerform/:caseId",
                                exact: true,
                                component: ApiPerfContentListView,
                            },
                            {
                                path: "/project/:projectId/testcaseList/performToUnit",
                                exact: true,
                                component: ApiPerformToUnitPageListView ,
                            },
                            {
                                path: "/project/:projectId/testcaseList/performToScene",
                                exact: true,
                                component: ApiPerformToScenePageListView ,
                            },

                            {
                                path: "/project/:projectId/testcaseList/function/:caseId",
                                exact: true,
                                component: FunctionContentListView,
                            },
                        ]
                    },

                    {
                        path: "/project/:id/plan",
                        exact: true,
                        component:TestPlan ,
                    },
                    {
                        path: "/project/:id/report",
                        exact: true,
                        component: TestReportList,
                    },{
                        path: "/project/:id/reportInfo",
                        exact: true,
                        component: TestReportDetail,
                    },
                    {
                        path: "/project/:id/issue",
                        exact: true,
                        component: ProjectAllDefectList,
                    },


                    {
                        path: "/project/:id/statistics",
                        component: StatisticsMenu,
                        routes: [
                            {
                                path: "/project/:id/statistics/newAdd",
                                exact: true,
                                component: NewCreateCaseStatistics,
                            },{
                                path: "/project/:id/statistics/test",
                                exact: true,
                                component: CaseTestStatistics,
                            },
                        ]
                    },

                    {
                        path: "/project/:id/setting",
                        component: RepositorySettingMenu,
                        routes:[
                            {
                                path: "/project/:id/setting/info",
                                key:'env',
                                exact: true,
                                component: RepositorySetting,
                            },
                            {
                                path: "/project/:id/setting/category",
                                key:'category',
                                exact: true,
                                component: CategoryList,
                            },
                            {
                                path: "/project/:id/setting/envMana",
                                key:'env',
                                exact: true,
                                component: EnvContent,
                            },
                            {
                                path: "/project/:id/setting/workspace",
                                key:'agent',
                                exact: true,
                                component: WorkspaceBindList
                            },
                            {
                                path: "/project/:id/setting/member",
                                key:'domainRole',
                                exact: true,
                                component: DomainRole
                            },
                            {
                                path: "/project/:id/setting/privilege",
                                key:'domainPrivilege',
                                exact: true,
                                component: DomainPrivilege
                            },
                            // {
                            //     path:"/project/setting",
                            //     exact: true,
                            //     key:'ridapitest',
                            //     component: ()=><Redirect to='/repository/setting/envMana'/>,
                            // },
                        ]
                    },

                    {
                        path:"/project/testcase",
                        exact: true,
                        key:'ridapitest',
                        component: ()=><Redirect to='/project/:id/testcase'/>,
                    },
                ]
            },
            {
                path: "*",
                render: () => <Redirect to={"/404"}/>,
            },
        ]
    },
];

export default routers
