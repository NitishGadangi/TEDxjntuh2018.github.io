(function(){
	'use strict';

	/*------------------------------------------
	STICKY MENU
	------------------------------------------*/
	function stickyMenu(){
		var _window = $(window),
			stickyHeader = $('body.sticky-header'),
			mainHeader = $('.main-header'),
			offcanvasMenu = $('.offcanvas-menu'),
			mainHeaderInner = $('.main-header-inner'),
			menuContainer = mainHeader.find('.menu-container'),
			logoContainer = mainHeader.find('.logo-container'),
			mainHeaderOffset = mainHeaderInner.offset().top + mainHeaderInner.outerHeight(),
			stickyEl = $('<div class="sticky-menu">' +
					'<div class="container">' +
						'<div class="sticky-logo-container">' +
						'</div>' +
						'<div class="sticky-menu-container">' +
							'<div class="sticky-main-nav main-nav clearfix">' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>');

		if ( stickyHeader.length ) {
			stickyEl.appendTo('body').insertBefore('.main-wrapper');

			if ( menuContainer.find('.main-nav').hasClass('style4') ){
				menuContainer.find('.main-nav').find('.top-nav').clone().appendTo('.sticky-main-nav');
			}
			if ( offcanvasMenu.length ){
				mainHeader.find('.shifter-handle').clone().appendTo('.sticky-menu').insertAfter('.sticky-logo-container');
			}
			logoContainer.find('.logo').clone().appendTo('.sticky-logo-container');
			menuContainer.find('.main-nav').children('ul').clone().appendTo('.sticky-main-nav');
			if ( $('.sticky-menu-container .sticky-main-nav').length && $('.sticky-menu-container .sticky-main-nav').children('ul').length >= 2 && !menuContainer.find('.main-nav').hasClass('style4') ) {
				$('.sticky-menu-container .sticky-main-nav').children('ul').find('.icon').appendTo('.sticky-menu-container .sticky-main-nav > ul:nth-child(2)');
			};
		};
		_window.on('scroll', function() {
			if ( _window.scrollTop() >= mainHeaderOffset ) {
				stickyEl.addClass('slideDown');
				if(mainHeaderInner.find('.menu-container').hasClass('hover') == true){
					stickyEl.removeClass('slideDown');
				}
			} else {
				stickyEl.removeClass('slideDown');
				// stickyEl.delay(500).fadeOut(10).delay(20).show();
			};
		});
	};
	if($('body.sticky-header').length){
		stickyMenu();
	};

	/*------------------------------------------
	MAIN NAV 
	------------------------------------------*/
	function mainNav(){
		var mainHeader = $('.main-header:not(.fixed-menu)'),
			mainBar = mainHeader.find('.main-bar'),
			breadCrumb = mainHeader.find('.breadcrumbs-container'),
			bottomBar = mainHeader.find('.bottom-bar'),
			mainNav = mainBar.find('.main-nav:not(.style4)'),
			logoContainer = mainBar.find('.logo-container'),
			mainBarPaddingTop = mainBar.css('padding-top'),
			mainBarPaddingBottom = mainBar.css('padding-bottom');

		$('.main-header').find('.logo-container').imagesLoaded(function() {

			mainNav.css('min-height', logoContainer.find('.logo').find('img').height() );

			logoContainer.css({'padding-top': mainBarPaddingTop, 'padding-bottom': mainBarPaddingBottom});

			function centerize(element){
				element.each(function() {
					var $this = $(this);
					$this.css({
						'padding-top': (logoContainer.outerHeight() / 2 - $this.height() / 2),
						'padding-bottom': (logoContainer.outerHeight() / 2 - $this.height() / 2)
					});
				});
			};

			centerize(mainNav.children('ul').children('li').children('a'));
			centerize(mainNav.find('li.icons').find('.icon').children('a'));
			centerize(mainNav.find('ul.shopping-menu').find('.icon'));
			centerize(mainBar.find('ul.options').find('li'));
			centerize(mainBar.find('.search-form'));
			centerize(mainBar.find('.ads-container'));

		  	mainBar.css({ 'padding-bottom': 0, 'padding-top': 0 });

			mainNav.css({
				opacity: '1',
				visibility: 'visible'
			});
		});
	};
	/*------------------------------------------
	MAIN NAV INIT
	------------------------------------------*/
	if ( ! $('.main-nav.style4').length ) {
		mainNav();
	};

	/*------------------------------------------
	MAIN NAV STYLE 4
	------------------------------------------*/
	function mainNav4(){
		var headerStyle2 = $('.main-header'),
			mainBar = headerStyle2.find('.main-bar'),
			bottomBar = headerStyle2.find('.bottom-bar'),
			mainNav = mainBar.find('.main-nav.style4'),
			mainNavHeight = mainNav.height(),
			logoContainer = mainBar.find('.logo-container'),
			mainBarPaddingTop = mainBar.css('padding-top'),
			mainBarPaddingBottom = mainBar.css('padding-bottom');

		$('.main-header').find('.logo-container').imagesLoaded(function() {

			mainNav.css('min-height', logoContainer.find('.logo').find('img').height() );

			logoContainer.css({'padding-top': mainBarPaddingTop, 'padding-bottom': mainBarPaddingBottom});

			mainNav.css({
				'padding-top': logoContainer.outerHeight() / 2 - mainNavHeight / 2,
				'padding-bottom': logoContainer.outerHeight() / 2 - mainNavHeight / 2
			});
		});

	  	mainBar.css({ 'padding-bottom': 0, 'padding-top': 0 });

		mainNav.css({
			opacity: '1',
			visibility: 'visible'
		});
	};
	if ( $('.main-nav.style4').length ) {
		mainNav4();
	};

	/*-----------------------------------------
	PAGE PRELOADER
	------------------------------------------*/
	if ( $('.preloader-container').length ) {
		$('body').jpreLoader({
			splashID: "#preloader-container",
			loaderVPos: '70%'
		});
	};

	/*------------------------------------------
	WOW SCROLL REVEAL INIT
	------------------------------------------*/
	if ( $('.wow').length ) {
		var wow = new WOW({mobile: false});
		wow.init();
	};

	/*------------------------------------------
	DROPDOWN MENU TOGGLING
	------------------------------------------*/
	$('body').on('click', 'a[data-toggle="dropdown"]', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		if ( $(window).width() <= 991 || $(this).parents('.offcanvas-menu-style2').length || $(this).parents('.fixed-menu').length ){
			var $this = $(this);
			$this.parent().siblings().removeClass('open')
									 			 .children('.sub-menu').slideUp(300)
							 		 			 .end()
					  				  .end()
	  			 .toggleClass('open');

			$this.siblings('.sub-menu').slideToggle(300);
		};
		if ( $('.main-nav').hasClass('style4') == true && $(window).width() >= 992 ) {
			
			var $this = $(this);
			$this.siblings('.sub-menu').slideToggle(300)
				 .end()
			     .parents('.main-nav').find('li').removeClass('open')
												 .children('.sub-menu').slideUp(300)
										 		 .end()
						  			  .end()
	  			 .end()
	  			 .parent().toggleClass('open');

		};
	});
	$('body').on('mouseenter', 'li.dropdown', function(e) {
		e.preventDefault();
		$(this).parents('.menu-container').addClass('hover')
	}).on('mouseleave', 'li.dropdown', function(e) {
		e.preventDefault();
		$(this).parents('.menu-container').removeClass('hover')
	});;
	
	/*------------------------------------------
	MEGA MENU POSITIONING
	------------------------------------------*/
	function megaMenuPositioning(){
		var container = $('.container').last(),
			menuContainer = $('.dropdown').parents('.menu-container'),
			megaMenu = $('.mega-menu:not(.full-width):not(.multi-column)'),
			megaMenuSub = megaMenu.children('.sub-menu'),
			multiColumnSub = $('.mega-menu.multi-column').children('.sub-menu'),
			mainBar2 = $('.main-bar.style2'),
			mainBar2Container = mainBar2.children('.container'),
			mainBar2ContainerW = mainBar2Container.width(),
			containerOffset,
			menuContainerOffset;

		container.length ? containerOffset = container.offset().left : containerOffset = 0;

		megaMenuSub.css('left', containerOffset);

		if ( ( menuContainer.width() != $(window).width() ) && ! $('.offcanvas-menu-style2').length ) {
			menuContainerOffset = menuContainer.offset().left;
			if ( $('.bottom-bar').find('.left-sec').find('.menu-container').length ) {
				menuContainerOffset = $('.bottom-bar').find('.left-sec').find('.menu-container').offset().left;
			};
			multiColumnSub.css({
				left: menuContainerOffset,
				right: containerOffset - 180
			});
		} else {
			menuContainerOffset = containerOffset;
			multiColumnSub.css({
				left: menuContainerOffset,
				right: containerOffset
			});
		};
		if ( $('.bottom-bar').find('.main-nav') ) {
			$('.bottom-bar').find(multiColumnSub).css({
				left: menuContainerOffset,
				right: containerOffset + 290
			});
		};
		if ( $('.main-header.style4').length || $('.bottom-bar').find('.main-nav').hasClass('align-center') ) {
			$('.bottom-bar').find(multiColumnSub).css({
				left: multiColumnSub.parents('.main-nav').children('ul').children('li').first().offset().left,
				right: containerOffset
			});
		};
		if ( mainBar2.length ){
			multiColumnSub.css({
				left: menuContainerOffset - 60,
				right: 0
			})
			megaMenuSub.each(function(){
				var $this = $(this),
					thisParent = $this.parent('.mega-menu');
					$this.css('left', mainBar2ContainerW + mainBar2Container.offset().left - $this.width());
			});
		};
		if ( $('body').hasClass('w1740') == true ){
			multiColumnSub.css({
				left: multiColumnSub.parents('.main-nav').children('ul').offset().left,
				right: 0
			});
		}
	};
	if( $('.mega-menu').length ) {
		megaMenuPositioning();
	};

	/*-----------------------------------------
	STOP CLOSING MEGA MENU WHEN PRODUCT BUTTON WAS CLICKED 
	------------------------------------------*/
	$('.mega-menu').find('.blog-preview').find('a').on('click', function(e){
		e.stopPropagation();
	});

	/*-----------------------------------------
	CHECKOUT SUB-MENU STYLE 2
	------------------------------------------*/
	function checkoutSubmenu(){
		var checkoutMenu = $('.dropdown.checkout-style2'),
			checkoutSubmenu = checkoutMenu.children('.sub-menu'),
			container = $('.main-header').find('.container');

		checkoutMenu.each(function(){
			var $this = $(this);
			checkoutSubmenu.css( 'right', (container.offset().left) );
		});
	};
	$('.main-header').find('.logo-container').imagesLoaded(function(){
		if( $('.checkout-style2').length ){
			checkoutSubmenu();
		};
	});

	/*-----------------------------------------
	HEADER TITLE BAR
	------------------------------------------*/
	function titleBarPadding(){
		var titleBar = $('.main-header.overlay-header').find('.title-bar');

		$('.main-header').find('.logo-container').imagesLoaded(function(){
			setTimeout(function(){
				titleBar.css('padding-top', titleBar.siblings('.main-header-inner').outerHeight() );

				if ( $(window).width() <= 991 ) {
					titleBar.css('padding-top', $('.mobile-header-wrapper').outerHeight() );
				};
			}, 500);
		});
	};

	/*-----------------------------------------
	HEADER TITLE BAR PADDING FIX INIT
	------------------------------------------*/
	if( $('.title-bar').length && $('.main-header.overlay-header').length ){
		titleBarPadding();
	};

	/*-----------------------------------------
	FOOTER FLICKR FEED INIT
	------------------------------------------*/
	if( $('.widget-flickr-feed').length ){
		$('.widget-flickr-feed').find('ul').jflickrfeed({
			limit: $('.widget-flickr-feed').find('ul').attr('data-photo-limit'),
			qstrings: {
				id: '40905678@N02' // CHANGE ID TO WHAT YOU WANT
			},
			itemTemplate: 
			'<li>' +
				'<a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
			'</li>'
		});
	};

	/*-----------------------------------------
	SUBSCRIBE FORM
	------------------------------------------*/
	function loading() {
	  $('.subscribe-form-result').html('Submitting...').slideDown();
	};
	function formResult(data) {
	  $('.subscribe-form-result').html(data);
	  $('.subscribe-form #subscribe-email').val('');
	};
	function onSubmit() {
	  $('.subscribe-form').submit(function() {
	      var action = $(this).attr('action');
	      loading();
	      $.ajax({
	          url: action,
	          type: 'POST',
	          data: {
	          email: $(this).find('#subscribe-email').val()
	      },
	      success: function(data){
	          formResult(data);
	      },
	      error: function(data) {
	          formResult(data);
	      }
	  });
	  return false;
	});
	}onSubmit();

	/*-----------------------------------------
	CONTACT FORM
	------------------------------------------*/
	function contactForm() {

	    var form = $('.contact-form');
	    var formMessages = form.next('.contact-form-message');
        formMessages.slideUp();

	    form.submit(function(event) {
	        event.preventDefault();
	        var formData = $(form).serialize();

	        if ( !form.find('input[required], textarea').val() ) {
	        	formMessages.text('Please Complete All inputs');
	        } else {
	        	formMessages.text('Sending your message. Please wait...').slideDown();
	        };

	        formMessages.removeClass('error').removeClass('success');

	        $.ajax({
	            type: 'POST',
	            url: form.attr('action'),
	            data: formData
	        })
	        .done(function(response) {
	            formMessages.removeClass('error').delay(3000).slideUp();
	            formMessages.addClass('success').delay(3000).slideUp();

	            formMessages.text(response);

	            form.find('input').not('input[type=submit]').val('');
	            form.find('textarea').val('');
	        })
	        .fail(function(data) {
	            // Make sure that the formMessages div has the 'error' class.
	            formMessages.removeClass('success').delay(3000).slideUp();
	            formMessages.addClass('error').delay(3000).slideUp();

	            // Set the message text.
	            if (data.responseText !== '') {
	                formMessages.text(data.responseText);
	            } else {
	                formMessages.text('Oops! An error occured and your message could not be sent.');
	            }
	        });
	    });
	};
	contactForm();

	/*------------------------------------------
	Signup Form Init
	------------------------------------------*/
	if ($('.signup-form').length) {
		$('.signup-form').ajaxChimp({
			url: 'YOUR MAILCHIMP URL'
		});
	};

	/*-----------------------------------------
	INSTAGRAM FEED
	------------------------------------------*/
	if( $('#instafeed').length ){
		var feed = new Instafeed({
			get: 'user',
		    accessToken: 'YOUR ACCESS TOKEN HERE',
			userId: 303273692,
			limit: 6,
			template: '<li><a href="{{link}}"><img src="{{image}}" /></a></li>'
		});
		feed.run();
	};

	/*-----------------------------------------
	TWEETER SLIDER
	------------------------------------------*/
	function twitterFeed(){
		var slider = $('.twittie-slider');
			// username = 'google';

        slider.twittie({
            username: username,
            dateFormat: '%B %d, %Y',
            template: '<p>{{tweet}}</p><span class="time">{{date}}</span><a href="{{url}}" class="username">@{{user_name}}</a>',
            count: 6,
            hideReplies: true
        },
        	function(){
        		slider.find('ul').owlCarousel({
        			singleItem: true,
        			items: 1,
        			nav: true,
        			navText: ['<i class="icon-knight-510"></i>', '<i class="icon-knight-522"></i>'],
        			animateIn: 'fadeInLeft',
        			animateOut: 'fadeOutRight'
        		});
        	}
    	);
		if( $('.widget-twitter').length ) {
	        $('.widget-twitter .twetts-container').twittie({
	            username: username,
	            dateFormat: '%B %d, %Y',
	            template: '<p>{{tweet}}<span>{{date}}</span></p>',
	            count: 2,
	            hideReplies: true
	        });
	    };
 	};
	if( $('.twittie-slider').length ) {
	 	twitterFeed();
    };

    /*-----------------------------------------
    PIE CHART STYLE 2
    ------------------------------------------*/
    function pieChart2(){

    	var chartContainer = $('.piechart-style2').find('.chart-container');

		chartContainer.each(function(index){
			var $this = $(this),
				canvas = $this.find('canvas'),
				ctx = canvas.get(0).getContext("2d"),
    			chartData = [];

			$this.find('.chart-data').find('li').each(function(){
				var li = $(this);

				chartData.push({
					value: li.data('value'),
					color: li.data('color'),
					label: li.text()
				})
			});

			window.doughnutChart = new Chart(ctx).Doughnut(chartData, {
				animateRotate : false,
				segmentShowStroke : false,
				showTooltips: false,
				percentageInnerCutout : 55,
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
			});
			var legend = doughnutChart.generateLegend();
			$this.append(legend);
		});
    };
    pieChart2();


    /*-----------------------------------------
    PIE CHART STYLE 3
    ------------------------------------------*/
    function pieChart3(){

    	var chartContainer = $('.piechart-style3').find('.chart-container');

		chartContainer.each(function(index){
			var $this = $(this),
				canvas = $this.find('canvas'),
				ctx = canvas.get(0).getContext("2d"),
    			chartData = [];

			$this.find('.chart-data').find('li').each(function(){
				var li = $(this);

				chartData.push({
					value: li.data('value'),
					color: li.data('color'),
					label: li.text()
				})
			});

			window.pieChart = new Chart(ctx).Pie(chartData, {
				animateRotate : false,
				segmentShowStroke : false,
				showTooltips: false,
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
			});
			var legend = pieChart.generateLegend();
			$this.append(legend);
		});

    };
    pieChart3();

    /*-----------------------------------------
    CLIENTS CAROUSEL
    ------------------------------------------*/
    if( $('.clients-carousel').length ){

    	$('.clients-carousel').each(function(){
    		var $this = $(this);
    		function items(items){
    			if( $this.hasClass('fullwidth') ) {
    				return 6
    			} else{
    				return 3
    			};
    		};
    		$this.owlCarousel({
    			items: items(),
    			autoplay: true,
    			responsive: {

    				0: {
    					items: 2
    				},
    				480: {
    					items: 3
    				},
    				992: {
    					items: items()
    				}
    			}
    		});
    	});
    };

    /*-----------------------------------------
    COVER BOX STYLE 2 SLIDER
    ------------------------------------------*/
    function coverBoxStyle2(){

    	$('.cover-box-style2').each(function() {
    		var $this = $(this),
    			coverBoxContents = $this.find('.cover-box-contents').find('.slides'),
    			coverBoxTabs = $this.find('.cover-box-tabs').find('.slides'),
    			contentsImageContainer = coverBoxContents.find('li').find('figure');

    		$this.imagesLoaded(function(){

	    		coverBoxContents.owlCarousel({
	    			singleItem: true,
	    			items: 1,
	    			mouseDrag: false,
	    			touchDrag: false,
	    			animateIn: 'fadeInDown',
	    			animateOut: 'fadeOutDown'
	    		});
	    		coverBoxTabs.owlCarousel({
	    			mouseDrag: false,
	    			touchDrag: false
	    		});

	    		var coverBoxTabsItem = coverBoxTabs.find('.owl-stage').find('.owl-item');

	    		coverBoxTabsItem
	    			.first().addClass('active')
	    				.siblings().removeClass('active');

	    		coverBoxTabsItem.on('click', function() {
	    			var $this = $(this),
	    				tabIndex = $this.index();
    				$this.addClass('active').siblings().removeClass('active');
	    			coverBoxContents.trigger('to.owl.carousel', tabIndex);
	    		});

				contentsImageContainer.each(function() {
					var $this = $(this),
						contentsImage = $this.find('img');

					$this.css('background-image', 'url(' + contentsImage.attr('src') + ')');
				});
    		});
    	});
    };
    if ( $('.cover-box-style2').length ) {
    	coverBoxStyle2();
    };

    /*-----------------------------------------
    LIGHTBOX INIT
    ------------------------------------------*/
    if( $('.image-popup-link').length ){
    	$('.image-popup-link').magnificPopup({
    		type: 'image',
			gallery:{
				enabled:true
			},
			mainClass: 'mfp-with-fade',
			removalDelay: 300
    	});
    };

    /*-----------------------------------------
    EXPANDABLE SECTION
    ------------------------------------------*/
    function expandableSection(){
		$('.expandable-section').find('.contents').hide();

	    $('.expandable-section').on('click', '.toggle h6', function(event) {
	    	event.preventDefault();
	    	var toggleBtn = $(this).find('a'),
	    		expandableSection = toggleBtn.parents('.expandableSection');
	    	toggleBtn.parents('.toggle').siblings('.contents').slideToggle()
					 .parents('.expandable-section').toggleClass('open')
					 .end().end().end();
			if (toggleBtn.text() == toggleBtn.data("hide-text")) {
				toggleBtn.text(toggleBtn.data("show-text"));
			} else {
				toggleBtn.data("show-text", toggleBtn.text());
				toggleBtn.text(toggleBtn.data("hide-text"));
			};
	    });
    };
    expandableSection();

    /*-----------------------------------------
    PRICING TABLE STYLE 2
    ------------------------------------------*/
    function pricingTableStyle2(){
    	var pricingTable = $('.pricing-table-style2'),
    		features = pricingTable.find('.plan-features');

		features.hide();

	    pricingTable.on('mouseenter', function() {
	    	$(this).find('.plan-features').delay(600).slideDown(500);
	    })
	    .on('mouseleave', function() {
	    	$(this).find('.plan-features').slideUp(500);
	    });

	    $('.pricing-table-style2').each(function(i) {
		    var li = $(this).find('.plan-features').find('li');
			li.each(function(index) {
				$(this).css({
					'-webkit-transition-delay': index / 5 + 's',
					'-moz-transition-delay': index / 5 + 's',
					'transition-delay': index / 5 + 's',
				});
			});
	    });
	};
	pricingTableStyle2();

	/*-----------------------------------------
	TESTIMONIALS CAROUSEL
	------------------------------------------*/
	if ( $('.testimonials-container').length ) {
		$('.testimonials-container').each(function() {
			var $this = $(this),
				testimonialCarousel = $this.find('.testimonials-carousel'),
				carouselDots = $this.find('.testimonials-carousel-dots'),
				carouselNav = $this.find('.testimonials-carousel-nav'),
				testimonialAvatar = $this.find('.testimonial-avatar');

			testimonialCarousel.owlCarousel({
				items: 1,
				singleItem: true,
				loop: true,
				nav: true,
				mouseDrag: false,
				touchDrag: false,
				animateIn: 'fadeInLeft',
				animateOut: 'fadeOutRight',
				dotsContainer: carouselDots,
				navContainer: carouselNav,
				navText: ['<i class="icon-knight-349"></i>', '<i class="icon-knight-348"></i>']
			});
			testimonialAvatar.owlCarousel({
				items: 1,
				singleItem: true,
				loop: true,
				nav: true,
				mouseDrag: false,
				touchDrag: false,
				animateIn: 'fadeIn',
				animateOut: 'fadeOut',
				dotsContainer: carouselDots,
				navContainer: carouselNav,
				navText: ['<i class="icon-knight-349"></i>', '<i class="icon-knight-348"></i>']
			});
		});
	};

	/*-----------------------------------------
	COUNTDOWN TIMER INIT
	------------------------------------------*/
	function countdownInit(){
		var countdown = $('.countdown');

	 	var countdownFormat = function( format ){

			if ( countdown.hasClass('countdown-style1') ) {
				return 'ODHMS'
			} else if( countdown.hasClass('countdown-style2') ){
				return 'DHMS'
			};
		};
		$('.countdown-timer').countdown({
			until: new Date(2018, 7 - 1, 15),
			format: countdownFormat()
		});
	};
	if ( $('.countdown-timer').length ) {
		countdownInit();
	};

	/*-----------------------------------------
	MAGNIFIC POPUP INIT
	------------------------------------------*/
	if ( $('.open-popup-link').length ){
		$('.open-popup-link').magnificPopup({
			type:'inline',
			midClick: true,
			mainClass: 'mfp-with-fade',
			removalDelay: 850
		});
	};

	/*-----------------------------------------
	PORTFOLIO LAYOUT INIT
	------------------------------------------*/
	function portfolioLayout(){
		var $container = $('.portfolio-item-wrapper').isotope({
			itemSelector: '.portfolio-item-container',
			layoutMode: 'masonry',
			transitionDuration: '0.85s',
			hiddenStyle: {
			      opacity: 0,
			      transform: 'scale(0.2)'
			    },
			    visibleStyle: {
			      opacity: 1,
			      transform: 'scale(1)'
			    }
		});
		$('.portfolio-filter-container').on( 'click', 'li', function() {
			var filterValue = $( this ).attr('data-filter');
			$container.isotope({ filter: filterValue });
		});
		$('.portfolio-filter-container').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'li', function() {
				$buttonGroup.find('.active').removeClass('active');
				$( this ).addClass('active');
			});
		});

		$('.portfolio-item-container').each(function() {
			var $this = $(this);
			if ( parseInt($this.css('left'), 10) >= ($container.width() / 2) ) {
				$this.addClass('right-positioned');
			} else {
				$this.addClass('left-positioned');
			};
		});

		// $container.isotope( 'on', 'layoutComplete',
		//   function( isoInstance, laidOutItems ) {
		//   	$.each(laidOutItems, function(index, val) {
		//   		console.log(val)
		//   	});
		//   }
		// );
	};

	/*-----------------------------------------
	PORTFOLIO PROJECT CAROUSEL
	------------------------------------------*/
	function portfolioProjectCarousel(){
		var projectCarousel = $('.project-image-carousel');

		projectCarousel.owlCarousel({
			singleItem: true,
			items: 1,
			loop: true,
			nav: true,
			autoHeight: true,
			navText: ['<i class="icon-knight-510"></i>', '<i class="icon-knight-522"></i>'],
			animateIn: 'fadeInLeft',
			animateOut: 'fadeOutRight'
		});
	};

	/*-----------------------------------------
	BLOG TIMELINE STYLE
	------------------------------------------*/
	function blogTimeline(){
		var blogTimeline = $('.blog-timeline'),
			blogTimelineWidth = blogTimeline.width();

		blogTimeline.imagesLoaded(function(){
			blogTimeline.isotope({
				itemSelector: '.article-container',
				layoutMode: 'masonry'
			});
			$('.article-container').each(function() {
				var $this = $(this);
				if ( parseInt($this.css('left'), 10) >= (blogTimelineWidth / 2) ) {
					$this.addClass('right-positioned').removeClass('left-positioned');
				} else {
					$this.addClass('left-positioned').removeClass('right-positioned');
				};
			});
		});
	};

	/*-----------------------------------------
	BLOG MASONRY STYLE
	------------------------------------------*/
	function blogMasonry(){
		var blogMasonry = $('.blog-masonry');

		blogMasonry.imagesLoaded(function(){
			blogMasonry.isotope({
				itemSelector: '.article-container',
				layoutMode: 'masonry'
			});
		});
	};

	/*-----------------------------------------
	PRODUCT FILTER
	------------------------------------------*/
	function productFilter(){
		var productsContainer = $('.products-container.filterable');

		productsContainer.isotope({
			itemSelector: '.product',
			layoutMode: 'masonry',
			transitionDuration: '0.85s',
			hiddenStyle: {
			      opacity: 0,
			      transform: 'scale(0.2)'
			    },
			    visibleStyle: {
			      opacity: 1,
			      transform: 'scale(1)'
			    }
		});
		$('.blog-filter-container').on( 'click', 'li', function() {
			var filterValue = $( this ).attr('data-filter');
			productsContainer.isotope({ filter: filterValue });
		});
		$('.blog-filter-container').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'li', function() {
				$buttonGroup.find('.active').removeClass('active');
				$( this ).addClass('active');
			});
		});
	};

	/*-----------------------------------------
	BLOG POST GALLERY
	------------------------------------------*/
	function blogPostGallery(){
		var entryImages = $('.post.format-gallery').find('.entry-image');

		entryImages.imagesLoaded(function(){

			entryImages.owlCarousel({
				singleItem: true,
				items: 1,
				dots: true,
				loop: true,
				animateIn: 'fadeInDown',
				animateOut: 'fadeOutDown'
			});
		});
	};
	/*------------------------------------------
	POST FORMAT GALLERY CAROUSEL INIT
	------------------------------------------*/
	if ( $('.post.format-gallery').length ) {
		blogPostGallery();
	};

	/*-----------------------------------------
	PRODUCT SLIDER INIT
	------------------------------------------*/
	function productSlider(){
		var productSliderContainer = $('.blog-slider');

		productSliderContainer.imagesLoaded(function() {
			productSliderContainer.owlCarousel({
				singleItem: true,
				items: 1,
				loop: true,
				autoplay: true,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				dots: true,
				animateIn: 'fadeInLeft',
				animateOut: 'fadeOut',
			});
		});
	};
	if ( $('.blog-slider').length ) {
		productSlider();
	};

	/*-----------------------------------------
	SINGLE PRODUCT SLIDER
	------------------------------------------*/
	function singleProductSlider(){
		var sliderContainer = $('.single-blog-image-container'),
			sliderDirection;

		sliderContainer.imagesLoaded(function(){
			sliderContainer.each(function() {
				var $this = $(this),
					slider = $this.find('.slider'),
					thumbnails = $this.find('.thumbnails');
				function dir(){
					if ( $this.hasClass('thumbnails-left') || $this.hasClass('thumbnails-right') ){
						sliderDirection = 'vertical'
					} else{
						sliderDirection = 'horizontal'
					}
				};
				dir();

				slider.flexslider({
					animation: "slide",
					controlNav: false,
					animationLoop: false,
					slideshow: false,
					sync: thumbnails
				});
				thumbnails.flexslider({
					animation: "slide",
					itemWidth: 100,
					controlNav: false,
					direction: sliderDirection,
					animationLoop: false,
					slideshow: false,
					maxItems: 4,
					asNavFor: slider
				});
			});
		});
	};
	if ( $('.single-blog-image').length ) {
		singleProductSlider();
	};

	/*------------------------------------------
	SIDE IMAGE INIT
	------------------------------------------*/
	function fullwidthSideImage(){
		var sideImage = $('.side-image.fullwidth');

		sideImage.each(function() {
			var $this = $(this),
				imageHolder = $this.find('.image-holder'),
				mainImage = imageHolder.find('img'),
				imgsrc = mainImage.attr('src');

			imageHolder.css('background-image', 'url(' + imgsrc + ')');
			mainImage.hide();
		});
	};
	fullwidthSideImage();

	/*------------------------------------------
	ICONBOX WRAPPER STYLE 2
	------------------------------------------*/
	function iconBoxWrapper2(){
		var wrapper = $('.icon-box-wrapper-style2');

		wrapper.each(function() {
			var $this = $(this),
				imageHolder = $this.find('.icon-box-image figure'),
				mainImage = imageHolder.find('img'),
				imgsrc = mainImage.attr('src'),
				iconBoxContainer = $this.find('.icon-box-container'),
				iconBoxContainerHeight = iconBoxContainer.outerHeight();

			imageHolder
				.height(iconBoxContainerHeight)
				.css('background-image', 'url(' + imgsrc + ')');

			mainImage.hide();
		});
	};

	/*------------------------------------------
	ONE PAGE NAV INIT
	------------------------------------------*/
	if( $('.onepage-nav').length){
		$('.onepage-nav').onePageNav({
			currentClass: 'active'
		});
	};
	
	/*------------------------------------------
	INPUT NUMBERS
	------------------------------------------*/
	if( $('input[type=number]').length){
		$('input[type=number]').number();
	};

	/*------------------------------------------
	NICESCROLL INIT
	------------------------------------------*/
	if( $('.fixed-nav').length ){
		$('.fixed-nav').find('.fixed-menu').niceScroll();
	};

	/*------------------------------------------
	MENU CAROUSEL
	------------------------------------------*/
	function menuCarousel(){

		$('.menu').each(function() {
			var $this = $(this),
				navContainer = $this.find('.nav-container'),
				navigation = navContainer.find('.navigation'),
				menuContents = $this.find('.menu-contents'),
				carousel = menuContents.find('.menu-carousel');

			carousel.owlCarousel({
				items: 1,
				nav: true,
				loop: true,
				navContainer: navigation,
				navText: ['<i class="icon-knight-349"></i>', '<i class="icon-knight-348"></i>'],
				responsiveClass: true,
				responsive : {
				    480 : {
				    	items : 1
				    },
				    992 : {
				    	items : 3
				    }
				}
			});
		});
	};
	if( $('.menu').length ){
		menuCarousel();
	};

	/*------------------------------------------
	BREAKING NEWS WIDGET
	------------------------------------------*/
	function breakingNewsWidget(){

		$('.breaking-news-widget').find('.slides').owlCarousel({
			singleItem: true,
			items: 1,
			loop: true,
			autoplay: true,
			animateIn: 'fadeInDown',
			animateOut: 'fadeOutRight',
			nav: true,
			navText: ['<i class="icon-knight-510"></i>', '<i class="icon-knight-522"></i>']
		});
	};
	if( $('.breaking-news-widget').length ){
		breakingNewsWidget();
	};

	/*------------------------------------------
	CAROUSEL INIT
	------------------------------------------*/
	function carousel(){
		var carouselContainer = $('.carousel'),
			slides = carouselContainer.find('.slides'),
			carouselItems = carouselContainer.attr('data-items');

		slides.each(function() {
			$(this).owlCarousel({
				items: carouselItems,
				dots: true,
				margin: 80,
				responsive: {

					0: {
						items: 1
					},
					480: {
						items: carouselItems
					}
				}
			});
		});
	};
	if( $('.carousel').length ){
		carousel();
	};

	/*------------------------------------------
	MOBILE NAV
	------------------------------------------*/
	function mobileNav(){
		var mainNav = $('.main-header .main-nav').clone(),
			offcanvasMenu = $('.main-nav.offcanvas-menu:not(.mobile-nav)'),
			offcanvasMenuSearchForm = $('.main-nav.offcanvas-menu:not(.offcanvas-menu-style2) .search-form'),
	   		mobileNav = $('.main-nav.mobile-nav'),
	   		mobileHeaderWrapper = $('.mobile-header-wrapper'),
			mobileHeaderSearch = mobileHeaderWrapper.find('.search-form-wrapper'),
			searchFormTrigger = mobileHeaderWrapper.find('.search-form-trigger'),
			searchFormCloseTrigger = mobileHeaderWrapper.find('.search-form-close-trigger');

		mainNav.children('ul')
			   .appendTo(mobileNav)
			   .insertBefore(offcanvasMenuSearchForm);

		if ( mainNav.hasClass('style4') ) {
			mainNav.children('.navigation').children('ul')
				   .appendTo(mobileNav)
				   .insertBefore(offcanvasMenuSearchForm);
		};
		if ( offcanvasMenu ) {
			offcanvasMenu.clone().children('ul')
				   .appendTo(mobileNav)
				   .insertBefore(offcanvasMenuSearchForm);
		};
	   	if ( mainNav.hasClass('iconic-items') || $('.main-nav.offcanvas-menu').hasClass('iconic-items') ){
	   		mobileNav.addClass('iconic-items');
	   	};
	   	if ( offcanvasMenu.length && offcanvasMenu.hasClass('offcanvas-menu-style2') ){
	   		mobileNav.addClass('offcanvas-menu-style2');
	   	};

		searchFormTrigger.on('click', function(event) {
			event.preventDefault();
			mobileHeaderSearch.fadeIn();
		});
		searchFormCloseTrigger.on('click', function(event) {
			event.preventDefault();
			mobileHeaderSearch.fadeOut();
		});
	};
	mobileNav();

	/*------------------------------------------
	MOBILE NAV PLACEMENT
	------------------------------------------*/
	function mobileNavPlacement(){
   		var mobileNav = $('.main-nav.mobile-nav'),
   			mobileHeaderWrapper = $('.mobile-header-wrapper'),
   			mainWrapper = $('.main-wrapper');

	   	if ($('body').hasClass('mobile-header-style2') && $(window).width() <= 991) {
		   	mobileHeaderWrapper.find('.logo-container').imagesLoaded(function(){
	   			var mobileHeaderWrapperH = mobileHeaderWrapper.outerHeight();
			   	mobileNav.css({
			   		'margin-top': mobileHeaderWrapperH,
			   		'padding-bottom': mobileHeaderWrapperH + 25
			   	});
			   	mainWrapper.css('padding-top', mobileHeaderWrapperH);
		   	});
	   	};
	};
	mobileNavPlacement();

   	/*------------------------------------------
   	OFFCANVAS MENU ITEM APPEARING
   	------------------------------------------*/
   	$('.offcanvas-menu').not('.mobile-nav').children('ul').children('li').each(function( i ){
   		var i = i;
   		$(this).css({
   			'-webkit-transition-delay': i / 15 + 's',
   			'-moz-transition-delay': i / 15 + 's',
   			'transition-delay': i / 15 + 's',
   		});
   	});

	/*------------------------------------------
	EQUAL HEIGHTS
	------------------------------------------*/
	function equalHeights(){
		var equalHeightsContainer = $('.equal-heights'),
			leftSec = equalHeightsContainer.find('.left-section'),
			rightSec = equalHeightsContainer.find('.right-section');

		equalHeightsContainer.imagesLoaded(function(){
			var leftSecHeight = leftSec.outerHeight(),
				rightSecHeight = rightSec.outerHeight();

			leftSec.height(rightSecHeight);
		});
	};
	if ( $('.equal-heights').length && $(window).width() >= 992 ) {
		equalHeights();
	};

	/*------------------------------------------
	COVERBOX STYLE 3
	------------------------------------------*/
	function coverBoxStyle3(){
		var el = $('.cover-box-style3');

		el.on('mouseenter', function() {
			$(this).addClass('active').siblings().removeClass('active');
		});
	};
	if($('.cover-box-style3').length && $(window).width() >= 992){
		coverBoxStyle3();
	};

	/*------------------------------------------
	PLAY VIDEO TRIGGER
	------------------------------------------*/
	if ( $('.play-video-trigger').length ) {

		$('.play-video-trigger').magnificPopup({
	      disableOn: 700,
	      type: 'iframe',
	      mainClass: 'mfp-with-fade',
	      removalDelay: 160,
	      preloader: false,
	      fixedContentPos: false
	    });
	};

	/*------------------------------------------
	MORE CONTENTS AND TRIGGER
	------------------------------------------*/
	if( $('.more-contents').length ){
		$('.more-contents').hide();
		$('.more-trigger').on('click', function(event) {
			event.preventDefault();
			var target = $(this).attr('href');
			$(target).slideDown(300);
		});
	};

	/*------------------------------------------
	VIDEO POSTER
	------------------------------------------*/
	if ( $('.section-video-container').length ) {
		$('.section-video-container').find('.poster').each(function() {
			var $this = $(this);
			$this.css({
				backgroundImage: 'url(' + $this.children('img').attr('src') + ')'
			}).find('img').hide();
		});
	};

	/*--------------------------------------------------------
	FUNCTIONS THAT NEED TO RUN WHEN PAGE IS COMPLETELY LOADED
	---------------------------------------------------------*/
	$(window).on('load', function(){

		/*-----------------------------------------
		OFFCANVAS MENU INIT
		------------------------------------------*/	
		if ( $('.shifter').length ) {
			$.shifter({
				maxWidth: Infinity
			});
		};

		/*------------------------------------------
		PARALLAX BACKGROUND INIT
		------------------------------------------*/
		if( $('.parallax').length ){
			$(window).stellar({horizontalOffset:'50%',horizontalScrolling:!1, responsive: true});
		};

		/*-----------------------------------------
		CONTACT FORM 1 INIT
		------------------------------------------*/
		// if( $('.contact-form1').length ){
		// 	contactForm1();
		// };

		/*-----------------------------------------
		CONTACT FORM 2 INIT
		------------------------------------------*/
		// if( $('.contact-form2').length ){
		// 	contactForm2();
		// };

		/*-----------------------------------------
		CONTACT FORM 3 INIT
		------------------------------------------*/
		// if( $('.contact-form3').length ){
		// 	contactForm3();
		// };
		
		/*-----------------------------------------
		PORTFOLIO LAYOUT INIT
		------------------------------------------*/
		if ( $('.portfolio-container').length ) {
			portfolioLayout();
		};

		/*-----------------------------------------
		PORTFOLIO PROJECT CAROUSEL INIT
		------------------------------------------*/
		if ( $('.project-image-carousel').length ) {
			portfolioProjectCarousel();
		};

	    /*-----------------------------------------
	    COUNTER INIT
	    ------------------------------------------*/
	    if ( $('.counter').length ) {
			$('.counter').appear(function(){
				var $this = $(this),
					counterNumber = $this.find('.number');
				counterNumber.countTo({to: $this.find('.number').text(), refreshInterval: 3});
			});
		};

		/*-----------------------------------------
		HORIZONTAL PROGRESS BAR
		------------------------------------------*/
		if ( $('.h-progress').length ) {
			$('.h-progress .progress-bar').each(function(){
				var $this = $(this),
					percentage = $this.find('.percentage');

				$this.appear(function(){
					$this.width( percentage.text() + '%' );
					percentage.countTo({ speed: 1500, to: percentage.text(), refreshInterval: 20 })
				});
			});
		};

		/*-----------------------------------------
		VERTICAL PROGRESS BAR
		------------------------------------------*/
		if ( $('.v-progress').length ) {
			$('.v-progress .progress-bar').each(function(){
				var $this = $(this),
					percentage = $this.find('.percentage');

				$this.appear(function(){
					$this.height( percentage.text() + '%' );
					percentage.countTo({ speed: 1500, to: percentage.text(), refreshInterval: 20 })
				});
			});
		};

		/*-----------------------------------------
		PIECHART STYLE 1 INIT
		------------------------------------------*/
		if( $('.piechart.piechart-style1').length ) {
			$('.piechart.piechart-style1').each(function(){
				var $this = $(this),
					input = $this.children('input'),
					percentage = input.attr("value"); ;

				input.knob({
					readOnly: true,
					width: 200,
					inputColor: '#444',
			       dynamicDraw: true,
				});

				$this.appear(function(){
					$({value: 0}).animate({ value: percentage }, {
						duration: 1500,
						easing: 'swing',
						progress: function () { input.val(Math.ceil(this.value)).trigger('change') }
					});
				})
			});
		};

		/*-----------------------------------------
		BACK TO TOP BUTTON
		------------------------------------------*/
		$('.back-to-top').on('click', 'a', function(event){
			event.preventDefault();
			$('html, body').animate(
				{
					scrollTop: 0
				}, {
					duration: 1000
				});
		});

		/*-----------------------------------------
		MEDIA ELEMENT INIT
		------------------------------------------*/
		if ( $('video').not('.vjs-tech').length ) {
			$('video').mediaelementplayer({
				features: ['playpause','progress','current','duration']
			});
		};
		if ( $('audio').length ) {
			$('audio').mediaelementplayer({
				features: ['playpause','progress','current','duration']
			});
		};

		/*-----------------------------------------
		PRODUCT FILTER INIT
		------------------------------------------*/
		if ( $('.products-container.filterable').length ) {
			productFilter();
		};

	});
	
	/*----------------------------------------------------------------------------------
	FUNCTIONS THAT NEED TO RUN WHEN WINDOW IS RESIZED
	------------------------------------------------------------------------------------*/
	$(window).on('resize', function() {

		/*------------------------------------------
		MEGA MENU POSITIONING
		------------------------------------------*/
		if( $('.mega-menu').length ) {
			megaMenuPositioning();
		};
		
		/*------------------------------------------
		MOBILE NAV PLACEMENT
		------------------------------------------*/
		mobileNavPlacement();

		/*------------------------------------------
		MAIN NAV
		------------------------------------------*/
		$('.main-bar').removeAttr('style');
		mainNav();

		/*------------------------------------------
		HEADER TITLE BAR PADDING FIX
		------------------------------------------*/
		titleBarPadding();

		/*-----------------------------------------
		CHECKOUT SUB-MENU STYLE 2 INIT
		------------------------------------------*/
		if( $('.checkout-style2').length ){
			checkoutSubmenu();
		};

		/*------------------------------------------
		REINITIALIZING PORTFOLIO LAYOUT
		------------------------------------------*/
		if ( $('.portfolio-container').length ) {
			portfolioLayout();
		};

		/*----------------------------------------------
		CLOSE OFF-CANVAS MENU WHEN WINDOW IS RESIZED 
		----------------------------------------------*/
		if ($(window).width() >= 992) {
			$('html, body').removeClass('shifter-open');
		};

		/*----------------------------------------------
		COVER BOX STYLE 3 REINIT
		----------------------------------------------*/
		if($('.cover-box-style3').length && $(window).width() >= 992){
			coverBoxStyle3();
		};

	});
	
	/*----------------------------------------------------------------------------------
	FUNCTIONS THAT NEED TO RUN WHEN PAGE IS COMPLETELY LOADED AND WHEN WINDOW IS RESIZED
	------------------------------------------------------------------------------------*/
	$(window).on('load resize', function() {
		
		/*------------------------------------------
		ICONBOX WRAPPER STYLE 2 INIT
		------------------------------------------*/
		iconBoxWrapper2();

		/*-----------------------------------------
		BLOG TIMELINE INIT
		------------------------------------------*/
		if ( $('.blog-timeline').length ) {
			blogTimeline();
		};

		/*-----------------------------------------
		BLOG MASONRY STYLE INIT
		------------------------------------------*/
		if ( $('.blog-masonry').length ) {
			blogMasonry();
		};		

		/*-----------------------------------------
		EQUAL HEIGHTS ELEMENTS
		------------------------------------------*/
		if ( $('.equal-heights').length && $(window).width() >= 992 ) {
			equalHeights();
		};
	});


})();
