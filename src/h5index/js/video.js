/*function video_what(id){
  jQuery(".video_box").show();
  var videoid='http://one2more.oss-cn-beijing.aliyuncs.com/guanwang/videos/shipin'+id+'.mp4';
  jQuery("#video").attr("src",videoid);
}
$(function(){
  /!*关闭视频*!/
  jQuery(".video_box_close").click(function(){
    jQuery(".video_box").hide();
    jQuery("#video").attr("src",'');
  });
})*/
$(function(){
  jQuery('.shiping_zhezhao').click(function(){

    /*console.log(jQuery('.shiping video')[0].play());
    console.log(jQuery('.shiping video')[0].pause());*/
    if(jQuery('.shiping video')[0].paused){
      console.log(1);
      jQuery('.shiping video').css('z-index','999');
      jQuery('.shiping video')[0].play();
    }
  })
})
