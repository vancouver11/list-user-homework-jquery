var total;
$(document).ready(function() {
	
//получение карточек
	$('#getBtn').on('click', function() {
		ajaxRequest(1);
	});


//добавление карточки
	$('#addBtn').on('click', function() {
		console.log('delete');
		$.ajax({
			  type: "POST",
			  url: "https://reqres.in/api/users",
			  data: {
					   "id":++total,
					   "email": `${$('.mail').val()}`,
					   "first_name": `${$('.name').val()}`,
					   "last_name": `${$('.surname').val()}`,
					   "avatar": `${$('.url').val()}`
	        		},
			  success: successAdd
		});
		$('.name').val('');
		$('.surname').val('');
		$('.url').val('');
		$('.mail').val('');
	});



});

/*Успешное выпол запроса get*/
function success(dataAjax){
	total = dataAjax.total;
	console.log(total);
	var pages = $('#pages');
	$('#listUsers').html('');
	pages.html('');
	$('#pageCurrent').html('');
	console.log(dataAjax);
	if(dataAjax.total_pages > 1){

		for(let i=1; i <= dataAjax.total_pages; i++){
			if(dataAjax.page === i) continue;
			var page = $('<div class="page"></div>');
			page.text(i);
			page.on('click', function() {
				ajaxRequest(i);
			});
			pages.append(page);
		}
	}

	createCards(dataAjax);
	
}
/*AJAX запрос данных для карточек*/
function ajaxRequest(id){
	$.ajax({
		    url: `https://reqres.in/api/users?page=${id}`,             
		    dataType : 	"json",                     
		  /*  complete: 	function(){console.log('complete done!')},*/
		    success: success,
		    error: 		function(){console.log('error done!')},
		    /*beforeSend: function(){console.log('beforeSend done!')}
*/
			})
}
/*Создание карточек страницы*/
function createCards(dataAjax){
	
	dataAjax.data.forEach(function(element){
		addOneCard(element);
	})
	var p = $(`<p>Номер страницы -  ${dataAjax.page}</p>`);
	$('#pageCurrent').append(p);
}


/*Успешное выпол запроса post(добавление карточки)*/
 function successAdd(element){
 	
 	addOneCard(element);
 	console.log(total)
 }
//Создание карточки
 function addOneCard(element){
 	var newCard = $('<div class="card"></div>');
		var newName = $('<div class="name"></div>').text(element.first_name);
		var newAvatar = $('<div class="avatar"></div>').css('background-image', `url(${element.avatar})`);
		var newLastName = $('<div class="lastName"></div>').text(element.last_name);
		var newEmail = $('<div class="email"></div>').text("Email");
		newEmail.on('click', function() {
			$(this).find('.innerEmail').toggleClass('hidden');
		});
		var innerEmail = $('<div class="innerEmail hidden"></div>').text(element.email);
		$(newEmail).append(innerEmail);
		$(newCard).append(newName);
		$(newCard).append(newLastName);
		$(newCard).append(newEmail);
		$(newCard).append(newAvatar);
		$('#listUsers').append(newCard);
 }