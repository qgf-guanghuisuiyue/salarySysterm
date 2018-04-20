import React from 'react';
import moment from 'moment';
// 格式化时间
const renderTime = (text,record,index) => {
    return moment(text).format('YYYY-MM-DD');
}
const renderTextWithATag = (text, record, index) => {
    return <a href="javascript:;" title={text}>{text}</a>
}

module.exports = [
    {
        title: '序号',
        dataIndex: 'key',
        width:50
    }, 
    {
        title: '批次号',
        dataIndex: 'batchno',
        width:150
    }, 
    {
        title: '公司名称',
        dataIndex: 'corpname',
        width:200
    }, 
    {
        title: '代发申请文件名称',
        dataIndex: 'payapplyfilename',
        width:200
    }, 
    {
        title: '总笔数',
        dataIndex: 'totalcount',
        width:100
    }, 
    {
        title: '总金额',
        dataIndex: 'totalamount',
        width:100
    }, 
    {
        title: '申请时间',
        dataIndex: 'applydate',
        width:150
    }, 
    {
        title: '处理状态',
        dataIndex: 'status',
        width:150
    },
    {
        title: '',
        dataIndex: 'detail',
        width:100
    }
]