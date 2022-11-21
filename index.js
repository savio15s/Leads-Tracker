// function buttonClick(){

//     console.log("Button Clicked")
// }

let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputbtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deletebtn = document.getElementById("delete-btn");
const savetabbtn = document.getElementById("savetab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));



if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

deletebtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputbtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

savetabbtn.addEventListener("click", function () {

 
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(leads) {
    let listitems = "";
    for (let i = 0; i < leads.length; i++) {
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";

        // const li = document.createElement("li");
        // li.textContent = myLeads[i];
        // ulEl.append(li);

        // listitems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
        listitems += `<li>
                        <a target='_blank' href='${leads[i]}'> 
                        ${leads[i]} 
                        </a>
                    </li>`;
    }

    ulEl.innerHTML = listitems;
}
