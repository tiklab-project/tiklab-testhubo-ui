import React from "react";
import { DomainRoleList } from 'tiklab-privilege-ui';

const DomainPrivilege = props => {
    const repositoryId = localStorage.getItem('repositoryId')
    return (
            <DomainRoleList
                {...props} 
                domainId = {repositoryId}
            />
    )
}

export default DomainPrivilege
