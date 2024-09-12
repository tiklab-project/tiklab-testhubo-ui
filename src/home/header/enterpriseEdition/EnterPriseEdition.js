import React,{useState} from 'react'
import {BaseModal,HeaderDropdown} from "thoughtware-licence-ui/es/commons";
import {disableFunction} from "thoughtware-core-ui";
import vipLight from '../../../assets/img/vip.png';
import vipDark from '../../../assets/img/notvip.png';
import "./EnterPriseEditionStyle.scss";


const featureList =[
    {
        "id": "TestOn3f85",
        "productType": {
            "id": "testrubo",
            "code": null,
            "typeName": null
        },
        "type": "ce",
        "name": "TestOn-社区版",
        "price": "0",
        "version": null,
        "createTime": "2024-03-26 10:56:46.997",
        "modelList": [
            {
                "id": "077401905a66",
                "comparisonId": "TestOn3f85",
                "name": "项目模块",
                "sort": 1,
                "createTime": "2024-05-15 01:46:26.053",
                "children": [
                    {
                        "id": "a0385a6d5039",
                        "comparisonModelId": "077401905a66",
                        "name": "项目管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:46:32.185"
                    },
                    {
                        "id": "1f124643a935",
                        "comparisonModelId": "077401905a66",
                        "name": " 模块管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:46:37.622"
                    },
                    {
                        "id": "42c938e63c28",
                        "comparisonModelId": "077401905a66",
                        "name": "环境管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:46:42.51"
                    },
                    {
                        "id": "d15bf360ba04",
                        "comparisonModelId": "077401905a66",
                        "name": " 系统集成",
                        "sort": 0,
                        "createTime": "2024-05-16 10:46:47.755"
                    },
                    {
                        "id": "1cacf7eec3a0",
                        "comparisonModelId": "077401905a66",
                        "name": "成员与权限",
                        "sort": 0,
                        "createTime": "2024-05-16 10:46:53.03"
                    }
                ]
            },
            {
                "id": "6b4383fea929",
                "comparisonId": "TestOn3f85",
                "name": "测试用例模块基础功能",
                "sort": 1,
                "createTime": "2024-05-15 15:53:45.133",
                "children": [
                    {
                        "id": "f5f7491175a7",
                        "comparisonModelId": "6b4383fea929",
                        "name": "功能用例",
                        "sort": 0,
                        "createTime": "2024-05-15 15:54:11.744"
                    },
                    {
                        "id": "1c615b4f9f1c",
                        "comparisonModelId": "6b4383fea929",
                        "name": "接口单元用例",
                        "sort": 0,
                        "createTime": "2024-05-15 15:54:20.307"
                    },
                    {
                        "id": "080229e455ba",
                        "comparisonModelId": "6b4383fea929",
                        "name": "接口场景用例",
                        "sort": 0,
                        "createTime": "2024-05-15 15:54:29.497"
                    },
                    {
                        "id": "497a2c75466e",
                        "comparisonModelId": "6b4383fea929",
                        "name": "接口性能用例",
                        "sort": 0,
                        "createTime": "2024-05-15 15:54:38.983"
                    },
                    {
                        "id": "fde51bcfc5c2",
                        "comparisonModelId": "6b4383fea929",
                        "name": " WEB场景用例",
                        "sort": 0,
                        "createTime": "2024-05-15 15:54:44.452"
                    },
                    {
                        "id": "c931f37ac784",
                        "comparisonModelId": "6b4383fea929",
                        "name": " APP场景用例",
                        "sort": 0,
                        "createTime": "2024-05-15 15:54:49.482"
                    }
                ]
            },
            {
                "id": "dd0b10a8e829",
                "comparisonId": "TestOn3f85",
                "name": "用例执行模块基础功能",
                "sort": 1,
                "createTime": "2024-06-07 10:49:27.567",
                "children": []
            },
            {
                "id": "f81434beed06",
                "comparisonId": "TestOn3f85",
                "name": "测试报告模块基础功能",
                "sort": 4,
                "createTime": "2024-05-15 15:53:58.512",
                "children": [
                    {
                        "id": "e75a44318608",
                        "comparisonModelId": "f81434beed06",
                        "name": "测试报告集合",
                        "sort": 0,
                        "createTime": "2024-05-15 15:55:20.754"
                    }
                ]
            },
            {
                "id": "deb21e0e6c48",
                "comparisonId": "TestOn3f85",
                "name": "消息模块基础功能",
                "sort": 4,
                "createTime": "2024-05-16 10:46:57.826",
                "children": [
                    {
                        "id": "7bc8ed77ff87",
                        "comparisonModelId": "deb21e0e6c48",
                        "name": " 系统数据备份与恢复",
                        "sort": 0,
                        "createTime": "2024-05-16 10:47:04.711"
                    },
                    {
                        "id": "0068936a106a",
                        "comparisonModelId": "deb21e0e6c48",
                        "name": " 动态日志",
                        "sort": 0,
                        "createTime": "2024-05-16 10:47:09.815"
                    }
                ]
            },
            {
                "id": "7f80c83f70af",
                "comparisonId": "TestOn3f85",
                "name": "用户与权限模块基础功能",
                "sort": 4,
                "createTime": "2024-06-06 17:15:16.788",
                "children": []
            },
            {
                "id": "338d35dc564a",
                "comparisonId": "TestOn3f85",
                "name": "测试计划模块",
                "sort": 5,
                "createTime": "2024-05-15 15:53:50.43",
                "children": [
                    {
                        "id": "17ce0780ae0c",
                        "comparisonModelId": "338d35dc564a",
                        "name": " 手动执行计划",
                        "sort": 0,
                        "createTime": "2024-05-15 15:54:56.517"
                    },
                    {
                        "id": "9c6f173f41c0",
                        "comparisonModelId": "338d35dc564a",
                        "name": "定时执行计划",
                        "sort": 0,
                        "createTime": "2024-05-15 15:55:01.103"
                    },
                    {
                        "id": "40463360ac89",
                        "comparisonModelId": "338d35dc564a",
                        "name": " 测试报告",
                        "sort": 0,
                        "createTime": "2024-05-15 15:55:13.51"
                    }
                ]
            },
            {
                "id": "968d706791dd",
                "comparisonId": "TestOn3f85",
                "name": "安全模块",
                "sort": 5,
                "createTime": "2024-06-06 17:15:31.612",
                "children": []
            },
            {
                "id": "6a83417cdcb8",
                "comparisonId": "TestOn3f85",
                "name": "登录模块基础功能",
                "sort": 6,
                "createTime": "2024-05-16 16:06:36.115",
                "children": [
                    {
                        "id": "eb4a8a1b98e5",
                        "comparisonModelId": "6a83417cdcb8",
                        "name": "本地部署",
                        "sort": 0,
                        "createTime": "2024-05-15 16:06:43.986"
                    }
                ]
            }
        ],
        "resourcesList": [
            {
                "id": "b8046d232d25",
                "comparisonId": "TestOn3f85",
                "key": "日志保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:52:41.932"
            },
            {
                "id": "f937a59d022b",
                "comparisonId": "TestOn3f85",
                "key": "消息保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:52:47.402"
            }
        ],
        "customerList": [
            {
                "id": "4b2500b2268c",
                "comparisonId": "TestOn3f85",
                "key": null,
                "values": "应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:52:51.309"
            },
            {
                "id": "8d8e1ecceacf",
                "comparisonId": "TestOn3f85",
                "key": null,
                "values": "在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:52:55.803"
            }
        ]
    },
    {
        "id": "TestOn3720e",
        "productType": {
            "id": "testrubo",
            "code": null,
            "typeName": null
        },
        "type": "ee",
        "name": "TestOn-企业版",
        "price": "45",
        "version": "v1.0.2",
        "createTime": "2024-03-26 10:57:07.029",
        "modelList": [
            {
                "id": "4354d40e685b",
                "comparisonId": "TestOn3720e",
                "name": "测试用例模块：支持WEB、APP 场景用例",
                "sort": 1,
                "createTime": "2024-06-07 10:36:54.415",
                "children": []
            },
            {
                "id": "26b3ecfd3326",
                "comparisonId": "TestOn3720e",
                "name": "用例执行模块：支持WEB、APP场景用例执行",
                "sort": 1,
                "createTime": "2024-06-07 10:49:49.441",
                "children": []
            },
            {
                "id": "5da0cbb1560e",
                "comparisonId": "TestOn3720e",
                "name": "测试报告模块：支持WEB、APP场景用例报告",
                "sort": 2,
                "createTime": "2024-05-15 20:13:18.351",
                "children": [
                    {
                        "id": "00f66bd777f8",
                        "comparisonModelId": "5da0cbb1560e",
                        "name": " 发送邮箱消息",
                        "sort": 0,
                        "createTime": "2024-05-15 20:13:26.642"
                    },
                    {
                        "id": "79ee7cc326b8",
                        "comparisonModelId": "5da0cbb1560e",
                        "name": "发送企业微信机器人消息",
                        "sort": 0,
                        "createTime": "2024-05-15 20:13:33.243"
                    }
                ]
            },
            {
                "id": "556b07314177",
                "comparisonId": "TestOn3720e",
                "name": "用户模块：企业微信用户目录、Ldap用户目录",
                "sort": 2,
                "createTime": "2024-06-06 17:45:19.694",
                "children": []
            },
            {
                "id": "18e4abb27529",
                "comparisonId": "TestOn3720e",
                "name": "消息模块：企业微信消息",
                "sort": 3,
                "createTime": "2024-06-06 17:45:27.809",
                "children": []
            },
            {
                "id": "a7c0e6eef75c",
                "comparisonId": "TestOn3720e",
                "name": "登录模块：企业微信登录、Ldap登录",
                "sort": 5,
                "createTime": "2024-06-06 17:45:35.623",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "99594f456eb0",
                "comparisonId": "TestOn3720e",
                "key": "日志保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:52:12.461"
            },
            {
                "id": "b0d8b79cbf66",
                "comparisonId": "TestOn3720e",
                "key": "消息保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:52:19.659"
            }
        ],
        "customerList": [
            {
                "id": "665937e82f41",
                "comparisonId": "TestOn3720e",
                "key": null,
                "values": " 在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:51:44.39"
            },
            {
                "id": "b002ea5800ef",
                "comparisonId": "TestOn3720e",
                "key": null,
                "values": " 应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:51:49.803"
            },
            {
                "id": "edf9588dab3d",
                "comparisonId": "TestOn3720e",
                "key": null,
                "values": " 企业微信专属客服",
                "sort": 1,
                "createTime": "2024-05-24 21:51:53.645"
            },
            {
                "id": "0cd257c2f83f",
                "comparisonId": "TestOn3720e",
                "key": null,
                "values": " 7*24 小时智能客服",
                "sort": 1,
                "createTime": "2024-05-24 21:51:57.49"
            },
            {
                "id": "3785ff64f120",
                "comparisonId": "TestOn3720e",
                "key": null,
                "values": " 提供私有化专属技术支持",
                "sort": 1,
                "createTime": "2024-05-24 21:52:02.323"
            }
        ]
    },
    {
        "id": "TestOn5b627",
        "productType": {
            "id": "testrubo",
            "code": null,
            "typeName": null
        },
        "type": "cloud-free",
        "name": "TestOn-线上免费版",
        "price": "0",
        "version": null,
        "createTime": "2024-03-26 10:58:23.616",
        "modelList": [
            {
                "id": "5bf2a7e68a90",
                "comparisonId": "TestOn5b627",
                "name": " 项目模块",
                "sort": 0,
                "createTime": "2024-05-15 01:48:24.738",
                "children": [
                    {
                        "id": "08f27d55eee0",
                        "comparisonModelId": "5bf2a7e68a90",
                        "name": " 项目管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:48:34.391"
                    },
                    {
                        "id": "6f0662d29838",
                        "comparisonModelId": "5bf2a7e68a90",
                        "name": " 模块管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:48:40.786"
                    },
                    {
                        "id": "17c4f5cce4e9",
                        "comparisonModelId": "5bf2a7e68a90",
                        "name": " 环境管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:48:46.863"
                    },
                    {
                        "id": "27930b35d71b",
                        "comparisonModelId": "5bf2a7e68a90",
                        "name": " 系统集成",
                        "sort": 0,
                        "createTime": "2024-05-16 10:48:51.995"
                    },
                    {
                        "id": "4a1748576bc6",
                        "comparisonModelId": "5bf2a7e68a90",
                        "name": "成员与权限",
                        "sort": 0,
                        "createTime": "2024-05-16 10:48:56.786"
                    }
                ]
            },
            {
                "id": "b95cf51a9631",
                "comparisonId": "TestOn5b627",
                "name": " 测试用例模块基础功能",
                "sort": 0,
                "createTime": "2024-05-15 16:13:31.719",
                "children": [
                    {
                        "id": "467b00242d9f",
                        "comparisonModelId": "b95cf51a9631",
                        "name": " 功能用例",
                        "sort": 0,
                        "createTime": "2024-05-15 16:13:56.838"
                    },
                    {
                        "id": "86db0e3cb2e9",
                        "comparisonModelId": "b95cf51a9631",
                        "name": " 接口单元用例",
                        "sort": 0,
                        "createTime": "2024-05-15 16:14:01.829"
                    },
                    {
                        "id": "e2ff70768a3d",
                        "comparisonModelId": "b95cf51a9631",
                        "name": "接口场景用例",
                        "sort": 0,
                        "createTime": "2024-05-15 16:14:06.669"
                    },
                    {
                        "id": "a54546086db0",
                        "comparisonModelId": "b95cf51a9631",
                        "name": "接口性能用例",
                        "sort": 0,
                        "createTime": "2024-05-15 16:14:11.804"
                    },
                    {
                        "id": "c2397d89469a",
                        "comparisonModelId": "b95cf51a9631",
                        "name": "WEB场景用例",
                        "sort": 0,
                        "createTime": "2024-05-15 16:14:17.349"
                    },
                    {
                        "id": "0ac956d6149d",
                        "comparisonModelId": "b95cf51a9631",
                        "name": " APP场景用例",
                        "sort": 0,
                        "createTime": "2024-05-15 16:14:22.264"
                    }
                ]
            },
            {
                "id": "3168f0a0df40",
                "comparisonId": "TestOn5b627",
                "name": "用例执行模块基础功能",
                "sort": 3,
                "createTime": "2024-06-07 10:48:08.633",
                "children": []
            },
            {
                "id": "14e53729e7cf",
                "comparisonId": "TestOn5b627",
                "name": " 测试计划模块",
                "sort": 4,
                "createTime": "2024-05-15 16:13:35.196",
                "children": [
                    {
                        "id": "6ddd507b8c68",
                        "comparisonModelId": "14e53729e7cf",
                        "name": " 手动执行计划",
                        "sort": 0,
                        "createTime": "2024-05-15 16:14:28.503"
                    },
                    {
                        "id": "cc5b935fa99e",
                        "comparisonModelId": "14e53729e7cf",
                        "name": " 定时执行计划",
                        "sort": 0,
                        "createTime": "2024-05-15 16:14:34.667"
                    },
                    {
                        "id": "c0fbd5ed3d6b",
                        "comparisonModelId": "14e53729e7cf",
                        "name": "测试报告",
                        "sort": 0,
                        "createTime": "2024-05-15 16:14:42.455"
                    }
                ]
            },
            {
                "id": "cbe73761978d",
                "comparisonId": "TestOn5b627",
                "name": " 测试报告模块基础功能",
                "sort": 4,
                "createTime": "2024-05-15 16:13:39.525",
                "children": [
                    {
                        "id": "6f8e23b1c18a",
                        "comparisonModelId": "cbe73761978d",
                        "name": "测试报告集合",
                        "sort": 0,
                        "createTime": "2024-05-15 16:14:49.87"
                    }
                ]
            },
            {
                "id": "28f5c4c1e944",
                "comparisonId": "TestOn5b627",
                "name": "消息模块基础功能",
                "sort": 4,
                "createTime": "2024-05-16 10:49:07.602",
                "children": [
                    {
                        "id": "d1c16c6dcf8b",
                        "comparisonModelId": "28f5c4c1e944",
                        "name": " 系统数据备份与恢复",
                        "sort": 0,
                        "createTime": "2024-05-16 10:49:14.729"
                    },
                    {
                        "id": "febe6a48c78f",
                        "comparisonModelId": "28f5c4c1e944",
                        "name": "动态日志",
                        "sort": 0,
                        "createTime": "2024-05-16 10:49:21.025"
                    }
                ]
            },
            {
                "id": "287e628a01f1",
                "comparisonId": "TestOn5b627",
                "name": "权限模块基础功能",
                "sort": 4,
                "createTime": "2024-06-06 17:47:41.262",
                "children": []
            },
            {
                "id": "e04dac9496e3",
                "comparisonId": "TestOn5b627",
                "name": " 安全模块",
                "sort": 4,
                "createTime": "2024-06-06 17:47:44.605",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "038272b8daf8",
                "comparisonId": "TestOn5b627",
                "key": "人数",
                "values": "10人",
                "sort": 1,
                "createTime": "2024-05-24 21:53:43.831"
            },
            {
                "id": "9aecf6be6880",
                "comparisonId": "TestOn5b627",
                "key": " 日志保存时长",
                "values": " 不限制",
                "sort": 2,
                "createTime": "2024-05-24 21:53:18.517"
            },
            {
                "id": "9d86ee37d833",
                "comparisonId": "TestOn5b627",
                "key": " 消息保存时长",
                "values": " 不限制",
                "sort": 2,
                "createTime": "2024-05-24 21:53:22.636"
            }
        ],
        "customerList": [
            {
                "id": "bbb79e2fe9bb",
                "comparisonId": "TestOn5b627",
                "key": null,
                "values": " 应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:53:06.213"
            },
            {
                "id": "8c1b83e4f824",
                "comparisonId": "TestOn5b627",
                "key": null,
                "values": " 在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:53:10.645"
            }
        ]
    },
    {
        "id": "TestOn062be",
        "productType": {
            "id": "testrubo",
            "code": null,
            "typeName": null
        },
        "type": "cloud-pay",
        "name": "TestOn-线上付费版",
        "price": "15",
        "version": null,
        "createTime": "2024-03-26 10:59:30.937",
        "modelList": [
            {
                "id": "f25b2154e587",
                "comparisonId": "TestOn062be",
                "name": "测试用例模块：支持WEB、APP 场景用例",
                "sort": 1,
                "createTime": "2024-05-24 21:57:54.913",
                "children": [
                    {
                        "id": "4b8de29e2c72",
                        "comparisonModelId": "f25b2154e587",
                        "name": "企业微信登录",
                        "sort": 1,
                        "createTime": "2024-05-24 21:58:02.651"
                    },
                    {
                        "id": "0430c2f8691f",
                        "comparisonModelId": "f25b2154e587",
                        "name": "Ldap登录",
                        "sort": 1,
                        "createTime": "2024-05-24 21:58:08.795"
                    }
                ]
            },
            {
                "id": "35d8967f2ce1",
                "comparisonId": "TestOn062be",
                "name": "用例执行模块：支持WEB、APP场景用例执行",
                "sort": 1,
                "createTime": "2024-06-07 10:48:51.595",
                "children": []
            },
            {
                "id": "1d7cd6cb226a",
                "comparisonId": "TestOn062be",
                "name": "测试报告模块：支持WEB、APP场景用例报告",
                "sort": 3,
                "createTime": "2024-06-06 17:46:22.36",
                "children": []
            },
            {
                "id": "aac032e4cabe",
                "comparisonId": "TestOn062be",
                "name": "消息模块：企业微信消息",
                "sort": 3,
                "createTime": "2024-06-06 17:46:36.491",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "b48fc6f743f0",
                "comparisonId": "TestOn062be",
                "key": "人数·",
                "values": "无限制",
                "sort": 1,
                "createTime": "2024-05-24 21:54:09.822"
            },
            {
                "id": "f5af9035af07",
                "comparisonId": "TestOn062be",
                "key": "日志保存时长",
                "values": "无限制",
                "sort": 1,
                "createTime": "2024-05-24 21:54:22.019"
            },
            {
                "id": "898610b9edd1",
                "comparisonId": "TestOn062be",
                "key": " 消息保存时长",
                "values": "无限制",
                "sort": 1,
                "createTime": "2024-05-24 21:54:28.038"
            }
        ],
        "customerList": [
            {
                "id": "f1e13cb78586",
                "comparisonId": "TestOn062be",
                "key": null,
                "values": " 在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:54:34.124"
            },
            {
                "id": "0e3fafca6014",
                "comparisonId": "TestOn062be",
                "key": null,
                "values": "企业微信专属客服",
                "sort": 1,
                "createTime": "2024-05-24 21:54:40.137"
            },
            {
                "id": "f941ea0ac331",
                "comparisonId": "TestOn062be",
                "key": null,
                "values": " 应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:54:43.821"
            },
            {
                "id": "70ec18ef5795",
                "comparisonId": "TestOn062be",
                "key": null,
                "values": " 7*24 小时智能客服",
                "sort": 1,
                "createTime": "2024-05-24 21:54:47.476"
            }
        ]
    }
]
/**
 * 应用管理产品特性
 * @param props
 * @constructor
 */
const EnterPriseEdition = props =>{

    const {featureType = 'ee'} = props;

    const isVip = disableFunction();

    const [visible,setVisible] = useState(false);

    const onOk = () =>{
        if(featureType==='ee'){
            window.open(`https://tiklab.net/account/subscribe/apply/postin`)
        } else {
            window.open(`https://work.tiklab.net/#/enterprise/application/postin`)
        }
        onCancel()
    }

    const onCancel = () =>{
        setVisible(false)
    }

    const featureHtml = type => {
        let item = featureList.find(li => li.type === type);
        return (
            <div className='feature-item'>
                <div className='feature-item-header'>
                    <div className='header-title'>
                        {type==='ce' && '社区版'}
                        {type==='ee' && '企业版'}
                        {type==='cloud-free' && '免费版' }
                        {type==='cloud-pay' && '专业版' }
                    </div>
                    <div className='header-desc'>
                        {type==='ce' && '适用于个人和小型团队快速部署和使用。'}
                        {type==='ee' && '适用于大型组织和企业的复杂需求。'}
                        {type==='cloud-free' && '适用于个人和小型团队快速部署和使用。' }
                        {type==='cloud-pay' && '适用于大型组织和企业的复杂需求。' }
                    </div>
                </div>
                <div className='feature-item-body'>
                    <div className='feature-item-body-model'>
                        <div className='feature-item-body-title'>
                            <span>功能</span>
                            {
                                type==='cloud-pay' &&
                                <span className='feature-item-body-title-ex'>
                                    包含免费版所有功能
                                </span>
                            }
                        </div>
                        <div>
                            {
                                item?.modelList?.map(model=>(
                                    <div key={model.id} className='feature-model-item'>
                                        <div className='feature-item-body-icon'></div>
                                        <div className='feature-model-item-name'>{model.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-resources'>
                        <div className='feature-item-body-title'>资源</div>
                        <div>
                            {
                                item?.resourcesList?.map(resources=>{
                                    return (
                                        <div key={resources.id} className='feature-resources-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-resources-item-key'>{resources?.key}：</div>
                                            <div className='feature-resources-item-values'>{resources?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-customer'>
                        <div className='feature-item-body-title'>服务</div>
                        <div>
                            {
                                item?.customerList?.map(customer=>{
                                    return (
                                        <div key={customer.id} className='feature-customer-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-customer-item-value'>{customer?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    return (
        <HeaderDropdown
            visible={visible}
            setVisible={setVisible}
            type={'applink'}
            tooltip={isVip ? "免费版" : "企业版"}
            Icon={<img src={isVip ? vipDark : vipLight} alt={"vip"} width={24} height={24}/>}
        >
            <BaseModal
                width={700}
                title={"版本功能"}
                okText={'订阅'}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <div className='application-feature-modal'>
                    {featureHtml(featureType===''?'ce':'cloud-free')}
                    {featureHtml(featureType==='ee'?'ee':'cloud-pay')}
                </div>
            </BaseModal>
        </HeaderDropdown>
    )
}

export default EnterPriseEdition

