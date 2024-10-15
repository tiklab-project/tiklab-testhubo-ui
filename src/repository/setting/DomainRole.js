import React from "react";
import { DomainUser  } from 'tiklab-user-ui';

/**
 * 包装成员
 */
const DomainRole = props => {
    const repositoryId = sessionStorage.getItem('repositoryId')

    return (
        <div className={"table-list-box"}>
            <DomainUser
                {...props} 
                domainId = {repositoryId}
                bgroup={"testhubo"}
            />
        </div>
    )
}

export default DomainRole
