import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/basic';
import SaveParameterModal from './basicManage/saveParameterModal';

import {AjaxByToken} from 'utils/ajax';
import {Select, Button, Table, notification} from 'antd';
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
      idList: []
    }

    params = {
      skip: 0,
      count: 10
    }

    componentDidMount(){
        this.props.getCorpList()
    }
    
    _getColumns() {
        columns[0].render = (text,record,index) => {           
            return  <a>{index+1+(this.state.page-1)*10}</a>
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
        this.param.skip = page * 10 - 10;
        getParameterList({count:10,skip:this.param.skip, type, value})
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
        this.props.showSaveParameterModal()
    }

    deleteParameter = () => {
        const {idList} = this.state;
        const {parameterDelete, getParameterList} = this.props;
        if(idList.length == 0) {
            notification.warning({
                message: '警告',
                description: '请选择参数',
                style:{top:40}
            });
        }else if(idList.length > 1) {
            notification.warning({
                message: '警告',
                description: '一次只能删除一个参数',
                style:{top:40}
            });
        } else {
            parameterDelete({ID: idList[0]}, getParameterList)
        }
    }

    rowSelection = (selectedRowKeys, selectedRows) => {
        let idList = selectedRows.map((item,index) => {
            return item.id;
        })
        this.setState({idList})
    }

    render(){

        const {parameter, corpData} = this.props;
        const {parameterData} = parameter;
        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
          onChange: this.rowSelection
        };
        let list = corpData.list?corpData.list:[];
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
                            <Select style={{width: 200}}
                                    placeholder='请选择公司名称'
                                    onChange={this.onHandleChange.bind(this, 'corpcode')}
                            >
                                {
                                    list.map( (item,index)=>{
                                        return <Option key={index} value={item.corpCode}>{item.corpName}</Option>
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
                                type="primary"
                                style={{marginRight: 50}}
                                onClick={this.saveParameter}
                              >新增</Button>
                            <Button 
                                icon="delete"
                                type="primary"
                                onClick={this.deleteParameter}
                            >删除</Button>
                        </div>
                        <Table 
                          rowSelection={rowSelection} 
                          columns={this._getColumns()} 
                          dataSource={parameterData.list} 
                          bordered={true}
                          pagination={{
                            defaultPageSize:10,
                            total: parameterData.sum,
                            onChange: this.onChangePagination
                          }}
                        />
                    </div>
                </div>
                <SaveParameterModal/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    parameter: state.System.parameter,
    saveParameterVisible: state.System.saveParameterVisible,
    corpData: state.System.corpData,
})
const mapDispatchToProps = dispatch => ({
    getParameterList: bindActionCreators(Actions.SystemActions.getParameterList, dispatch),
    showSaveParameterModal: bindActionCreators(Actions.SystemActions.showSaveParameterModal, dispatch),
    parameterDelete: bindActionCreators(Actions.SystemActions.parameterDelete, dispatch),
    getCorpList: bindActionCreators(Actions.SystemActions.getCorpList, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BasicManage);