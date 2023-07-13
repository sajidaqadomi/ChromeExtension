const inputElement = document.getElementById("input-el");
const inputBtn = document.getElementById("button-el");
const ulElement = document.getElementById("ul-el");
const tabBtn = document.getElementById("tab-btn");
const clearBtn = document.getElementById("clear-btn");
let myLead = [];

let leadFromStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadFromStorage) {
  myLead = leadFromStorage;
  renderElement(myLead);
}

inputBtn.addEventListener("click", function () {
  if (inputElement.value.trim()) {
    myLead.push(inputElement.value);
    localStorage.setItem("myLeads", JSON.stringify(myLead));
    inputElement.value = "";
    renderElement(myLead);
  }
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLead.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLead));
    render(myLead);
  });
});

clearBtn.addEventListener("click", function () {
  myLead = [];
  localStorage.setItem("myLeads", JSON.stringify(myLead));
  inputElement.value = "";
  renderElement(myLead);
});

function renderElement(leads) {
  let liElements = "";
  for (let index = 0; index < leads.length; index++) {
    liElements += `<li><a target='_blank' href='${leads[index]}'>${myLead[index]}</a><li>`;
  }

  ulElement.innerHTML = liElements;
}
