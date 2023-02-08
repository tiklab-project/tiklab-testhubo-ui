import React from 'react'

import {
    Home,
    Repository,
    RepositoryDetailPage,

    QuartzTask,

    CategoryList,
    TestPlan,

} from './modules';

import {Directory, OrgaList, UserGroup} from 'tiklab-user-ui';
import {Redirect} from "react-router";
import PortalHeader from "./modules/integration/header/portalContent";
import RepositoryDetailLayout from "./modules/repositoryDetail/repositoryDetailLayout";
import ApiUnitcaseDetail from "./modules/apitest/http/unitcase/components/apiUnitDetail";
import ApiScenecaseDetail from "./modules/apitest/http/scenecase/components/apiSceneDetail";
import FuncUnitDetail from "./modules/functest/components/funcUnitDetail";
import EnvContent from "./modules/sysmgr/environment/components/envContent";
import ApiPerformDetail from "./modules/apitest/http/performcase/components/apiPerformDetail";
import LoginOut from "./modules/integration/header/loginOut";
import WebPerformDetail from "./modules/webtest/performcase/components/webPerformDetail";
import AppPerformDetail from "./modules/apptest/performcase/components/appPerformDetail";

import WebSceneDetail from "./modules/webtest/scenecase/components/webSceneDetail";
import TestPlanDetail from "./modules/testplan/components/testPlanDetail";
import AgentConfigList from "./modules/integration/agentconfig/components/agentConfigList";
import DomainRole from "./modules/integration/domainRole/domainRole";
import DomainPrivilege from "./modules/integration/domainPrivilege/domainPrivilege";
import SystemContent from "./modules/sysmgr/system/systemContent";
import LoginContent from "./modules/integration/login/LoginContent";
import UserList from "tiklab-user-ui/lib/user-list";
import {MyTodoTask, TaskList, TodoTempList} from "tiklab-todotask-ui";
import {PluginDetail, PluginList} from "tiklab-plugin-ui";
import {MessageNotice, MessageSendType, MessageType} from "tiklab-message-ui";
import {ProjectFeatureList, ProjectRoleList, SystemFeatureList, SystemRoleList} from "tiklab-privilege-ui";
import {LogList, LogTemplateList, LogTypeList} from "tiklab-oplog-ui";
import Version from "./modules/sysmgr/version/version";
import RepositorySettingMenu from "./modules/integration/repositorySetting/repositorySettingMenu";
import DynamicDetail from "./modules/integration/home/dynamicDetail";
import TestCaseList from "./modules/testcase/components/testcaseList";
import RepositorySetting from "./modules/integration/repositorySetting/repositorySetting";
import ApiUnitInstanceList from "./modules/apitest/http/unitcase/components/apiUnitInstanceList";
import ApiSceneInstanceList from "./modules/apitest/http/scenecase/components/apiSceneInstanceList";
import ApiPerfInstanceList from "./modules/apitest/http/performcase/components/apiPerfInstanceList";
import WebSceneInstanceList from "./modules/webtest/scenecase/components/webSceneInstanceList";
import WebPerfInstanceList from "./modules/webtest/performcase/components/webPerfInstanceList";
import AppSceneInstanceList from "./modules/apptest/scenecase/components/appSceneInstanceList";
import AppPerfInstanceList from "./modules/apptest/performcase/components/appPerfInstanceList";
import TestPlanInstanceList from "./modules/testplan/components/testPlanInstanceList";
import AppSceneDetail from "./modules/apptest/scenecase/components/appSceneDetail";
import TestPlanBindCaseInstanceList from "./modules/testplan/components/testPlanBindCaseInstanceList";
import TestReportList from "./modules/testreport/testReportList";
import TestReportDetail from "./modules/testreport/testReportDetail";



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
        component: PortalHeader,
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
                    },{
                        path: "/repository/api-scene-instance",
                        component: ApiSceneInstanceList,
                    },
                    {
                        path: "/repository/api-perform-detail",
                        component: ApiPerformDetail,
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
                        render:(props)=> <OrgaList {...props} bgroup={'teston'}/>
                    },{
                        path: "/systemManagement/user",
                        key:'user',
                        exact: true,
                        render:(props)=>{
                            return <UserList {...props} bgroup={'teston'}/>
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
                        render: () => <SystemRoleList group={'system'} bgroup={"teston"}/>,
                    },
                    //消息
                    {
                        path: "/systemManagement/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        render:()=> <MessageNotice bgroup={"teston"}/>

                    },
                    {
                        path: "/systemManagement/message-notice",
                        key:'MessageType',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"teston"} />
                    },
                    //代办
                    {
                        path: "/systemManagement/myTodo",
                        key:'myTodo',
                        exact: true,
                        render:(props)=> <MyTodoTask {...props} bgroup={"teston"}/>
                    },
                    //插件
                    {
                        path: "/systemManagement/plugin",
                        key:'plugin',
                        render:(props)=> <PluginList {...props}  detailRouter={"/systemManagement/plugindetail"}/>,
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
                        render:(props)=>  <LogList {...props} bgroup={"teston"}/>,
                    },
                    //版本
                    {
                        path: "/systemManagement/version",
                        key:'version',
                        exact: true,
                        component:Version

                    },
                    {
                        path: "/systemManagement/baseSystemRole",
                        exact: true,
                        render: () => <SystemRoleList isBase={true} group={'system'} bgroup={"postin"}/>,
                    },
                    {
                        path: "/systemManagement/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        render: () => <SystemFeatureList bgroup={"teston"}/>,
                    },
                    {
                        path: "/systemManagement/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        render: (props) => <ProjectFeatureList {...props} bgroup={"teston"}/>,
                    },
                    {
                        path: "/systemManagement/role",
                        key:'ProjectRole',
                        exact: true,
                        render: (props) => <ProjectRoleList isBase={true} {...props} bgroup={"teston"}/>,
                    },
                    {
                        path: "/systemManagement/messageSendTypeBase",
                        key:'messageSendTypeBase',
                        exact: true,
                        render:()=> <MessageSendType bgroup={"teston"} isBase={true}/>
                    },
                    // {
                    //     path: "/systemManagement/messageManagement",
                    //     key:'MessageManagement',
                    //     exact: true,
                    //     render:()=> <MessageManagement bgroup={"teston"}/>
                    // },
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
                        render:(props)=>  <LogTemplateList {...props} bgroup={"teston"}/>,
                    },{
                        path: "/systemManagement/logType",
                        key:'logTemplate',
                        exact: true,
                        render:()=>  <LogTypeList bgroup={"teston"}/>,
                    },{
                        path: "/systemManagement/taskList",
                        key:'todo',
                        exact: true,
                        render:(props)=> <TaskList {...props} bgroup={"teston"}/>,
                    },{
                        path: "/systemManagement/todoTemp",
                        key:'todoTemp',
                        exact: true,
                        render:(props)=> <TodoTempList {...props} bgroup={"teston"}/>,
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
