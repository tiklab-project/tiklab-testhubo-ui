import HeaderContent from "./headerContent";
import {renderRoutes} from "react-router-config";
import React from "react";
import {inject, observer} from "mobx-react";

 const  PageContent =(props)=> {
    const router = props.route.routes;

    const Logout = () => {
        props.history.push({
            pathname: '/logout',
            state:{
                preRoute: props.location.pathname
            }
        })
    }


    return(
        <div style={{height:"100%"}}>
            <HeaderContent
                logout={Logout}
                {...props}
            />
            {
                renderRoutes(router)
            }
        </div>

    )
}

export default inject("eamStore")(observer(PageContent))