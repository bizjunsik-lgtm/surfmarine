document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // 1. 모바일 햄버거 메뉴 토글
    burger.addEventListener('click', () => {
        // 내비게이션 메뉴 슬라이드 인/아웃
        nav.classList.toggle('nav-active');
        // 햄버거 버튼 X 모양 애니메이션
        burger.classList.toggle('toggle');
    });

    // 2. 모바일 하위 메뉴(아코디언) 동작
    dropdowns.forEach(dropdown => {
        // ★ 핵심 수정 부분: li 전체가 아닌, 제일 상단의 a 태그(예: '서프마린소개')만 선택
        const topLink = dropdown.querySelector('a');

        topLink.addEventListener('click', function(e) {
            // PC 화면(768px 초과)에서는 JS 동작을 막고 CSS(:hover)로만 제어
            if(window.innerWidth > 768) return;

            // 하위 메뉴 찾기
            const submenu = dropdown.querySelector('.submenu');
            const icon = topLink.querySelector('i');
            
            // 링크 기본 이동 방지 (상위 메뉴 터치 시 페이지 이동 없이 하위 메뉴만 열리도록)
            e.preventDefault();

            // 열고 닫기 토글
            if (submenu.classList.contains('active')) {
                submenu.classList.remove('active');
                icon.style.transform = 'rotate(0deg)';
            } else {
                // 다른 열려있는 서브메뉴 닫기
                document.querySelectorAll('.submenu').forEach(sub => {
                    sub.classList.remove('active');
                });
                document.querySelectorAll('.dropdown i').forEach(i => {
                    i.style.transform = 'rotate(0deg)';
                });

                submenu.classList.add('active');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 3. 창 크기 조절 시 모바일 메뉴 초기화 (버그 방지)
    window.addEventListener('resize', () => {
        if(window.innerWidth > 768) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.querySelectorAll('.submenu').forEach(sub => {
                sub.classList.remove('active');
            });
            document.querySelectorAll('.dropdown i').forEach(i => {
                i.style.transform = 'rotate(0deg)';
            });
        }
    });
});