import React from 'react';
import {useAccountConfig} from "doublekit-frame-ui";
import { loginOutAcc } from 'doublekit-frame-ui';
import CommonHeader from "./commonHeader";

const AccountHeader = props => {
    const authData = useAccountConfig();

    const AccountLogout = () => {
        loginOutAcc(authData.authAccConfig.accUrl)
    }

    console.log("AccHeader");

    return (
        <CommonHeader logout={AccountLogout}  {...props}/>
    )
}
export default AccountHeader;