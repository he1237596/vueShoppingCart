/**
 * Created by rxc on 2017/9/12.
 */
new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNum:3,
        slideDown:true,
        currentIndex:0,
        transMethod:1
    },
    mounted(){
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    methods:{
        getAddressList(){
            _this = this;
            axios.get('./data/address.json').then(function (res) {
                var res = res.data;
                console.log(res);
                if(res.status=='0'){
                    _this.addressList = res.result
                }
            }).catch(function () {
                
            })
        },
        showMore(){
            this.limitNum=this.addressList.length;
            this.slideDown = false;
        },
        setDefault(addressId){
            this.addressList.forEach(function (address,index) {
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        }
    },
    computed:{
        filterAddress(){
            return this.addressList.slice(0,this.limitNum)
        }
    }
});