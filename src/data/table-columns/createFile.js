module.exports = [
        {
        title: '序号',
        dataIndex: 'key',
        width:50
        }, 
        {
        title: '姓名',
        dataIndex: 'name',
        width:100,
        render: text => <a href="#">{text}</a>,
      }, 
      {
        title: '卡号',
        dataIndex: 'cardno',
        width:200,
      }, {
        title: '开户行',
        dataIndex: 'bankname',
        width:200,
      }, {
        title: '开户地',
        dataIndex: 'bankplace',
        width:200,
      }, {
        title: '金额',
        dataIndex: 'amount',
        width:100,
      }, {
        title: '备注',
        dataIndex: 'remark',
        width:150,
      }
]