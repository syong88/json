jQuery(function(){		
	var boxW = $('.section3-main').innerWidth(); //1522
	var boxRateH = 560/1522; //0.367936925
	var cnt = x = current = 0;

		//반응형 박스
		//슬라이드 콘테이너 박스 너비(1522px)에 대한 높이(560) 비율 560/1522 = 0.367936925
		//태그요소중 슬라이드 메인박스 너비와 높이 결정되면 
		//자식요소들의 너비 높이가 그리방식(백분율)로 반응하는 (반응형 너비 높이) 
		//요소의 내부의 크기에 따라 안여백(padding) 밖여백(margin)을 반응하도록 제작		
		
		boxResizefn();
		setTimeout(boxResizefn,100);
		
		$(window).resize(function(){
			boxResizefn();
		});
		
		function boxResizefn(){
			boxW = $('.section3-main').innerWidth();
			
				$('.section3-main').css({ height: boxRateH*boxW }); //박스높이가 자동 560 ~ 
			
		}
		
		
		////////////////////////////////////////////////////////
		//버튼 클릭 페이드 인아웃 효과 애니메이션 슬라이드 장면 전환 효과	 
		$('.arrowNextBt').on({
			click:	function(){
				cnt++;
				if(cnt>2){
					cnt=0;
				}
				mainNextSlideFn(current,cnt);
			}
		});
		$('.arrowPrevBt').on({
			click:	function(){
				cnt--;
				if(cnt<0){
					cnt=2;
				}
				mainPrevSlideFn(current,cnt);
			}
		});
		
		function mainNextSlideFn(x,z){
			current=z;
			pageNationFn(z);
			$('.section3-slide').css({zIndex:1}).stop().animate({opacity:0},0);
			$('.section3-slide').eq( x ).css({zIndex:2}).stop().animate({opacity:1},0);
			$('.section3-slide').eq( z ).css({zIndex:3}).stop().animate({opacity:0},0).animate({opacity:1},1500);			
		}
		
		function mainPrevSlideFn(x,z){
			current=z;
			pageNationFn(z);
			$('.section3-slide').css({zIndex:1}).stop().animate({opacity:0},0);
			$('.section3-slide').eq( x ).css({zIndex:3}).stop().animate({opacity:1},0).animate({opacity:0},1500);
			$('.section3-slide').eq( z ).css({zIndex:2}).stop().animate({opacity:1},0);			
		}
		
		
		/////////////////////////////////////////////////////////////
		//페이지네이션 구현
		//슬라이드0 일때 / 페이지 : 1, 2
		//슬라이드1 일때 / 페이지 : 0, 2
		//슬라이드2 일때 / 페이지 : 0, 1
		
		$('.pageImageBt').each(function( index ){
			$(this).on({
				click:	function(){
					
					
					if( current === 0 ){
						if( index == 0){
							mainNextSlideFn(current,1);
							cnt=1;							
						}
						else if( index == 1 ){
							mainNextSlideFn(current,2);
							cnt=2;	
						}
					}
					else if( current === 1 ){
						if( index == 2){
							mainPrevSlideFn(current,0);
							cnt=0;
						}
						else if( index == 3 ){
							mainNextSlideFn(current,2);
							cnt=2;	
						}	
					}
					else if( current === 2 ){
						if( index == 4){
							mainPrevSlideFn(current,0);
							cnt=0;
						}
						else if( index == 5 ){
							mainPrevSlideFn(current,1);
							cnt=1;	
						}
					}
				}
			});
		});

		 
		function pageNationFn(z){
			$('.pageImage-slide').hide();
			$('.pageImage-slide').eq(z).show();
		}
});
//sec3Slide.js







