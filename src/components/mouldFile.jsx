import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/mouldFile';

import {AjaxByToken} from 'utils/ajax';
import {Input, Button, Table} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class MouldFile extends React.Component{
    
    state = {
      corpCode: ''
    }

    componentDidMount() {
        const  {corpCode} = this.state;
        this.props.tempList({corpCode});
    }

    onHandleSearch = (field, e) => {
      this.setState({
        [field]: e.target.value
      })
    }

    render(){
        const {corpCode} = this.state;
        const {temp} = this.props;
        
          // 通过 rowSelection 对象表明需要行选择
          const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect(record, selected, selectedRows) {
              console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
              console.log(selected, selectedRows, changeRows);
            },
          };
        return(
            <div className="layout common">
                {/* 模板文件 */}
                <div className="mouldFile">
                    <h2 className="File-title">查询</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">公司名称：</span>
                            <Input 
                               style={{width: 200}}
                               value={corpCode}
                               onChange={this.onHandleSearch.bind(this, 'corpCode')}
                            />
                        </div>
                        <Button type="primary" style={{marginLeft: 20}}>查询</Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button icon="plus-square" style={{marginRight: 50}}>新增</Button>
                            <Button icon="delete">停用</Button>
                        </div>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={temp.list} bordered={true}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
      temp: state.System.temp,
})
const mapDispatchToProps = dispatch => ({
      tempList: bindActionCreators(Actions.SystemActions.tempList, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MouldFile);