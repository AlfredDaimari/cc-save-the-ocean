import "./global.css";

const main_div = document.getElementById("main");
const under_canvas = document.getElementById("underwater");
under_canvas.width = main_div.offsetWidth;
under_canvas.height = main_div.offsetHeight;
let ctx = under_canvas.getContext("2d");
ctx.lineCap = "round";
ctx.lineWidth = "60";

const ship = document.getElementById("ship");
const shipy = document.getElementById("shipy");

const scoreboard = document.getElementById("scoreboard");
const shoals_info = document.getElementById("shoal-info");
var score = 0;
var shoals_caught = 0;

var hover_positions = []; // positions of where to move the hover boxes
var temp_positions = [];
const hoverBx1 = document.getElementById("hover-box-1");
const hoverBx2 = document.getElementById("hover-box-2");
const hoverBx3 = document.getElementById("hover-box-3");
const pic1 = document.getElementById("pic-box-1");
const pic2 = document.getElementById("pic-box-2");
const pic3 = document.getElementById("pic-box-3");

/*
names of illegal fishing vessels
*/
const ships = [
  "Asian Warrior",
  "Atlantic Wind",
  "Baroon",
  "Bigeye",
  "Camlot",
  "Fu Hsiang Fa",
  "Good Hope",
  "Neptune",
  "Ocean Diamond",
  "Perlon",
  "Trinity",
  "Summer Refer",
  "STS-50",
  "No 2 Choyu",
  "Murtosa",
  "Maria",
  "Limpopo",
  "Koosha 4",
  "Hoom Xiang 11",
  "Gunuar Melyan 21",
];

// color schemes representing life in water
const color_scheme = [
  "bg-blue-700",
  "bg-blue-800",
  "bg-blue-900",
  "bg-green-700",
  "bg-green-800",
  "bg-green-900",
];

// pics to display, showign destruction
const pics = [
  "p1.jpg",
  "p2.jpg",
  "p3.jpg",
  "p4.jpg",
  "p5.jpg",
  "p6.png",
  "p7.jpg",
  "p8.jpg",
  "p9.png",
  "p10.jpg",
  "p11.jpg",
  "p12.jpg",
  "p13.jpg",
  "p14.jpg",
  "p15.jpg",
  "p16.jpg",
  "p17.jpg",
  "p18.jpg",
  "p19.jpg",
];

//links to support claim
const links = [
  "https://www.seaspiracy.org/donate-now",
  "https: //seasave.org/",
  "https://time.com/collection/davos-2019/5502588/oceans-in-peril/",
  "https://www.no-fishing.net/",
  "https://animalequality.org/blog/2019/09/30/fishing-industry-destroying-environment/",
  "https://seashepherd.org/donate/",
  "https://www.netflix.com/title/81014008",
  "https://theoceancleanup.com/",
  "https://www.usgs.gov/news/what-drag-global-impact-bottom-trawling#:~:text=Trawling%20destroys%20the%20natural%20seafloor,root%20systems%20or%20animal%20burrows.",
];

/*
setting location of ship to random point on the screen and name
*/
ship.style.left =
  (
    (Math.floor(Math.random() * (window.innerWidth - 20)) / window.innerWidth) *
    100
  ).toString() + "%";
ship.style.top =
  (
    ((Math.floor(Math.random() * (window.innerHeight - 60)) + 20) /
      window.innerHeight) *
    100
  ).toString() + "%";
shipy.innerHTML = ships[Math.floor(Math.random() * ships.length)];
shipy.className =
  "w-5 h-5 rounded-full bg-white flex text-center items-center justify-center text-green-600";

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
      ((Math.floor(Math.random() * (window.innerHeight - 80)) + 50) /
        window.innerHeight) *
      100
    ).toString() + "%";

  element.innerHTML = Math.ceil(Math.random() * 20);
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    var pos = element.getBoundingClientRect();
    var ship_pos = ship.getBoundingClientRect();
    var lft, top;
    hover_positions.push({ x: ship_pos.x, y: ship_pos.y });

    ctx.beginPath();
    ctx.moveTo(ship_pos.x, ship_pos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.closePath();
    ctx.stroke();

    if (ship_pos.left > pos.left) {
      lft = -(ship_pos.left - pos.left) - ship_pos.width / 2;
    } else {
      lft = pos.left - ship_pos.left - ship_pos.width / 2;
    }
    if (ship_pos.top > pos.top) {
      top = -(ship_pos.top - pos.top) - ship_pos.height / 2;
    } else {
      top = pos.top - ship_pos.top - ship_pos.height / 2;
    }

    ship.style.transition = "ease-in-out 700ms";
    ship.style.transform = `translate(${lft}px, ${top}px)`;

    setTimeout(() => {
      ship.style.transition = "none";
      ship.style.transform = "none";
      ship.style.left = pos.left - ship_pos.width / 2 + "px";
      ship.style.top = pos.top - ship_pos.height / 2 + "px";

      score += parseInt(element.innerHTML);
      shoals_caught += 1;
      const col_index = Math.floor(shoals_caught / 4);
      const prev_col_index = Math.floor((shoals_caught - 1) / 4);
      main_div.classList.remove(color_scheme[prev_col_index]);
      main_div.classList.add(color_scheme[col_index]);
      scoreboard.innerHTML = "Score:" + score.toString();
      shoals_info.innerHTML = "Shoals:" + shoals_caught.toString();

      element.remove();
    }, 700);
  });
}

/*
adding event listeners to the div's
*/
main_div.addEventListener("click", () => {
  main_div.style.opacity = 0;
  ship.style.opacity = 0;
  main_div.style.pointerEvents = "none";
  ship.classList.remove("animate-pulse");

  // making hover boxes visible when 3 atleast 4 shoals have been caught
  if (hover_positions.length > 3) {
    temp_positions = [];
    // hover-box-1
    let pos = Math.floor(Math.random() * hover_positions.length);
    temp_positions.push(hover_positions[pos]);
    hover_positions.splice(pos, 1); // remove the pos
    hoverBx1.style.left = temp_positions[0]["x"] + "px";
    hoverBx1.style.top = temp_positions[0]["y"] + "px";
    hoverBx1.classList.remove("hidden");
    hoverBx1.href = links[Math.floor(Math.random() * links.length)];

    // hover-box-2
    pos = Math.floor(Math.random() * hover_positions.length);
    temp_positions.push(hover_positions[pos]);
    hover_positions.splice(pos, 1); // remove the pos
    hoverBx2.style.left = temp_positions[1]["x"] + "px";
    hoverBx2.style.top = temp_positions[1]["y"] + "px";
    hoverBx2.classList.remove("hidden");
    hoverBx2.href = links[Math.floor(Math.random() * links.length)];

    // hover-box-3
    pos = Math.floor(Math.random() * hover_positions.length);
    temp_positions.push(hover_positions[pos]);
    hover_positions.splice(pos, 1); // remove the pos
    hoverBx3.style.left = temp_positions[2]["x"] + "px";
    hoverBx3.style.top = temp_positions[2]["y"] + "px";
    hoverBx3.classList.remove("hidden");
    hoverBx3.href = links[Math.floor(Math.random() * links.length)];

    //postions for the picture containers
    pic1.style.left = temp_positions[0]["x"] + 10 + "px";
    pic1.style.top = temp_positions[0]["y"] + 10 + "px";
    pic1.src = pics[Math.floor(Math.random() * pics.length)];

    pic2.style.left = temp_positions[1]["x"] + 10 + "px";
    pic2.style.top = temp_positions[1]["y"] + 10 + "px";
    pic2.src = pics[Math.floor(Math.random() * pics.length)];

    pic3.style.left = temp_positions[2]["x"] + 10 + "px";
    pic3.style.top = temp_positions[2]["y"] + 10 + "px";
    pic3.src = pics[Math.floor(Math.random() * pics.length)];
  }
});

/*
events listeners for the underwater div
*/

under_canvas.addEventListener("click", () => {
  main_div.style.opacity = 100;
  ship.style.opacity = 100;
  ship.classList.add("animate-pulse");
  main_div.style.pointerEvents = "all";

  // pushing the array positions back into the array
  for (let i of temp_positions) {
    hover_positions.push(i);
  }

  hoverBx1.classList.add("hidden");
  hoverBx2.classList.add("hidden");
  hoverBx3.classList.add("hidden");
});

/*
event listeners for the picture containers 
*/
hoverBx1.addEventListener("mouseenter", () => {
  pic1.classList.remove("hidden");
});

hoverBx1.addEventListener("mouseout", () => {
  pic1.classList.add("hidden");
});

hoverBx2.addEventListener("mouseenter", () => {
  pic2.classList.remove("hidden");
});

hoverBx2.addEventListener("mouseout", () => {
  pic2.classList.add("hidden");
});

hoverBx3.addEventListener("mouseenter", () => {
  pic3.classList.remove("hidden");
});

hoverBx3.addEventListener("mouseout", () => {
  pic3.classList.add("hidden");
});
