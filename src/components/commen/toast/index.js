import Toast from "./Toast"

const toastShow = {};

// 当对插件进行安装时, 会调用对象的install函数
toastShow.install = function (Vue) {
    // 1.创建组件构造器, 这就是创建子组件构造器的第一步,
    const toastConstructor = Vue.extend(Toast);
    // 2. 使用new可以根据组件构造器创建一个组件对象
    const toast = new toastConstructor();
    // 3. 将组件对象手动的挂载($mount)到DOM元素上
    toast.$mount(document.createElement("div"));
    // 4. 将上面的div元素(toast.$el), 增加到我们的页面中
    document.body.appendChild(toast.$el)

    // ** 注意: 这里的$toast对象是我们创建出的组件对象, 而不是组件模板
    Vue.prototype.$toast = toast;
}

export default toastShow