jQuery(function($) {

	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 10000,
			pause: false
		});
	});

	//Ajax contact
	var form = $('.contact-form');
	form.submit(function () {
		$this = $(this);
		
		$.post($(this).attr('action'), function(data) {
			$this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
		},'json');

		var nome  = $('#txtNome').val();
		var email  = $('#txtEmail').val();
		var mensagem = $('#message').val();

		var message = {
						"From": email,
						"To": "eu@francispires.com.br",
						"Cc": "copiapralaguem",
						"Bcc": "copiaocultapraalguem",
						"Subject": "Cliente"+nome+" entrou em contato",
						"Tag": "Invitation",
						"HtmlBody": mensagem,
						"TextBody": mensagem,
						"ReplyTo": email,
						"Headers": [
							{
								"X-Postmark-Server-Token": "48d45cf3-c933-4cee-b764-5540bbb222d1"
							}
						],
						"TrackOpens": true,
						"TrackLinks": "HtmlOnly"
						}
		$.ajax({
			url: url,
			data:message,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Postmark-Server-Token", "suachavasca");
			},
			success: function(data) {
				alert('mensagem enviada');
			}
		});
		return false;
	});

	//smooth scroll
	$('.navbar-nav > li').click(function(event) {
		event.preventDefault();
		var target = $(this).find('>a').prop('hash');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 500);
	});

	//scrollspy
	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh')
	})

	//PrettyPhoto
	$("a.preview").prettyPhoto({
		social_tools: false
	});

	//Isotope
	$(window).load(function(){
		$portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : 'li',
			layoutMode : 'fitRows'
		});
		$portfolio_selectors = $('.portfolio-filter >li>a');
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});
});