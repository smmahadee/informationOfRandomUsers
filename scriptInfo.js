const image = document.querySelector("#image");
const description = document.querySelector("#des");
const introduction = document.querySelector("#intro");
const cardIcon = document.getElementsByClassName("icon");

// Fetching data

async function loadData() {
  const res = await fetch(`https://randomuser.me/api/`);
  const data = await res.json();
  return data;
}

// Loading time initialized

setInterval(function () {
  location.reload();
}, 10000);

let Data = loadData();

Data.then((response) => displayFirstTime(response));

for (const icon of cardIcon) {
  icon.addEventListener("mouseover", function () {
    document.getElementById(
      this.id
    ).style.backgroundPosition = `${this.id} 1px`;
    displayInitialBackgroundPosition(this.id);
    displayDescription(this.id);
  });
}

function displayInitialBackgroundPosition(id) {
  for (const icon of cardIcon) {
    if (icon.id == id) continue;
    document.getElementById(
      icon.id
    ).style.backgroundPosition = `${icon.id} -48px`;
  }
}

let curId = null;

function displayDescription(id) {
  curId = id;
  if (curId === "0px") {
    curId = "name";
  } else if (curId === "-68px") {
    curId = "email";
  } else if (curId === "-135px") {
    curId = "birthday";
  } else if (curId === "-203px") {
    curId = "location";
  } else {
    curId = "phone";
  }

  Data.then((response) => displayData(response, curId));
}

function displayData(data, id) {
  if (id === "phone") {
    introduction.innerHTML = `<small>My phone number is</small>`;
    description.innerHTML = `<h5>${data.results[0].phone}</h5>`;
  } else if (id === "email") {
    introduction.innerHTML = `<small>My email is</small>`;
    description.innerHTML = `<small>${data.results[0].email}</small>`;
  } else if (id === "birthday") {
    introduction.innerHTML = `<small>My birthday is</small>`;
    description.innerHTML = `<h5>${data.results[0].dob.date}</h5>`;
  } else if (id === "location") {
    introduction.innerHTML = `<small>My location is</small>`;
    description.innerHTML = `<h5>${data.results[0].location.state}, ${data.results[0].location.city}, ${data.results[0].location.country}</h5>`;
  } else {
    introduction.innerHTML = `<small>Hi, My name is</small>`;
    description.innerHTML = nameFind(data);
  }
}

// Displaying first person data

function displayFirstTime(data) {
  image.innerHTML = `<img src=${data.results[0].picture.large}>`;
  introduction.innerHTML = `<small>Hi, My name is</small>`;

  description.innerHTML = nameFind(data);
}

function nameFind(data) {
  const title = data.results[0].name.title;
  const fistName = data.results[0].name.first;
  const lastName = data.results[0].name.last;
  return `<h5>${title} ${fistName} ${lastName}</h5>`;
}
