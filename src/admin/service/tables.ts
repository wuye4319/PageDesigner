
/**
 * 数据中心 请求数据相关API
 * @Author lizuping
 * @Date: 2019-05-15
 * @Last Modified by: lizuping
 * @Last Modified time: 2019-11-20 18:42:45
 */

import pm from './axiosTool';
let api:{
  tool:Function,
  getAllTables:Function,
  addTable:Function,
  deleTable:Function,
  getTableMessage:Function,
  addTableColunm:Function,
  deleTableColunm:Function,
  addContent:Function,
  deleContent:Function
  putContent:Function
  } = {
    tool(res, that) {
      if (res.status === 200) {
        return res.data
      } else {
        if (that) {
          console.log(that.$message)
          that.$message.error(res.msg)
        }
        return false;
      }
    },
    // 得到数据对像列表
    getAllTables(appID, params) {
      return pm(0, '/tables/alltables/' + appID, params) // params:分页属性
    },
    // 增加数据对像
    addTable(appID, params) {
      return pm(3, '/tables/addtable/' + appID, { params })// params:{ description: string,title: string}
    },
    // 删除某个数据对像
    deleTable(tableName, appID) {
      return pm(1, '/tables/tablemessage/' + tableName, { appID })
    },
    // 根据表名获取数据对像的内容和字段
    getTableMessage(tableName, other) {
      return pm(0, '/tables/tablemessage/' + tableName, other)
    },
    // 增加字段
    addTableColunm(tableName, params) {
      return pm(3, '/tables/tablecolumn/' + tableName, { params }) // params:{column_name: ‘string’, column_type:‘string’,column_comment:’string’}
    },
    // 删除字段
    deleTableColunm(tableName, params) {
      return pm(1, '/tables/tablecolumn/' + tableName, { column_name: params })// params:{column_name: ‘string’}
    },
    // 新增数据内容
    addContent(tableName, params) {
      return pm(3, '/tables/tablecontent/' + tableName, { params })// params:根据数据结构传
    },
    // 删除数据内容
    deleContent(tableName, params) {
      return pm(1, '/tables/tablecontent/' + tableName, { id: params })// params:{id:number}
    },
    // 修改数据内容
    putContent(tableName, params) {
      return pm(2, '/tables/tablecontent/' + tableName, { params })// params:根据数据结构传
    }
  }

export default api;
