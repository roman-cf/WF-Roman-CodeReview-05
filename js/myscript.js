var imgPath = "img/";
var linkData = [["dates","contact","about","settings"],["#","#","#","#"]];
// var searchData =[["age","loves"],["age","loveCounter"]];
var gender = ["male","female",""];
var mlName;

var members = JSON.parse(localStorage.getItem("members"));
if (members == "" || members == null){
	members = JSON.stringify(membersJson);
	members = JSON.parse(members);
	for (let person of members) {
		person.loveStatus = 0;
		person.loveCounter = 0;
	}
	members.splice(0,1);
};

siteBuilder();

//-------------------------------------------Site Builder---------------------------------------------------
function siteBuilder(){
	$("title").text("Dating");
	$("body").append(`
					<header id="header" class=" d-flex justify-content-between text-white  bg-info p-2 border-bottom-primary">
						<p class="h2 m-1">Dating</p>
						<nav class=" navbar navbar-expand-md p-2 justify-content-end">
							<button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarContent"
							    aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-icon text-white" >&#8801;</span>
							</button>
							<div class="collapse navbar-collapse "  id="navbarContent">
								<ul class="navbar-nav justify-content-end">
								</ul>
							</div>
						</nav>	
					</header>
		`);
	$("body").append(`<main><div id="maincontent" class="container"></div></main>`);
	$("body").append(`<footer>&copy;</footer>`);



	for(let i=0;i<linkData[0].length;i++){
		$("nav ul").append(`
						<li class="nav-item"><a class="nav-link text-white h4" href="${linkData[1][i]}">${linkData[0][i]}</a></li>
		`)
	}

	$("#maincontent").append(`
			<div class="row mx-auto d-flex  my-4 p-2 bg-light sticky-top">
				
				<h3 class="col-lg-4 col-md-4 col-12">Candidates</h3>
				
				<div class="col-lg-4 col-md-4 col-12 mt-2 mb-2 d-flex">			

					<div class="custom-control custom-checkbox">
						<input checked type="checkbox" class="custom-control-input checkItem" id="check0">
						<label class="custom-control-label mr-2" for="check0">male</label>
					</div>	
					<div class="custom-control custom-checkbox">
						<input checked type="checkbox" class="custom-control-input checkItem" id="check1">
						<label class="custom-control-label mr-2" for="check1">female</label>
					</div>						
					<div class="custom-control custom-checkbox">
						<input checked type="checkbox" class="custom-control-input checkItem" id="check2">
						<label class="custom-control-label mr-2" for="check2">other</label>
					</div>	
				</div>
				
				<div class="dropdown col-lg-4 col-md-4 col-12">
					<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
				    	sort candidates by ...
					</button>
					<div class="dropdown-menu">
				    	<p class="dropdown-item h4" name="age">age</p>
				    	<p class="dropdown-item h4" name="loveCounter">loves</p>
					</div>
				</div>  		
			
			</div>

			<div id="overView" class="row"></div>
		`)
	$(".checkItem").on("change",function(e){
		genderSelect($(this).attr("id"));
	})

	$(".dropdown-item").on("click",function(e){
		candidateSort($(this).attr("name"));
	})

	for(let person of members){
		overviewCardBuilder(person);
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
displayDialogbox();
//---------------------------------------End Site Builder---------------------------------------------------

//---------------------------------------Overview Card Builder----------------------------------------------
function overviewCardBuilder(person){
	let Farbe = "";
	let bgFarbe = "bg-secondary"; 

	if(person.loveStatus == 1){Farbe = "-danger"}else{Farbe = "-info"};

		$("#overView").append(`
				<div id="card${person.memberId}" class="col-lg-3 col-md-6 col-sm-12 mb-3">
					<div class="card h-100 ${bgFarbe}">
						<img class="card-img-top"  src="${imgPath+person.picUrl}" alt="Card image"></a>
						<div class="card-img-overlay offset-md-8 offset-lg-8">
					 		<p id="${'member'+person.memberId}" class=" dateBtn btn btn${Farbe} " >&hearts; </p>
					 	</div>
					 	<div class="card-body text-white d-flex flex-column">
					    	<h4 class="card-title">${person.nickname}</h4>
					    	<p class="card-text mt-auto">${person.slogan}</p>
					 	</div>
						<div class="progress bg-secondary">
    						<div class="progress-bar bg${Farbe}" style="width:${person.loveCounter}px">${person.loveCounter}</div>
						</div>
					</div>
				</div>
			`);	
			//add eventhandler
			$("#card"+person.memberId).on("click", function(e){
				var tempId = Number((e.target.id).slice(6));
				hearting(tempId);
			});
};
//---------------------------------------End Overview Card Builder-------------------------------------------

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
	//add eventhandler
	$("#favs"+person.memberId).on("click", function(e){
		var tempId = Number((e.target.id).slice(4));
		hearting(tempId);
	});
}
//---------------------------------------End cards Favorits Builder-------------------------------------------

//-------------------------------------EventHandler of Like Button-----------------------------------------
function hearting(tempId){

	for(let person of members){	

		if (person.memberId == tempId){

			if(person.loveStatus==0){

				person.loveStatus=1;
				person.loveCounter++;
				let progress = person.loveCounter;
				mlName = person.name;
				console.log(mlName);
				$("#card"+tempId+" .progress-bar").css("width", progress).text(progress).removeClass("bg-info").addClass("bg-danger");		
				$("#member"+tempId).removeClass("btn-info").addClass("btn-danger");
				favCardBuilder(person);
				store();
				$("#myModal").modal("show");
				$(".modal-body p").text(person.name);

			}else{

				person.loveStatus=0;
				$("#card"+tempId+" .progress-bar").removeClass("bg-danger").addClass("bg-info");		
				$("#member"+tempId).removeClass("btn-danger").addClass("btn-info");
				$("#favCard"+tempId).remove();
				store();
			}
		}
	}
};
//-------------------------End-of------EventHandler of Like Button-----------------------------------------

//--------------------------store-local-------------------------------------------------------------------
function store(){ 
	localStorage.setItem("members", JSON.stringify(members));
}
//-------------------ende-store-local----------------------------------------------------------------------

//--------------------------Number Sort Function------------------------------------------------------------
function numberSort(wert){
	members.sort(function(a, b){
	return b[wert]-a[wert];
	});
}
//------------------End----Number Sort Function------------------------------------------------------------

//------------------Sort Candidates------------------------------------------------------------------------
function candidateSort(searchPara){
	$("#overView").empty();

	numberSort(searchPara);

	for(let person of members){
		overviewCardBuilder(person);
	};
	$(".dateBtn").on("click", function(e){
		var tempId = Number((e.target.id).slice(6));
		hearting(tempId);
	});

	$("#favorites").empty();
	for(let person of members){
		if(person.loveStatus == 1){
			favCardBuilder(person);
		};
	};
};
//------------End---Sort Candidates------------------------------------------------------------------------

//------------------change genderSelect--------------------------------------------------------------------
function genderSelect(e){
	var checkId = e.slice(5);
	var genderValue = gender[checkId];
	if ($('#'+e).is(":checked")==false){

		for(let person of members){
			if(person.gender == genderValue){
				let tempId = person.memberId;
				$("#card"+tempId).remove();
			}
		}	
	}else{
		for(let person of members){
			if(person.gender == genderValue){
				overviewCardBuilder(person);
			}
		}
	}
}
//-------------End--change genderSelect--------------------------------------------------------------------

//----------------------Modal-model----------------------------------------------------------------
function displayDialogbox(){
 $("body").append(` 
				  <div class="modal fade" id="myModal" role="dialog">
				    <div class="modal-dialog modal-sm">
				      <div class="modal-content">
				        <div class="modal-header">
				          <h4 class="modal-title">add to favorites</h4>
				          <button type="button" class="close" data-dismiss="modal">&times;</button>
				        </div>
				        <div class="modal-body">
				          <p></p>
				        </div>
				        <div class="modal-footer">
				          <button type="button" class="btn btn-info" data-dismiss="modal">ok</button>
				        </div>
				      </div>
				    </div>
				  </div>
				</div>
				`);

$("#myodal button").on("click",function(){$("#myModal").modal("hide")})
};
