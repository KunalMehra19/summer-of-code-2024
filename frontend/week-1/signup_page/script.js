let checkbox = document.querySelector("#checkadmin");

checkbox.addEventListener('change', function() {
  if (this.checked) {
    document.querySelector(".cashadmin").innerHTML="as Admin"
  } else {
    document.querySelector(".cashadmin").innerHTML="as a Cashier"
  }
});



let a=document.querySelector(".whatpage").innerHTML
if (a=="Register"){
  console.log(a)
  document.querySelector('.sbtn').addEventListener('click',()=>{
    let name = document.querySelector('.name input').value;
    let email=document.querySelector('.email input').value;
    let isAdmin= document.getElementById('checkadmin').checked;
    let contact = document.querySelector('.contact input').value;
    let pwd = document.querySelector('.pass input').value;



    const requestURL = "http://127.0.0.1:5000/register"

    fetch(requestURL,{
      method: "POST",
      body: JSON.stringify({
        "name":name,
        "email":email,
        "isAdmin":isAdmin,
        "contact":contact,
        "pwd":pwd
      }),
      headers:{
        "Content-type":"application/json"
      }

    }).then(
      response=>response.json(),
    )
    .then(data=>{
      lk=data['message'];
      alert(lk);
      if (data['message'] && data['message'].includes('login')) {
        window.location.assign('index.html')
    }})
    
  })

}
else{
  console.log(a)

  document.querySelector('.registerlink').addEventListener('click',()=>{
    window.location.assign('registerpage.html')
  })

  document.querySelector('.sbtn').addEventListener('click',()=>{
    let email=document.querySelector('.log input').value;
    let pwd = document.querySelector('.pass input').value;
    let isAdmin= document.getElementById('checkadmin').checked;

    const requestURL = "http://127.0.0.1:5000/login"

    fetch(requestURL,{
      method: "POST",
      body: JSON.stringify({
        "email":email,
        "isAdmin":isAdmin,
        "pwd":pwd
      }),
      headers:{
        "Content-type":"application/json"
      }

    }).then(
      response=>response.json(),
    ).then(data=>{
      lk=data['message'];
      alert(lk)
  })

  })


}