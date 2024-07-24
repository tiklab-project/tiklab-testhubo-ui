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

//---内部
let PortalHeader = LazyComponent(() => import("./home/header/PortalContent"));
let LoginOut = LazyComponent(() => import("./home/header/LoginOut"));
let LoginContent = LazyComponent(() => import("./login/LoginContent"));
let Home = LazyComponent(() => import("./home/Home"));

let Repository = LazyComponent(() => import("./repository/repository/components/Repository"));
let RepositoryEdit = LazyComponent(() => import("./repository/repository/components/RepositoryEdit"));
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
let TestPlanDetail = LazyComponent(() => import("./testplan/plan/components/testPlanDetail"));
let TestPlanBindCaseList = LazyComponent(() => import("./testplan/plan/components/testPlanBindCaseList"));
let TestPlanInstanceList = LazyComponent(() => import("./testplan/instance/components/testPlanInstanceList"));

let TestPlanBindCaseInstanceList = LazyComponent(() => import("./testplan/instance/components/testPlanBindCaseInstanceList"));
let PlanToApiUnitPage = LazyComponent(() => import("./testplan/common/planToCase/planToApiUnitPage"));
let PlanToApiScenePage = LazyComponent(() => import("./testplan/common/planToCase/planToApiScenePage"));
let PlanToApiPerformPage = LazyComponent(() => import("./testplan/common/planToCase/planToApiPerformPage"));
let PlanToWebScenePage = LazyComponent(() => import("./testplan/common/planToCase/planToWebScenePage"));
let PlanToFuncUnitPage = LazyComponent(() => import("./testplan/common/planToCase/planToFuncUnitPage"));
let PlanToAppScenePage = LazyComponent(() => import("./testplan/common/planToCase/planToAppScenePage"));
let PlanSetting = LazyComponent(() => import( "./testplan/setting/PlanSetting"));
let QuartzPlanList = LazyComponent(() => import( "./testplan/quartz/components/QuartzPlanList"));

let TestPlanInstance  = LazyComponent(() => import( "./testplan/instance/components/TestPlanInstance"));
let PlanToApiUnitInstance  = LazyComponent(() => import(  "./testplan/instance/components/PlanToApiUnitInstance"));
let PlanToApiSceneInstance  = LazyComponent(() => import(  "./testplan/instance/components/PlanToApiSceneInstance"));
let PlanToApiPerfInstance  = LazyComponent(() => import(  "./testplan/instance/components/PlanToApiPerfInstance"));
let PlanToWebSceneInstance  = LazyComponent(() => import(  "./testplan/instance/components/PlanToWebSceneInstance"));
let PlanToAppSceneInstance  = LazyComponent(() => import(  "./testplan/instance/components/PlanToAppSceneInstance"));

let TestReportList = LazyComponent(() => import("./testreport/components/testReportList"));
let TestReportDetail = LazyComponent(() => import("./testreport/components/testReportDetail"));

let StatisticsMenu = LazyComponent(() => import( "./statistics/common/StatisticsMenu"));
let NewCreateCaseStatistics = LazyComponent(() => import( "./statistics/newcreatecase/NewCreateCaseStatistics"));
let CaseTestStatistics = LazyComponent(() => import( "./statistics/casetest/CaseTestStatistics"));

let ProjectAllDefectList = LazyComponent(() => import( "./integrated/teamwire/defect/components/ProjectAllDefectList"));

let EnvContent = LazyComponent(() => import("./support/environment/components/envContent"));
let AgentConfigList = LazyComponent(() => import("./support/agent/components/AgentConfigList"));
let WorkspaceBindList = LazyComponent(() => import("./integrated/common/integratedPage"));

let SystemHome = LazyComponent(() => import( "./setting/system/SystemHome"));
let SystemContent = LazyComponent(() => import("./setting/system/SystemContent"));
let Version = LazyComponent(() => import("./setting/version/Version"));
let DomainRole = LazyComponent(() => import("./repository/setting/DomainRole"));
let DomainPrivilege = LazyComponent(() => import("./repository/setting/DomainPrivilege"));

const routers =  [
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
                path: "/home",
                component: Home,
                exact: true,
                key:'Home',
            },
            {
                path: "/project",
                component: Repository,
                key:'repository'
            },
            {
                path: "/project-edit",
                component: RepositoryEdit,
                key:'RepositoryEdit'
            },
            {
                path:'/repository',
                component:RepositoryDetailLayout,
                routes:[
                    {
                        path: "/repository/detail/:id",
                        exact: true,
                        component: RepositoryDetailPage,
                    },
                    {
                        path: "/repository/testcase/:id",
                        component: TestCaseTable,
                    },
                    {
                        path: "/repository/api-unit/:id",
                        component: ApiUnitContent,
                    },
                    {
                        path: "/repository/api-unit-instance",
                        component: ApiUnitInstanceList,
                    },

                    {
                        path: "/repository/api-scene/:id",
                        component: ApiSceneContent,
                    },

                    {
                        path: "/repository/api-perform/:id",
                        component: ApiPerfContent,
                    },
                    {
                        path: "/repository/api-perform-to-unit",
                        component: ApiPerformToUnitPage ,
                    },
                    {
                        path: "/repository/api-perform-to-scene",
                        component: ApiPerformToScenePage ,
                    },

                    {
                        path: "/repository/function/:id",
                        exact: true,
                        component: FuncUnitDetail,
                    },


                    {
                        path: "/repository/testcase-list",
                        component: TestcaseListMain,
                        routes: [
                            {
                                path: "/repository/testcase-list/api-unit/:id",
                                component: ApiUnitContentListView,
                            },
                            {
                                path: "/repository/testcase-list/api-unit-instance",
                                component: ApiUnitInstanceListView,
                            },

                            {
                                path: "/repository/testcase-list/api-scene/:id",
                                component: ApiSceneContentListView,
                            },
                            {
                                path: "/repository/testcase-list/api-perform/:id",
                                component: ApiPerfContentListView,
                            },
                            {
                                path: "/repository/testcase-list/api-perform-to-unit",
                                component: ApiPerformToUnitPageListView ,
                            },
                            {
                                path: "/repository/testcase-list/api-perform-to-scene",
                                component: ApiPerformToScenePageListView ,
                            },

                            {
                                path: "/repository/testcase-list/function/:id",
                                component: FunctionContentListView,
                            },
                        ]
                    },


                    {
                        path: "/repository/plan",
                        component:TestPlan ,
                        routes: [
                            {
                                path: "/repository/plan/instance",
                                component: TestPlanInstance,
                            },{
                                path: "/repository/plan/api-unit",
                                component: PlanToApiUnitInstance,
                            },{
                                path: "/repository/plan/api-scene",
                                component: PlanToApiSceneInstance,
                            },{
                                path: "/repository/plan/api-perform",
                                component: PlanToApiPerfInstance,
                            },{
                                path: "/repository/plan/web-scene",
                                component: PlanToWebSceneInstance,
                            },{
                                path: "/repository/plan/app-scene",
                                component: PlanToAppSceneInstance,
                            }
                        ]
                    },

                    {
                        path: "/repository/report",
                        exact: true,
                        component: TestReportList,
                    },{
                        path: "/repository/report/:id",
                        exact: true,
                        component: TestReportDetail,
                    },
                    {
                        path: "/repository/defect",
                        exact: true,
                        component: ProjectAllDefectList,
                    },


                    {
                        path: "/repository/statistics",
                        component: StatisticsMenu,
                        routes: [
                            {
                                path: "/repository/statistics/new-create",
                                exact: true,
                                component: NewCreateCaseStatistics,
                            },{
                                path: "/repository/statistics/test",
                                exact: true,
                                component: CaseTestStatistics,
                            },
                        ]
                    },




                    {
                        path: "/repository/setting",
                        component: RepositorySettingMenu,
                        routes:[
                            {
                                path: "/repository/setting/detail",
                                key:'env',
                                exact: true,
                                component: RepositorySetting,
                            },
                            {
                                path: "/repository/setting/category",
                                key:'category',
                                exact: true,
                                component: CategoryList,
                            },
                            {
                                path: "/repository/setting/envMana",
                                key:'env',
                                exact: true,
                                component: EnvContent,
                            },
                            {
                                path: "/repository/setting/workspace",
                                key:'agent',
                                exact: true,
                                component: WorkspaceBindList
                            },
                            {
                                path: "/repository/setting/role",
                                key:'domainRole',
                                exact: true,
                                component: DomainRole
                            },
                            {
                                path: "/repository/setting/privilege",
                                key:'domainPrivilege',
                                exact: true,
                                component: DomainPrivilege
                            },
                            // {
                            //     path:"/repository/setting",
                            //     exact: true,
                            //     key:'ridapitest',
                            //     component: ()=><Redirect to='/repository/setting/envMana'/>,
                            // },
                        ]
                    },

                    {
                        path: "/repository/category",
                        exact: true,
                        key:'category',
                        component: CategoryList,
                    },

                    {
                        path:"/repository",
                        exact: true,
                        key:'ridapitest',
                        component: ()=><Redirect to='/repository/testcase/:id'/>,
                    },
                ]
            },
            {
                path:"/plan",
                component: PlanDetailContent,
                routes: [
                    {
                        path: "/plan/case",
                        exact: true,
                        component: TestPlanBindCaseList,
                    },

                    {
                        path: "/plan/plan-detail/:id",
                        exact: true,
                        component: TestPlanDetail,
                    },
                    {
                        path: "/plan/plan-to-api-unit",
                        exact: true,
                        component: PlanToApiUnitPage,
                    },
                    {
                        path: "/plan/plan-to-api-scene",
                        exact: true,
                        component: PlanToApiScenePage,
                    },
                    {
                        path: "/plan/plan-to-api-perform",
                        exact: true,
                        component: PlanToApiPerformPage,
                    },
                    {
                        path: "/plan/plan-to-web-scene",
                        exact: true,
                        component: PlanToWebScenePage,
                    },

                    {
                        path: "/plan/plan-to-app-scene",
                        exact: true,
                        component: PlanToAppScenePage,
                    },

                    {
                        path: "/plan/plan-to-function",
                        exact: true,
                        component: PlanToFuncUnitPage,
                    },{
                        path: "/plan/instance",
                        exact: true,
                        component: TestPlanInstanceList,
                    },{
                        path: "/plan/quartz",
                        exact: true,
                        component: QuartzPlanList,
                    },{
                        path: "/plan/setting",
                        exact: true,
                        component: PlanSetting,
                    },
                    {
                        path: "/plan/:id",
                        exact: true,
                        component: TestPlanBindCaseInstanceList,
                    },
                ]
            },


            {
                path:'/setting',
                key:'systemManagement',
                component:SystemContent,
                routes:[
                    {
                        path:'/setting/home',
                        exact: true,
                        component:SystemHome,
                    },
                    //成员与部门
                    {
                        path: "/setting/orga",
                        key:'org',
                        exact: true,
                        render:(props)=> <Orga {...props} bgroup={'teston'}/>
                    },{
                        path: "/setting/user",
                        key:'user',
                        exact: true,
                        render:(props)=>{
                            return <User {...props} bgroup={'teston'}/>
                        }
                    },{
                        path: "/setting/dir",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false} bgroup={"teston"}/>,
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
                        render: () => <SystemRole group={'system'} bgroup={"teston"}/>,
                    },
                    //消息
                    {
                        path: "/setting/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"teston"}/>

                    },
                    {
                        path: "/setting/message-notice",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"teston"} />
                    },
                    {
                        path: "/setting/backups",
                        exact: true,
                        render:()=> <BackupRestore />
                    },{
                        path: "/setting/product-auth",
                        exact: true,
                        render:()=> <ProductAuth  />
                    },

                    //日志
                    {
                        path: "/setting/log",
                        key:'log',
                        exact: true,
                        render:(props)=>  <MyLog {...props} bgroup={"teston"}/>,
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
                        render: () => <SystemRole isBase={true} group={'system'} bgroup={"teston"}/>,
                    },
                    {
                        path: "/setting/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        render: () => <SystemFeature isBase={true} bgroup={"teston"}/>,
                    },
                    {
                        path: "/setting/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        render: (props) => <ProjectFeature isBase={true} {...props} bgroup={"teston"}/>,
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
                        render: (props) => <ProjectRole isBase={true} {...props} bgroup={"teston"}/>,
                    },
                    {
                        path: "/setting/messageSendTypeBase",
                        key:'messageSendTypeBase',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"teston"} isBase={true}/>
                    },
                    {
                        path: "/setting/message-notice-base",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"teston"} isBase={true}/>
                    },
                    {
                        path: "/setting/messageType",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageType bgroup={"teston"} />

                    },
                    {
                        path: "/setting/logTemplate",
                        key:'logTemplate',
                        exact: true,
                        render:(props)=>  <LogTemplate {...props} bgroup={"teston"}/>,
                    },{
                        path: "/setting/logType",
                        key:'logTemplate',
                        exact: true,
                        render:()=>  <LogType bgroup={"teston"}/>,
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
                path: "/",
                key:'tohome',
                exact: true,
                render: () => <Redirect to={"/home"}/>,
            },

            {
                path: "*",
                render: () => <Redirect to={"/404"}/>,
            },
        ]
    },
];

export default routers
