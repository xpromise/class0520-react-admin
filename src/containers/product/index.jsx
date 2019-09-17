import React, { Component } from 'react';
import { Card, Select, Input, Button, Icon, Table } from 'antd';

import { reqGetProducts } from '@api';

import './index.less';

const { Option } = Select;

class Product extends Component {
  state = {
    total: 0,
    products: []
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
      render: () => {
        return <div>
          <Button type="link">详情</Button>
          <Button type="link">修改</Button>
        </div>
      }
    }
  ];

  getProducts = async (pageNum, pageSize) => {
    const result = await reqGetProducts(pageNum, pageSize);
    this.setState({
      total: result.total,
      products: result.list
    })
  };

  componentDidMount() {
    this.getProducts(1, 3);
  }

  render() {
    const { products, total } = this.state;

    return <Card
      title={<div>
        <Select defaultValue="1">
          <Option key="1" value="1">根据商品名称</Option>
          <Option key="2" value="2">根据商品描述</Option>
        </Select>
        <Input placeholder="关键字" className="product-input"/>
        <Button type="primary">搜索</Button>
      </div>}
      extra={<Button type="primary"><Icon type="plus"/>添加商品</Button>}
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