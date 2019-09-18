import React, { Component } from 'react';
import { Form, Input, Tree } from 'antd';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import menus from '@config/menus';

const Item = Form.Item;
const { TreeNode } = Tree;

@Form.create()
@withTranslation()
class UpdateRoleForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired,
    getCheckedKeys: PropTypes.func.isRequired
  };
  state = {
    checkedKeys: [],
  };

  /*static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.role.menus) {

    }
  }*/

  getTreeData = () => {
    const treeData = menus.map((menu) => {
      if (menu.children) {
        return {
          title: menu.title,
          key: menu.key,
          children: menu.children.map((cMenu) => {
            return {
              title: cMenu.title,
              key: cMenu.key,
            }
          })
        }
      } else {
        return {
          title: menu.title,
          key: menu.key,
        }
      }
    });

    return [
      {
        title: '平台权限',
        key: 'admin',
        children: treeData
      }
    ]
  };

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys }, () => {
      // 当状态更新完成就触发 （componentDidUpdate之后触发的）
      // 子组件调用父组件的方法，将数据传递给父组件
      this.props.getCheckedKeys(checkedKeys);
      // 不会触发更新   this.setState才会触发更新
      this.state.checkedKeys = [];
    });
  };
  
  renderTreeNodes = data => data.map((item) => {
    const { t } = this.props;
    if (item.children) {
      return (
        <TreeNode title={t(item.title)} key={item.key} dataRef={item}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode title={t(item.title)} key={item.key} />;
  });
  
  render () {
    const { getFieldDecorator } = this.props.form;
    const { name, menus } = this.props.role;
    const { checkedKeys } = this.state;

    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {
                initialValue: name
              }
            )(
              <Input placeholder='请输入角色名称' disabled/>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator(
              'menus',
            )(
              <Tree
                checkable
                defaultExpandAll
                checkedKeys={checkedKeys.length ? checkedKeys : menus}
                onCheck={this.onCheck}
              >
                {this.renderTreeNodes(this.getTreeData())}
              </Tree>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default UpdateRoleForm;