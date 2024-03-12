// Tab页的data
let tabData = {
  tabIndex: 0,
  tabBar: {
    showplate: '',
    custom: true,
    color: '#333333',
    selectedColor: '#0097E0',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [] as {
      pagePath: string
      text: string
      iconPath: string
      selectedIconPath:string,
    }[]
  }
}
 
// 更新菜单
export const updateRole = (that: WechatMiniprogram.Component.InstanceMethods<typeof tabData>, type:string) => {
  if (type === '0') {
    // 企业用户
    tabData.tabBar.list = [
      {
        pagePath: '/pages/index/home/index',
        text: '首页',
        iconPath: '/assets/images/home.png',
        selectedIconPath: '/assets/images/home-active.png'
      },
      {
        pagePath: '/pages/quotation/home/index',
        text: '报价汇总',
        iconPath: '/assets/images/echart.png',
        selectedIconPath: '/assets/images/echart-active.png'
      },
      {
        pagePath: '/pages/my/home/index',
        text: '我的',
        iconPath: '/assets/images/my.png',
        selectedIconPath: '/assets/images/my-active.png'
      }
    ]
  } else if (type === '1') {
    // 银行用户
    tabData.tabBar.list = [
      {
        pagePath: '/pages/index/home/index',
        text: '首页',
        iconPath: '/assets/images/home.png',
        selectedIconPath: '/assets/images/home-active.png'
      },
      {
        pagePath: '/pages/quotation/home/index',
        text: '报价汇总',
        iconPath: '/assets/images/echart.png',
        selectedIconPath: '/assets/images/echart-active.png'
      },
      {
        pagePath: '/pages/publish/home/index',
        text: '发布',
        iconPath: '/assets/images/pub.png',
        selectedIconPath: '/assets/images/pub-active.png'
      },
      {
        pagePath: '/pages/my/home/index',
        text: '我的',
        iconPath: '/assets/images/my.png',
        selectedIconPath: '/assets/images/my-active.png'
      }
    ]
  }
  updateTab(that);
}
 
// 更新底部高亮
export const updateIndex = (that: WechatMiniprogram.Component.InstanceMethods<typeof tabData>, index:number) => {
  tabData.tabIndex = index;
  updateTab(that);
}
export const updateLastIndex = (that: WechatMiniprogram.Component.InstanceMethods<typeof tabData>) => {
  const index = tabData.tabBar.list.length - 1
  tabData.tabIndex = index;
  updateTab(that);
}
 
// 更新Tab状态
export const updateTab = (that: WechatMiniprogram.Component.InstanceMethods<typeof tabData>) => {
  if (that) {
    if (
      typeof that.getTabBar === 'function' &&
      that.getTabBar()
    ) {
      that.getTabBar().setData(tabData)
    }
   }
    
}
 
// 将可调用的方法抛出让外面调用
// module.exports = {
//   updateRole, updateTab, updateIndex, updateLastIndex
// }
