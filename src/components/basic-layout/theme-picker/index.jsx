import React, { Component } from 'react';
import { Icon, Drawer, Divider, Button } from 'antd';
import { SketchPicker } from 'react-color';

import { createStyle } from '@utils/tools';
import { getItem } from '@utils/storage';

import './index.less';

class ThemePicker extends Component {
  state = {
    visible: false,
    color: getItem('theme-color') || '#1DA57A',
    prevColor: '#1DA57A'
  };

  showDrawer = () => {
    this.setState({
      visible: true
    })
  };

  onClose = () => {
    this.setState({
      visible: false,
      color: this.state.prevColor
    })
  };

  submit = () => {
    const { color } = this.state;
    // 改变主题颜色
    createStyle(color);

    this.setState({
      visible: false,
      prevColor: color
    })
  };

  handleColorChange = ({hex}) => {
    console.log(hex); // 16进制颜色
    this.setState({
      color: hex
    })
  };

  render() {
    const { color, visible } = this.state;

    return <div>
      <div className="theme-picker-btn" onClick={this.showDrawer}>
        <Icon type="setting"/>
      </div>
      <Drawer
        title="主题选择器"
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={visible}
      >
        <SketchPicker
          color={color}
          onChangeComplete={ this.handleColorChange }
        />
        <Divider />
        <Button onClick={this.onClose}>取消</Button>
        <Button onClick={this.submit}>确认</Button>
      </Drawer>
    </div>;
  }
}

export default ThemePicker;