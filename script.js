function displayTime() {
    var easternTime = new Date();
    easternTime.setTime(easternTime.getTime() /* + (60 * 60 * 1000)*/); // Add 1 hour for Eastern Daylight Time
    var koreanTime = new Date();
    koreanTime.setTime(koreanTime.getTime() /* + (9 * 60 * 60 * 1000) */); // Add 9 hours for Korean Standard Time 

var easternOptions = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    var koreanOptions = { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', second: '2-digit' };

    document.getElementById("easternTime").innerHTML = new Intl.DateTimeFormat('en-US', easternOptions).format(easternTime) + ' EST';
    document.getElementById("koreanTime").innerHTML = new Intl.DateTimeFormat('en-US', koreanOptions).format(koreanTime) + ' KST';
}

setInterval(displayTime, 1000); // Update time every second

// selecting both inner cursor and outer cursor
const cursor = document.querySelectorAll(".cursor");
const links = document.querySelectorAll(".link")

window.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;
    
    links.forEach(link => {
        links.addEventListener("mouseenter", () => {
            el.classList.add("hover");
        })
        links.addEventListener("mouseleave", () => {
            el.classList.remove("hover");
        })
    })
    

    cursor.forEach(el => {
        el.style.left = `${x}px`;
        el.style.top = `${y}px`
    })
})


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.opacity = 0; // set initial opacity to 0
    modal.style.display = "block"; // show the modal
    setTimeout(function() {
      modal.style.opacity = 1; // animate opacity to 1
      modal.querySelector(".modal-content").style.animation = "slideIn 0.5s ease-out forwards";
    }, 10); // delay the animation by 10ms to allow the modal to be displayed first
    setTimeout(function() {
      modal.querySelector(".modal-content").style.animation = "";
    }, 500); // reset animation after 500ms
  }
  
  span.onclick = function() {
    modal.querySelector(".modal-content").style.animation = "slideOut 0.5s ease-out forwards";
    modal.style.opacity = 0; /* Animate modal opacity to 0 */
    modal.querySelector(".modal-content").addEventListener("animationend", function() {
      modal.style.display = "none";
    });
  }


const image = document.querySelector('.about-left');
const image2 = document.querySelector('.about-right-top');
const image3 = document.querySelector('.about-right-bottom');

window.addEventListener('scroll', () => {
  if (isInView(image)) {
    image.classList.add('spin-animation');
  }
  if (isInView(image2)) {
    image2.classList.add('spin-animation');
  }
  if (isInView(image3)) {
    image3.classList.add('spin-animation');
  }
});

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const textarea = document.querySelector("#message");
textarea.addEventListener("input", autoResize, false);

function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
}

const form = document.querySelector("form");
const fullname = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail(){
  const bodyMessage = `Full Name: ${fullname.value}<br> Email: ${email.value}<br> Subject: ${subject.value}<br> Message: ${message.value}`;
 
  Email.send({
    SecureToken: "b821393b-fdc3-4c67-a0a1-2c4e5a76949c",
    // Host : "smtp.elasticemail.com",
    // Username : "jjunginh1117@gmail.com",
    // Password : "7DCD715392AAD5D57ED32ED64863550267BB",
    To : "jjunginh1117@gmail.com",
    From : "jjunginh1117@gmail.com",
    Subject : subject.value,
    Body : bodyMessage
}).then(
  message => {
    if (message == "OK"){
      Swal.fire({
        title: "SUCCESS! ",
        text: "Message sent successfully!",
        icon: "success"
      });
    }
  }
);
}

function checkInputs(){
  const items = document.querySelectorAll(".item");

  for (const item of items){
    if (item.value == ""){
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != ""){
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    }); 

    item.addEventListener("keyup", () => {
      if (item.value != ""){
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } 
      else{
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail(){
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");


  if (!email.value.match(emailRegex)){
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != ""){
      errorTxtEmail.innerText = "Enter a valid email address";
    }
    else{
      errorTxtEmail.innerText = "Email address can't be blank";
    }
  }
  else{
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  checkInputs();

  if(!fullname.classList.contains("error") && !email.classList.contains("error") &&  !subject.classList.contains("error") &&  !message.classList.contains("error")){
    sendEmail(); 

    form.reset();
    return false;
  } 
}); 
