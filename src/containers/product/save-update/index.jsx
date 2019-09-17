import React, {Component} from 'react';
import {Card, Icon, Input, Form, Button, Select, InputNumber} from 'antd';
import {convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {connect} from 'react-redux';
import {getCategories} from '@redux/action-creators';

import {reqAddProduct, reqUpdateProduct} from '@api';

import RichTextEditor from '../rich-text-editor';

const {Item} = Form;
const {Option} = Select;

@connect(
  (state) => ({categories: state.categories}),
  {getCategories}
)
@Form.create()
class SaveUpdate extends Component {

  richTextEditor = React.createRef();

  submit = (e) => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {editorState} = this.richTextEditor.current.state;
        // 将 editorState 装换成 html 文本
        const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        console.log(detail);
        const {name, desc, price, categoryId} = values;
        console.log(name, desc, price, categoryId);
        // 发送请求
        const product = this.props.location.state;
        if (product) {
          const productId = product._id;
          await reqUpdateProduct({name, desc, price, categoryId, detail, productId});
        } else {
          await reqAddProduct({name, desc, price, categoryId, detail});
        }
        // 跳转到 /product
        this.props.history.push('/product');
      }
    })
  };

  componentDidMount() {
    if (this.props.categories.length) return;
    this.props.getCategories();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const product = this.props.location.state;

    return <Card
      title={<div><Icon type="arrow-left" onClick={this.goBack}/><span>{product ? '更新' : '添加'}商品</span></div>}>
      <Form labelCol={{span: 2}} wrapperCol={{span: 8}} onSubmit={this.submit}>
        <Item label="商品名称">
          {
            getFieldDecorator(
              "name",
              {
                rules: [
                  {required: true, message: '请输入商品名称'}
                ],
                initialValue: product ? product.name : ''
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
                  {required: true, message: '请输入商品描述'}
                ],
                initialValue: product ? product.desc : ''
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
                  {required: true, message: '请选择商品分类'}
                ],
                initialValue: product ? product.categoryId : ''
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
                ],
                initialValue: product ? product.price : ''
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
          <RichTextEditor ref={this.richTextEditor} detail={product ? product.detail : ''}/>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Item>
      </Form>
    </Card>;
  }
}

export default SaveUpdate;