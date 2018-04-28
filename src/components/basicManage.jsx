import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/basic';
import SaveParameterModal from './basicManage/saveParameterModal';

import {AjaxByToken} from 'utils/ajax';
import {Select, Button, Table} from 'antd';
const Option = Select.Option;

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class BasicManage extends React.Component{

    state = {
      type: '',
      value: '',
      page: 1,
    }

    params = {
      skip: 0,
      count: 10
    }

    _getColumns() {
        columns[0].render = (text,record,index) => {           
            return  <a>{index+1+(this.state.page-1)*5}</a>
        }
        return columns;
    }

    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        });
        const {
            type,
            value
        } = this.state;
        const {getParameterList} = this.props;
        this.param.skip = page * 5 - 5;
        getParameterList({count:5,skip:this.param.skip, type, value})
    }

    showParameterModal = (record) => {
        console.log(record)
    }

    onHandleChange = (field, value) => {
      this.setState({
          [field]: value
      })
    }

    searchChange = () => {
      const {
        type,
        value
      } = this.state;
      this.props.getParameterList({...this.params, type, value})
    }

    saveParameter = () => {
      this.props.parameterSave()
    }

    render(){

        const {parameter} = this.props;
        console.log(parameter.list)
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
            <div className=" layout common">
                {/* 基础管理 */}
                <div className="basicManage">
                    <h2 className="File-title">查询</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">参数类型:</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择参数类型'
                                    onChange={this.onHandleChange.bind(this, 'type')}
                            >
                              <Option value="1">公司参数</Option>
                              <Option value="2">系统参数</Option>
                            </Select>
                        </div>
                        <div className="inline-block">
                            <span className="title">公司名称</span>
                            <Select  style={{width: 200}}
                                    placeholder='请选择公司'
                                    onChange={this.onHandleChange.bind(this, 'value')}
                            >
                                    {
                                        [
                                            '海银会', 
                                            '银都',
                                            '零点花花',
                                            '西藏新路驰迅'
                                        ].map((item , index)=>{
                                            return <Option key={index} value={item}>{item}</Option>
                                        })
                                    }
                            </Select>
                        </div>  
                        <Button type="primary" 
                                style={{marginLeft: 20}}
                                onClick={this.searchChange}
                        >查询</Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button 
                                icon="plus-square" 
                                style={{marginRight: 50}}
                                onClick={this.saveParameter}
                              >新增</Button>
                            <Button icon="delete">删除</Button>
                        </div>
                        <Table 
                          rowSelection={rowSelection} 
                          columns={this._getColumns()} 
                          dataSource={parameter.list} 
                          bordered={true}
                          pagination={{
                            defaultPageSize:5,
                            total: parameter.sum,
                            onChange: this.onChangePagination
                          }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    parameter: state.System.parameter,
})
const mapDispatchToProps = dispatch => ({
    getParameterList: bindActionCreators(Actions.SystemActions.getParameterList, dispatch),
    parameterSave: bindActionCreators(Actions.SystemActions.parameterSave, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BasicManage);