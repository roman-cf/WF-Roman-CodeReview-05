var imgPath = "img/";
var linkData = [["dates","contact","about","settings"],["#","#","#","#"]];

var members = JSON.stringify(membersJson);
	members = JSON.parse(members);

for (let person of members) {
person.loveStatus = 0;
person.loveCounter = 0;
}

siteBuilder();

//-------------------------------------------Site Builder---------------------------------------------------
function siteBuilder(){
	$("body").append(`
					<header id="header" class="d-flex justify-content-between text-white bg-info p-2 border-bottom-primary ">
						<p class="h2 m-1">Dating</p>
						<nav class=" p-2">
							<ul class="nav justify-content-end">
							</ul>
						</nav>	
					</header>
		`);
	$("body").append(`<main><div id="maincontent" class="container"></div></main>`);
	$("body").append(`<footer>&copy;</footer>`);

	for(let i=0;i<linkData[0].length;i++){
		$("nav ul").append(`
						<li class="nav-item"><a class="nav-link text-white" href="${linkData[1][i]}">${linkData[0][i]}</a></li>
		`)
	}

	$("#maincontent").append(`
			<div class="row mx-auto d-flex justify-content-between my-4 p-2">
				<h3 class=" col-lg-6 col-md-2 dropdown col-6">Candidates</h3>	  
				<div class="dropdown col-lg-2 dropdown col-6 col-md-6">
				    <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
				      sort candidates by ...
				    </button>
				    <div class="dropdown-menu">
				      <a class="dropdown-item h4" href="#">Link 1</a>
				      <a class="dropdown-item h4" href="#">Link 2</a>
				      <a class="dropdown-item h4" href="#">Link 3</a>
				    </div>
				</div>  		
			</div>
			<div id="overView" class="row"></div>
		`)

	for(let i=1;i<members.length;i++){
		overviewCardBuilder(i);
	};	

	$("main").append(`	<div class="bg-info text-white">
							<p class="h2 m-1 p-3">my Favorits</p>
						</div>
						<div id="favcontent" class="container">
							<div id="favorites" class="row"></div>
						</div>
					`);

	for(let person of members){
		if(person.loveStatus == 1){
			favCardBuilder(person);
		};
	};	
};
//---------------------------------------End Site Builder---------------------------------------------------

//---------------------------------------Overview Builder---------------------------------------------------
function overviewCardBuilder(i){
		$("#overView").append(`
				<div id="card${members[i].memberId}" class="col-lg-3 col-md-6 col-sm-12 mb-3">
					<div class="card h-100 bg-secondary"   >
						<img class="card-img-top" src="${imgPath+members[i].picUrl}" alt="Card image"></a>
						<div class="card-img-overlay offset-md-8 offset-lg-8">
					 		<a href="#" id="${'member'+members[i].memberId}" class=" dateBtn btn btn-secondary ">&hearts;</a>
					 	</div>
					 	<div class="card-body text-white">
					    	<h4 class="card-title">${members[i].nickname}</h4>
					    	<p class="card-text">${members[i].slogan}</p>
					 </div>
					</div>
				</div>
			`);
}
//---------------------------------------End Overview Builder-----------------------------------------------

//---------------------------------------Favorits Card Builder----------------------------------------------
function favCardBuilder(person){
	$("#favorites").append(`
		<div id="favCard${person.memberId}" class="col-lg-6 col-md-6 col-sm-12 mb-3">
			<div class="card h-100 bg-secondary"   >
				<img class="card-img-top" src="${imgPath+person.picUrl}" alt="Card image"></a>
				<div class="card-img-overlay offset-md-10 offset-lg-10">
			    	<p id="${'favs'+person.memberId}" class="favsBtn btn btn-danger ">&hearts;</p>
			  	</div>
			  	<div class="card-body text-white">
			    	<h4 class="card-title">Name: ${person.name}</h4>
			    	<p class="card-text">Nickname: ${person.nickname}</p>
			    	<p class="card-text">Age: ${person.age}</p>
			    	<p class="card-text">Interests: ${person.interests}</p>
			    	<p class="card-text">Slogans: ${person.slogan}</p>
			    	<p class="card-text">Loves: ${person.loveCounter}</p>
				</div>
			</div>
		</div>
	`);
}
//---------------------------------------End cards Favorits Builder-------------------------------------------

//--------------------------------EventHandler HeartButton ------------------------------------------------
$(".dateBtn").on("click", function(e){
	
	var tempId = Number((e.target.id).slice(6));
	hearting(tempId,"member");

	//EventHandler HeartButton in Favorits
	$(".favsBtn").on("click", function(e){
		console.log("vorbereitet")
		var tempId2 = Number((e.target.id).slice(4));
		hearting(tempId2,"favCard");
	});
	//End of EventHandler

});
//---------------------------------------End of EventHandler-----------------------------------------------

//-------------------------------------EventHandler of Like Button-----------------------------------------
function hearting(tempId,tagId){
	console.log(tempId)

	for(let person of members){	
		if (person.memberId == tempId){

			if(person.loveStatus==0){
				person.loveStatus=1;
				person.loveCounter++;		
				console.log("#"+tagId+tempId);
				$("#"+tagId+tempId).removeClass("btn-secondary");
				$("#"+tagId+tempId).addClass("btn-danger");

				favCardBuilder(person);

			}else{

				person.loveStatus=0;

				$("#member"+tempId).removeClass("btn-danger");
				$("#member"+tempId).addClass("btn-secondary");

				$("#favCard"+tempId).remove();
			}
		}
	}
};
//-------------------------End-of------EventHandler of Like Button-----------------------------------------

function favHearting(e){
	let tempId=	e.slice(4);
	person.loveStatus=0;
	console.log(tempId+" "+person.loveStatus+" "+e);
	$("#favCard"+tempId);
}