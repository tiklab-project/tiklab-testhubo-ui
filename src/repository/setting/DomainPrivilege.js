import React from "react";
import { DomainRoleList } from 'tiklab-privilege-ui';

const DomainPrivilege = props => {
    const repositoryId = sessionStorage.getItem('repositoryId')

    return (
            <DomainRoleList
                {...props} 
                domainId = {repositoryId}
                bgroup={"postin"}
            />
    )
}

export default DomainPrivilege
