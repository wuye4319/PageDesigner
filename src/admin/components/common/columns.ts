export const columns = {
  manage: [
    {
      title: '名称',
      dataIndex: 'appName',
      // sorter: true,
      width: '15%'
    },
    {
      title: '类型',
      dataIndex: 'screen',
      // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
      // sorter: true,
      width: '10%'
    },
    {
      title: '缩略图',
      dataIndex: 'pic',
      width: '10%',
      scopedSlots: { customRender: 'pic' }
    },
    {
      title: '描述',
      width: '37%',
      dataIndex: 'description'
    },
    {
      title: '操作',
      width: '28%',
      dataIndex: 'actions',
      scopedSlots: { customRender: 'actions' }
    }
  ],
  compList: [
    {
      title: '名称',
      dataIndex: 'compName',
      // sorter: true,
      width: '15%'
    },
    {
      title: '类型',
      dataIndex: 'type',
      // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
      // sorter: true,
      width: '10%'
    },
    {
      title: '缩略图',
      dataIndex: 'pic',
      width: '10%',
      scopedSlots: { customRender: 'pic' }
    },
    {
      title: '描述',
      width: '37%',
      dataIndex: 'description'
    },
    {
      title: '操作',
      width: '28%',
      dataIndex: 'actions',
      scopedSlots: { customRender: 'actions' }
    }
  ]
};
