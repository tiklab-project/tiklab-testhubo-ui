import React from 'react'

import {Directory, Orga, UserGroup, User,} from "tiklab-user-ui";
import { NotFound, ProjectFeature, ProjectRole, SystemFeature, SystemRole} from "tiklab-privilege-ui"

import {ExcludeProductUser} from "tiklab-eam-ui";
import {ProductAuth} from "tiklab-licence-ui"
import {LogTemplate, LogType, MyLog} from "tiklab-security-ui";
import {PluginDetail, Plugin} from "tiklab-plugin-manager-ui";
import {MessageNotice, MessageSendType, MessageType} from "tiklab-message-ui";

import {
    Home,
    Repository,
    RepositoryDetailPage,

    CategoryList,
    TestPlan,

} from './container';

import {Redirect} from "react-router";
import PortalHeader from "./common/header/PortalContent";
import RepositoryDetailLayout from "./repository/common/RepositoryDetailLayout";
import ApiUnitcaseDetail from "./test/api/http/unit/components/apiUnitEditPage";
import ApiScenecaseDetail from "./test/api/http/scene/components/apiScenePage";
import FuncUnitDetail from "./test/function/components/funcUnitDetail";
import EnvContent from "./support/environment/components/envContent";
import ApiPerformDetail from "./test/api/http/perf/components/apiPerformDetail";
import LoginOut from "./common/header/LoginOut";
import WebPerformDetail from "./test/web/perf/components/webPerformDetail";
import AppPerformDetail from "./test/app/perf/components/appPerformDetail";

import WebSceneDetail from "./test/web/scene/components/webSceneDetail";
import TestPlanDetail from "./testplan/components/testPlanDetail";
import AgentConfigList from "./support/agent/components/AgentConfigList";
import DomainRole from "./repository/setting/DomainRole";
import DomainPrivilege from "./repository/setting/DomainPrivilege";
import SystemContent from "./setting/system/SystemContent";
import LoginContent from "./login/LoginContent";
import Version from "./setting/version/Version";
import RepositorySettingMenu from "./repository/setting/RepositorySettingMenu";
import DynamicDetail from "./home/DynamicDetail";
import TestCaseList from "./test/testcase/components/testcaseList";
import RepositorySetting from "./repository/setting/RepositorySetting";
import ApiUnitInstanceList from "./test/api/http/unit/components/apiUnitInstanceList";
import ApiSceneInstanceList from "./test/api/http/scene/components/apiSceneInstanceList";
import ApiPerfInstanceList from "./test/api/http/perf/components/apiPerfInstanceList";
import WebSceneInstanceList from "./test/web/scene/components/webSceneInstanceList";
import WebPerfInstanceList from "./test/web/perf/components/webPerfInstanceList";
import AppSceneInstanceList from "./test/app/scene/components/appSceneInstanceList";
import AppPerfInstanceList from "./test/app/perf/components/appPerfInstanceList";
import TestPlanInstanceList from "./testplan/components/testPlanInstanceList";
import AppSceneDetail from "./test/app/scene/components/appSceneDetail";
import TestPlanBindCaseInstanceList from "./testplan/components/testPlanBindCaseInstanceList";
import TestReportList from "./testreport/testReportList";
import TestReportDetail from "./testreport/testReportDetail";
import ApiSceneToUnitPage from "./test/api/http/scene/components/apiSceneToUnitPage";
import ApiPerformToScenePage from "./test/api/http/perf/components/apiPerformToScenePage";
import WebPerformToScenePage from "./test/web/perf/components/webPerformToScenePage";
import AppPerformToScenePage from "./test/app/perf/components/appPerformToScenePage";
import PlanToApiUnitPage from "./testplan/components/planToCase/planToApiUnitPage";
import PlanToApiScenePage from "./testplan/components/planToCase/planToApiScenePage";
import PlanToApiPerformPage from "./testplan/components/planToCase/planToApiPerformPage";
import PlanToWebScenePage from "./testplan/components/planToCase/planToWebScenePage";
import planToWebPerformPage from "./testplan/components/planToCase/planToWebPerformPage";
import PlanToFuncUnitPage from "./testplan/components/planToCase/planToFuncUnitPage";
import PlanToAppPerformPage from "./testplan/components/planToCase/planToAppPerformPage";
import PlanToAppScenePage from "./testplan/components/planToCase/planToAppScenePage";



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
                path: "/dynamic",
                component: DynamicDetail,
                exact: true,
                key:'DynamicDetail',
            },
            {
                path: "/repository-page",
                component: Repository,
                key:'repository'
            },

            {
                path:'/repository',
                component:RepositoryDetailLayout,
                routes:[
                    {
                        path: "/repository/detail",
                        exact: true,
                        component: RepositoryDetailPage,
                    }, {
                        path: "/repository/testcase",
                        component: TestCaseList,
                    },
                    {
                        path: "/repository/api-unit-detail",
                        component: ApiUnitcaseDetail,
                    },
                    {
                        path: "/repository/api-unit-instance",
                        component: ApiUnitInstanceList,
                    },
                    {
                        path: "/repository/api-scene-detail",
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
                        path: "/repository/api-perform-detail",
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
                        path: "/repository/web-scene-detail",
                        component: WebSceneDetail,
                    },{
                        path: "/repository/web-scene-instance",
                        component: WebSceneInstanceList,
                    },
                    {
                        path: "/repository/web-perform-detail",
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
                        path: "/repository/app-scene-detail",
                        component: AppSceneDetail,
                    },
                    {
                        path: "/repository/app-scene-instance",
                        component: AppSceneInstanceList,
                    },
                    {
                        path: "/repository/app-perform-detail",
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
                        path: "/repository/function-detail",
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
                        path: "/repository/plan-detail",
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
                        path: "/repository/report-detail",
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
                    {
                        path: "/systemManagement/product",
                        key:'version',
                        exact: true,
                        render:(props)=><ProductAuth />
                    },


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
