
import React from 'react'

import {
    Login, Home,
    Repository,
    RepositoryList,
    RepositoryDetailPage,

    QuartzTask,


    CategoryList,
    TestPlan,

} from './modules';

import {
    SystemManagement,
    Org, Usermgr,
    ProjectFeature, ProjectRole,
    SystemFeature, SystemRole,
    MessageManagement, MessageSendType, MessageTemplate, MessageType, MessageUser,
} from './modules/sysmgr'
import {Directory} from 'tiklab-user-ui';
import {Redirect} from "react-router";
import Demo from "./modules/repository/components/demo";
import PortalHeader from "./modules/header/portalHeader";
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
import AppUnitDetailContant from "./modules/apptest/unitcase/components/appUnitDetailContant";
import AppUnitInstance from "./modules/apptest/unitcase/components/appUnitInstance";
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
import PluginManage from "./modules/sysmgr/pluginManage/pluginManage";
import WebSceneDetail from "./modules/webtest/scenecase/components/webSceneDetail";
import {Licence} from "tiklab-licence-ui";
import AccountMember from "./modules/sysmgr/accountMember/accountMember";
import TestPlanDetail from "./modules/testplan/components/testPlanDetail";
import RepositoryRecent from "./modules/repository/components/repositoryRecent";
import RepositoryCreate from "./modules/repository/components/repositoryCreate";
import RepositorySetting from "./modules/integration/repositorySetting/repositorySetting";
import AgentConfigList from "./modules/integration/agentconfig/components/agentConfigList";
import DomainRole from "./modules/integration/domainRole/domainRole";
import DomainPrivilege from "./modules/integration/domainPrivilege/domainPrivilege";


const routers =  [
    {
        path: "/login",
        exact: true,
        component: Login,
        key:'login',
    },
    {
        path: "/logout",
        component: LoginOut,
        exact: true,
        key:'logout',
    },
    {
        component: PortalHeader,
        path: '/',
        key:'poroute',
        routes:[
            {
                path: "/",
                component: Home,
                exact: true,
                key:'Home',
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
                            {
                                path:"/repositorypage/apitest",
                                exact: true,
                                key:'ridapitest',
                                component: ()=><Redirect to='/repositorypage/apitest/unitcase'/>,
                            },
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
                            {
                                path:"/repositorypage/webtest",
                                exact: true,
                                key:'ridapitest',
                                component: ()=><Redirect to='/repositorypage/webtest/unitcase'/>,
                            },
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
                                component: AppUnitDetailContant,
                            },{
                                path: "/repositorypage/apptest/unitcase-instance",
                                key:'unitcase',
                                component: AppUnitInstance,
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
                            },{
                                path:"/repositorypage/apptest",
                                exact: true,
                                key:'ridapitest',
                                component: ()=><Redirect to='/repositorypage/apptest/unitcase'/>,
                            },
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
                            {
                                path:"/repositorypage/functest",
                                exact: true,
                                key:'ridapitest',
                                component: ()=><Redirect to='/repositorypage/functest/unitcase'/>,
                            },
                        ]
                    },
                    {
                        path: "/repositorypage/envMana",
                        key:'env',
                        exact: true,
                        component: EnvContant,
                    },
                    {
                        path: "/repositorypage/agent",
                        key:'agent',
                        exact: true,
                        component: AgentConfigList
                    },
                    {
                        path: "/repositorypage/domainRole",
                        key:'domainRole',
                        exact: true,
                        component: DomainRole
                    },
                    {
                        path: "/repositorypage/domainPrivilege",
                        key:'domainPrivilege',
                        exact: true,
                        component: DomainPrivilege
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
                    // {
                    //     path: `/repositorypage/quartzTask`,
                    //     exact: true,
                    //     key:'quartzTask',
                    //     component: QuartzTask,
                    // },
                    // {
                    //     path: "/repositorypage/setting",
                    //     key:'RepositorySetting',
                    //     component: RepositorySetting,
                    //     routes:[
                    //         {
                    //             path: "/repositorypage/setting/agent",
                    //             key:'agent',
                    //             exact: true,
                    //             component: AgentConfigList
                    //         },
                    //         {
                    //             path:"/repositorypage/setting",
                    //             exact: true,
                    //             key:'ridsetting',
                    //             component: ()=><Redirect to='/repositorypage/setting/agent'/>,
                    //         },
                    //     ]
                    // },

                    // {
                    //     path: "/repositorypage/performance",
                    //     component: PerformanceList,
                    //     exact: true,
                    //     key:'performance',
                    // },
                    // {
                    //     path: "/repositorypage/performancehistory",
                    //     component: PerformanceHistory,
                    //     exact: true,
                    //     key:'performancehistory',
                    // },
                    // {
                    //     path: "/repositorypage/performancedetail",
                    //     component: PerformanceDetail,
                    //     exact: true,
                    //     key:'PerformanceDetail',
                    // },
                    // {
                    //     path: `/repositorypage/quartzMaster`,
                    //     exact: true,
                    //     key:'quartzTask',
                    //     component: QuartzTaskList,
                    // },
                    //
                    // {
                    //     path: "/repositorypage/apitest",
                    //     exact: true,
                    //     key:'step',
                    //     component: Step,
                    // },
                    // {
                    //     path: "/repositorypage/webtest",
                    //     exact: true,
                    //     key:'webtest',
                    //     component: WebTestcase,
                    // },
                    // {
                    //     path: "/repositorypage/apptest",
                    //     exact: true,
                    //     key:'apptest',
                    //     component: AppTestcase,
                    // },
                    // {
                    //     path: "/repositorypage/steppage",
                    //     exact: true,
                    //     key:'step',
                    //     component: StepDetail,
                    // },
                    // {
                    //     path: "/repositorypage/functionaltest",
                    //     exact: true,
                    //     key:'functionaltest',
                    //     component: FunctionalTestDetail,
                    // },
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
                component:SystemManagement,
                routes:[
                    // {
                    //     path: "/systemManagement/organ/org",
                    //     key:'org',
                    //     exact: true,
                    //     component: Org,
                    // },
                    // {
                    //     path: "/systemManagement/organ/user",
                    //     key:'user',
                    //     exact: true,
                    //     component: Usermgr,
                    // },
                    {
                        path: "/systemManagement/privilege",
                        key:'ProjectFeature',
                        exact: true,
                        component: ProjectFeature,
                    },
                    {
                        path: "/systemManagement/role",
                        key:'ProjectRole',
                        exact: true,
                        component: ProjectRole,
                    },
                    {
                        path: "/systemManagement/systemFeature",
                        key:'SystemFeature',
                        exact: true,
                        component: SystemFeature,
                    },
                    {
                        path: "/systemManagement/systemRole",
                        key:'SystemRole',
                        exact: true,
                        component: SystemRole,
                    },
                    {
                        path: "/systemManagement/messageManagement",
                        key:'MessageManagement',
                        exact: true,
                        component: MessageManagement,
                    },
                    {
                        path: "/systemManagement/messageSendType",
                        key:'MessageSendType',
                        exact: true,
                        component: MessageSendType,
                    },
                    {
                        path: "/systemManagement/messageTemplate",
                        key:'MessageTemplate',
                        exact: true,
                        component: MessageTemplate,
                    },
                    {
                        path: "/systemManagement/messageType",
                        key:'MessageType',
                        exact: true,
                        component: MessageType,
                    },{
                        path: "/systemManagement/licence",
                        key:'licence',
                        exact: true,
                        component: Licence,
                    },{
                        path: "/systemManagement/pluginmanage",
                        key:'pluginmanage',
                        component: PluginManage,
                    },

                    {
                        path: "/systemManagement/authConfig",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false}/>,
                    },{
                        path:"/systemManagement",
                        exact: true,
                        key:'ridenvtest',
                        component: ()=><Redirect to='/systemManagement/envMana'/>,
                    },
                ]
            },
            {
                path: "/accountMember",
                key:'accountMember',
                component: AccountMember,
                routes: [
                    {
                        path: "/accountMember/org",
                        key:'org',
                        exact: true,
                        component: Org,
                    },
                    {
                        path: "/accountMember/user",
                        key:'user',
                        exact: true,
                        component: Usermgr,
                    },
                    {
                        path: "/accountMember/authConfig",
                        key:'authConfig',
                        exact: true,
                        render: () => <Directory isPortal={false}/>,
                    },{
                        path: "/accountMember",
                        key:'sysEnvMana',
                        exact: true,
                        render: () => <Redirect to={"/accountMember/org"}/>,
                    },
                ]
            },
            {
                path: "/MessageUser",
                key:'MessageUser',
                exact: true,
                component: MessageUser,
            },

        ]
    },



  ];

export default routers
