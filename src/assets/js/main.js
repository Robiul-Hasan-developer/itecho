(function ($) {
  "use strict";

  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
    // ============== Mobile Nav Menu Dropdown Js Start =======================
    function toggleSubMenu() {
      if ($(window).width() <= 991) {
        $(".has-submenu")
          .off("click")
          .on("click", function () {
            $(this)
              .toggleClass("active")
              .siblings(".has-submenu")
              .removeClass("active")
              .find(".nav-submenu")
              .slideUp(300);
            $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
          });
      } else {
        $(".has-submenu").off("click");
      }
    }

    toggleSubMenu();
    $(window).resize(toggleSubMenu);
    // ============== Mobile Nav Menu Dropdown Js End =======================

    // ===================== Scroll Back to Top Js Start ======================
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
    // ===================== Scroll Back to Top Js End ======================

    // ========================== add active class to navbar menu current page Js Start =====================
    function dynamicActiveMenuClass(selector) {
      let FileName = window.location.pathname.split("/").reverse()[0];

      // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
      if (FileName === "" || FileName === "index.html") {
        // Keep the activePage class on the Home link
        selector
          .find("li.nav-menu__item.has-submenu")
          .eq(0)
          .addClass("activePage");
      } else {
        // Remove activePage class from all items first
        selector.find("li").removeClass("activePage");

        // Add activePage class to the correct li based on the current URL
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("activePage");
          }
        });

        // If any li has activePage element, add class to its parent li
        selector.children("li").each(function () {
          if ($(this).find(".activePage").length) {
            $(this).addClass("activePage");
          }
        });
      }
    }

    if ($("ul").length) {
      dynamicActiveMenuClass($("ul"));
    }
    // ========================== add active class to navbar menu current page Js End =====================

    // ========================== Settings Panel Js Start =====================
    $(".settings-button").on("click", function () {
      $(".settings-panel").toggleClass("active");
      $(this).toggleClass("active");
    });

    $(document).on(
      "click",
      ".settings-panel__buttons .settings-panel__button",
      function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      },
    );

    // Cursor start
    $(".cursor-animate").on("click", function () {
      $("body").removeClass("remove-animate-cursor");
    });

    $(".cursor-default").on("click", function () {
      $("body").addClass("remove-animate-cursor");
    });
    // Cursor end

    // Direction start
    $(".direction-ltr").on("click", function () {
      $("html").attr("dir", "ltr");
    });

    $(".direction-rtl").on("click", function () {
      $("html").attr("dir", "rtl");
    });
    // Direction end
    // ========================== Settings Panel Js End =====================

    // ********************* Toast Notification Js start *********************
    function toastMessage(messageType, messageTitle, messageText, messageIcon) {
      let $toastContainer = $("#toast-container");

      let $toast = $("<div>", {
        class: `toast-message ${messageType}`,
        html: `
      <div class="toast-message__content">
        <span class="toast-message__icon">
          <i class="${messageIcon}"></i>
        </span>
        <div class="flex-grow-1">
          <div class="d-flex align-items-start justify-content-between mb-1">
            <h6 class="toast-message__title">${messageTitle}</h6>
            <button type="button" class="toast-message__close">
              <i class="ph-bold ph-x"></i>
            </button>
          </div>
          <span class="toast-message__text">${messageText}</span>
        </div>
      </div>
      <div class="progress__bar"></div>
    `,
      });

      $toastContainer.append($toast);

      setTimeout(() => {
        $toast.addClass("active");
      }, 50);

      let totalDuration = 3500;
      let startTime = Date.now();
      let remainingTime = totalDuration;
      let toastTimeout = setTimeout(hideToast, remainingTime);

      function hideToast() {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      }

      // Remove Toast on Close Button Click
      $toast.find(".toast-message__close").on("click", function () {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      });

      // Pause Timeout on Hover
      $toast.on("mouseenter", function () {
        remainingTime -= Date.now() - startTime;
        clearTimeout(toastTimeout);
      });

      // Resume Timeout on Mouse Leave
      $toast.on("mouseleave", function () {
        startTime = Date.now();
        toastTimeout = setTimeout(hideToast, remainingTime);
      });
    }
    // ********************* Toast Notification Js End *********************

    // ========================= Delete Item Js start ===================
    $(document).on("click", ".delete-button", function () {
      $(this).closest(".delete-item").addClass("d-none");

      toastMessage(
        "danger",
        "Deleted",
        "You deleted successfully!",
        "ph-bold ph-trash",
      );
    });
    // ========================= Delete Item Js End ===================

    // ========================= Form Submit Js Start ===================
    $(document).on("submit", ".form-submit", function (e) {
      e.preventDefault();

      $("input").val("");

      $("textarea").val("");

      toastMessage(
        "success",
        "Success",
        "Form submitted successfully!",
        "ph-fill ph-check-circle",
      );
    });
    // ========================= Form Submit Js End ===================

    // ================== Password Show Hide Js Start ==========
    $(".toggle-password").on("click", function () {
      $(this).toggleClass("active");
      var input = $($(this).attr("id"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
        $(this).removeClass("ph-bold ph-eye-closed");
        $(this).addClass("ph-bold ph-eye");
      } else {
        input.attr("type", "password");
        $(this).addClass("ph-bold ph-eye-closed");
      }
    });
    // ========================= Password Show Hide Js End ===========================

    // ========================= AOS Js Start ===========================
    AOS.init({
      once: false,
    });
    // ========================= AOS Js End ===========================

    // ========================= Animated Radial Progress Js Start ===================
    function animateProgress() {
      $("svg.radial-progress").each(function () {
        // Check if the element is within the viewport
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          const percent = $(this).data("percentage");
          const radius = $(this).find("circle.complete").attr("r");
          const circumference = 2 * Math.PI * radius;
          const strokeDashOffset =
            circumference - (percent / 100) * circumference;

          // Animate the circle
          $(this)
            .find("circle.complete")
            .css("stroke-dashoffset", strokeDashOffset);
        }
      });
    }

    // Trigger animation on scroll and page load
    $(window).on("scroll", animateProgress);
    animateProgress(); // Run on page load
    // ========================= Animated Radial Progress Js End ===================

    // ====================== Marquee Js Start ========================
    if ($(".marquee_left").length) {
      $(".marquee_left").marquee({
        speed: 50,
        gap: 0,
        delayBeforeStart: 0,
        direction: $("html").attr("dir") === "rtl" ? "right" : "left",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
        direction: "left",
      });
    }
    // ====================== Marquee Js End ========================

    // ========================= magnific Popup Js Start =====================
    $(".play-button").magnificPopup({
      type: "iframe",
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
    // ========================= magnific Popup Js End =====================

    // ================================ Floating Progress js start =================================
    const progressContainers = document.querySelectorAll(".progress-container");

    function setPercentage(progressContainer) {
      const percentage =
        progressContainer.getAttribute("data-percentage") + "%";

      const progressEl = progressContainer.querySelector(".progress");
      const percentageEl = progressContainer.querySelector(".percentage");

      progressEl.style.width = percentage;
      percentageEl.innerText = percentage;
      percentageEl.style.insetInlineStart = percentage;
    }

    // Intersection Observer to trigger progress animation when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is in view, start the progress animation
            const progressContainer = entry.target;
            setPercentage(progressContainer);
            progressContainer
              .querySelector(".progress")
              .classList.remove("active");
            progressContainer
              .querySelector(".percentage")
              .classList.remove("active");
            observer.unobserve(progressContainer); // Stop observing once animation is triggered
          }
        });
      },
      {
        threshold: 0.5, // Adjust this value as needed (0.5 means half the section needs to be visible)
      },
    );

    // Start observing all progress containers
    progressContainers.forEach((progressContainer) => {
      observer.observe(progressContainer);
    });
    // ================================ Floating Progress js End =================================

    // =========================  Search Bar 9 Js Start ==============
    $(".open-search").on("click", function () {
      $(".search_popup").addClass("search-opened");
      $(".search-popup-overlay").addClass("search-popup-overlay-open");
    });
    $(".search_close_btn").on("click", function () {
      $(".search_popup").removeClass("search-opened");
      $(".search-popup-overlay").removeClass("search-popup-overlay-open");
    });
    $(".search-popup-overlay").on("click", function () {
      $(".search_popup").removeClass("search-opened");
      $(this).removeClass("search-popup-overlay-open");
    });
    // =========================  Search Bar 9 Js End ==============

    // ================================= Brand slider Start =========================
    var brandSlider = new Swiper(".brand-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 6,
      breakpoints: {
        300: {
          slidesPerView: 2,
        },
        575: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      },
    });
    // ================================= Brand slider End =========================

    // ================================= Brand about slider Start =========================
    var aboutbrandSlider = new Swiper(".about-brand__slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 4,
      breakpoints: {
        300: {
          slidesPerView: 2,
        },
        575: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
      },
    });
    // ================================= Brand about slider End =========================

    // ================================= Brand slider Two Start =========================
    var BrandTwoSlider = new Swiper(".brand-two-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 6,
      breakpoints: {
        300: {
          slidesPerView: 2,
        },
        575: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      },
    });
    // ================================= Brand slider Two End =========================

    // ================================ portfolio slider start ==============================
    var PortfolioSwiperSlider = new Swiper(".portfolio-swiper-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 1500,
      spaceBetween: 30,
      grabCursor: true,
      loop: true,
      slidesPerView: 3,
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        675: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
    });
    // ================================ portfolio slider end ==============================

    // ============================ testimonial js start ============================
    var TestimonialSlider = new Swiper(".testimonial-slider", {
      speed: 1500,
      effect: "cube",
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      cubeEffect: {
        shadow: false,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      navigation: {
        nextEl: "#swiper-button-next",
        prevEl: "#swiper-button-prev",
      },
    });
    // ============================ testimonial js end ============================

    // ============================ testimonial js start ============================
    var TestimonialSlider = new Swiper(".testimonial-slider", {
      speed: 1500,
      effect: "cube",
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      cubeEffect: {
        shadow: false,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      navigation: {
        nextEl: "#swiper-button-ten-next",
        prevEl: "#swiper-button-ten-prev",
      },
    });
    // ============================ testimonial js end ============================

    // ============================ testimonial four js start ============================
    var testimonialFourSlider = new Swiper(".testimonial-four__slider", {
      speed: 2000,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: "#swiper-four-button-next",
        prevEl: "#swiper-four-button-prev",
      },
    });

    var testimonialFourSlider = new Swiper(".testimonial-four__slider", {
      speed: 2000,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: "#swiper-four-slider-button-next",
        prevEl: "#swiper-four-slider-button-prev",
      },
    });
    // ============================ testimonial four js end ============================

    // ============================ company projects js start =====================
    var companyProjectsSlider = new Swiper(".company-projects__slider", {
      spaceBetween: 30,
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 4,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        675: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1199: {
          slidesPerView: 4,
        },
      },
    });
    // ============================ company projects js end =====================

    // ============================ testimonial about js start ========================
    var testimonialAboutSlider = new Swiper(".testimonial-about__slider", {
      speed: 2000,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: "#swiper-about-button-next",
        prevEl: "#swiper-about-button-prev",
      },
    });

    var testimonialAboutSlider = new Swiper(".testimonial-about__slider", {
      speed: 2000,
      // grabCursor: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: "#swiper-about-two-button-next",
        prevEl: "#swiper-about-two-button-prev",
      },
    });
    // ============================ testimonial about js end ========================

    // Service slider
    var swiper = new Swiper(".Service-slider-active", {
      effect: "coverflow",
      centeredSlides: true,
      loop: true,
      speed: 1200,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },

      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 150,
        modifier: 2.5,
        slideShadows: false,
      },

      keyboard: {
        enabled: true,
      },

      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        767: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 2,
        },
      },

      on: {
        init() {
          this.wrapperEl.style.transitionTimingFunction = "ease";
        },
        slideChangeTransitionStart() {
          this.wrapperEl.style.transitionTimingFunction = "ease";
        },
      },
    });

    // ========================== service five slider ============================
    var servicefiveslider = new Swiper(".service-five__slider", {
      spaceBetween: 30,
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 3,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        675: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
    });
    // ========================== service five end ============================

    // ================================= new brand one slider slider Start =========================
    var brandSliderOne = new Swiper(".new-brand-one-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 6,
      slidesPerGroup: 2,
      pagination: {
        el: ".new-brand-one-slider-pagination",
        clickable: true,
      },
      loopFillGroupWithBlank: true,
      freeMode: true,
      freeModeMomentum: false,
      breakpoints: {
        300: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        575: {
          slidesPerView: 3,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 2,
        },
        992: {
          slidesPerView: 5,
          slidesPerGroup: 2,
        },
        1200: {
          slidesPerView: 6,
          slidesPerGroup: 2, // keeps 3 dots
        },
      },
    });
    // ================================= new brand one slider slider End =========================

    // ================================= new Testimonials slider one Start =========================
    var newTestimonialsOneSlider = new Swiper(".new-testimonials-one-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      spaceBetween: 0,
      autoplay: false,
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      effect: "cube",
      grabCursor: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      pagination: {
        el: ".new-testimonials-one-slider-pagination",
        clickable: true,
      },
    });
    // ================================= new Testimonials slider one End =========================

    // ========================== Custom Language select with flag js start ============================
    if ($(".select-selected").length) {
      const selected = document.querySelector(".select-selected");
      const items = document.querySelector(".select-items");

      // Toggle dropdown
      selected.addEventListener("click", () => {
        items.style.display =
          items.style.display === "block" ? "none" : "block";
      });

      // Select option
      document.querySelectorAll(".select-items div").forEach((option) => {
        option.addEventListener("click", function () {
          selected.querySelector("span").innerHTML = this.innerHTML;
          items.style.display = "none";
        });
      });

      // Close if clicked outside
      document.addEventListener("click", function (e) {
        if (!document.querySelector(".select-box").contains(e.target)) {
          items.style.display = "none";
        }
      });
    }
    // ========================== Custom Language select with flag js end ============================

    // ========================= Counter Up Js End ===================
    const counterUp = window.counterUp.default;
    const callback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && !el.classList.contains("is-visible")) {
          counterUp(el, {
            duration: 3500,
            delay: 16,
          });
          el.classList.add("is-visible");
        }
      });
    };
    const IO = new IntersectionObserver(callback, { threshold: 1 });

    // Banner statistics Counter
    const statisticsCounter = document.querySelectorAll(".counter");
    if (statisticsCounter.length > 0) {
      statisticsCounter.forEach((counterNumber) => {
        IO.observe(counterNumber);
      });
    }

    // performance Count
    const performanceCount = document.querySelectorAll(".counter");
    if (performanceCount.length > 0) {
      performanceCount.forEach((counterNumber) => {
        IO.observe(counterNumber);
      });
    }
    // ========================= Counter Up Js End ===================

    // ========================== Add Attribute For Bg Image Js Start ====================
    $(".background-img").css("background", function () {
      var bg = "url(" + $(this).data("background-image") + ")";
      return bg;
    });
    // ========================== Add Attribute For Bg Image Js End =====================
  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
  $(window).on("load", function () {
    $(".loader-mask").fadeOut();
  });
  // ========================= Preloader Js End=====================

  // ========================= Header Sticky Js Start ==============
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });
  // ========================= Header Sticky Js End===================

  // ========================= Header Sticky two Js Start ==============
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header-two").addClass("fixed-header-two");
    } else {
      $(".header-two").removeClass("fixed-header-two");
    }
  });
  // ========================= Header Sticky tw0 Js End===================
})(jQuery);
