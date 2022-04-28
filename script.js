//Alle variablen definieren
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAllBtn = document.querySelector(".footer button");
let userData = "";

inputBox.onkeyup = () =>{
    let userData = inputBox.value;                                          // die Werte von dem Input Feld holen
    if(userData.trim() != 0){      // wenn die Werte nicht leer sind        // trim removes the whitespaces from the start and end
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}

showTasks()

// wenn User auf dem Knopf drücken
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New to do");   // localen speicher holen
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);                      // transformieren von json string zu js object
    }
    listArr.push(userData);
    localStorage.setItem("New to do", JSON.stringify(listArr));     // transformieren von js object zu json string
    showTasks();
    addBtn.classList.remove("active");
}

inputBox.addEventListener("keyup", (event) => {
    // Number 13 is the "Enter" key on the keyboard
    let userData = inputBox.value;
    if (event.keyCode === 13 && userData.trim() != 0) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      addBtn.click();
    }
  });

// Funktion eine liste hinzufügen
function showTasks(){
    let getLocalStorage = localStorage.getItem("New to do");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length;            // die Länge von dem Wert in pendingNumber hinzufügen
    if(listArr.length > 0){
        clearAllBtn.classList.add("active");              // den clear knopf aktiviren
    }else{
        clearAllBtn.classList.remove("active");          // deaktiviren von clear knopf
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag;  //einen neuen list tag in unordered list tag
    inputBox.value = "";            // nachdem neue Liste hinzugefügt lasse leer
}

// Funktion löschen von listen

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New to do");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);                                   // löschen von den jeweiligen index aus der liste
    // nachdem die liste gelöscht wurde, wird die local storage aktualisiert
    localStorage.setItem("New to do", JSON.stringify(listArr));
    showTasks();
}

// löschen von allen listen
clearAllBtn.onclick = () =>{
    listArr = [];  // Array ausleeren
    // aktualisieren von local storage
    localStorage.setItem("New to do", JSON.stringify(listArr));     // transformieren von js object zu json string
    showTasks();
}