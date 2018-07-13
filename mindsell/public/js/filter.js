function createModal(imageUrl){
	cancelCanvas(imageUrl);
	updateFilterValue(imageUrl);
	updateFilter(imageUrl);
	loadOriginal(imageUrl);
	save();
}

function cancelCanvas(imageUrl){
	$("#cancel").on("click",function(){
		var sourceImageData = canvas.toDataURL(); //image be copied
		setTimeout(function(){
			var destCanvasContext = canvas2.getContext('2d'); //image copy to
			var destinationImage = new Image;
			destinationImage.onload = function(){
				destCanvasContext.drawImage(destinationImage,0,0, canvas.width, canvas.height);
				// console.log("1:",canvas.width,canvas.height);
				// console.log("2:",canvas2.width, canvas2.height);
			};
			destinationImage.src = sourceImageData;
		},100);
	})
}

function loadOriginal(imageUrl){
	$("#loadOriginal").on("click",function(){
		reset(imageUrl);
	})
}

function createEditor(){
	var editor = document.getElementById("modal-body");
	var filterOption=["brightness", "contrast", "saturation", "vibrance", "exposure", "hue", 
						"sepia", "gamma", "noise", "clip", "sharpen", "stackBlur"];

	filterOption.forEach(function(option,index){
		var min,max,step;
		step = 1;
		if (index <= 4){
			min = -100;
			max = 100;
		}else if (index == 7){
			min = 0;
			max = 10;
			step = 0.1;
		}else if (index == 11){
			min = 0;
			max = 20;
		}else{
			min = 0;
			max = 100;
		}
		var filter = document.createElement("div");
		filter.setAttribute("style","display: inline-block; margin: 10px 5px 0px 5px; width:230px");
		var filterName = document.createElement("p");
		filterName.setAttribute("style","margin: 0px 0px 5px");
		$(filterName).html(option);
		var filterSetting = document.createElement("div");
		// filterSetting.setAttribute("class","FilterSetting");
		var rangeInput = document.createElement("input");
		rangeInput.setAttribute("id",option);
		rangeInput.setAttribute("style","margin: 0px 20px 0px 20px; display: inline-block; width:150px");
		rangeInput.setAttribute("type","range");
		rangeInput.setAttribute("min",min);
		rangeInput.setAttribute("max",max);
		rangeInput.setAttribute("step",step);
		rangeInput.setAttribute("value","0");
		rangeInput.setAttribute("data-filter",option);
		var filterValue = document.createElement("div");
		filterValue.setAttribute("style","display: inline-block");
		filterValue.setAttribute("id",option+"Value");
		// filterValue.setAttribute("class","FilterValue");
		$(filterValue).html("0");
		filter.appendChild(filterName);
		filterSetting.appendChild(rangeInput);
		filterSetting.appendChild(filterValue);
		filter.appendChild(filterSetting);
		editor.appendChild(filter);
	});
	var breakpoint2 = document.createElement("div");
	$(breakpoint2).html("<br>");
	editor.appendChild(breakpoint2);
	var filterList = ["Vintage","Lomo","Clarity","Sin City","Sunrise","Cross Process","Orange Peel","Love","Grungy",
			"Jarques","Pinhole","Old Boot","Glowing Sun","Hazy Days","Her Majesty","Nostalgia","Hemingway","Concentrate"]
	filterList.forEach(function(filter,index){
		var filterButton = document.createElement("button");
		filterButton.setAttribute("class","btn btn-info");
		filterButton.setAttribute("style","display: inline-block; margin: 3px 2px 2px 3px");
		filterButton.setAttribute("id",filter);
		$(filterButton).html(filter);
		editor.appendChild(filterButton);
	})
}

function updateFilterValue(imageUrl){
	$(document).on('change', 'input[type=range]', function() {
		// console.log("FilterV:",init_url);
		// console.log("some value changed");
		var brightness = parseInt($('#brightness').val());
		var contrast = parseInt($('#contrast').val());
		var saturation = parseInt($('#saturation').val());
		var vibrance = parseInt($('#vibrance').val());
		var exposure = parseInt($('#exposure').val());
		var hue = parseInt($('#hue').val());
		var sepia = parseInt($('#sepia').val());
		var gamma = parseFloat($('#gamma').val());
		var noise = parseInt($('#noise').val());
		var clip = parseInt($('#clip').val());
		var sharpen = parseInt($('#sharpen').val());
		var stackBlur = parseInt($('#stackBlur').val());

		$('#brightnessValue').html(brightness);
		$('#contrastValue').html(contrast);
		$('#saturationValue').html(saturation);
		$('#vibranceValue').html(vibrance);
		$('#exposureValue').html(exposure);
		$('#hueValue').html(hue);
		$('#sepiaValue').html(sepia);
		$('#gammaValue').html(gamma);
		$('#noiseValue').html(noise);
		$('#clipValue').html(clip);
		$('#sharpenValue').html(sharpen);
		$('#stackBlurValue').html(stackBlur);

		var gamma_value = gamma;
		if (gamma == 0){
			gamma_value = 1;
		}

		Caman('#editing-img', imageUrl, function() {
			this.revert(false);
			this.brightness(brightness);
			this.contrast(contrast);
			this.saturation(saturation);
			this.vibrance(vibrance);
			this.exposure(exposure);
			this.hue(hue);
			this.sepia(sepia);
			this.gamma(gamma_value);
			this.noise(noise);
			this.clip(clip);
			this.sharpen(sharpen);
			this.stackBlur(stackBlur);
			this.render();
			//.gamma(gamma).stackBlur(stackBlur) doesnot work
		});		

	});
}

function updateFilter(imageUrl){
	$(".btn.btn-info").on("click",function(){
		var filterName = $(this).attr('id');
		// console.log("id is",filterName);
		// console.log("ready to filter");
		reset(imageUrl);
		// console.log("during reset",canvas2.width, canvas2.height);

		setTimeout(function(){
			// console.log("before change filter",canvas2.width, canvas2.height);
			changeFilter(filterName,imageUrl);
		},500)
	})
}

function reset(imageUrl){
	var matches = document.querySelectorAll("input[type=range]");
	matches.forEach(function(item,index,array){
		array[index].value = "0";
	});
	// console.log("init:",init_url);
	$('#brightnessValue').html("0");
	$('#contrastValue').html("0");
	$('#saturationValue').html("0");
	$('#vibranceValue').html("0");
	$('#exposureValue').html("0");
	$('#hueValue').html("0");
	$('#sepiaValue').html("0");
	$('#gammaValue').html("0");
	$('#noiseValue').html("0");
	$('#clipValue').html("0");
	$('#sharpenValue').html("0");
	$('#stackBlurValue').html("0");
	// setTimeout(function(){
	Caman('#editing-img', imageUrl, function() {
		this.revert(true);
		// this.brightness(0).contrast(0).saturation(0).vibrance(0)
		// .exposure(0).hue(0).sepia(0).gamma(1).noise(0).clip(0).sharpen(0).stackBlur(0).render();
	});	
	// },500);
	// setTimeout(function(){
	// 	console.log("after reset",canvas2.width, canvas2.height);
	// },500);

	// console.log("Reset is done");
}

function changeFilter(filterName,imageUrl){

	switch (filterName){
		case ('Vintage'):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Vintage");
				this.vintage();
				this.render();
			});
			break;
		case ("Lomo"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Lomo");
				this.lomo();
				this.render();
			});
			break;
		case ("Clarity"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Clarity");
				this.clarity();
				this.render();
			});
			break;
		case ("Sin City"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("sinCity");
				this.sinCity();
				this.render();
			});
			break;
		case ("Sunrise"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("sunrise");
				this.sunrise();
				this.render();
			});
			break;
		case ("Cross Process"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Cross Process");
				this.crossProcess();
				this.render();
			});
			break;
		case ("Orange Peel"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Orange Peel");
				this.orangePeel();
				this.render();
			});
			break;
		case ("Love"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Love");
				this.love();
				this.render();
			});
			break;
		case ("Grungy"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Grungy");
				this.grungy();
				this.render();
			});
			break;
		case ("Jarques"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Jarques");
				this.jarques();
				this.render();
			});
			break;
		case ("Pinhole"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Pinhole");
				this.pinhole();
				this.render();
			});
			break;
		case ("Old Boot"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Old Boot");
				this.oldBoot();
				this.render();
			});
			break;
		case ("Glowing Sun"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Glowing Sun");
				this.glowingSun();
				this.render();
			});
			break;
		case ("Hazy Days"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Hazy Days");
				this.hazyDays();
				this.render();
			});
			break;
		case ("Her Majesty"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Her Majesty");
				this.herMajesty();
				this.render();
			});
			break;
		case ("Nostalgia"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Nostalgia");
				this.nostalgia();
				this.render();
			});
			break;
		case ("Hemingway"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Hemingway");
				this.hemingway();
				this.render();
			});
			break;
		case ("Concentrate"):
			Caman('#editing-img', imageUrl, function() {
				// console.log("Concentrate");
				this.concentrate();
				this.render();
			});
			break;
		default:
			// console.log("No such filter");
	}
}

function save(imageUrl){
	$("#save-img").on("click",function(){

		//copy canvas to raw image
		var sourceImageData = canvas2.toDataURL();
		setTimeout(function(){
			var destCanvasContext = canvas.getContext('2d');
			var destinationImage = new Image;
			destinationImage.onload = function(){
				destCanvasContext.drawImage(destinationImage,0,0, canvas.width, canvas.height);
				// console.log("1:",canvas.width,canvas.height);
				// console.log("2:",canvas2.width, canvas2.height);
			};
			destinationImage.src = sourceImageData;
		},100);

	})
}