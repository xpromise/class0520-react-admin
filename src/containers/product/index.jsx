import React, { Component } from 'react';
import { Card, Select, Input, Button, Icon, Table } from 'antd';

import { reqGetProducts, reqSearchProducts } from '@api';

import './index.less';

const { Option } = Select;

class Product extends Component {
  state = {
    total: 0,
    products: [],
    searchKey: 'productName',
    searchValue: '',
    isSearch: false,
    pageNum: 1,
    pageSize: 3,
    prevSearchValue: ''
  };

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: () => {
        return <div>
          <Button type="primary">下架</Button>
          <span>已上架</span>
        </div>
      }
    },
    {
      title: '操作',
      // dataIndex: 'status',
      render: (product) => {
        return <div>
          <Button type="link">详情</Button>
          <Button type="link" onClick={this.goSaveUpdate(product)}>修改</Button>
        </div>
      }
    }
  ];

  getProducts = async (pageNum, pageSize) => {
    const { isSearch, prevSearchValue } = this.state;

    let result;

    if (isSearch) {
      // 说明搜索过，发送搜索请求
      const { searchKey } = this.state;
      result = await reqSearchProducts({searchKey, searchValue: prevSearchValue, pageNum, pageSize});
    } else {
      // 说明没有搜索
      result = await reqGetProducts(pageNum, pageSize);
    }

    this.setState({
      total: result.total,
      products: result.list,
      pageNum,
      pageSize,
      searchValue: prevSearchValue
    })
  };

  componentDidMount() {
    this.getProducts(1, 3);
  }

  goSaveUpdate = (product) => {
    return () => {
      this.props.history.push('/product/saveupdate', product);
    }
  };

  select = (value) => {
    this.setState({
      searchKey: value
    })
  };

  change = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  };

  search = async () => {
    const { searchKey, searchValue, pageNum, pageSize } = this.state;
    const result = await reqSearchProducts({searchKey, searchValue, pageNum, pageSize});
    this.setState({
      total: result.total,
      products: result.list,
      isSearch: true,
      prevSearchValue: searchValue
    })
  };

  render() {
    const { products, total, searchKey, searchValue } = this.state;

    return <Card
      title={<div>
        <Select value={searchKey} onChange={this.select}>
          <Option key="1" value="productName">根据商品名称</Option>
          <Option key="2" value="productDesc">根据商品描述</Option>
        </Select>
        <Input placeholder="关键字" value={searchValue} className="product-input" onChange={this.change}/>
        <Button type="primary" onClick={this.search}>搜索</Button>
      </div>}
      extra={<Button type="primary" onClick={this.goSaveUpdate()}><Icon type="plus"/>添加商品</Button>}
    >
      <Table
        columns={this.columns}
        dataSource={products}
        bordered
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          defaultPageSize: 3,
          total,
          onChange: this.getProducts,
          onShowSizeChange: this.getProducts
        }}
        rowKey="_id"
      />
    </Card>;
  }
}

export default Product;