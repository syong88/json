jQuery(function(){
	
	var cnt = 0;
	var col = 3;  //winW > 1100 = 3개,  winW > 600 = 2개, 1개
	var winW = $(window).innerWidth();
	var slideBoxHeightRate = 500/523.3333333; // 0.312101911 고정 높이비율 = 슬라이드박스높이/슬라이드전체박스 너비
	var slideBoxW = $('.section4-slide-view').innerWidth(); //슬라이드박스 전체너비
	
	var slideH = slideBoxHeightRate * slideW; //슬라이드박스 높이 490
	var slideW = slideBoxW/col;	//1570/3 = 523.3333333   /2   /1
	
	var imgRateW = 216 / 523.3333333; //고정비율
	var imgW = imgRateW * slideW //이미지너비 = 슬라이드1개너비*이미지너비비율
	var imgH = imgW;
	
		resizeFn();
		setTimeout(resizeFn,100);
		
		$(window).resize(function(){
			resizeFn();
		});
		
		//반응형 너비 높이 자동화 프로그래밍
		function resizeFn(){
			
			winW = $(window).innerWidth();
			if( winW > 1100 ){
				col = 3;
			}
			else if( winW > 600 ){
				col = 2;
			}
			else {
				col = 1;
			}

			slideBoxW = $('.section4-slide-view').innerWidth(); //슬라이드박스 전체너비
			slideW = slideBoxW/col; //슬라이드 너비
			slideH = slideBoxHeightRate * slideW; //슬라이드 높이
			
			//슬라이드 전체박스 너비와 마진레프트
			$('.section4-slide-wrap').css({width: slideW*12, marginLeft:-(slideW*3) });
			//슬라이드 낱개의 너비와 높이
			$('.sec4Slide').css({width: slideW, height: slideH });
			//슬라이드 이미지 높이 너비 계산
			imgW = imgRateW * slideW //이미지너비 = 슬라이드1개너비*이미지너비비율
			imgH = imgW;
			
			$('.sec4Slide-bgImage').css({ width:imgW , height:imgH });
			
			//메인슬라이드 함수 반응형 적용
			mainSlideFn(cnt);
			
		}
		
		//a 앵커버튼
		$('.sec4SlideBt').on({
			mouseenter:	function(){
				$(this).addClass('addLine');
			},
			mouseleave:	function(){
				$(this).removeClass('addLine');
			}
		});
		
		
		//터치이벤트
		$('.section4-slide-view').swipe({
			swipeLeft:	function(){
				nextCountFn();
			},
			swipeRight:	function(){
				prevCountFn();
			}
		});
		
		//nextCount함수
		function nextCountFn(){
			cnt++;
			mainSlideFn(cnt);
		}		
		
		//prev카운트 함수
		function prevCountFn(){
			cnt--;
			mainSlideFn(cnt);
		}
		
		//페이지네이션 버튼 클릭 이벤트
		$('.sec4PageBt').each(function(index){
			$(this).on({
				click:	function(){
					cnt=index;
					pageBtEventFn(index);
					mainSlideFn(index);
				}
			});
		});
		
		//페이지네이션 버튼 마크 색변경 함수
		function pageBtEventFn(z){
			$('.sec4PageBt').removeClass('addSec4PageBt');
			$('.sec4PageBt').eq(z).addClass('addSec4PageBt');
		}	
		
		mainSlideFn(z);
		//메인슬라이드 함수
		function mainSlideFn(z){
			pageBtEventFn(z);
			$('.section4-slide-wrap').stop().animate({left:(-slideW*z)},1000, function(){
				if( cnt>5 ){
					cnt=z=0;
				}
				if( cnt<0 ){
					cnt=z=5;
				}
				$('.section4-slide-wrap').stop().animate({left:(-slideW*z)},0);
			});
				if( cnt>5 ){
					cnt=z=0;
				}
				pageBtEventFn(z);
		}

	
});
//sec4Slide.js







