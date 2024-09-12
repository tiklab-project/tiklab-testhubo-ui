import React from "react";
import { DomainUser  } from 'thoughtware-user-ui';

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
                bgroup={"testrubo"}
            />
        </div>
    )
}

export default DomainRole
