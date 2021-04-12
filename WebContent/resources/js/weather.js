(()=>{
	const API_KEY = "aa7e5db18049ecf0f4bfca1702b3c54e";
	const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
	const weather = document.querySelector(".weather-text");


//위도 경도 받아오기
	let letlng = () => {
		//클로저 때문에 프로미스 사용 위도,경도 받은걸 살려두려고 
		return new Promise((resolve,reject)=>{
			let coord = {};
			navigator.geolocation.getCurrentPosition((position)=>{
				coord.lat = position.coords.latitude;
				coord.lng = position.coords.longitude;		
				resolve(coord);
			})
	 	})
	}
	
	
	//통신주기 확인을 위해 localStorage에 넣어둠 
	let saveWeather = (location,temp)=>{
		let weatherObj = {};
		let maxAge = new Date();
		maxAge = maxAge.setHours(maxAge.getHours()+1);
		weatherObj.loc = location;
		//도시이름
		weatherObj.temp = temp;
		//온도
		weatherObj.maxAge = maxAge;
		//한시간 지났을떄 시간
		localStorage.setItem("weather",JSON.stringify(weatherObj));
		//								JSON으로 넣음(String) 
		//								아니면 object Object로 들어감 꺼내볼 수 없음
	}
	
	
	let getWeather = () => {
		letlng()
		//비동기 통신시작
		.then((coord)=>{
			let url = `${WEATHER_URL}lat=${coord.lat}&lon=${coord.lng}&appid=${API_KEY}&units=metric` ;
			fetch(url)
			.then(response => response.json())
			.then(json => {
				saveWeather(json.name,json.main.temp);
				loadWeather(json.name,json.main.temp)
				//저장하고 화면에 출력하는걸 동시에 해줌
			})
		})
	}
	
	//화면에 출력해주는 메서드
	function loadWeather(location, temp){
		weather.innerHTML = `${temp}℃ @ ${location}`;
	}
	
	
	
	
	let init = () => {
		let parsedWeather = JSON.parse(localStorage.getItem("weather"));
		//				    String으로 들어가서 꺼낼때는 JSON으로 꺼내줘야함 -> Map형태
		let now = new Date();
		
		if(parsedWeather){
			if(now > parsedWeather.maxAge){
				//기간 만기 -> 재통신
				getWeather();
			}else{
				loadWeather(parsedWeather.loc, parsedWeather.temp);
				//				Map 형태로 뽑아야 사용가능 
			}
		}else{
			getWeather();
		}	
	}
	init();
})();




