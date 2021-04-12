/**
 * 
 */

const nameContainer = document.querySelector(".name");

let paintName = name => {
   let nameText = `<span class="name-text">Hello ${name}!</span>`;
   nameContainer.innerHTML = nameText;
}

/*localStorage에 이름을 넣어주는 메서드*/
let handleSubmit= ()=>{
   /* input 요소에 입력된 이름을 받아서*/
   let nameText = document.querySelector('.inp_name').value;
   /* 로컬스토리지에 저장하고*/
   localStorage.setItem("userName",nameText);
   /* 이름을 화면에 출력*/
   paintName(nameText);
}

let paintInput = ()=>{
   // input창 만들어주기
   let input = document.createElement("input");
   /*input의 속성을 지정*/
   input.placeholder = "Type your name here";
   input.type = "text";
   input.className = "inp_name";
   
   let form = document.createElement("form");
   /* submit이벤트 발생했을때 name을 로컬스토리지에 넣고 화면에 출력해주자*/

   /*
   handleSubmit이 input에 이름을 넣어주는 메서드를 가지고 있다
      그래서 input을 넣는거 보다 handleSubmit을 먼저 부른다 
      그리고 다시 아래칸으로 내려가 form에 input을 넣어준다
   */
   form.addEventListener('submit',handleSubmit);
   form.appendChild(input);
   nameContainer.appendChild(form);
}

let init = ()=>{
/* 
localStorage에서 "userName"이라는 키값을 가진 데이터가 존재하면
welcome OO! 의 텍스트 출력
존재하지 않으면 이름을 입력하기 위한 창을 출력
*/
   let name = localStorage.getItem("userName");
   if(name){
      //이름을 출력
      paintName(name);
   } else{
      //입력창 출력
      paintInput();
   }
}

init();