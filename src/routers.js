
import React from 'react'

import {
    Home,
    Repository,
    RepositoryList,
    RepositoryDetailPage,

    QuartzTask,


    CategoryList,
    TestPlan,

} from './modules';

import {Directory, OrgaList, UserGroup} from 'tiklab-user-ui';
import {Redirect} from "react-router";
import PortalHeader from "./modules/header/portalContent";
import RepositoryDetailLayout from "./modules/repositoryDetail/repositoryDetailLayout";
import ApiUnitList from "./modules/apitest/http/unitcase/components/apiUnitList";
import ApiScenecaseList from "./modules/apitest/http/scenecase/components/apiSceneList";
import ApiPerformList from "./modules/apitest/http/performcase/components/apiPerfList";
import ApiContant from "./modules/apitest/http/apitest/apiContant";
import WebContant from "./modules/webtest/webtest/webContant";
import FuncContant from "./modules/functest/functest/funcContant";
import AppContant from "./modules/apptest/apptest/appContant";
import AppUnitList from "./modules/apptest/unitcase/components/appUnitList";
import WebPerformList from "./modules/webtest/performcase/components/webPerformList";
import WebUnitList from "./modules/webtest/unitcase/components/webUnitList";
import WebSceneList from "./modules/webtest/scenecase/components/webSceneList";
import AppSceneList from "./modules/apptest/scenecase/components/appSceneList";
import AppPerformList from "./modules/apptest/performcase/components/appPerformList";
import FuncUnitList from "./modules/functest/unitcase/components/funcUnitList";
import FuncSceneList from "./modules/functest/scenecase/components/funcSceneList";
import ApiUnitcaseDetail from "./modules/apitest/http/unitcase/components/apiUnitDetail";
import ApiUnitcaseInstance from "./modules/apitest/http/unitcase/components/apiUnitInstance";
import ApiScenecaseDetail from "./modules/apitest/http/scenecase/components/apiSceneDetail";
import ApiSceneInstance from "./modules/apitest/http/scenecase/components/apiSceneInstance";
import ApiPerformInstance from "./modules/apitest/http/performcase/components/apiPerfInstance";
import ApiPerfomDetailContant from "./modules/apitest/http/performcase/components/apiPerfomDetailContant";
import FuncUnitDetail from "./modules/functest/unitcase/components/funcUnitDetail";
import FuncSceneDetail from "./modules/functest/scenecase/components/funcSceneDetail";
import WebSceneInstance from "./modules/webtest/scenecase/components/webSceneInstance";
import WebPerformDetailContant from "./modules/webtest/performcase/components/webPerformDetailContant";
import WebPerformInstance from "./modules/webtest/performcase/components/webPerformInstance";
import AppSceneDetailContant from "./modules/apptest/scenecase/components/appSceneDetailContant";
import AppSceneInstance from "./modules/apptest/scenecase/components/appSceneInstance";
import AppPerformDetailContant from "./modules/apptest/performcase/components/appPerformDetailContant";
import AppPerformInstance from "./modules/apptest/performcase/components/appPerformInstance";
import EnvContant from "./modules/sysmgr/environment/components/envContant";
import ApiPerformDetail from "./modules/apitest/http/performcase/components/apiPerformDetail";
import ApiPerformTest from "./modules/apitest/http/performcase/components/apiPerformTest";
import LoginOut from "./modules/header/loginOut";
import WebPerformDetail from "./modules/webtest/performcase/components/webPerformDetail";
import WebPerformTest from "./modules/webtest/performcase/components/webPerformTest";
import AppPerformDetail from "./modules/apptest/performcase/components/appPerformDetail";
import AppPerformTest from "./modules/apptest/performcase/components/appPerformTest";

import WebSceneDetail from "./modules/webtest/scenecase/components/webSceneDetail";
import TestPlanDetail from "./modules/testplan/components/testPlanDetail";
import RepositoryRecent from "./modules/repository/components/repositoryRecent";
import RepositoryCreate from "./modules/repository/components/repositoryCreate";
import AgentConfigList from "./modules/integration/agentconfig/components/agentConfigList";
import DomainRole from "./modules/integration/domainRole/domainRole";
import DomainPrivilege from "./modules/integration/domainPrivilege/domainPrivilege";
import WebUnitDetail from "./modules/webtest/unitcase/components/webUnitDetail";
import AppUnitDetail from "./modules/apptest/unitcase/components/appUnitDetail";
import SystemContent from "./modules/sysmgr/system/systemContent";
import LoginContent from "./modules/login/LoginContent";
import UserList from "tiklab-user-ui/lib/user-list";
import LogList from "./modules/sysmgr/log/Log";
import {MyTodoTask, TaskList, TodoTempList} from "tiklab-todotask-ui";
import {PluginDetail, PluginList} from "tiklab-plugin-ui";
import {MessageNotice, MessageSendType, MessageType} from "tiklab-message-ui";
import {ProjectFeatureList, ProjectRoleList, SystemFeatureList, SystemRoleList} from "tiklab-privilege-ui";
import {LogTemplateList, LogTypeList} from "tiklab-oplog-ui";
import Version from "./modules/sysmgr/version/version";
import RepositorySetting from "./modules/integration/repositorySetting/repositorySetting";
import DynamicDetail from "./modules/home/dynamicDetail";
import CaseContent from "./modules/testcase/components/caseContent";
import TestCaseList from "./modules/testcase/components/testcaseList";



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
                path: "/repository",
                component: Repository,
                key:'repository',
                routes:[
                    {
                        path: `/repository/create`,
                        key:'create',
                        exact: true,
                        component: RepositoryCreate,
                    },
                    {
                        path: "/repository/all",
                        key:'projectList',
                        exact: true,
                        component: RepositoryList,
                    },
                    {
                        path: `/repository/recent`,
                        key:'recently',
                        exact: true,
                        component: RepositoryRecent,
                    },
                ]
            },

            {
                path:'/repositorypage',
                component:RepositoryDetailLayout,
                key:'RepositoryDetailLayout',
                routes:[
                    {
                        path: "/repositorypage/detail",
                        exact: true,
                        key:'detail',
                        component: RepositoryDetailPage,
                    }, {
                        path: "/repositorypage/testcase",
                        key:'apitest',
                        component: CaseContent,
                        routes:[
                            {
                                path: "/repositorypage/testcase/list",
                                key: 'apitest',
                                component: TestCaseList,
                            },
                            {
                                path: "/repositorypage/testcase/unitdetail",
                                key:'unitdetail',
                                component: ApiUnitcaseDetail,
                            },{
                                path: "/repositorypage/testcase/unitcase-instance",
                                key:'history',
                                component: ApiUnitcaseInstance,
                            },{
                                path: "/repositorypage/testcase/scenecase",
                                key:'scenecase',
                                component: ApiScenecaseList,
                            },{
                                path: "/repositorypage/testcase/scenedetail",
                                key:'unitdetail',
                                component: ApiScenecaseDetail,
                            },{
                                path: "/repositorypage/testcase/scenecase-instance",
                                key:'history',
                                component: ApiSceneInstance,
                            },{
                                path: "/repositorypage/testcase/scenestep",
                                key:'history',
                                component: ApiUnitcaseDetail,
                            },{
                                path: "/repositorypage/testcase/performcase",
                                key:'performcase',
                                component: ApiPerformList,
                            },{
                                path: "/repositorypage/testcase/performdetail",
                                key:'performcase',
                                component: ApiPerfomDetailContant,
                                routes:[
                                    {
                                        path: "/repositorypage/testcase/performdetail/config",
                                        key:'config',
                                        component:ApiPerformDetail,
                                    },
                                    {
                                        path: "/repositorypage/testcase/performdetail/test",
                                        key:'config',
                                        component:ApiPerformTest,
                                    },
                                    {
                                        path:"/repositorypage/testcase/performdetail",
                                        exact: true,
                                        key:'ridperformdetail',
                                        component: ()=><Redirect to='/repositorypage/testcase/performdetail/config'/>,
                                    },
                                ]
                            },{
                                path: "/repositorypage/testcase/perform-instance",
                                key:'history',
                                component: ApiPerformInstance,
                            },

                            {
                                path: "/repositorypage/testcase/unitdetail",
                                key:'unitcase',
                                component: WebUnitDetail,
                            }, {
                                path: "/repositorypage/testcase/scenecase",
                                key:'scenecase',
                                component: WebSceneList,
                            },{
                                path: "/repositorypage/testcase/scenedetail",
                                key:'scenecase',
                                component: WebSceneDetail,
                            },{
                                path: "/repositorypage/testcase/scenecase-instance",
                                key:'scenecase',
                                component: WebSceneInstance,
                            },{
                                path: "/repositorypage/testcase/performcase",
                                key:'performcase',
                                component: WebPerformList,
                            },{
                                path: "/repositorypage/testcase/performdetail",
                                key:'performcase',
                                component: WebPerformDetailContant,
                                routes:[
                                    {
                                        path: "/repositorypage/testcase/performdetail/config",
                                        key:'config',
                                        component:WebPerformDetail,
                                    },
                                    {
                                        path: "/repositorypage/testcase/performdetail/test",
                                        key:'config',
                                        component:WebPerformTest,
                                    },
                                    {
                                        path:"/repositorypage/testcase/performdetail",
                                        exact: true,
                                        key:'ridperformdetail',
                                        component: ()=><Redirect to='/repositorypage/testcase/performdetail/config'/>,
                                    },
                                ]
                            },{
                                path: "/repositorypage/testcase/perform-instance",
                                key:'performcase',
                                component: WebPerformInstance,
                            },

                            {
                                path: "/repositorypage/testcase/unitdetail",
                                key:'unitcase',
                                component: AppUnitDetail,
                            },{
                                path: "/repositorypage/testcase/scenecase",
                                key:'scenecase',
                                component: AppSceneList,
                            },{
                                path: "/repositorypage/testcase/scenedetail",
                                key:'scenecase',
                                component: AppSceneDetailContant,
                            },{
                                path: "/repositorypage/testcase/scenecase-instance",
                                key:'scenecase',
                                component: AppSceneInstance,
                            },{
                                path: "/repositorypage/testcase/performcase",
                                key:'performcase',
                                component: AppPerformList,
                            },{
                                path: "/repositorypage/testcase/performdetail",
                                key:'performcase',
                                component: AppPerformDetailContant,
                                routes:[
                                    {
                                        path: "/repositorypage/testcase/performdetail/config",
                                        key:'config',
                                        component:AppPerformDetail,
                                    },
                                    {
                                        path: "/repositorypage/testcase/performdetail/test",
                                        key:'config',
                                        component:AppPerformTest,
                                    },
                                    {
                                        path:"/repositorypage/testcase/performdetail",
                                        exact: true,
                                        key:'ridperformdetail',
                                        component: ()=><Redirect to='/repositorypage/testcase/performdetail/config'/>,
                                    },
                                ]
                            },{
                                path: "/repositorypage/testcase/perform-instance",
                                key:'performcase',
                                component: AppPerformInstance,
                            },

                            {
                                path: "/repositorypage/testcase/unitdetail",
                                key:'unitcase',
                                component: FuncUnitDetail,
                            },{
                                path: "/repositorypage/testcase/scenecase",
                                key:'scenecase',
                                component: FuncSceneList,
                            },
                            {
                                path: "/repositorypage/testcase/scenedetail",
                                key:'scenecase',
                                component: FuncSceneDetail,
                            },



                        ]
                    },
                    {
                        path: "/repositorypage/apitest",
                        key:'apitest',
                        component: ApiContant,
                        routes:[
                            {
                                path: "/repositorypage/apitest/unitcase",
                                key:'unitcase',
                                component: ApiUnitList,
                            },{
                                path: "/repositorypage/apitest/unitdetail",
                                key:'unitdetail',
                                component: ApiUnitcaseDetail,
                            },{
                                path: "/repositorypage/apitest/unitcase-instance",
                                key:'history',
                                component: ApiUnitcaseInstance,
                            },{
                                path: "/repositorypage/apitest/scenecase",
                                key:'scenecase',
                                component: ApiScenecaseList,
                            },{
                                path: "/repositorypage/apitest/scenedetail",
                                key:'unitdetail',
                                component: ApiScenecaseDetail,
                            },{
                                path: "/repositorypage/apitest/scenecase-instance",
                                key:'history',
                                component: ApiSceneInstance,
                            },{
                                path: "/repositorypage/apitest/scenestep",
                                key:'history',
                                component: ApiUnitcaseDetail,
                            },{
                                path: "/repositorypage/apitest/performcase",
                                key:'performcase',
                                component: ApiPerformList,
                            },{
                                path: "/repositorypage/apitest/performdetail",
                                key:'performcase',
                                component: ApiPerfomDetailContant,
                                routes:[
                                    {
                                        path: "/repositorypage/apitest/performdetail/config",
                                        key:'config',
                                        component:ApiPerformDetail,
                                    },
                                    {
                                        path: "/repositorypage/apitest/performdetail/test",
                                        key:'config',
                                        component:ApiPerformTest,
                                    },
                                    {
                                        path:"/repositorypage/apitest/performdetail",
                                        exact: true,
                                        key:'ridperformdetail',
                                        component: ()=><Redirect to='/repositorypage/apitest/performdetail/config'/>,
                                    },
                                ]
                            },{
                                path: "/repositorypage/apitest/perform-instance",
                                key:'history',
                                component: ApiPerformInstance,
                            },
                            // {
                            //     path:"/repositorypage/apitest",
                            //     exact: true,
                            //     key:'ridapitest',
                            //     component: ()=><Redirect to='/repositorypage/apitest/unitcase'/>,
                            // },
                        ]
                    },
                    {
                        path: "/repositorypage/webtest",
                        key:'webtest',
                        component: WebContant,
                        routes:[
                            {
                                path: "/repositorypage/webtest/unitcase",
                                key:'unitcase',
                                component: WebUnitList,
                            }, {
                                path: "/repositorypage/webtest/unitdetail",
                                key:'unitcase',
                                component: WebUnitDetail,
                            }, {
                                path: "/repositorypage/webtest/scenecase",
                                key:'scenecase',
                                component: WebSceneList,
                            },{
                                path: "/repositorypage/webtest/scenedetail",
                                key:'scenecase',
                                component: WebSceneDetail,
                            },{
                                path: "/repositorypage/webtest/scenecase-instance",
                                key:'scenecase',
                                component: WebSceneInstance,
                            },{
                                path: "/repositorypage/webtest/performcase",
                                key:'performcase',
                                component: WebPerformList,
                            },{
                                path: "/repositorypage/webtest/performdetail",
                                key:'performcase',
                                component: WebPerformDetailContant,
                                routes:[
                                    {
                                        path: "/repositorypage/webtest/performdetail/config",
                                        key:'config',
                                        component:WebPerformDetail,
                                    },
                                    {
                                        path: "/repositorypage/webtest/performdetail/test",
                                        key:'config',
                                        component:WebPerformTest,
                                    },
                                    {
                                        path:"/repositorypage/webtest/performdetail",
                                        exact: true,
                                        key:'ridperformdetail',
                                        component: ()=><Redirect to='/repositorypage/webtest/performdetail/config'/>,
                                    },
                                ]
                            },{
                                path: "/repositorypage/webtest/perform-instance",
                                key:'performcase',
                                component: WebPerformInstance,
                            },
                            // {
                            //     path:"/repositorypage/webtest",
                            //     exact: true,
                            //     key:'ridapitest',
                            //     component: ()=><Redirect to='/repositorypage/webtest/unitcase'/>,
                            // },
                        ]
                    },
                    {
                        path: "/repositorypage/apptest",
                        key:'apptest',
                        component: AppContant,
                        routes:[
                            {
                                path: "/repositorypage/apptest/unitcase",
                                key:'unitcase',
                                component: AppUnitList,
                            },{
                                path: "/repositorypage/apptest/unitdetail",
                                key:'unitcase',
                                component: AppUnitDetail,
                            },{
                                path: "/repositorypage/apptest/scenecase",
                                key:'scenecase',
                                component: AppSceneList,
                            },{
                                path: "/repositorypage/apptest/scenedetail",
                                key:'scenecase',
                                component: AppSceneDetailContant,
                            },{
                                path: "/repositorypage/apptest/scenecase-instance",
                                key:'scenecase',
                                component: AppSceneInstance,
                            },{
                                path: "/repositorypage/apptest/performcase",
                                key:'performcase',
                                component: AppPerformList,
                            },{
                                path: "/repositorypage/apptest/performdetail",
                                key:'performcase',
                                component: AppPerformDetailContant,
                                routes:[
                                    {
                                        path: "/repositorypage/apptest/performdetail/config",
                                        key:'config',
                                        component:AppPerformDetail,
                                    },
                                    {
                                        path: "/repositorypage/apptest/performdetail/test",
                                        key:'config',
                                        component:AppPerformTest,
                                    },
                                    {
                                        path:"/repositorypage/apptest/performdetail",
                                        exact: true,
                                        key:'ridperformdetail',
                                        component: ()=><Redirect to='/repositorypage/apptest/performdetail/config'/>,
                                    },
                                ]
                            },{
                                path: "/repositorypage/apptest/perform-instance",
                                key:'performcase',
                                component: AppPerformInstance,
                            },
                            // {
                            //     path:"/repositorypage/apptest",
                            //     exact: true,
                            //     key:'ridapitest',
                            //     component: ()=><Redirect to='/repositorypage/apptest/unitcase'/>,
                            // },
                        ]
                    },
                    {
                        path: "/repositorypage/functest",
                        key:'functest',
                        component: FuncContant,
                        routes:[
                            {
                                path: "/repositorypage/functest/unitcase",
                                key:'unitcase',
                                component: FuncUnitList,
                            },{
                                path: "/repositorypage/functest/unitdetail",
                                key:'unitcase',
                                component: FuncUnitDetail,
                            },{
                                path: "/repositorypage/functest/scenecase",
                                key:'scenecase',
                                component: FuncSceneList,
                            },
                            {
                                path: "/repositorypage/functest/scenedetail",
                                key:'scenecase',
                                component: FuncSceneDetail,
                            },
                            // {
                            //     path:"/repositorypage/functest",
                            //     exact: true,
                            //     key:'ridapitest',
                            //     component: ()=><Redirect to='/repositorypage/functest/unitcase'/>,
                            // },
                        ]
                    },
                    {
                        path: "/repositorypage/setting",
                        component: RepositorySetting,
                        routes:[
                            {
                                path: "/repositorypage/setting/envMana",
                                key:'env',
                                exact: true,
                                component: EnvContant,
                            },
                            {
                                path: "/repositorypage/setting/agent",
                                key:'agent',
                                exact: true,
                                component: AgentConfigList
                            },
                            {
                                path: "/repositorypage/setting/role",
                                key:'domainRole',
                                exact: true,
                                component: DomainRole
                            },
                            {
                                path: "/repositorypage/setting/privilege",
                                key:'domainPrivilege',
                                exact: true,
                                component: DomainPrivilege
                            },{
                                path:"/repositorypage/setting",
                                exact: true,
                                key:'ridapitest',
                                component: ()=><Redirect to='/repositorypage/setting/envMana'/>,
                            },
                        ]
                    },

                    {
                        path: "/repositorypage/category",
                        exact: true,
                        key:'category',
                        component: CategoryList,
                    },
                    {
                        path: "/repositorypage/testplan",
                        key:'TestPlan',
                        exact: true,
                        component: TestPlan,
                    },
                    {
                        path: "/repositorypage/testplandetail",
                        key:'TestPlan',
                        exact: true,
                        component: TestPlanDetail,
                    },
                    {
                        path:"/repositorypage",
                        exact: true,
                        key:'ridapitest',
                        component: ()=><Redirect to='/repositorypage/detail'/>,
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
