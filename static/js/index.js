$('.icon-search').click(function(){
    $('.search-tab-content .active form').submit()
})
$('.website-list .new-item,.website-list .hot-item').click(function (e) {
    if ( e && e.preventDefault ) {
        //阻止默认浏览器动作(W3C)
        e.preventDefault();
    }else{
        //IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
        return false;
    }
    window.open($(this).find('a').attr('href'))

})

$('.fixedWidth').css('width',$('.indexbox').width()).show();
$('.bottomFixedAd').on('click', function () {
    $('.fixedWidth').remove()
    if(linkid){
        $.cookie('index_fixed_bottom_'+linkid, '1','7200000');
    }else{
        $.cookie('index_fixed_bottom_', '1','7200000');
    }

})
$('#bdbtns').on('click', function () {
    try {
        var skeysbd = $('#skeysbd').val()
        if (skeysbd) {
            $.get('http://tooool.org/bdsearch', {skeysbd: skeysbd})
        }

    } catch (err) {

    }

})

$('.current-menu strong').on('click', function () {

    $('.current-menu .active').removeClass('active')

    var index = $(this).index();

    $(this).addClass('active')

    $('.endtabdiv').removeClass('active')

    $('#tab-' + index).addClass('active')

    arr = [];

    var p = $('.indexbox');

    if (p.length < 1) return;

    p.each(function () {

        var of = $(this).offset();

        arr.push(Math.floor(of.top));

    });



})

$('.search-list .li').on('click', function () {

    var index = $(this).index();

    $('.search-list .current').removeClass('current')

    $(this).addClass('current');

    var  inputval=$('.search-tab-content .active .form-control').val();

    $('.search-tab-content .active').removeClass('active')

    $('.search-tab-content .tab-pane').eq(index).addClass('active')

    $('.search-tab-content .active .form-control').val(inputval);

})

$('li[data-active="fid-0"]').addClass('active');



$('#pfgg').css({left: $('.main-content').offset().left - 175}).show()

var headerheight = $('#header .container').height();

(function ($) {

    $('.css-tooltip-new').tipso({
        fontsize:'16px'
    });

    $('.css-tooltip-news').tipso({
        background: '#000',
        width:'450px',
        fontsize:'12px',
        position:'sizecenter'
    });
    $('.css-tooltip-newa').tipso({
        background: '#000',
        width:'150px',
        fontsize:'12px',
    });

    var s = $('.sidebars');

    if (s.length < 1) return;

    var c = s.children('.content-sidebar');

    if (c.length < 1) return;

    var $parent = s.parent();

    if ($parent.length < 1) return;

    var start = 0, stop = 0, cHeight = 0;



    function init() {



        var soffset = s.offset();

        start = soffset.top;

        stop = start + $parent.height();

        cinit();

    }



    function cinit() {

        cHeight = c.height();

    }



    function cClear() {

        c.removeClass('fixed');

        c.removeClass('absolute');

    }



    function check_scroll() {

        var st = window.pageYOffset

            || document.documentElement.scrollTop

            || document.body.scrollTop

            || 0;

        if (st <= start) {

            cClear();

        }

        if (st >= $('.container1').height() - $('footer').height() - 430) {
            c.removeClass('fixed');
            c.addClass('absolute');
            return;
        }

        if (st < stop - cHeight && st > (start + 30)) {

            c.removeClass('absolute');

            c.addClass('fixed');

        }

    }



    var dl = $('.content-sidebar dl');

    if (dl.length < 1) return;

    var $part = $('.indexbox');

    if ($part.length < 1) return;

    var arr = [];

    $part.each(function () {

        var title = $(this).find('.indexbox_title').find('strong').html()

        var id = $(this).attr('id');

        if (title && id) {

            arr.push({

                title: title,

                id: id

            });

        }

    });

    var html = '';

    html += '<dt><span class="show-list"></span></dt>';

    for (var i = 0; i < arr.length; i++) {

        html += '<dd><a href="#' + arr[i].id + '" class="auto-scroll" data-offset="-20" data-speed=500>' + arr[i].title + '</a></dd>';

    }

    dl.html(html);

    init();

    check_scroll();

    $(window).on('resize', init);

    $(window).on('scroll', check_scroll);

    window.onload = function () {

//            alert(1)

        init();

    };

})(jQuery);





(function ($) {

    var p = $('.indexbox');

    if (p.length < 1) return;

    arr = [];

    function part_offset_top() {

        p.each(function () {

            var of = $(this).offset();

            arr.push(Math.floor(of.top));

        });

    }




    function goto_current(index) {

        var a = $('#goto dd');

        var b = $('#goto dt');

        if (a.length < 1) return;

        var h = a.outerHeight();

        if (!a.eq(index).hasClass('current')) {

            a.removeClass('current');

            a.eq(index).addClass('current');

            b.animate({

                'top': h * index + (a.outerHeight() - b.outerHeight()) / 2 + 1

            }, 50);

        }

    }



    function window_scroll() {

        var st = window.pageYOffset

            || document.documentElement.scrollTop

            || document.body.scrollTop

            || 0;


        nt = 0;

        var limit = Math.ceil(st + 20 - nt);

        var index = 0;

        for (var i = 0; i < arr.length; i++) {

            if (limit >= arr[i]) {

                index = i;

            } else {

                break;

            }

        }

        if (index < 0) index = 0;

        if (!p.eq(index).hasClass('current')) {

            p.removeClass('current');

            p.eq(index).addClass('current');

            goto_current(index);

        }

    }



    part_offset_top();

    setTimeout(window_scroll, 0);

    $(window).on('scroll', window_scroll);

})(jQuery);



$(function(){
    $('.tabcheck').click(function(){
        $(this).parent().find('.current').removeClass('current')
        $(this).parent().parent().find('.showdiv').hide();
        $(this).addClass('current')
        $('#catalog_'+$(this).attr('data-id')).show()
    })

    $('.cygjtabs').find('strong').on('click',function(){

        $('#catalog_'+ $('.cygjtabs').find('.current').attr('data-id')).hide();

        $('.cygjtabs').find('.current').removeClass('current');

        $(this).addClass('current');

        $('#catalog_'+$(this).attr('data-id')).show()

    })

    //锚点跳转滑动效果

    $('#goto').find('dd').find('a').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length && target;
            if (target.length) {
                var targetOffset = target.offset().top;
                console.log(target)
                $('html,body').animate({
                        scrollTop: targetOffset - 15
                    },
                    500);
                return false;
            }
        }
    });

})


$('#pub-wechat').on('click', function () {

    if($('.el-dialog').css("display")=='none'){
        $('.wx-public-dialog').addClass('el-dialog__wrapper');
        $('.el-dialog').css("display","block");
    }else {
        $('.wx-public-dialog').removeClass('el-dialog__wrapper');
        $('.el-dialog').css("display","none");
    }

})


$('.wx-public-dialog').on('click', function () {
        $('.wx-public-dialog').removeClass('el-dialog__wrapper');
        $('.el-dialog').css("display","none");
})