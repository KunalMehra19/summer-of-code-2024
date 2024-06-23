let checkbox = document.querySelector("input[id=checkadmin]");

checkbox.addEventListener('change', function() {
  if (this.checked) {
    document.querySelector(".heading").getElementsByTagName("span")[0].innerHTML="as Admin"
  } else {
    document.querySelector(".heading").getElementsByTagName("span")[0].innerHTML="as a Cashier"
  }
});