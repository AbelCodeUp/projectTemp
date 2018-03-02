
$(function(){

  $(".systemConbox>ul>li").click(function(){
    $(".systemCon_block").stop(true,false);
    var index = $(this).index();
    $(".systemConbox>ul>li").removeClass('system_active').eq(index).addClass('system_active')
    $(".systemCon_block").fadeOut().eq(index).fadeIn(300);
})
  var mySwiper2 = new Swiper('.learing-conleft', {
    autoplay: 6000,
    autoplayDisableOnInteraction:false,
    loop : true,
    direction : 'vertical'
  })
  $(".learing-conleft").hover(function(){
    mySwiper2.stopAutoplay();
  },function(){
    mySwiper2.startAutoplay();
  })
  
})


window.onscroll=function(){
  var sT=document.body.scrollTop||document.documentElement.scrollTop;
  if(sT>700){
    jQuery('.footer > p').css('z-index','999');
  }else{
    jQuery('.footer > p').css('z-index','-999');
  }
};
