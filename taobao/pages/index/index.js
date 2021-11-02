// index.js
// 获取应用实例
const app = getApp()
// <!--一定要写全路径-->
import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    navList:[],
     //楼层数组
    floorList:[]
  },

// getswiper(){
// wx.request({
//   url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
 
//   success(res){
//     // success
//     this.setData({
//             swiperList:res.data.message
//           })
//   }
// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(res)=>{
    //     // success
    //     // console.log(res);
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // })
  this.getswiperList();
  this.getnavList();
  this.getfloorList();

    
  },
  getswiperList(){
    request({url:"/home/swiperdata"})
    .then(res=>{
      console.log(res);
      this.setData({
              //  swiperList:res.data.message以下同理看request
              swiperList:res
    })})
  },
  getnavList(){
    request({url:"/home/catitems"})
    .then(res=>{
      this.setData({
               navList:res
    })})
  },
  getfloorList(){
    request({url:"/home/floordata"})
    .then(res=>{
      this.setData({
               floorList:res
    })})
  }

 
  
  
})

