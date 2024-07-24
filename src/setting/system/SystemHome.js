import React, { useEffect, useState, useCallback } from 'react';
import './sysMana.scss';
import {Axios, getUser} from 'thoughtware-core-ui';
import { useHistory } from 'react-router';
import {Row,Col} from "antd"
import PageContent from "../../common/pageContent/PageContent";
import IconCommon from "../../common/IconCommon";

const InfoBox = React.memo(({ title, data, onClick }) => (
    <div className={"system-module"}>
        <div className="header-title">{title}</div>
        <div className="system-menu-box">
            <Row gutter={20}>
                    {data.map((item) => (
                        <Col span={6}>
                            <div
                                key={item.key}
                                className="system-menu-item"
                                onClick={() => onClick(item.key)}
                            >
                                {
                                    item.count === 0||item.count > 0
                                        ?<div>{item.count}</div>
                                        :<IconCommon
                                            icon={item.icon}
                                            className={"icon-l"}
                                        />
                                }
                                <div>{item.title}</div>
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
    </div>
));

const InfoBoxCol12 = React.memo(({ title, data, onClick }) => (
    <div className={"system-module"}>
        <div className="header-title">{title}</div>
        <div className="system-menu-box">
            <Row gutter={20}>
                {data.map((item) => (
                    <Col span={12}>
                        <div
                            key={item.key}
                            className="system-menu-item"
                            onClick={() => onClick(item.key)}
                        >
                            {
                                item.count === 0||item.count > 0
                                    ?<div style={{fontSize:"16px",fontWeight:"bold"}}>{item.count}</div>
                                    :<IconCommon
                                        icon={item.icon}
                                        className={"icon-l"}
                                    />
                            }
                            <div>{item.title}</div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    </div>
));

const showUserBox = (data) =>{
    if( version==="cloud"){
        return  <div className={"system-role-module"}>
            <div className="header-title">权限</div>
            <div className="system-menu-box">
                <Row gutter={20}>
                    {data.map((item) => (
                        <Col span={6}>
                            <div
                                key={item.key}
                                className="system-menu-role"
                                onClick={() => onClick(item.key)}
                            >
                                {
                                    item.count === 0||item.count > 0
                                        ?<div style={{fontSize:"16px",fontWeight:"bold"}}>{item.count}</div>
                                        :null
                                }
                                <div>{item.title}</div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    }else {
        return <div className={"system-role-module"}>
            <div className="header-title">用户与权限</div>
            <div className="system-role">
                {data.map((item) => (
                    <div
                        key={item.key}
                        className="system-menu-role"
                        onClick={() => onClick(item.key)}
                    >
                        {
                            item.count === 0||item.count > 0
                                ?<div style={{fontSize:"16px",fontWeight:"bold"}}>{item.count}</div>
                                :null
                        }
                        <div>{item.title}</div>
                    </div>
                ))}
            </div>
        </div>;
    }
}

const SystemHome = () => {
    const history = useHistory();
    const [countInfo, setCountInfo] = useState();
    const authConfig = JSON.parse(localStorage.getItem("authConfig"))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await Axios.post('/system/count', null);
                setCountInfo(info.data);
            } catch (error) {
                console.error('Failed to fetch count info:', error);
            }
        };
        fetchData();
    }, []);

    const handleClick = useCallback((router) => {
        if (!authConfig.authType) {
            const specialKeys = [
                "/setting/orga",
                "/setting/user",
                "/setting/dir",
                "/setting/userGroup"
            ];

            if (specialKeys.includes(router)) {
                let authServiceUrl = authConfig.authServiceUrl
                let ticket = getUser().ticket
                let url = authServiceUrl +"#"+router+"?ticket="+ticket

                window.open(url, "_blank");
                return;
            }
        }

        history.push(router);
    }, [history]);

    const userAndRole = [
        { title: '部门', key: '/setting/orga', count: countInfo?.orgaCount },
        { title: '用户', key: '/setting/user', count: countInfo?.userCount },
        { title: '用户目录', key: '/setting/dir',count: countInfo?.userDirCount },
        { title: '用户组',key: '/setting/userGroup',count: countInfo?.userGroupCount },
        { title: '权限', key: '/setting/systemRole', count: countInfo?.roleCount },
    ];

    const role = [ { title: '权限', key: '/setting/systemRole', count: countInfo?.roleCount }]

    const message = [
        { title: '消息发送方式', key: '/setting/messageSendType', count: countInfo?.msgSendTypeCount },
        { title: '消息通知方案', key: '/setting/message-notice', count: countInfo?.msgNoticeCount },
    ];

    const agent = [{ title: 'Agent配置', key: '/setting/agent',icon:"jiqun-mianxing"}];

    const securityapplication = [
        { title: '操作日志', key: '/setting/log' ,icon:"caozuorizhi"},
        { title: '备份与恢复', key: '/setting/backups',icon:"beifenyuhuifu" },
        { title: '版本与许可证', key: '/setting/version' ,icon:"xukezheng"},
        { title: '应用访问权限', key: '/setting/product-auth' ,icon:"jiaosequanxian"},
    ];

    return (
        <PageContent>
            <div className="system-home">
                <div className="system-content">
                    {showUserBox(version==="cloud"?role:userAndRole)}

                    <Row>
                        <Col span={12}>
                            <InfoBoxCol12 title="消息" data={message} onClick={handleClick} />
                        </Col>
                        <Col span={12}>
                            <InfoBoxCol12 title="项目配置" data={agent} onClick={handleClick} />
                        </Col>
                    </Row>

                    <InfoBox title="安全/应用" data={securityapplication} onClick={handleClick} />

                </div>
            </div>
        </PageContent>


    );
};

export default SystemHome;