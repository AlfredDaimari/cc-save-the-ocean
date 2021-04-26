import "./global.css";

const main_div = document.getElementById("main");
const under_div = document.getElementById("underwater");
const ship = document.getElementById("ship");

/*
setting location of ship to random point on the screen
*/
ship.style.left =
  (
    (Math.floor(Math.random() * (window.innerWidth - 20)) / window.innerWidth) *
    100
  ).toString() + "%";
ship.style.top =
  (
    (Math.floor(Math.random() * (window.innerHeight - 30)) /
      window.innerHeight) *
    100
  ).toString() + "%";

/*
adding gold coins to the ocean
*/
for (let i = 0; i < 20; i++) {
  const element = document.createElement("div");
  element.className =
    "rounded-3xl bg-yellow-300 w-5 h-5 text-xs text-center cursor-pointer text-white anim-spin anim-spin-" +
    Math.ceil(Math.random() * 5);
  element.setAttribute("id", "coin" + i.toString());
  main_div.append(element);
}

/*
setting the cold coins to random places in the screen
*/
for (let i = 0; i < 20; i++) {
  let element = document.getElementById("coin" + i.toString());

  element.style.position = "absolute";
  element.style.left =
    (
      (Math.floor(Math.random() * (window.innerWidth - 20)) /
        window.innerWidth) *
      100
    ).toString() + "%";
  element.style.top =
    (
      (Math.floor(Math.random() * (window.innerHeight - 20)) /
        window.innerHeight) *
      100
    ).toString() + "%";

  element.innerHTML = Math.ceil(Math.random() * 20);
  element.addEventListener("click", (event) => {
    var pos = element.getBoundingClientRect();
    var ship_pos = ship.getBoundingClientRect();
    var lft, top;

    if (ship_pos.left > pos.left) {
      lft = -(ship_pos.left - pos.left);
    } else {
      lft = pos.left - ship_pos.left;
    }
    if (ship_pos.top > pos.top) {
      top = -(ship_pos.top - pos.top);
    } else {
      top = pos.top - ship_pos.top;
    }

    ship.style.transition = "ease-in-out 700ms";
    ship.style.transform = `translate(${lft}px, ${top}px)`;

    setTimeout(() => {
      ship.style.transition = "none";
      ship.style.transform = "none";
      ship.style.left = pos.left + "px";
      ship.style.top = pos.top + "px";
      element.remove();
    }, 700);
  });
}

/*
adding event listeners to the div's
*/
main_div.addEventListener("mousedown", () => {
  main_div.style.opacity = 0;
});

main_div.addEventListener("mouseup", () => {
  main_div.style.opacity = 100;
});
