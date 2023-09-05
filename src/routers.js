import React, {Component} from 'react'
import {Redirect} from "react-router";

const LazyComponent =  (importComponent) =>{
    class LazyComponent extends Component{
        constructor(props) {
            super(props);
            this.state = {
                component: null,
            };
        }
        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component
            });
        }

        render() {
            const C =  this.state.component;
            return C && <C {...this.props} />
        }

    }
    return LazyComponent;
}


//---平台
import {Directory, Orga, UserGroup, User,} from "tiklab-user-ui";
import { NotFound, ProjectFeature, ProjectRole, SystemFeature, SystemRole} from "tiklab-privilege-ui"
import {ExcludeProductUser} from "tiklab-eam-ui";
import {LogTemplate, LogType, MyLog} from "tiklab-security-ui";
import {PluginDetail, Plugin} from "tiklab-plugin-manager-ui";
import {MessageNotice, MessageSendType, MessageType} from "tiklab-message-ui";

//---内部
let Home = LazyComponent(() => import("./home/Home"));
let Repository = LazyComponent(() => import("./repository/repository/components/Repository"));
let RepositoryDetailPage = LazyComponent(() => import("./repository/overview/RepositoryOverView"));
let CategoryList = LazyComponent(() => import("./category/components/CategoryList"));
let TestPlan = LazyComponent(() => import("./testplan/components/testPlan"));
let PortalHeader = LazyComponent(() => import("./home/header/PortalContent"));
let RepositoryDetailLayout = LazyComponent(() => import("./repository/common/RepositoryDetailLayout"));
let ApiUnitcaseDetail = LazyComponent(() => import("./test/api/http/unit/components/apiUnitEditPage"));
let ApiScenecaseDetail = LazyComponent(() => import("./test/api/http/scene/components/apiScenePage"));
let FuncUnitDetail = LazyComponent(() => import("./test/function/components/FunctionContent"));
let EnvContent = LazyComponent(() => import("./support/environment/components/envContent"));
let ApiPerformDetail = LazyComponent(() => import("./test/api/http/perf/components/apiPerformDetail"));
let LoginOut = LazyComponent(() => import("./home/header/LoginOut"));
let WebPerformDetail = LazyComponent(() => import("./test/web/perf/components/webPerformDetail"));
let AppPerformDetail = LazyComponent(() => import("./test/app/perf/components/appPerformDetail"));
let WebExecuteTestPage = LazyComponent(() =>import( "./test/web/scene/components/WebExecuteTestPage"));
let AppExecuteTestPage = LazyComponent(() =>import("./test/app/scene/components/AppExecuteTestPage"));
let WebSceneContent = LazyComponent(() => import("./test/web/scene/components/WebSceneContent"));
let TestPlanDetail = LazyComponent(() => import("./testplan/components/testPlanDetail"));
let AgentConfigList = LazyComponent(() => import("./support/agent/components/AgentConfigList"));
let DomainRole = LazyComponent(() => import("./repository/setting/DomainRole"));
let DomainPrivilege = LazyComponent(() => import("./repository/setting/DomainPrivilege"));
let SystemContent = LazyComponent(() => import("./setting/system/SystemContent"));
let LoginContent = LazyComponent(() => import("./login/LoginContent"));
let Version = LazyComponent(() => import("./setting/version/Version"));
let RepositorySettingMenu = LazyComponent(() => import("./repository/setting/RepositorySettingMenu"));
let TestCaseTable = LazyComponent(() => import("./test/testcase/components/TestCaseTable"));
let RepositorySetting = LazyComponent(() => import("./repository/setting/RepositorySetting"));
let ApiUnitInstanceList = LazyComponent(() => import("./test/api/http/unit/components/apiUnitInstanceList"));
let ApiSceneInstanceList = LazyComponent(() => import("./test/api/http/scene/components/apiSceneInstanceList"));
let ApiPerfInstanceList = LazyComponent(() => import("./test/api/http/perf/components/apiPerfInstanceList"));
let WebSceneInstanceList = LazyComponent(() => import("./test/web/scene/components/webSceneInstanceList"));
let WebPerfInstanceList = LazyComponent(() => import("./test/web/perf/components/webPerfInstanceList"));
let AppSceneInstanceList = LazyComponent(() => import("./test/app/scene/components/appSceneInstanceList"));
let AppPerfInstanceList = LazyComponent(() => import("./test/app/perf/components/appPerfInstanceList"));
let TestPlanInstanceList = LazyComponent(() => import("./testplan/components/testPlanInstanceList"));
let AppSceneDetail = LazyComponent(() => import("./test/app/scene/components/appSceneDetail"));
let TestPlanBindCaseInstanceList = LazyComponent(() => import("./testplan/components/testPlanBindCaseInstanceList"));
let TestReportList = LazyComponent(() => import("./testreport/testReportList"));
let TestReportDetail = LazyComponent(() => import("./testreport/testReportDetail"));
let ApiSceneToUnitPage = LazyComponent(() => import("./test/api/http/scene/components/apiSceneToUnitPage"));
let ApiPerformToScenePage = LazyComponent(() => import("./test/api/http/perf/components/apiPerformToScenePage"));
let WebPerformToScenePage = LazyComponent(() => import("./test/web/perf/components/webPerformToScenePage"));
let AppPerformToScenePage = LazyComponent(() => import("./test/app/perf/components/appPerformToScenePage"));
let PlanToApiUnitPage = LazyComponent(() => import("./testplan/components/planToCase/planToApiUnitPage"));
let PlanToApiScenePage = LazyComponent(() => import("./testplan/components/planToCase/planToApiScenePage"));
let PlanToApiPerformPage = LazyComponent(() => import("./testplan/components/planToCase/planToApiPerformPage"));
let PlanToWebScenePage = LazyComponent(() => import("./testplan/components/planToCase/planToWebScenePage"));
let planToWebPerformPage = LazyComponent(() => import("./testplan/components/planToCase/planToWebPerformPage"));
let PlanToFuncUnitPage = LazyComponent(() => import("./testplan/components/planToCase/planToFuncUnitPage"));
let PlanToAppPerformPage = LazyComponent(() => import("./testplan/components/planToCase/planToAppPerformPage"));
let PlanToAppScenePage = LazyComponent(() => import("./testplan/components/planToCase/planToAppScenePage"));
let RepositoryEdit = LazyComponent(() => import("./repository/repository/components/RepositoryEdit"));
let WorkspaceBindList = LazyComponent(() => import("./integrated/postin/common/integratedPage"));


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
                    },
                    {
                        path: "/repository/testcase",
                        component: TestCaseTable,
                        routes:[
                            {
                                path: "/repository/testcase/api-unit/:id",
                                component: ApiUnitcaseDetail,
                            },
                            {
                                path: "/repository/testcase/api-unit-instance",
                                component: ApiUnitInstanceList,
                            },
                            {
                                path: "/repository/testcase/api-scene/:id",
                                component: ApiScenecaseDetail,
                            },
                            {
                                path: "/repository/testcase/api-scene-to-unit",
                                component: ApiSceneToUnitPage,
                            },
                            {
                                path: "/repository/testcase/api-scene-instance",
                                component: ApiSceneInstanceList,
                            },
                            {
                                path: "/repository/testcase/api-perform/:id",
                                component: ApiPerformDetail,
                            },
                            {
                                path: "/repository/testcase/api-perform-to-scene",
                                component: ApiPerformToScenePage ,
                            },
                            {
                                path: "/repository/testcase/api-perform-instance",
                                component: ApiPerfInstanceList,
                            },

                            {
                                path: "/repository/testcase/web-scene/:id",
                                component: WebSceneContent,
                            },{
                                path: "/repository/testcase/web-scene-instance",
                                component: WebSceneInstanceList,
                            },
                            //WebExecuteTestPage表格视图使用
                            {
                                path: "/repository/testcase/web-scene-execute",
                                component: WebExecuteTestPage,
                            },
                            {
                                path: "/repository/testcase/web-perform/:id",
                                component:WebPerformDetail,
                            },
                            {
                                path: "/repository/testcase/web-perform-to-scene",
                                component: WebPerformToScenePage ,
                            },
                            {
                                path: "/repository/testcase/web-perform-instance",
                                component: WebPerfInstanceList,
                            },

                            {
                                path: "/repository/testcase/app-scene/:id",
                                component: AppSceneDetail,
                            },
                            {
                                path: "/repository/testcase/app-scene-instance",
                                component: AppSceneInstanceList,
                            },
                            //WebExecuteTestPage表格视图使用
                            {
                                path: "/repository/testcase/app-scene-execute",
                                component: AppExecuteTestPage,
                            },
                            {
                                path: "/repository/testcase/app-perform/:id",
                                component:AppPerformDetail,
                            },
                            {
                                path: "/repository/testcase/app-perform-to-scene",
                                component: AppPerformToScenePage ,
                            },
                            {
                                path: "/repository/testcase/app-perform-instance",
                                component: AppPerfInstanceList,
                            },

                            {
                                path: "/repository/testcase/function/:id",
                                exact: true,
                                component: FuncUnitDetail,
                            },
                            // {
                            //     path:"/repository/testcase",
                            //     exact: true,
                            //     component: ()=><Redirect to='/repository/testcase/list'/>,
                            // },
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
