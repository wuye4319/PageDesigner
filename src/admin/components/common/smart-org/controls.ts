
export interface OrganizationBase {
    id: string
    name: string
}
export interface UserInfo extends OrganizationBase {

    /**
     * 头像
     */
    imgUrl?: string

    status: UserStatus

    [key: string]: any

    type: OrganizationType
}

export interface UserService {

    /**
     * 当前登录用户
     */
   // getCurrentUser(): UserInfo | null

    /**
     * 当前登录用户部门
     */
   // getCurrentUserDept(): DepartmentInfo | null

    /**
     * 获取部门集合   11111111111
     * @param deptId 所属部门ID，无值时获取根部门，多个时以“,”分割
     */
    getDepartmentsBy(deptIds?: string, filterType?:string): Promise<{
        departments: DepartmentInfo[]
        myDepartment?: DepartmentInfo[]
    }>

    /**
     * 获取用户集合 22222222
     * @param deptId 所属部门ID
     * @param roleId 所属角色ID
     */
    getUsersBy(deptId: string, roleId?: string, filterType?: string): Promise<UserInfo[]>

    /**
     * 搜索部门和用户 33333333333
     * @param name 名称
     * @param deptIds 部门编码 “,”分割
     * @param roleIds 角色编码 “,”分割
     */
    search(name: string, deptIds?: string, roleIds?: string, filterType?:string): Promise<{
        departments?: DepartmentInfo[]
        users?: UserInfo[]
    }>

    /**
     * 根据用户ID获取部门列表
     * @param userId
     */
   // getUserDepartments(userId: string): Promise<OrganizationBase[] | null>

    /**
     * 根据用户ID获取组织层级 4444
     * @param userId
     */
    getOrganizationLevel(userId: string): Promise<OrganizationBase[] | null>
}

export interface DepartmentInfo extends OrganizationBase {

    /**
     * 员工数
     */
    employees: number

    /**
     * 叶子节点
     */
    leaf: boolean

    /**
     * 父级部门ID
     */
    parentId?: string

    type: OrganizationType
}
/**
 * 用户状态
 */
export enum UserStatus {

    /**
     * 启用
     */
    Enable = 'ENABLE',

    /**
     * 禁用
     */
    Disable = 'DISABLE'
}

/**
 * 机构类型
 */
export enum OrganizationType {

    /**
     * 部门
     */
    Department = 1,

    /**
     * 角色
     */
    Role = 2,

    /**
     * 用户
     */
    User = 3

}
