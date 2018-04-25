module.exports = [
    {
        title: '序号',
        dataIndex: 'key',
    }, {
        title: '批次号',
        dataIndex: 'batchno',
        render: text => <a href="#">{text}</a>,
    }, {
        title: '公司名称',
        dataIndex: 'corpname',
    }, {
        title: '代发申请文件名称',
        dataIndex: 'payapplyfilename',
    }, {
        title: '总笔数',
        dataIndex: 'totalcount',
    }, {
        title: '总金额',
        dataIndex: 'totalamount',
    }, {
        title: '申请时间',
        dataIndex: 'applydate',
    }, {
        title: '期望代发时间',
        dataIndex: 'exptpaydate',
    }, {
        title: '申请结果',
        dataIndex: 'status',
    }, {
        title: '',
        dataIndex: 'detail',
    }
]