import BackToTop from "./back-top";
import Footer from "./footer";
import Header from "./header";
import { useEffect } from "react";
function Layout({ children }) {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);
    useEffect(() => {
        const $ = window.$;
        $(document).ready(function () {
            //start filter in movie food
            var $grid = $(".grid-area");
            var filterFns = {};
            $grid.isotope({
                itemSelector: ".grid-item",
                masonry: {
                    columnWidth: 0,
                },
            });
            $("ul.filter").on("click", "li", function () {
                var filterValue = $(this).attr("data-filter");
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                    filter: filterValue,
                });
            });
            $("ul.filter").each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on("click", "li", function () {
                    $buttonGroup.find(".active").removeClass("active");
                    $(this).addClass("active");
                });
            });
            //end filter in movie food

            // Nice Select
            $(".select-bar").niceSelect();
            // Lightcase
            $(".video-popup").magnificPopup({
                type: "iframe",
            });
            $("body").each(function () {
                $(this)
                    .find(".img-pop")
                    .magnificPopup({
                        type: "image",
                        gallery: {
                            enabled: true,
                        },
                    });
            });

            //Faq
            $(".faq-wrapper .faq-title").on("click", function (e) {
                var element = $(this).parent(".faq-item");
                if (element.hasClass("open")) {
                    element.removeClass("open");
                    element.find(".faq-content").removeClass("open");
                    element.find(".faq-content").slideUp(300, "swing");
                } else {
                    element.addClass("open");
                    element.children(".faq-content").slideDown(300, "swing");
                    element.siblings(".faq-item").children(".faq-content").slideUp(300, "swing");
                    element.siblings(".faq-item").removeClass("open");
                    element.siblings(".faq-item").find(".faq-title, .faq-title-two").removeClass("open");
                    element.siblings(".faq-item").find(".faq-content").slideUp(300, "swing");
                }
            });

            //Start class acive in header
            $(".header-bar").on("click", function () {
                $(".menu").toggleClass("active");
                $(".header-bar").toggleClass("active");
                $(".overlay").toggleClass("active");
            });
            $(".overlay").on("click", function () {
                $(".menu").removeClass("active");
                $(".header-bar").removeClass("active");
                $(".overlay").removeClass("active");
            });
            $("ul>li>.submenu").parent("li").addClass("menu-item-has-children");
            $("ul")
                .parent("li")
                .hover(function () {
                    var menu = $(this).find("ul");
                    var menupos = $(menu).offset();
                    if (menupos.left + menu.width() > $(window).width()) {
                        var newpos = -$(menu).width();
                        menu.css({
                            left: newpos,
                        });
                    }
                });
            $(".menu li a").on("click", function (e) {
                var element = $(this).parent("li");
                if (element.hasClass("open")) {
                    element.removeClass("open");
                    element.find("li").removeClass("open");
                    element.find("ul").slideUp(300, "swing");
                } else {
                    element.addClass("open");
                    element.children("ul").slideDown(300, "swing");
                    element.siblings("li").children("ul").slideUp(300, "swing");
                    element.siblings("li").removeClass("open");
                    element.siblings("li").find("li").removeClass("open");
                    element.siblings("li").find("ul").slideUp(300, "swing");
                }
            });
            //End class active in header

            // Start Scroll To Top
            var scrollTop = $(".scrollToTop");
            $(window).on("scroll", function () {
                if ($(this).scrollTop() < 500) {
                    scrollTop.removeClass("active");
                } else {
                    scrollTop.addClass("active");
                }
            });
            $(".scrollToTop").on("click", function () {
                $("html, body").animate(
                    {
                        scrollTop: 0,
                    },
                    500
                );
                return false;
            });
            //End Scroll To Top

            //Start Header Sticky
            var headerOne = $(".header-section");
            $(window).on("scroll", function () {
                if ($(this).scrollTop() < 1) {
                    headerOne.removeClass("header-active");
                } else {
                    headerOne.addClass("header-active");
                }
            });
            $(".window-warning .lay").on("click", function () {
                $(".window-warning").addClass("inActive");
            });
            $(".seat-plan-wrapper li .movie-schedule .item").on("click", function () {
                $(".window-warning").removeClass("inActive");
            });
            //End Header Sticky

            //Tab Section
            $(".tab ul.tab-menu li").on("click", function (g) {
                var tab = $(this).closest(".tab"),
                    index = $(this).closest("li").index();
                tab.find("li").siblings("li").removeClass("active");
                $(this).closest("li").addClass("active");
                tab.find(".tab-area")
                    .find("div.tab-item")
                    .not("div.tab-item:eq(" + index + ")")
                    .fadeOut(500);
                tab.find(".tab-area")
                    .find("div.tab-item:eq(" + index + ")")
                    .fadeIn(500);
                g.preventDefault();
            });
            $(".search-tab ul.tab-menu li").on("click", function (k) {
                var search_tab = $(this).closest(".search-tab"),
                    searchIndex = $(this).closest("li").index();
                search_tab.find("li").siblings("li").removeClass("active");
                $(this).closest("li").addClass("active");
                search_tab
                    .find(".tab-area")
                    .find("div.tab-item")
                    .not("div.tab-item:eq(" + searchIndex + ")")
                    .hide(10);
                search_tab
                    .find(".tab-area")
                    .find("div.tab-item:eq(" + searchIndex + ")")
                    .show(10);
                k.preventDefault();
            });
            $(".tabTwo ul.tab-menu li").on("click", function (g) {
                var tabTwo = $(this).closest(".tabTwo"),
                    index = $(this).closest("li").index();
                tabTwo.find("li").siblings("li").removeClass("active");
                $(this).closest("li").addClass("active");
                tabTwo
                    .find(".tab-area")
                    .find("div.tab-item")
                    .not("div.tab-item:eq(" + index + ")")
                    .fadeOut(10);
                tabTwo
                    .find(".tab-area")
                    .find("div.tab-item:eq(" + index + ")")
                    .fadeIn(10);
                g.preventDefault();
            });

            $(".tab-slider").owlCarousel({
                loop: true,
                responsiveClass: true,
                nav: false,
                dots: false,
                margin: 30,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    },
                    768: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 3,
                    },
                },
            });
            $(".sponsor-slider").owlCarousel({
                loop: true,
                responsiveClass: true,
                nav: false,
                dots: false,
                margin: 30,
                autoplay: true,
                autoplayTimeout: 1500,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    500: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 4,
                    },
                    1200: {
                        items: 5,
                    },
                },
            });
            $(".casting-slider").owlCarousel({
                loop: true,
                responsiveClass: true,
                nav: false,
                dots: false,
                margin: 14,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    450: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                },
            });
            var owl = $(".casting-slider");
            owl.owlCarousel();
            // Go to the next item
            $(".cast-next").on("click", function () {
                owl.trigger("next.owl.carousel");
            });
            // Go to the previous item
            $(".cast-prev").on("click", function () {
                owl.trigger("prev.owl.carousel", [300]);
            });
            $(".casting-slider-two").owlCarousel({
                loop: true,
                responsiveClass: true,
                nav: false,
                dots: false,
                margin: 14,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    450: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                },
            });
            var owlTT = $(".casting-slider-two");
            owlTT.owlCarousel();
            // Go to the next item
            $(".cast-next-2").on("click", function () {
                owlTT.trigger("next.owl.carousel");
            });
            // Go to the previous item
            $(".cast-prev-2").on("click", function () {
                owlTT.trigger("prev.owl.carousel", [300]);
            });
            $(".details-photos").owlCarousel({
                // loop:true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000,
                smartSpeed: 1000,
                margin: 30,
                nav: false,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    1024: {
                        items: 3,
                    },
                    1200: {
                        items: 3,
                    },
                },
            });

            // seat book
            var book = 0;
            $(".seat-free img").on("click", function (e) {
                if (book == 0) {
                    $(this).attr("src", "assets/img/movie/seat-1-free.png");
                    book = 1;
                } else if (book == 1) {
                    $(this).attr("src", "assets/img/movie/seat-1-booked.png");
                    book = 0;
                }
            });

            // copyright date
            var date = new Date().getFullYear();
            $("#date").html(date);

            var bookTwo = 1;
            $(".seat-free-two").on("click", function (e) {
                if (bookTwo == 0) {
                    $(this).find("img").attr("src", "assets/img/movie/seat-2-free.png");
                    bookTwo = 1;
                    $(this).find("span").removeClass("booked-bg");
                } else if (bookTwo == 1) {
                    $(this).find("img").attr("src", "assets/img/movie/seat-2-booked.png");
                    bookTwo = 0;
                    $(this).find("span").addClass("booked-bg");
                }
            });

            // shop cart + - start here
            var CartPlusMinus = $(".cart-plus-minus");
            CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
            CartPlusMinus.append('<div class="inc qtybutton">+</div>');
            $(".qtybutton").on("click", function () {
                var $button = $(this);
                var oldValue = $button.parent().find("input").val();
                if ($button.text() === "+") {
                    var newVal = parseFloat(oldValue) + 1;
                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 0) {
                        var newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 1;
                    }
                }
                $button.parent().find("input").val(newVal);
            });
            //Speaker Slider
            $(".speaker-slider").owlCarousel({
                loop: true,
                responsiveClass: true,
                nav: false,
                dots: false,
                margin: 30,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                },
            });
            var owlT = $(".speaker-slider");
            owlT.owlCarousel();
            // Go to the next item
            $(".speaker-next").on("click", function () {
                owlT.trigger("next.owl.carousel");
            });
            // Go to the previous item
            $(".speaker-prev").on("click", function () {
                owlT.trigger("prev.owl.carousel", [300]);
            });
            //Client SLider
            $(".client-slider").owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                autoplay: true,
                autoplayTimeout: 2500,
                autoplayHoverPause: true,
            });
            //Count Down JAva Script
            $(".countdown").countdown(
                {
                    date: "5/10/2030 05:00:00",
                    offset: +2,
                    day: "Day",
                    days: "Days",
                },
                function () {
                    alert("Done!");
                }
            );
            //Widget Slider
            $(".widget-slider").owlCarousel({
                loop: true,
                nav: false,
                dots: false,
                items: 1,
                autoplay: true,
                autoplayTimeout: 2500,
                autoplayHoverPause: true,
                margin: 30,
            });
            var owlBela = $(".widget-slider");
            owlBela.owlCarousel();
            // Go to the next item
            $(".widget-next").on("click", function () {
                owlBela.trigger("next.owl.carousel");
            });
            // Go to the previous item
            $(".widget-prev").on("click", function () {
                owlBela.trigger("prev.owl.carousel", [300]);
            });
            $(".blog-slider").owlCarousel({
                loop: true,
                nav: false,
                dots: false,
                items: 1,
                autoplay: true,
                autoplayTimeout: 2500,
                autoplayHoverPause: true,
            });
            var owlB = $(".blog-slider");
            owlB.owlCarousel();
            // Go to the next item
            $(".blog-next").on("click", function () {
                owlB.trigger("next.owl.carousel");
            });
            // Go to the previous item
            $(".blog-prev").on("click", function () {
                owlB.trigger("prev.owl.carousel", [300]);
            });
        });
    }, []);
    return (
        <>
            <Header />
            <div>{children}</div>
            <BackToTop />
            <Footer />
        </>
    );
}
export default Layout;
