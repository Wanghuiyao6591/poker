$(function(){
	$('.start').addClass('kaishi',function(){
	})
	$('.start li').addClass('kai',function(){
	})
	$('<div>')
	.addClass('dian')
	.text('发牌')
	.appendTo('.zhuozi')
	.delay(60)
	.animate({
		top:300,
		left:234,
		opacity:1
	})
	$('.dian').on('click',function(){
		start();
		$('.dian').attr('style','display:none')
	})

	function start(){
		var poker=[];
		var colors=['c','h','d','s'];
		var numbers=['1','2','3','4','5','6','7','8','9','10','11','12','13'];
		var biao={};
		while(poker.length<52){
			var c=colors[Math.floor(Math.random()*4)];
			var n=Math.ceil(Math.random()*13);
			var item={color:c,number:n};
			if(!biao[c+'-'+n]){
				poker.push(item);
				biao[c+'-'+n]=true;
			}	
		}
		var dict={
			1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13'
		};
		var index=0;
		var d=0;
		for(var i=0;i<7;i++){
			for(var j=0;j<i+1;j++){
				d+=90;
				$('<div>')
				.addClass('pai shang')
				.attr('id',i+'-'+j)
				.data('number',poker[index].number)
				.delay(d)
				.css({
					backgroundImage:'url(img/'+poker[index].number+poker[index].color+'.png)',

				})
				.animate({
					top:i*46,
					left:(6-i)*43+j*100,
					opacity:1
				})
				.appendTo('.zhuozi');
				index+=1;
			}
		}
		for(;index<poker.length;index++){
			$('<div>')
			.addClass('pai zuo')
			.data('number',poker[index].number)
			.delay(index*50)
			.attr('id',i+'-'+j)
			.css({
				backgroundImage:'url(img/'+poker[index].number+poker[index].color+'.png)',
			})
			.animate({
				top:440,
				left:100,
				opacity:1
			})
			.appendTo('.zhuozi');
		}
		var isClickable=function(el){
			var x=parseInt($(el).attr('id').split('-')[0]);
			var y=parseInt($(el).attr('id').split('-')[1]);
			return $('#'+(x+1)+'-'+y).length || $('#'+(x+1)+'-'+(y+1)).length &&$(this).hasClass('shang');
		}
		var shangyici=null;
		$('.pai').on('click',function(){
			//判断有没有被压住
			if($(this).hasClass('shang')&&isClickable(this)){
				return;
			}

			if($(this).data('number')===13){
				$(this).animate({
					top:0,
					left:600,
					opacity:0
				})
				.queue(function(){
					$(this).remove();
				})
				return;
			}

			$(this).toggleClass('chulie');
			if($(this).hasClass('chulie')){
				$(this).animate({top:'-=20'})
			}else{
				$(this).animate({top:'+=20'})
			}
			
			if(!shangyici){
				shangyici=$(this);
			}else{
				if(shangyici.data('number')+$(this).data('number')===13){
					$('.zhuozi .chulie')
					.delay(400)
					.animate({
						top:0,
						left:600,
						opacity:0,
					})
					.queue(function(){
						$(this).remove();
					})
				}else{
					$('.zhuozi .chulie').removeClass('chulie').animate({top:'+=20'})
				}
				shangyici=null;
			}
		})

    	var zIndex=1;
   		$('.zhuozi .move-right').on('click',function(){
    		zIndex+=1;
        	if($('.zhuozi .pai.zuo').eq(-1).hasClass("chulie")){
       			$('.zhuozi .pai.zuo').eq(-1).removeClass("chulie");
       			shangyizhang=null;
       		}
      		$('.zhuozi .pai.zuo')
      		.eq(-1)
      		.removeClass("zuo")
      		.addClass('you')
      		.animate({top:440,left:410})
      		.css({zIndex:zIndex});
    	})

    	var cishu=0;
    	$('.zhuozi .move-left').on('click',function(){
 			cishu+=1
 			if($('.zhuozi .zuo').length){
 				return;
 			}
 			if(cishu==1){
 				$('.zhuozi .move-left').text('2次');
 			}
 			if(cishu==2){
 				$('.zhuozi .move-left').text('1次');
 			}
 			if(cishu==3){
 				$('.zhuozi .move-left').text('再来一局');
 			}
 			if(cishu==4){
 				location.reload();
 			}
 			if(cishu>4){
	 			return;	
	 		}

   			$('.zhuozi .you').each(function(i,el){
  				$(this).delay(i*30).animate({top:440,left:140}).css({zIndex:0}).removeClass('you').addClass('zuo')
   			})
 		})
	}
})