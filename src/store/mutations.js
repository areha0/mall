import { postaddress } from "network/address"
import { _postaddress } from "../utils/postaddress"
export default {
    // 每次在修改vuex时都需要对localStorage进行操作, 以保存当前的状态
    addTocart(state, payload) {
        // 注意: 在购物车中添加商品时, 我们要判断一下该商品是否已经存在, 
        // mutations中的方法最好是只处理一件事, 在这里就是只添加对象, 判断商品是否存在就放在actions中
        state.cartList.push(payload);
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    decrement(state, index) {
        state.cartList[index].count--;
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    increment(state, index) {
        state.cartList[index].count++;
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    checkboxClick(state, payload) {
        state.cartList[payload.index].checked = !payload.checked;
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    selectAll(state) {
        state.cartList.forEach(item => { item.checked = true });
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    selectNone(state) {
        state.cartList.forEach(item => { item.checked = false });
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    setUser(state, user) {
        // 将user存入到locaStorage中
        localStorage.setItem("userInfo", JSON.stringify(user));
        // 将信息存到vuex中
        state.userBaseInfo = user
    },
    setCart(state, shopcart) {
        localStorage.setItem("shopcart", JSON.stringify(shopcart));
        state.cartList = shopcart
    },
    setSearch(state, initKeys) {
        localStorage.setItem("searchkeys", JSON.stringify(initKeys))
        state.searchkeys = initKeys
    },

    // 搜索历史
    addHistory(state, key) {
        // console.log(key);
        if (state.searchkeys.indexOf(key) === -1) {
            state.searchkeys.unshift(key);
            localStorage.setItem("searchkeys", JSON.stringify(state.searchkeys));
        }
    },

    // 修改当前的搜索关键字
    changeSearchKey(state, key) {
        if (key) {
            state.currentSearchKey = key
        }
    },

    // 修改当前的关键字的顺序
    changeKeysOrder(state, key) {
        let index = state.searchkeys.indexOf(key);
        state.searchkeys.splice(index, 1);
        state.searchkeys.unshift(key)
    },

    // 离开搜索页面前的位置
    setCurrentPosition(state, position) {
        state.searchPosition = position
    },
    // 向服务器发送地址列表
    _postaddress(state) {
        let username = state.userBaseInfo.name;
        let addressArr = state.addressList;
        postaddress(username, addressArr).then(res => {
            console.log(res);
        })
    },

    // 增加收货地址
    addAddress(state, address) {
        state.addressList.push(address);
        localStorage.setItem("addressList", JSON.stringify(state.addressList));
        this.commit("_postaddress")
    },
    // 删除收货地址
    removeAddress(state, index) {
        state.addressList.splice(index, 1);
        localStorage.setItem("addressList", JSON.stringify(state.addressList))
        this.commit("_postaddress")
    },
    // 修改地址
    editAddress(state, obj) {
        let { content, index } = obj;
        state.addressList.splice(index, 1, content);
        localStorage.setItem("addressList", JSON.stringify(state.addressList))
        this.commit("_postaddress")
    },
    // 修改默认值,
    editDefault(state, index) {
        // console.log(index, state.addressList);
        if (index >= 0) state.addressList[index].isDefault = true;
        if (state.addressList.length) {
            for (let i = 0; i < state.addressList.length; i++) {
                if (i !== index) {
                    state.addressList[i].isDefault = false;
                }
            };
        }
        // console.log(index, state.addressList);
        localStorage.setItem("addressList", JSON.stringify(state.addressList));
        this.commit("_postaddress")
    },
    // 修改地址顺序,让默认地址放在最前面
    orderAddress(state, index) {
        let address = state.addressList.splice(index, 1);
        // console.log(address);
        state.addressList.unshift(...address);
        localStorage.setItem("addressList", JSON.stringify(state.addressList));
        this.commit("_postaddress")
    },
    // 如果是初次添加并选择默认,直接添加到最最开头
    addAddressFirst(state, address) {
        state.addressList.unshift(address);
        localStorage.setItem("addressList", JSON.stringify(state.addressList));
        this.commit("_postaddress")
    },

    // 设置address的localStorage
    setAddress(state, addressList) {
        state.addressList = addressList;
        localStorage.setItem("addressList", JSON.stringify(addressList));
    }
}