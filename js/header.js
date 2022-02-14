jQuery(function(){
	var t = 0;
	var appBarT = btNum = 0;  
	var winW = $(window).innerWidth();
	var winH = $(window).innerHeight();
	var _top = 120;  //120 79 56
	var _up = 120;  //120 79 56
	
		resizeFn();
		setTimeout(resizeFn,100);
		
		$(window).resize(function(){
			resizeFn();
		});
		
		function resizeFn(){
			winH = $(window).innerHeight();
			winW = $(window).innerWidth();
			
			if( winW > 1100 ){
				_top = _up = 120;
				$('.sub').stop().slideUp(0);				
			}
			else if( winW > 800 ){
				_top = _up = 79;
				$('.sub').stop().slideUp(0);
			}
			else{
				_top = 56;
				_up = 400;
			}
			
			//앱바버튼 함수 처음 실행을 못하게 버튼이 클릭안 안된상태는 실행 안함
			subMenuBgFn();
			subFn(btNum);		//마우서 오버시
			subMouseleaveFn();  //마우스리브
			
			//winW <=800 이하이고 모바일 windodw.orientation 가로형(-90 or 90) nav 높이를 winH 로 설정 스크롤 overflowY:'auto'
			//그외의 모든 경우 nav 높이를 auto 로 설정 스크롤 overflowY:'hidden'

			if( winW <= 800 ){
				if( window.orientation === 90 || window.orientation === -90 ){
					//창높이로 nav 높이 설정  nav 높이를 winH 로 설정 스크롤 overflowY:'auto'
					winH = _up  = winH-56;
					$('.nav').css({ height: winH, overflowY:'scroll' });
				}
				else{ //window.orientation === 0 || window.orientation === 180
					//nav 높이를 auto 로 설정 스크롤 overflowY:'hidden'
					_up = 400;
					$('.nav').css({ height: 'auto',  overflowY:'hidden' });
				}
			}
			
		}
		
		$('#header').on({
			mouseenter:	function(){
				$(this).find('.gnb').addClass('addHeader');
			},
			mouseleave:	function(){
				if( t === 0 && appBarT === 0 ){
					$(this).find('.gnb').removeClass('addHeader');
				}
			}
		});
		
		$(window).scroll(function(){
			if( $(window).scrollTop() >= 10 ){
				t=1;
				$('.gnb').addClass('addHeader');
			}
			else{
				t=0;
				if( appBarT == 0 ){
					$('.gnb').removeClass('addHeader');
				}
			}
		});
		
		//앱바 버튼 클릭시
		//위에서 아래로 부드럽게 top값이 78로 내려온다.
		//다시 클릭하면 부드럽게 top값이 -100으로 올라간다.
		//앱바버튼 모양 x = 변경 토글 애니메이션
		$('.appBarBt').on({
			click:	function(){
				
				if( appBarT === 0 ){	
					appBarT=1;
					$('.gnb').addClass('addHeader');
					subMenuBgFn();	
					$(this).addClass('addXline');
				}
				else{
					appBarT=0;
					$(this).removeClass('addXline');
					subMenuBgFn();
					
				}
			}
		});
		
		//반응형
		function subMenuBgFn(){
			if( appBarT!=1 ){
				$('.subMenu-bg').stop().animate({top:-_up},300);
				
			}
			else{
				$('.subMenu-bg').stop().animate({top:_top},300);
			}
			
		}

		
		//메인버튼 이벤트 
		//마우스 오버시 슬라이드 다운
		//마우스 아웃시 슬라이드 업
		$('.mainBt').each(function(index){
			$(this).on({
				mouseenter:	function(){
					btNum = index;
					subFn(index);
				}
			});
		});

		
		function subFn(z){
			if( winW > 760 ){
				$('.sub').stop().slideUp(200);					
				$('.sub').eq(z).stop().slideDown(200);							
			}
			else{				
				$('.sub').stop().slideDown(0);	
			}			
		}
		
		
		//서브메뉴배경에서 마우스 아웃시 서브메뉴 위로 올라간다.
		$('.subMenu-bg').on({
			mouseleave:	function(){
				subMouseleaveFn();
			}
		});
		
		function subMouseleaveFn(){
			if( winW > 760 ){
				$('.sub').stop().slideUp(200);	
			}
			else{
				$('.sub').stop().slideDown(200);	
			}
		}
		
	
	
});//header.js