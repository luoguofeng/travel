# 开发流程

## 安装依赖包

1. fastclick--解决移动端点击事件有300ms延迟

>配置 `fastClick.attach(document.body)`

2. less | less-loader

## 初始化文件

+ `reset.css` //初始化样式
+ `border.css` //解决1像素边框在多倍屏上的差异

## 完成头部区域

1. webpack默认设置@符号代表我们的src,可以在config中自定义设置来简化代码
2. 建立varibles.less文件来存放我们的重复的css属性,直接@变量名:属性值,在需要使用文件的地方导入文件即可使用@变量名,在style中导入文件路径想使用@符号或者自定义符号时需要在前面加~

## git

### 查看

1. 查看本地分支 `git branch`
2. 查看远程分支 `git branch -r`
3. 查看所有的分支 `git branch -a`

### 创建分支

1. 创建本地分支 `git branch name`
2. 切换到新创建的分支 `git checkout name`
3. 将新分支push到github `git push origin name -u`

### 删除分支

1. git branch -D name

### 合并分支

1. 切换到主分支分支 `git checkout master`
2. 选择要合并的分支 `git merge origin/name`
3. 合并 `git push`

## 完成轮播图区域

1. 使用第三方类库`vue-awesome-swiper`,第一个是显示轮播原点,第二个循环

```js
swiperOption: {pagination: ".swiper-pagination",loop: true }
```

2. 修改轮播原点是组件内部的样式,要在组件中局部修改第三方组件的样式，而又不想去除scoped属性造成组件之间的样式污染。此时只能通过>>>，穿透scoped。有些Sass 之类的预处理器无法正确解析 >>>。可以使用 /deep/ 操作符( >>> 的别名),也可以使用混合本地和全局样式,一个全局的style和一个带scoped的style

3. 通过配置全局axios`Vue.prototype.$axios=axios`来发送请求获取轮播区域数据,数据用json文件来模拟,放在static文件夹下

4. 滑动轮播图测试时发现滑动报错 `[Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted`
> 解决办法：若用到touch事件
+ 在监听touch事件时加上第三个参数false
```js
ele.addEventListener(event, handler, false)
```
+ 若未用到`增加全局样式* { touch-action: none; }`

## 完成图标区域

1. 图标区域要实现分页功能,利用`computed`计算属性来实现,将一个`iconList`的元素分成多个数组来实现分组

```js
  computed: {
    pages() {
      const pages = [];
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  }
```

2. 将经常可以使用的css代码封装到less函数中

+ 文字过多时显示省略号

```css
@ellipses:{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
@ellipses();
```

## 完成首页

1. 优化ajax请求,将所有的数据都放在一个json文件,通过一次请求来获取所有数据,然后通过父子间传值的方式来传递数据
2. 发现了进入首页轮播图不自动轮播的问题,由于父组件最开始传递过来的是空数组,此时轮播组件也默认被创建了,所以当有了数据时不会轮播,解决办法,通过v-if来判断数组是否有数据,有数据才创建,通过计算属性来计算``
