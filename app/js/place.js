var changePlace = (function () {

	var init = function () {
		_setUpListneres();
	};

	// Восстанавливаем значения по умолчанию
	restorePosDefault = function () {
		var boxTextX = $('#value__x_point'),
			boxTextY = $('#value__y_point'),
			img = $('.canvas__img');
		img.css('top',0).css('left',0);
		boxTextX.val('0');
		boxTextY.val('0');
		$(".position__grid_item").removeClass('active');
		$("#1").addClass('active');
	};

	checkPosition = function() {
		var canvasHeight = $('.canvas__block').height(),
			canvasWidth =  $('.canvas__block').width(),
			imgHeight = img.height(),
			imgWidth = img.width(),
			cX = img.position().left,
			cY = img.position().top;
		//$(".position__grid_item").removeClass('active');
	}

	// Устанавливаем прослушку
	
	var _setUpListneres = function () {
		$('.position__control__x_point-top').on('click', _increaseX); // При клике верх (по X)
		$('.position__control__x_point-bottom').on('click', _lowerX); // При клике вниз (по X)
		$('.position__control__y_point-top').on('click', _increaseY); // При клике верх (по Y)
		$('.position__control__y_point-bottom').on('click', _lowerY); // При клике вниз (по Y)
		$('.position__grid_item').on('click', _placeImg); // При клике радио #1 
		$('.upload-img').on('drag', _followPos); // При драге вотермарка
		$('.ui-slider-handle').on('mousemove', _changeOpacity); // Меняем прозрачность
	}	
	
	// Меняем прозрачность
	var _changeOpacity = function(e) {
		var op = $( "#slider-opacity" ).slider( "value" ) / 100;
		if ($('.canvas__img')) {
			$('.canvas__img').css('opacity', op);
		}
	};

	// При драге вотермарка отслеживать позицию в спиннерах
	var _followPos = function(e) {
		var $this = $(this),
			boxTextX = $('#value__x_point'),
			boxTextY = $('#value__y_point');
		boxTextX.val($this.position().left);
		boxTextY.val($this.position().top);
	}


	// При клике верх по X меняем значение в боксе, смещаем картинку по X вправо 
	var _increaseX = function(e) {
		e.preventDefault();
		if (validation.checkfields()) {
			var boxText = $('#value__x_point'),
				img = $('.canvas__img'),
				cX = img.position().left + 1;
				imgWidth = img.width(),
				mainWidth = $('.canvas__main-img').width();
			if (cX + imgWidth <= mainWidth) {
				boxText.val(cX);
				img.css("left", cX + "px");
			};
		};
	};

	// При клике вниз по X меняем значение в боксе, смещаем картинку по X влево 
	var _lowerX = function(e) {
		e.preventDefault();
		if (validation.checkfields()) {
			var boxText = $('#value__x_point'),
				img = $('.canvas__img'),
				cX = img.position().left - 1;
			if (cX >= 0) {
				boxText.val(cX);
				img.css("left", cX + "px");
			};
		};
	};

	// При клике вверх по Y меняем значение в боксе, смещаем картинку по Y вниз 
	var _increaseY = function(e) {
		e.preventDefault();
		if (validation.checkfields()) {
			var boxText = $('#value__y_point'),
				img = $('.canvas__img'),
				cY = img.position().top + 1,
				imgHeight = img.height(),
				mainHeight = $('.canvas__main-img').height();
			if (cY + imgHeight <= mainHeight) {
				boxText.val(cY);
				img.css("top", cY + "px");
			};
		};
	};

	// При клике вверх по Y меняем значение в боксе, смещаем картинку по Y вниз 
	var _lowerY = function(e) {
		e.preventDefault();
		if (validation.checkfields()) {
			var boxText = $('#value__y_point'),
				img = $('.canvas__img'),
				cY = img.position().top - 1;
			if (cY >= 0) {
				boxText.val(cY);
				img.css("top", cY + "px");
			};
		};
	};

	// При клике радио #1 отправляю вотермарк в левый верхний угол (ОСТОРОЖНО МАГИЯ!)
	var _placeImg = function(e) {
		e.preventDefault();
		if (validation.checkfields()) {
			var img = $('.canvas__img'),
				$this = $(this);
			$(".position__grid_item").removeClass('active');
			$this.addClass('active');
			_magicCalculations($this);
		};		
	}
	
	var _magicCalculations = function($this) {
		var button = $this,
			img = $('.canvas__img'),
			boxTextX = $('#value__x_point'),
			boxTextY = $('#value__y_point');
		// МАГИЧЕСКИЕ ВЫЧИСЛЕНИЯ
		switch (button.attr('id')) {
			case '1':
				img.css('top', 0).css('left',0);
				break
			case '2': 
				img.css('top', 0).css('left', Math.round($('.canvas__main-img').width() / 2 - img.width() / 2) );
				break
			case '3': 
				img.css('top', 0).css('left', $('.canvas__main-img').width() - img.width());
				break
			case '4':
				img.css('top', Math.round($('.canvas__main-img').height() / 2 - img.height() / 2)).css('left',0);
				break
			case '5': 
				img.css('top', Math.round($('.canvas__main-img').height() / 2 - img.height() / 2)).css('left', Math.round($('.canvas__main-img').width() / 2 - img.width() / 2 ));
				break
			case '6': 
				img.css('top', Math.round($('.canvas__main-img').height() / 2 - img.height() / 2)).css('left', $('.canvas__main-img').width() - img.width());
				break
			case '7':
				img.css('top', $('.canvas__main-img').height() - img.height()).css('left',0);
				break
			case '8': 
				img.css('top', $('.canvas__main-img').height() - img.height()).css('left', Math.round($('.canvas__main-img').width() / 2 - img.width() / 2 ));
				break
			case '9': 
				img.css('top', $('.canvas__main-img').height() - img.height()).css('left', $('.canvas__main-img').width() - img.width());
				break
		}	
		// Задаём значения в инпуты
		boxTextX.val(img.position().left);
		boxTextY.val(img.position().top);
	}
	

	return {
		init: init,
		resetPos: restorePosDefault // Функция сброса 
	};
})();

changePlace.init();


