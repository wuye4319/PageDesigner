/**
 * 云枢
 * @Author lizuping
 * @Date: 2019-05-15
 * @Last Modified by: lizuping
 * @Last Modified time: 2019-11-20 18:42:45
 */
import { UserService, UserInfo, DepartmentInfo, OrganizationType } from '@/admin/components/common/smart-org/controls';
import organizationApi from './api'

let defau:UserService = {
  async getDepartmentsBy(deptIds?: string, filterType?:string): Promise<{
          departments: DepartmentInfo[]
          myDepartment?: DepartmentInfo[]
        }> {
    const res = await organizationApi.getOrgTree(deptIds, filterType);
    const data = res.data;

    const map = (d: any) => {
      d.type = OrganizationType.Department;
      return d;
    };

    const departments = data.departmentList.map(map);

    let myDepartment: DepartmentInfo[] | undefined;

    if (data.myDepartment) {
      myDepartment = data.myDepartment.map(map);
    }

    return {
      departments,
      myDepartment
    };
  },
  async getOrganizationLevel(userId: string) {
    const res = await organizationApi.getOrganizationLevel(userId);
    if (res.errcode !== 0) {
      return null;
    }
    return res.data as any;
  },
  async getUsersBy(deptId: string, roleId?: string, filterType?:string): Promise<UserInfo[]> {
    const res = await organizationApi.getUsersTree(deptId, roleId, filterType);
    const data = res.data;

    const map = (d: any) => {
      d.type = OrganizationType.User;
      if (Array.isArray(d.departments)) {
        d.parentId = d.departments.filter((x: any) => x && x.id).map((x: any) => x.id);
      }
      return d;
    };

    const users = data.map(map);
    return users;
  },
  async search(name: string, deptIds?: string, roleIds?: string, filterType?:string): Promise<{
    departments?: DepartmentInfo[]
    users?: UserInfo[]
  }> {
    const res = await organizationApi.search(name, deptIds, roleIds, filterType);
    const data = res.data;

    let departments: DepartmentInfo[] | undefined;
    let users: UserInfo[] | undefined;

    if (data.departments) {
      departments = data.departments.map((d: any) => {
        d.type = OrganizationType.Department;
        return d;
      });
    }

    if (data.users) {
      users = data.users.map((u: any) => {
        u.type = OrganizationType.User;
        if (Array.isArray(u.departments)) {
          u.parentId = u.departments.filter((d: any) => d && d.id).map((d: any) => d.id);
        }
        return u;
      });
    }

    return {
      departments,
      users
    };
  }
}
export default defau
