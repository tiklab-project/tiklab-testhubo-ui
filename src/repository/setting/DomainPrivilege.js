import React from "react";
import { DomainRole } from 'thoughtware-privilege-ui';

/**
 * 包装权限
 */
const DomainPrivilege = props => {
    const repositoryId = sessionStorage.getItem('repositoryId')

    return (
        <div className={"table-list-box"}>
            <DomainRole
                {...props} 
                domainId = {repositoryId}
                bgroup={"testrubo"}
            />
        </div>
    )
}

export default DomainPrivilege
