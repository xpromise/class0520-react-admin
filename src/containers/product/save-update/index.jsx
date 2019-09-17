import React, { Component } from 'react';
import { Card, Icon, Input, Form, Button, Select, InputNumber } from 'antd';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux';
import { getCategories } from '@redux/action-creators';

import RichTextEditor from '../rich-text-editor';

const { Item } = Form;
const { Option } = Select;

@connect(
  (state) => ({categories: state.categories}),
  { getCategories }
)
@Form.create()
class SaveUpdate extends Component {
  
  richTextEditor = React.createRef();

  submit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { editorState } = this.richTextEditor.current.state;
        // 将 editorState 装换成 html 文本
        const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        console.log(detail);
        const { name, desc, price, categoryId } = values;
        console.log(name, desc, price, categoryId);
        // 发送请求

      }
    })
  };

  componentDidMount() {
    if (this.props.categories.length) return;
    this.props.getCategories();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return <Card title={<div><Icon type="arrow-left"/><span>添加商品</span></div>}>
      <Form labelCol={{span: 2}} wrapperCol={{span: 8}} onSubmit={this.submit}>
        <Item label="商品名称">
          {
            getFieldDecorator(
              "name",
              {
                rules: [
                  { required: true, message: '请输入商品名称' }
                ]
              }
            )(
              <Input placeholder="请输入商品名称"/>
            )
          }
        </Item>
        <Item label="商品描述">
          {
            getFieldDecorator(
              'desc',
              {
                rules: [
                  { required: true, message: '请输入商品描述' }
                ]
              }
            )(
              <Input placeholder="请输入商品描述"/>
            )
          }
        </Item>
        <Item label="商品分类">
          {
            getFieldDecorator(
              'categoryId',
              {
                rules: [
                  { required: true, message: '请选择商品分类' }
                ]
              }
            )(
              <Select placeholder="请选择商品分类">
                {
                  this.props.categories.map((category) => {
                    return <Option key={category._id} value={category._id}>{category.name}</Option>
                  })
                }
              </Select>
            )
          }
        </Item>
        <Item label="商品价格">
          {
            getFieldDecorator(
              'price',
              {
                rules: [
                  {required: true, message: '请输入商品价格'}
                ]
              }
            )(
              <InputNumber
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                style={{width: 150}}
              />
            )
          }
        </Item>
        <Item label="商品详情" wrapperCol={{span: 20}}>
          <RichTextEditor ref={this.richTextEditor}/>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Item>
      </Form>
    </Card>;
  }
}

export default SaveUpdate;