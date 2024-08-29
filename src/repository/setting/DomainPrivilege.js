import React from "react";
import { DomainRole } from 'thoughtware-privilege-ui';

/**
 * 包装权限
 */
const DomainPrivilege = props => {
    const repositoryId = sessionStorage.getItem('repositoryId')

    return (
            <DomainRole
                {...props} 
                domainId = {repositoryId}
                bgroup={"testrubo"}
            />
    )
}

export default DomainPrivilege
