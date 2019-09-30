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

## 首页

1. 优化ajax请求,将所有的数据都放在一个json文件,通过一次请求来获取所有数据,然后通过父子间传值的方式来传递数据
2. 发现了进入首页轮播图不自动轮播的问题,由于父组件最开始传递过来的是空数组,此时轮播组件也默认被创建了,所以当有了数据时不会轮播,解决办法,通过v-if来判断数组是否有数据,有数据才创建,通过计算属性来计算``
3. 可以通过配置webpack中config来简化我们的请求路径,下面代码代表当以/api来访问的请求都会被转到static/json这个路径

```js
    proxyTable: {
      '/api': {
        target:'http://localhost:8080',
        pathRewrite:{
          '^/api':'static/json'
        }
      }
    },
```

## 城市列表

1. 滑动利用了第三方库`better-scroll`,实现滚动需要保证dom结构为三层,同时将最外层的dom元素传入
2. 点击右侧字母实现滚动到对应字母城市区域,可以利用`this.scroll.scrollToElement()`方法,该方法需要传入你要滚动到的位置的dom对象,首先要list组件要接受到字母组件中被点击的字母,兄弟间传值,可以用bus,也可以通过父子间传值,以父组件为中间商来传递值,然后为每个循环的城市区域绑定`:ref="key"`,key代表每个城市区域的字母,然后通过`this.$refs[this.letter][0]`来获取对应字母的dom对象
3. 实现滑动字母列表显示对应字母,通过滑动事件的三个钩子函数(touchstart|touchmove|touchend)来触发对应的事件,在touchmove对应的事件中来监测滑动到了哪个字母,先通过遍历对象cities来获取一个只包含城市字母的数组,然后先算出A字母距离输入框的Y轴距离`this.$refs['A'][0].offsetTop`,然后算出点击的位置的Y轴距离`e.touches[0].clientY`,减去输入框到顶部的Y轴距离,然后除以每个字母的高度,就能通过` this.$emit('change', this.letters[index])`将滑动到了哪个字母传给list组件了,注意要对index进行边界判断`index >= 0 && index < this.letters.length`
4. 性能优化,由于`touchmove`触发的频率非常高,浪费性能,可以通过加定时器的方式来优化(函数节流)

### 搜索功能

1. 通过遍历父组件传过来的数据来看是否包含搜索的关键词,包含的添加到要循环的列表数组中,由于watch属性触发的频率很高,可以通过定时器来优化(函数节流) 

### 利用vuex来完成组件间数据共享

1. vuex是一个类似公共仓库的东西,store中有五个成员,State(数据存储),Action(处理复杂的改变数据方法然后再传给Mutations),Mutations(要改变state的数据,必须通过Mutations),Getter(类似store中的计算属性)

2. 可以通过对象的扩展运算符来实现优化,`import {mapState} from 'vuex'`,然后在组件的计算属性中通过`...mapState({currentCity:'city'})`来在计算属性中映射一个名为'currentCity',值为state中city的值的成员,如果是方法就再methods中展开

## 利用keep-alive优化性能

1. 由于每次进入首页都会发送一个ajax请求,浪费性能,可以通过keep-alive标签来包裹住路由容器,这样每次重新进入页面就会使用缓存中的数据,而不用重新发送请求,优化了数据
2. 可是首页的请求是根据当前城市变化而变化的,所以当我们当前城市变化了,我们应该重新发起ajax请求,这样就要使用到keep-alive标签为组件提供的一个叫做`activated`的钩子函数,这个钩子函数每次重新进入都会执行,我们可以在这里去判断当前城市有没有被改变,如果有,就发送ajax请求

### 详情页面

### 图片区域

+ 通过点击图片可以查看图片画廊,通过swiper来配置轮播效果,但是每次点击dom结构变化,需要配置选项`observeParents: true,observer: true`来解决不能拖动的bug

### 头部区域

1. 通过给组件的activated这个钩子函数为window绑定滚动触发事件`window.addEventListener`来控制头部的显示与隐藏,修改data中的数据需要用`this.$set`方法,不然dom不会更新视图
2. 头部组件为window绑定了滚动触发事件,会导致其他组件也能触发这个事件,可能会导致很多bug,同时浪费性能,可以在`deactivated`这个钩子函数中调用`window.removeEventListener`来移除事件,这个钩子函数会在页面切换或者组件切换的时候执行
