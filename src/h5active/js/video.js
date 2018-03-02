function video_what(id){
  jQuery(".video_box").show();
  var videoid='http://one2more.oss-cn-beijing.aliyuncs.com/guanwang/videos/shipin'+id+'.mp4';
  jQuery("#video").attr("src",videoid);
}
$(function(){
  /*关闭视频*/
  jQuery(".video_box_close").click(function(){
    jQuery(".video_box").hide();
    jQuery("#video").attr("src",'');
  });
})
