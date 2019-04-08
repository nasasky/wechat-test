var pickerFile = require('../tools/js/picker_datetime.js');

Page({
  data: {},
  onLoad:function(){
    this.datetimePicker = new pickerFile.pickerDatetime({
      page:this,
      animation:'slide',
      duration:500
    }); 
  },
  startTap : function(){
    this.datetimePicker.setPicker('startDate');
    console.log(startDate)
  }
  
  // endTap : function(){
  //   this.datetimePicker.setPicker('endDate');
  // },
  // applyTap : function(){
  //   this.datetimePicker.setPicker('applyDate');
  // }
  
  
})
