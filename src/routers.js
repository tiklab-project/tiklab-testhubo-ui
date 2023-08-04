import React, {lazy} from 'react'
import {Redirect} from "react-router";

//---平台
import {Directory, Orga, UserGroup, User,} from "tiklab-user-ui";
import { NotFound, ProjectFeature, ProjectRole, SystemFeature, SystemRole} from "tiklab-privilege-ui"
import {ExcludeProductUser} from "tiklab-eam-ui";
import {LogTemplate, LogType, MyLog} from "tiklab-security-ui";
import {PluginDetail, Plugin} from "tiklab-plugin-manager-ui";
import {MessageNotice, MessageSendType, MessageType} from "tiklab-message-ui";

//---内部
let Home = lazy(() => import("./home/Home"));
let Repository = lazy(() => import("./repository/repository/components/Repository"));
let RepositoryDetailPage = lazy(() => import("./repository/overview/RepositoryOverView"));
let CategoryList = lazy(() => import("./category/components/CategoryList"));
let TestPlan = lazy(() => import("./testplan/components/testPlan"));
let PortalHeader = lazy(() => import("./home/header/PortalContent"));
let RepositoryDetailLayout = lazy(() => import("./repository/common/RepositoryDetailLayout"));
let ApiUnitcaseDetail = lazy(() => import("./test/api/http/unit/components/apiUnitEditPage"));
let ApiScenecaseDetail = lazy(() => import("./test/api/http/scene/components/apiScenePage"));
let FuncUnitDetail = lazy(() => import("./test/function/components/funcUnitDetail"));
let EnvContent = lazy(() => import("./support/environment/components/envContent"));
let ApiPerformDetail = lazy(() => import("./test/api/http/perf/components/apiPerformDetail"));
let LoginOut = lazy(() => import("./home/header/LoginOut"));
let WebPerformDetail = lazy(() => import("./test/web/perf/components/webPerformDetail"));
let AppPerformDetail = lazy(() => import("./test/app/perf/components/appPerformDetail"));

let WebSceneDetail = lazy(() => import("./test/web/scene/components/webSceneDetail"));
let TestPlanDetail = lazy(() => import("./testplan/components/testPlanDetail"));
let AgentConfigList = lazy(() => import("./support/agent/components/AgentConfigList"));
let DomainRole = lazy(() => import("./repository/setting/DomainRole"));
let DomainPrivilege = lazy(() => import("./repository/setting/DomainPrivilege"));
let SystemContent = lazy(() => import("./setting/system/SystemContent"));
let LoginContent = lazy(() => import("./login/LoginContent"));
let Version = lazy(() => import("./setting/version/Version"));
let RepositorySettingMenu = lazy(() => import("./repository/setting/RepositorySettingMenu"));
let TestCaseList = lazy(() => import("./test/testcase/components/testcaseList"));
let RepositorySetting = lazy(() => import("./repository/setting/RepositorySetting"));
let ApiUnitInstanceList = lazy(() => import("./test/api/http/unit/components/apiUnitInstanceList"));
let ApiSceneInstanceList = lazy(() => import("./test/api/http/scene/components/apiSceneInstanceList"));
let ApiPerfInstanceList = lazy(() => import("./test/api/http/perf/components/apiPerfInstanceList"));
let WebSceneInstanceList = lazy(() => import("./test/web/scene/components/webSceneInstanceList"));
let WebPerfInstanceList = lazy(() => import("./test/web/perf/components/webPerfInstanceList"));
let AppSceneInstanceList = lazy(() => import("./test/app/scene/components/appSceneInstanceList"));
let AppPerfInstanceList = lazy(() => import("./test/app/perf/components/appPerfInstanceList"));
let TestPlanInstanceList = lazy(() => import("./testplan/components/testPlanInstanceList"));
let AppSceneDetail = lazy(() => import("./test/app/scene/components/appSceneDetail"));
let TestPlanBindCaseInstanceList = lazy(() => import("./testplan/components/testPlanBindCaseInstanceList"));
let TestReportList = lazy(() => import("./testreport/testReportList"));
let TestReportDetail = lazy(() => import("./testreport/testReportDetail"));
let ApiSceneToUnitPage = lazy(() => import("./test/api/http/scene/components/apiSceneToUnitPage"));
let ApiPerformToScenePage = lazy(() => import("./test/api/http/perf/components/apiPerformToScenePage"));
let WebPerformToScenePage = lazy(() => import("./test/web/perf/components/webPerformToScenePage"));
let AppPerformToScenePage = lazy(() => import("./test/app/perf/components/appPerformToScenePage"));
let PlanToApiUnitPage = lazy(() => import("./testplan/components/planToCase/planToApiUnitPage"));
let PlanToApiScenePage = lazy(() => import("./testplan/components/planToCase/planToApiScenePage"));
let PlanToApiPerformPage = lazy(() => import("./testplan/components/planToCase/planToApiPerformPage"));
let PlanToWebScenePage = lazy(() => import("./testplan/components/planToCase/planToWebScenePage"));
let planToWebPerformPage = lazy(() => import("./testplan/components/planToCase/planToWebPerformPage"));
let PlanToFuncUnitPage = lazy(() => import("./testplan/components/planToCase/planToFuncUnitPage"));
let PlanToAppPerformPage = lazy(() => import("./testplan/components/planToCase/planToAppPerformPage"));
let PlanToAppScenePage = lazy(() => import("./testplan/components/planToCase/planToAppScenePage"));
let RepositoryEdit = lazy(() => import("./repository/repository/components/RepositoryEdit"));
let WorkspaceBindList = lazy(() => import("./integrated/postin/common/integratedPage"));


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
        path:"/index/404",
        render:(props)=>{
            return <NotFound {...props}/>
        }
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
                path: "/repository-page",
                component: Repository,
                key:'repository'
            },
            {
                path: "/repository-edit",
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
                    }, {
                        path: "/repository/testcase",
                        component: TestCaseList,
                    },
                    {
                        path: "/repository/api-unit/:id",
                        component: ApiUnitcaseDetail,
                    },
                    {
                        path: "/repository/api-unit-instance",
                        component: ApiUnitInstanceList,
                    },
                    {
                        path: "/repository/api-scene/:id",
                        component: ApiScenecaseDetail,
                    },
                    {
                        path: "/repository/api-scene-to-unit",
                        component: ApiSceneToUnitPage,
                    },
                    {
                        path: "/repository/api-scene-instance",
                        component: ApiSceneInstanceList,
                    },
                    {
                        path: "/repository/api-perform/:id",
                        component: ApiPerformDetail,
                    },
                    {
                        path: "/repository/api-perform-to-scene",
                        component: ApiPerformToScenePage ,
                    },
                    {
                        path: "/repository/api-perform-instance",
                        component: ApiPerfInstanceList,
                    },

                    {
                        path: "/repository/web-scene/:id",
                        component: WebSceneDetail,
                    },{
                        path: "/repository/web-scene-instance",
                        component: WebSceneInstanceList,
                    },
                    {
                        path: "/repository/web-perform/:id",
                        component:WebPerformDetail,
                    },
                    {
                        path: "/repository/web-perform-to-scene",
                        component: WebPerformToScenePage ,
                    },
                    {
                        path: "/repository/web-perform-instance",
                        component: WebPerfInstanceList,
                    },

                    {
                        path: "/repository/app-scene/:id",
                        component: AppSceneDetail,
                    },
                    {
                        path: "/repository/app-scene-instance",
                        component: AppSceneInstanceList,
                    },
                    {
                        path: "/repository/app-perform/:id",
                        component:AppPerformDetail,
                    },
                    {
                        path: "/repository/app-perform-to-scene",
                        component: AppPerformToScenePage ,
                    },
                    {
                        path: "/repository/app-perform-instance",
                        component: AppPerfInstanceList,
                    },

                    {
                        path: "/repository/function/:id",
                        component: FuncUnitDetail,
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
                                path: "/repository/setting/agent",
                                key:'agent',
                                exact: true,
                                component: AgentConfigList
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
                        path: "/repository/plan",
                        key:'TestPlan',
                        exact: true,
                        component: TestPlan,
                    },
                    {
                        path: "/repository/plan/:id",
                        exact: true,
                        component: TestPlanDetail,
                    },
                    {
                        path: "/repository/plan-instance",
                        exact: true,
                        component: TestPlanInstanceList,
                    },
                    {
                        path: "/repository/plan-instance-case",
                        exact: true,
                        component: TestPlanBindCaseInstanceList,
                    },
                    {
                        path: "/repository/plan-api-unit",
                        exact: true,
                        component: PlanToApiUnitPage,
                    },
                    {
                        path: "/repository/plan-api-scene",
                        exact: true,
                        component: PlanToApiScenePage,
                    },
                    {
                        path: "/repository/plan-api-perform",
                        exact: true,
                        component: PlanToApiPerformPage,
                    },
                    {
                        path: "/repository/plan-web-scene",
                        exact: true,
                        component: PlanToWebScenePage,
                    },
                    {
                        path: "/repository/plan-web-perform",
                        exact: true,
                        component: planToWebPerformPage,
                    },
                    {
                        path: "/repository/plan-app-scene",
                        exact: true,
                        component: PlanToAppScenePage,
                    },
                    {
                        path: "/repository/plan-app-perform",
                        exact: true,
                        component: PlanToAppPerformPage,
                    },
                    {
                        path: "/repository/plan-function",
                        exact: true,
                        component: PlanToFuncUnitPage,
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
                        path:"/repository",
                        exact: true,
                        key:'ridapitest',
                        component: ()=><Redirect to='/repository/detail'/>,
                    },
                ]
            },
            {
                path:'/systemManagement',
                key:'systemManagement',
                component:SystemContent,
                routes:[
                    //成员与部门
                    {
                        path: "/systemManagement/org",
                        key:'org',
                        exact: true,
                        render:(props)=> <Orga {...props} bgroup={'teston'}/>
                    },{
                        path: "/systemManagement/user",
                        key:'user',
                        exact: true,
                        render:(props)=>{
                            return <User {...props} bgroup={'teston'}/>
                        }
                    },{
                        path: "/systemManagement/authConfig",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false}/>,
                    },{
                        path: "/systemManagement/userGroup",
                        key:'authConfig',
                        exact: true,
                        render: () => <UserGroup />,
                    },
                    //权限
                    {
                        path: "/systemManagement/systemRole",
                        key:'SystemRole',
                        render: () => <SystemRole group={'system'} bgroup={"teston"}/>,
                    },
                    //消息
                    {
                        path: "/systemManagement/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"teston"}/>

                    },
                    {
                        path: "/systemManagement/message-notice",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"teston"} />
                    },
                    //代办
                    // {
                    //     path: "/systemManagement/myTodo",
                    //     key:'myTodo',
                    //     exact: true,
                    //     render:(props)=> <MyTodoTask {...props} bgroup={"teston"}/>
                    // },
                    //插件
                    {
                        path: "/systemManagement/plugin",
                        key:'plugin',
                        render:(props)=> <Plugin {...props}  detailRouter={"/systemManagement/plugindetail"}/>,
                    },
                    {
                        path: "/systemManagement/plugindetail",
                        key:'plugindetail',
                        exact: true,
                        render:()=> <PluginDetail  pluginsRoute={"/systemManagement/plugin"}/>,
                    },
                    //日志
                    {
                        path: "/systemManagement/log",
                        key:'log',
                        exact: true,
                        render:(props)=>  <MyLog {...props} bgroup={"teston"}/>,
                    },
                    //版本
                    {
                        path: "/systemManagement/version",
                        key:'version',
                        exact: true,
                        component:Version
                    },
                    //产品授权
                    // {
                    //     path: "/systemManagement/product",
                    //     key:'version',
                    //     exact: true,
                    //     render:(props)=><ProductAuth />
                    // },


                    {
                        path: "/systemManagement/baseSystemRole",
                        exact: true,
                        render: () => <SystemRole isBase={true} group={'system'} bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        render: () => <SystemFeature isBase={true} bgroup={"teston"}/>,
                    },
                    {
                        path: "/systemManagement/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        render: (props) => <ProjectFeature isBase={true} {...props} bgroup={"teston"}/>,
                    },
                    {
                        path: "/systemManagement/role",
                        key:'ProjectRole',
                        exact: true,
                        render: (props) => <ProjectRole isBase={true} {...props} bgroup={"teston"}/>,
                    },
                    {
                        path: "/systemManagement/messageSendTypeBase",
                        key:'messageSendTypeBase',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"teston"} isBase={true}/>
                    },
                    {
                        path: "/systemManagement/message-notice-base",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"teston"} isBase={true}/>
                    },
                    {
                        path: "/systemManagement/messageType",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageType bgroup={"teston"} />

                    },
                    {
                        path: "/systemManagement/logTemplate",
                        key:'logTemplate',
                        exact: true,
                        render:(props)=>  <LogTemplate {...props} bgroup={"teston"}/>,
                    },{
                        path: "/systemManagement/logType",
                        key:'logTemplate',
                        exact: true,
                        render:()=>  <LogType bgroup={"teston"}/>,
                    },
                    {
                        path:"/systemManagement",
                        exact: true,
                        key:'ridenvtest',
                        component: ()=><Redirect to='/systemManagement/systemRole'/>,
                    },
                ]
            },
            {
                path: "/",
                key:'tohome',
                exact: true,
                render: () => <Redirect to={"/home"}/>,
            },
        ]
    },



  ];

export default routers
