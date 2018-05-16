import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/mouldFile';
import SaveTempModalComponent from './mouldFile/saveTempModal';

import {AjaxByToken} from 'utils/ajax';
import {Input, Button, Table, notification, Select} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class MouldFile extends React.Component{
    
    state = {
      corpName: '', //公司名称
      page: 1,
      selectedList: [],
    }

    params = {
        skip: 0,
        count: 10
    }

    componentDidMount() {
        const  {getCorpList} = this.props;
        getCorpList();
        this.getTempList();
    }

    getTempList = () => {
        const {getTempList} = this.props;
        const  {corpName} = this.state;
        getTempList({corpName, count:10,skip:this.params.skip });
    }

    _getColumns() {
        columns[0].render = (text,record,index) => {           
            return  <a>{index+1+(this.state.page-1)*5}</a>
        }
        columns[columns.length-2].render = (text,record,index) => {           
            return  <span>{record.createdate == null ? '': moment(record.createdate).format('YYYYMMDD')}</span>
        }
        return columns;
    }

    onHandleChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    

    saveTemp = () => {
        this.props.showSaveTempModal();        
    }

    tempStop = () => {
        const {selectedList, status} = this.state;
        const {tempStop, getTempList} = this.props;
        if(selectedList.length == 0) {
            notification.warning({
                message: '警告',
                description: '请选择参数',
                style:{top:40}
            });
        }else if(selectedList.length > 1) {
            notification.warning({
                message: '警告',
                description: '一次只能删除一个参数',
                style:{top:40}
            });
        } else {
            tempStop({ID: selectedList[0].id, status: selectedList[0].status}, getTempList)
        }
    }


    
    rowSelection = (selectedRowKeys, selectedRows) => {
        let selectedList = selectedRows.map((item,index) => {
            return item;
        })
        this.setState({selectedList})
    }

    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        });
        const {
          corpName,
        } = this.state;
        const {getTempList} = this.props;
        this.params.skip = (page -1)*10;
        this.getTempList({count:10,skip:this.params.skip, corpName})
    }


    render(){
        const {corpName} = this.state;
        const {temp, getTempList, corpData} = this.props;
        let list = corpData.list?corpData.list:[];
        const {tempData} = temp;
          // 通过 rowSelection 对象表明需要行选择
          const rowSelection = {
            onChange: this.rowSelection
          };
        return(
            <div className="layout common">
                {/* 模板文件 */}
                <div className="mouldFile">
                    <h2 className="File-title">查询</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">公司名称：</span>
                            <Select style={{width: 200}}
                                    placeholder='请选择公司名称'
                                    onChange={this.onHandleChange.bind(this, 'corpName')}
                            >
                                {
                                    list.map( (item,index)=>{
                                        return <Option key={index} value={item.corpName}>{item.corpName}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <Button type="primary" style={{marginLeft: 20}}
                                onClick={this.getTempList}
                        >查询</Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button 
                                icon="plus-square" 
                                type="primary"
                                style={{marginRight: 50}}
                                onClick={this.saveTemp}
                            >新增</Button>
                            <Button 
                                icon="delete"
                                type="primary"
                                onClick={this.tempStop}
                            >停用/启用</Button>
                        </div>
                        <Table 
                           rowSelection={rowSelection} 
                           columns={this._getColumns()} 
                           dataSource={tempData.list} 
                           bordered={true}
                           pagination={{
                            defaultPageSize:10,
                            total: tempData.sum,
                            onChange: this.onChangePagination,
                            showTotal:total => `共 ${tempData.sum == 0 ? 0 : tempData.sum} 条数据`
                          }}
                        />
                    </div>
                </div>
                <SaveTempModalComponent getTempList={getTempList}></SaveTempModalComponent>
            </div>
        )
    }
}
const mapStateToProps = state => ({
      temp: state.System.temp,
      corpData: state.System.corpData,
})
const mapDispatchToProps = dispatch => ({
      getTempList: bindActionCreators(Actions.SystemActions.getTempList, dispatch),
      showSaveTempModal: bindActionCreators(Actions.SystemActions.showSaveTempModal, dispatch),
      getCorpList: bindActionCreators(Actions.SystemActions.getCorpList, dispatch),
      tempStop: bindActionCreators(Actions.SystemActions.tempStop, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MouldFile);