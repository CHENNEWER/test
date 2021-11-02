// pages/category/category.js
const app = getApp()
// <!--一定要写全路径-->
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   */
  data: {
    Cates:[],
    leftMenuList:[],//左侧菜单数据
    rightContents:[],//右侧内容
    currentindex:0,//被点击的菜单
    scrollTop:0//滚动条顶部距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* */
    //this.getCates();
    const Cates=wx.getStorageSync('cates');
    if(!Cates)
    { 
      this.getCates();}
    else{
        //有旧数据，是否过期，
        if(Date.now()-Cates.time>1000*10){
          this.getCates();
          console.log("无缓存过")
        }
        else{
          //直接调用缓存
          console.log("cates缓存过");
          this.Cates=Cates.data;
          let leftMenuList=this.Cates.map(v=>v.cat_name);
          // let leftMenuList = this.Cates[0].cat_name;
          let rightContents=this.Cates[0].children;
          this.setData({
            leftMenuList,rightContents
          });
        }

      }

  },
  // getCates(){
    // request({url:"/categories"})
    // .then(res=>{
    // //   this.setData({
    // //     Cates:res.data.message
    // // })
    //   this.Cates=res.data.message;
    //   //把接口的数据存在本地的，缓存技术
    //   wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
    //   //构造左右的菜单内容
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);//左侧菜单
    //   let rightContents=this.Cates[0].children;//右侧内容
    //   this.setData({
    //     leftMenuList,rightContents//Cates:res.data.message
    //   });
    //   })


  // },
  async getCates(){
    // await
    const res = await request({url:"/categories"});
    // this.Cates=res.data.message;可以在request中修改
    this.Cates = res;

      //把接口的数据存在本地的，缓存技术
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      //构造左右的菜单内容
    let leftMenuList=this.Cates.map(v=>v.cat_name);//左侧菜单
    let rightContents=this.Cates[0].children;//右侧内容
    this.setData({
        leftMenuList,rightContents//Cates:res.data.message
      });
      
  },
  handleItemTap(e){
    console.log(e)
    const{index}=e.currentTarget.dataset;//获取值
    let rightContents=this.Cates[index].children;
    this.setData({
      currentindex:index,
      rightContents,
       //重新设置scrollTop的值
      scrollTop:1
    })
  }
})