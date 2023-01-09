import React, {useState} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import BackCommon from "../../../../common/backCommon";
import ApiEnvSelect from "../../../../sysmgr/environment/components/apiEnvSelect";
import {renderRoutes} from "react-router-config";



const ApiPerformDetailContant = (props) =>{

    const [current, setCurrent] = useState('config');

    const onClick = (e) => {
        setCurrent(e.key);
    }

    const goBack = () =>{
        props.history.push("/repositorypage/testcase/list")
    }


    return(
        <>
            <div >
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                >
                    <Menu.Item key="config">
                        <Link to='/repositorypage/apitest/performdetail/config'>配置</Link>
                    </Menu.Item>
                    <Menu.Item key="test"  >
                        <Link to='/repositorypage/apitest/performdetail/test'>测试</Link>
                    </Menu.Item>
                </Menu>

            </div>
            <div className={"content-box-center"}>
                {
                    renderRoutes( props.route.routes)
                }
            </div>
        </>
    )
}

export default ApiPerformDetailContant