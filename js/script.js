// let a = confirm("ты федя?");

// if (a) {
//     console.log("ты саша")
// } else {
//     console.log("ты федя")
// }




// slick slider

// $(document).ready(function(){  /* настройки к слайдеру применяются, только когда готова его структура в index.html (document) */
//     $('.carousel__inner').slick({  /* применяем настройки к определенному слайдеру .carousel__inner */
//         // dots: true, /* кружочки внизу */
//         infinite: true, /* бесконечный слайдер (тру стоит по-умолчанию) */
//         speed: 300, 
//         slidesToShow: 1, /* показывается 1 слайд */
//         adaptiveHeight: true, /* слайдер подстраивается под картинки с разной высотой */
//         autoplay: true, /* автоматическое переключение */
//         autoplaySpeed: 2000, /* каждый 2 секунды */

//         // настраиваем стрелки. их можно взять в документации
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-solid.png"></button>', /* левая стрелка */
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right-solid.png"></button>', /* правая стрелка */

//         responsive: [ /* адаптация  */
//             {
//             breakpoint: 992, /* от 0 до 992px */
//             settings: {
//                 // slidesToShow: 3, /* показывается 3 слайда */
//                 // slidesToScroll: 3, /* перелистывание на 3 слайда */
//                 // infinite: true, /* бесконечный слайдер */
//                 dots: true, /* кружочки внизу */
//                 arrows: false /* убираем стрелки */
//                 }
//             }
//         ]
//       });
//   });





// Tiny Slider
const slider = tns({
    container: '.carousel__inner', 
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
});

// document.querySelector('.prev').addEventListener('click', function () {
//     slider.goTo('prev');
// });

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});







$(document).ready(function(){

    
    // табы
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });  



    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');





    // модальные окна
    $('[data-modal=consultation]').on('click', function() { /* при нажатии на кнопку */
        $('.owerlay, #consultation').fadeIn('fast');
    });

    $('.modal__close').on('click', function() {  /* при нажатии на крестик */
        $('.owerlay, #consultation, #thanks, #order').fadeOut('fast');
    })

    $('.button_mini').on('click', function() {  /* 2-ое окно с другой кнопкой */
        $('.owerlay, #order').fadeIn('fast');
    });

    $('.button_mini').each(function(i) { /* функция для того чтобы каждая кнопка из карточки потягивала подзаголовок из из той же карточки */
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.owerlay, #order').fadeIn('fast');
        })
    });


    // валидирую формы (модальные окна) на сайте
    function valideForms(form) {
        $(form).validate( {
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой телефон",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };


    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    



    // маска ввода номера
    $('input[name=phone]').mask("+7 (999) 999-99-99");


    // отправляем данные со всех форм (модальных окон)
    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        };
            
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
          
            $('form').trigger('reset');
        });
        return false;
    });





    // иконка вверх
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) { /* если проскроллил > 1600px появляется иконка */
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut(); /* иначе скрыта */
        }
    });


    $("a[href='#up']").click(function() { /* скролл */
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    $("a[href='#catalog']").click(function() { /* скролл для ссылки перейти в каталог */
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    // связываем 2 библиотки для анимации элементов при скролле
    new WOW().init();

});