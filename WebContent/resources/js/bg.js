(()=>{
	const UNSPLASH_URL ="https://api.unsplash.com/photos/random/?";
	const UNSPLASH_API_KEY = "u7zphIHgzsfDFg-teAfwl9Afzs8bdTTApLJV6FxgZbg";
	const body = document.querySelector("body");
	const locationContainer = document.querySelector(".location-text");
	
	let getBackground = () =>{
		let url = `${UNSPLASH_URL}client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;
		fetch(url)
		.then(response => response.json())
		.then(json => {
			let imageUrl = json.urls.full;
			let desc =  json.alt_description;
			//정보 예외처리
			if(desc){  
				saveBackground(imageUrl,desc);
				paintBackground(imageUrl,desc);
			}else{
				getBackground();
			}
		})
	}
	
	//저장
	let saveBackground = (imageUrl, desc)=>{
		//이미지 만기일자
		let maxDate = new Date();
		maxDate.setDate(maxDate.getDate() + 1);
		console.dir(maxDate);
		const imageObject = {
			url : imageUrl,
			maxDate : maxDate,
			desc : desc
		};
		localStorage.setItem("bg",JSON.stringify(imageObject));
	}
	
	
	//출력
	let paintBackground = (url,desc) =>{
		body.style.backgroundImage = `url(${url})`;
		locationContainer.innerHTML = desc;
	}
	
	
	
	let loadBackground = (savedImage) =>{
		let parsedImg = JSON.parse(savedImage);
		
		let today = new Date();
		//만기일자가 지났다면
		if(today > parsedImg.maxDate){
			getBackground();
		}else{
			paintBackground(parsedImg.url,parsedImg.desc);
		}
	}
	
	//만약 최근 api통신으로부터 하루가 지난 상황이라면 새롭게 통신을 해서
	//새 이미지를 불러오고 
	//그렇지 않다면 localStorage에 저장한 이미지로 배경이미지를 사용한다.
	let init = ()=>{
		let savedImage = localStorage.getItem("bg");
		if(savedImage){
			loadBackground(savedImage);
			//만기일자 확인하고 넘으면 새로운 통신 
			//안넘으면 있던 거 받아와서 그리기
		}else{
			//첫 api호출
			getBackground();
		}
	}
	
	init();
})();








