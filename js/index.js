const $ = document;
const landingTitle = $.querySelector(".landing__title");
landingTitle.innerHTML = "";

window.addEventListener("load", () => {
  let landingText = "ما به هر قیمتی دوره آموزشی تولید نمی کنیم!";
  let typeIndex = 0;

  typeWriter(landingText, typeIndex)

});

function typeWriter(text, index) {
  if (index < text.length) {
    landingTitle.innerHTML += text[index];
    index++;
  }
  if(index == text.length){
    landingTitle.innerHTML = "! ";
    index = 0;
  }

  setTimeout(() => {
    typeWriter(text, index);
  }, 100);
}
