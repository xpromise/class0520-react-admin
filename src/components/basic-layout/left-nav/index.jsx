import React, { Component } from 'react';
import { Icon, Menu } from "antd";
import { withRouter, Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setTitle } from '@redux/action-creators';
import menus from '@config/menus';

const { SubMenu } = Menu;

@connect(
  (state) => ({menus: state.user.user.menus}),
  { setTitle }
)
@withTranslation()
@withRouter
class LeftNav extends Component {

  constructor(props) {
    super(props);
    let { pathname } = this.props.location;
    pathname = pathname.startsWith('/product') ? '/product' : pathname;
    this.newMenus = this.filterMenus();
    this.menus = this.createMenu(this.newMenus);
    this.openKeys = this.findOpenKeys(pathname);
  }

  createItem = (menu) => {
    return <Menu.Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon} />
        <span>{this.props.t(menu.title)}</span>
      </Link>
    </Menu.Item>
  };

  createMenu = (menus) => {
    return menus.map((menu) => {
      // 判断是否是二级菜单
      if (menu.children) {
        // 二级菜单
        return <SubMenu
          key={menu.key}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{this.props.t(menu.title)}</span>
            </span>
          }
        >
          {
            menu.children.map((cMenu) => {
              return this.createItem(cMenu);
            })
          }
        </SubMenu>
      } else {
        // 一级菜单
        return this.createItem(menu);
      }
    })
  };

  filterMenus = () => {
    return menus.reduce((prev, curr) => {
      /*
        prev 上一次返回值
        curr 当前遍历元素的值
       */
      // 判断一级菜单
      const result = this.props.menus.includes(curr.key);
      if (result) {
        prev.push(curr);
      } else if (curr.children) {
        const cMenus = curr.children.filter((menu) => this.props.menus.includes(menu.key));
        if (cMenus.length) {
          // 不能修改原数据
          // 覆盖children属性
          // curr.children = cMenus;
          prev.push({...curr, children: cMenus});
        }
      }

      return prev;
    }, [])
  };

  findOpenKeys = (pathname) => {
    /*let openKeys = '';
    menus.forEach((menu) => {
      if (menu.children) {
        menu.children.forEach((cMenu) => {
          if (cMenu.key === pathname) {
            openKeys = menu.key
          }
        })
      }
    });
    return openKeys;*/

    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu.children) {
        for (let j = 0; j < menu.children.length; j++) {
          const cMenu = menu.children[j];
          if (pathname.startsWith(cMenu.key)) {
            return menu.key;
          }
        }
      }
    }
  };

  findTitle = (pathname, menus) => {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu.children) {
        for (let j = 0; j < menu.children.length; j++) {
          const cMenu = menu.children[j];
          /*
            /product
            /product/saveupdate
            startsWith 以...开头
           */
          if (pathname.startsWith(cMenu.key)) {
            return cMenu.title;
          }
        }
      } else {
        if (menu.key === pathname) {
          return menu.title;
        }
      }
    }
    return 'Not Match';
  };

  select = ({key}) => {
    const title = this.findTitle(key, this.newMenus);
    this.props.setTitle(title);
  };

  componentDidMount() {
    const { location : {pathname} } = this.props;
    const title = this.findTitle(pathname, this.newMenus);
    console.log(title);
    this.props.setTitle(title);
  }

  render() {
    let { pathname } = this.props.location;
    pathname = pathname.startsWith('/product') ? '/product' : pathname;

    return <Menu
      theme="dark"
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={[this.openKeys]}
      mode="inline"
      onSelect={this.select}
    >
      {
        this.menus
      }
    </Menu>;
  }
}

export default LeftNav;