import React from "react";
import { DomainRole } from 'tiklab-user-ui';

/**
 * 包装权限
 */
const DomainPrivilege = props => {
    const repositoryId = sessionStorage.getItem('repositoryId')

    return (
            <DomainRole
                {...props} 
                domainId = {repositoryId}
                bgroup={"teston"}
            />
    )
}

export default DomainPrivilege
