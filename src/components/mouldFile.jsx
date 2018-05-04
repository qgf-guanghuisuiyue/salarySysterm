import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';
import columns from 'data/table-columns/mouldFile';
import SaveTempModalComponent from './mouldFile/saveTempModal';

import {AjaxByToken} from 'utils/ajax';
import {Input, Button, Table} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class MouldFile extends React.Component{
    
    state = {
      corpCode: '' //公司名称
    }

    componentDidMount() {
        const  {corpCode} = this.state;
        this.props.getTempList({corpCode});
    }

    onHandleSearch = (field, e) => {
      this.setState({
        [field]: e.target.value
      })
    }

    saveTemp = () => {
        const {getCorpList, showSaveTempModal} = this.props;
        showSaveTempModal(getCorpList);        
    }

    render(){
        const {corpCode} = this.state;
        const {temp, getTempList, corpData} = this.props;
        const {tempData} = temp;
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
                            <Button 
                                icon="plus-square" 
                                type="primary"
                                style={{marginRight: 50}}
                                onClick={this.saveTemp}
                            >新增</Button>
                            <Button 
                                icon="delete"
                                type="primary"
                            >停用</Button>
                        </div>
                        <Table 
                           rowSelection={rowSelection} 
                           columns={columns} 
                           dataSource={tempData.list} 
                           bordered={true}
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
})
const mapDispatchToProps = dispatch => ({
      getTempList: bindActionCreators(Actions.SystemActions.getTempList, dispatch),
      tempSave: bindActionCreators(Actions.SystemActions.tempSave, dispatch),
      showSaveTempModal: bindActionCreators(Actions.SystemActions.showSaveTempModal, dispatch),
      getCorpList: bindActionCreators(Actions.SystemActions.getCorpList, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MouldFile);