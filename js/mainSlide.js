jQuery(function(){
	
	var timeCnt = 0;	
	var bar = 0;	
	var cnt = setId = 0;
	var winW = $(window).innerWidth();
	var winH = $(window).innerHeight();
	var fontRateH3 = 30/1903; //0.015764582
	var fontRateH2 = 74/1903; //0.03888596952180767
	var arrowRateW = 52/1903;  //0.027325275880189175
	var arrowH = $('.nextBt-wrap').innerHeight(); //마진탑값
	var arrowMarginTop = -arrowH / 2; //마진탑값
	var titleH = $('.slide-title').innerHeight(); //타이틀 박스 높이
	var titleMarginTop = -titleH / 2 ; //타이틀 마진탑
	
	
		slideResizeFn();
		setTimeout(slideResizeFn,100);
	
		function slideResizeFn(){
			winW = $(window).innerWidth();
			winH = $(window).innerHeight();
			arrowH = $('.nextBt-wrap').innerHeight();
			arrowMarginTop = -arrowH/2;
	        titleH = $('.slide-title').innerHeight();
	        titleMarginTop = -titleH / 2 ;
			
			//슬라이드
			$('.slide').css({ width: winW, height: winH });
			$('#section2').css({ marginTop: winH });
			//타이틀
			if( winW <= 500 ){
				$('.slide-title h3').css({fontSize: (fontRateH3*winW)*1.9 });
				$('.slide-title h2').css({fontSize: (fontRateH2*winW)*1.9 });				
			}	
			else if( winW > 500 &&  winW <= 1024 ){
				$('.slide-title h3').css({fontSize: (fontRateH3*winW)*1.3 });
				$('.slide-title h2').css({fontSize: (fontRateH2*winW)*1.3 });				
			}	
			else{
				$('.slide-title h3').css({fontSize: fontRateH3*winW*1.1 });
				$('.slide-title h2').css({fontSize: fontRateH2*winW*1.1 });				
			}
			
			$('.slide-title').css({ marginTop: titleMarginTop });
			//화살버튼
			$('.nextBt-wrap, .prevBt-wrap').css({ width: arrowRateW*winW, marginTop: arrowMarginTop  });
		}
		
		$(window).resize(function(){
			slideResizeFn();
		});
	
		autoPlayFn();
		
		function autoPlayFn(){
			setId = setInterval(function(){		
				
				bar += 1.25;  //500/4000 = 1.25 px
				if( bar > 500 ){  //하나의 슬라이드 길이를 초과하면
					bar = 1.25; 	  //하나의 슬라이드 종료
					nextCountFn(); //다음 슬라이드 호츌
				}
				
				$('.pageBar').css({width: 0 });
				$('.pageBar').eq(cnt>2?0:cnt).css({width: bar });
				
			}, 10); // 4 = 1000  40 = 100  400 = 10  4000 = 1
		}
		
		//다음, 이전, 페이지버튼 위에 마우오버시 타이머 중지 아니면 재실행
		$('.slideBt').on({
			mouseenter:	function(){
				clearInterval( setId );
			},
			mouseleave:	function(){
				autoPlayFn();
			}
		});
		
		//터치이벤트
		$('.slide-view').swipe({
			swipeLeft:	function(){
				nextCountFn();
			},
			swipeRight:	function(){
				prevCountFn();
			}
		});
		
		
		//버튼클릭 다음
		$('.nextBt').on({
			click:	function(){
				nextCountFn();
			}
		});	
		
		//버튼클릭 이전
		$('.prevBt').on({
			click:	function(){
				prevCountFn();
			}
		});	
		
		//다음 카운트함수
		function nextCountFn(){
			if( !$('.slide-wrap').is(':animated') ){
				cnt++;
				mainSlideFn(cnt);				
			}
		}
		//이전 카운트함수
		function prevCountFn(){
			if( !$('.slide-wrap').is(':animated') ){
				cnt--;
				mainSlideFn(cnt);
			}
		}
		
		//페이지버튼 클릭 함수
		$('.pageBt').each(function(index){
			$(this).on({
				click:	function(){	
					bar = 0;
					cnt = index;
					mainSlideFn(index);
				}
			});				
		});
		
		function pageBtFn(z){
			$('.pageBt').removeClass('addPageBt');	
			$('.pageBt').eq(z).addClass('addPageBt');	
		}
		
		//메인슬라이드	
		function mainSlideFn(z){
			$('.slide-wrap').stop().animate({left: (-100*z)+'%' }, 800,'swing', function(){
				if( z > 2 ){
					z=cnt=0;
				}
				if( z < 0 ){
					z=cnt=2;
				}
				$('.slide-wrap').stop().animate({left: (-100*z)+'%'}, 0);
			});
			pageBtFn( z>2?0:z ); //페이지버튼함수3 새로추간된 페이지번호 동시에 불들어오기
		}
	
});
//mainSlide.js