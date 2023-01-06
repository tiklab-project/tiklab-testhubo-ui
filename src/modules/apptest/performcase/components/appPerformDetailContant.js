import React, {useState} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import BackCommon from "../../../common/backCommon";
import {renderRoutes} from "react-router-config";



const AppPerfomDetailContant = (props) =>{

    const [current, setCurrent] = useState('config');

    const onClick = (e) => {
        setCurrent(e.key);
    }

    const goBack = () =>{
        props.history.push("/repositorypage/apptest")
    }


    return(
        <>
            <div >
                {/*<BackCommon clickBack={goBack} />*/}
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                >
                    <Menu.Item key="config">
                        <Link to='/repositorypage/apptest/performdetail/config'>配置</Link>
                    </Menu.Item>
                    <Menu.Item key="test"  >
                        <Link to='/repositorypage/apptest/performdetail/test'>测试</Link>
                    </Menu.Item>
                </Menu>

            </div>
            <div>
                {
                    renderRoutes( props.route.routes)
                }
            </div>
        </>
    )
}

export default AppPerfomDetailContant