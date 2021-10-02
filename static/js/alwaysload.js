for (let spoiler of document.querySelectorAll('.spoiler')) {
  spoiler.onclick = () => spoiler.classList.toggle('spoiler');
}
