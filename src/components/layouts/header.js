import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Header() {
    //headline animation
    useEffect(() => {
        const $ = window.$;
        const i = window.i;
        $(document).ready(function () {
            var animationDelay = 2500,
                barAnimationDelay = 3800,
                barWaiting = barAnimationDelay - 3000,
                lettersDelay = 50,
                typeLettersDelay = 150,
                selectionDuration = 500,
                typeAnimationDelay = selectionDuration + 800,
                revealDuration = 600,
                revealAnimationDelay = 1500;

            initHeadline();

            function initHeadline() {
                singleLetters($(".cd-headline.letters").find("b"));
                animateHeadline($(".cd-headline"));
            }

            function singleLetters($words) {
                $words.each(function () {
                    var word = $(this),
                        letters = word.text().split(""),
                        selected = word.hasClass("is-visible");
                    for (i in letters) {
                        if (word.parents(".rotate-2").length > 0) letters[i] = "<em>" + letters[i] + "</em>";
                        letters[i] = selected ? '<i class="in">' + letters[i] + "</i>" : "<i>" + letters[i] + "</i>";
                    }
                    var newLetters = letters.join("");
                    word.html(newLetters).css("opacity", 1);
                });
            }

            function animateHeadline($headlines) {
                var duration = animationDelay;
                $headlines.each(function () {
                    var headline = $(this);

                    if (headline.hasClass("loading-bar")) {
                        duration = barAnimationDelay;
                        setTimeout(function () {
                            headline.find(".cd-words-wrapper").addClass("is-loading");
                        }, barWaiting);
                    } else if (headline.hasClass("clip")) {
                        var spanWrapper = headline.find(".cd-words-wrapper"),
                            newWidth = spanWrapper.width() + 10;
                        spanWrapper.css("width", newWidth);
                    } else if (!headline.hasClass("type")) {
                        var words = headline.find(".cd-words-wrapper b"),
                            width = 0;
                        words.each(function () {
                            var wordWidth = $(this).width();
                            if (wordWidth > width) width = wordWidth;
                        });
                        headline.find(".cd-words-wrapper").css("width", width);
                    }

                    setTimeout(function () {
                        hideWord(headline.find(".is-visible").eq(0));
                    }, duration);
                });
            }

            function hideWord($word) {
                var nextWord = takeNext($word);

                if ($word.parents(".cd-headline").hasClass("type")) {
                    var parentSpan = $word.parent(".cd-words-wrapper");
                    parentSpan.addClass("selected").removeClass("waiting");
                    setTimeout(function () {
                        parentSpan.removeClass("selected");
                        $word.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out");
                    }, selectionDuration);
                    setTimeout(function () {
                        showWord(nextWord, typeLettersDelay);
                    }, typeAnimationDelay);
                } else if ($word.parents(".cd-headline").hasClass("letters")) {
                    var bool = $word.children("i").length >= nextWord.children("i").length ? true : false;
                    hideLetter($word.find("i").eq(0), $word, bool, lettersDelay);
                    showLetter(nextWord.find("i").eq(0), nextWord, bool, lettersDelay);
                } else if ($word.parents(".cd-headline").hasClass("clip")) {
                    $word.parents(".cd-words-wrapper").animate({ width: "2px" }, revealDuration, function () {
                        switchWord($word, nextWord);
                        showWord(nextWord);
                    });
                } else if ($word.parents(".cd-headline").hasClass("loading-bar")) {
                    $word.parents(".cd-words-wrapper").removeClass("is-loading");
                    switchWord($word, nextWord);
                    setTimeout(function () {
                        hideWord(nextWord);
                    }, barAnimationDelay);
                    setTimeout(function () {
                        $word.parents(".cd-words-wrapper").addClass("is-loading");
                    }, barWaiting);
                } else {
                    switchWord($word, nextWord);
                    setTimeout(function () {
                        hideWord(nextWord);
                    }, animationDelay);
                }
            }

            function showWord($word, $duration) {
                if ($word.parents(".cd-headline").hasClass("type")) {
                    showLetter($word.find("i").eq(0), $word, false, $duration);
                    $word.addClass("is-visible").removeClass("is-hidden");
                } else if ($word.parents(".cd-headline").hasClass("clip")) {
                    $word.parents(".cd-words-wrapper").animate({ width: $word.width() + 10 }, revealDuration, function () {
                        setTimeout(function () {
                            hideWord($word);
                        }, revealAnimationDelay);
                    });
                }
            }

            function hideLetter($letter, $word, $bool, $duration) {
                $letter.removeClass("in").addClass("out");

                if (!$letter.is(":last-child")) {
                    setTimeout(function () {
                        hideLetter($letter.next(), $word, $bool, $duration);
                    }, $duration);
                } else if ($bool) {
                    setTimeout(function () {
                        hideWord(takeNext($word));
                    }, animationDelay);
                }

                if ($letter.is(":last-child") && $("html").hasClass("no-csstransitions")) {
                    var nextWord = takeNext($word);
                    switchWord($word, nextWord);
                }
            }

            function showLetter($letter, $word, $bool, $duration) {
                $letter.addClass("in").removeClass("out");

                if (!$letter.is(":last-child")) {
                    setTimeout(function () {
                        showLetter($letter.next(), $word, $bool, $duration);
                    }, $duration);
                } else {
                    if ($word.parents(".cd-headline").hasClass("type")) {
                        setTimeout(function () {
                            $word.parents(".cd-words-wrapper").addClass("waiting");
                        }, 200);
                    }
                    if (!$bool) {
                        setTimeout(function () {
                            hideWord($word);
                        }, animationDelay);
                    }
                }
            }

            function takeNext($word) {
                return !$word.is(":last-child") ? $word.next() : $word.parent().children().eq(0);
            }

            function takePrev($word) {
                return !$word.is(":first-child") ? $word.prev() : $word.parent().children().last();
            }

            function switchWord($oldWord, $newWord) {
                $oldWord.removeClass("is-visible").addClass("is-hidden");
                $newWord.removeClass("is-hidden").addClass("is-visible");
            }
        });
    }, []);
    return (
        <>
            <header className="header-section">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="logo">
                            <NavLink to="/">
                                <img src="assets/img/logo/logo.png" alt="logo" />
                            </NavLink>
                        </div>
                        <ul className="menu">
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/movie-list">movies</NavLink>
                                <ul className="submenu">
                                    <li>
                                        <NavLink to="/movie-list">
                                            <i className="fal fa-long-arrow-alt-right"></i>Movie List
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/movie-ticket">
                                            <i className="fal fa-long-arrow-alt-right"></i>Movie Ticket Plan
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">events</a>
                                <ul className="submenu">
                                    <li>
                                        <a href="events.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Events
                                        </a>
                                    </li>
                                    <li>
                                        <a href="event-details.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Event Details
                                        </a>
                                    </li>
                                    <li>
                                        <a href="event-speaker.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Event Speaker
                                        </a>
                                    </li>
                                    <li>
                                        <a href="event-ticket.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Event Ticket
                                        </a>
                                    </li>
                                    <li>
                                        <a href="event-checkout.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Event Checkout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">sports</a>
                                <ul className="submenu">
                                    <li>
                                        <a href="sports.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Sports
                                        </a>
                                    </li>
                                    <li>
                                        <a href="sport-details.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Sport Details
                                        </a>
                                    </li>
                                    <li>
                                        <a href="sports-ticket.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Sport Ticket
                                        </a>
                                    </li>
                                    <li>
                                        <a href="sports-checkout.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Sport Checkout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">pages</a>
                                <ul className="submenu">
                                    <li>
                                        <a href="about.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="apps-download.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Apps Download
                                        </a>
                                    </li>
                                    <li>
                                        <a href="team.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Team
                                        </a>
                                    </li>
                                    <li>
                                        <a href="pricing.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Pricing
                                        </a>
                                    </li>
                                    <li>
                                        <a href="login.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Login
                                        </a>
                                    </li>
                                    <li>
                                        <a href="register.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Register
                                        </a>
                                    </li>
                                    <li>
                                        <a href="forgot-password.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Forgot Password
                                        </a>
                                    </li>
                                    <li>
                                        <a href="faq.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Faq
                                        </a>
                                    </li>
                                    <li>
                                        <a href="term-condition.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Terms & Conditions
                                        </a>
                                    </li>
                                    <li>
                                        <a href="privacy-policy.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="404.html">
                                            <i className="fal fa-long-arrow-alt-right"></i>404
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to="/blog-list">blog</NavLink>
                            </li>
                            <li>
                                <a href="contact.html">contact</a>
                            </li>
                            <li className="header-button pr-0">
                                <a href="login.html">join us</a>
                            </li>
                        </ul>
                        <div className="header-bar d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
export default Header;
