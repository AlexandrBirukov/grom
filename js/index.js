$(function () {

    // ----- Мобильное меню -----

    const header = $('#header');
    let scrollPrev = 0;

    $(window).scroll(function () {
        let scrolled = $(window).scrollTop();

        if (scrolled > 100 && scrolled > scrollPrev) {
            if (!header.hasClass('header-open')) {
                header.addClass('out');
            }
        } else {
            header.removeClass('out');
        }
        scrollPrev = scrolled;
    });

    // ----- Навигация -----

    $('#nav-icon').click(function () {
        $(this).toggleClass('open'); // анимация кнопки
        $('#header-nav').toggleClass('mobile-nav'); // анимация навигации
        $('.phone').toggleClass('mobile-phone'); // анимация телефона
    });


    // ----- Прокрутка до якоря -----

    $('.nav-link').on('click', function (event) {
        event.preventDefault();

        $('#nav-icon').removeClass('open');
        $('#header-nav').removeClass('mobile-nav'); // анимация навигации
        $('.phone').removeClass('mobile-phone'); // анимация телефона

        let destination = $($(this).attr('href')).offset().top - 70;
        $('html:not(:animated),body:not(:animated)').animate({ scrollTop: destination }, 600);
    });

    // --- Карта ---

    ymaps.ready(init);
    var myMap;

    function init() {
        myMap = new ymaps.Map('map', {
            center: [56.108984, 40.340384],
            zoom: 17,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });
        event_item = new ymaps.Placemark([56.108984, 40.340384], {
            balloonContent: '<strong>ГРОМ</strong><br>г. Владимир, ул.Верхняя Дуброва д.26<br>+7-900-479-28-08',
            hintContent: '<strong>ГРОМ</strong><br>г. Владимир, ул.Верхняя Дуброва д.26<br>+7-900-479-28-08',
        }, {
            preset: 'islands#icon',
            iconColor: '#ff0000'
        });
        myMap.geoObjects.add(event_item);
        myMap.behaviors.disable('scrollZoom');
    }
});
