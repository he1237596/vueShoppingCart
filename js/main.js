var vm = new Vue({
    el: '#app',
    data: {
        productList: [],
        totalMoney: 0,
        checkAllFlag:false,
        totalMoney:0,
        delFlag : false,
        curProduct:''
    },
    //局部过滤器
    filters: {
        formatMoney: function (value) {
            return '￥'+value.toFixed(2);
        }
    },
    //生命周期
    mounted(){
        this.$nextTick(function () {
            this.createView();
        })
    },
    methods: {
        createView(){
            var _this = this;
            axios.get('data/cartData.json').then(function (res) {
                console.log(res.data.result);
                _this.productList = res.data.result.list;
                //_this.totalMoney = res.data.result.totalMoney

            }).catch(function (err) {
                console.log(err);
            })
        },
        changeMoney(product,way){
            if(way>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if(product.productQuantity<=1){
                    product.productQuantity=1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct(item){
            //因为要控制每一个item,所以变量定义到item身上
            if(typeof item.checked == 'undefined'){
                //用vue监听一个不存在的变量--->item上的checked属性--->注册变量
                //局部注册
                this.$set(item,'checked',true);
                //全局注册
                //Vue.set(item,'checked',true);
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll(flag){
            this.checkAllFlag = flag;
            var _this = this;
            //forEach循环遍历时,外部this丢失,备份外部this
            this.productList.forEach(function (item,index) {
                //点击全选的时候,同样需要判断item是否有checked属性(因为用户可能一进来就点击全选)
                if(typeof item.checked == 'undefined'){
                    _this.$set(item,'checked',_this.checkAllFlag);
                }else{
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();

        },
        calcTotalPrice(){
            var _this = this;
            //每次计算前清零,totalMoney这是个变量,不会实时计算
            _this.totalMoney = 0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        delConfirm(item){
            //将点击的商品记录下来,再去查找这个索引号
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct(){
            //一般是axios发送id到后台,后台删除给个状态码确认
            //查找这个商品的索引号
            var  index = this.productList.indexOf(this.curProduct);
            //数组中删除这个元素
            this.productList.splice(index,1);
            //删除成功也隐藏模态框
            this.delFlag = false;
            this.calcTotalPrice();
        }
    },
    computed:{

    }

})
//全局过滤器
//Vue.filter('money', function (value,type) {
//    return '￥'+value.toFixed(2)+ type;
//})
