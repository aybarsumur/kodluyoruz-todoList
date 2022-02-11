//TANIMLAMALAR
const todoList = document.querySelector("#list")
const TODO_ITEM = document.querySelector("#task")
const ADD_BTN = document.querySelector("#liveToastBtn")
const toastDOMError = document.querySelector("#liveToastError")
const toastDOMSuccess = document.querySelector("#liveToastSuccess")
const toastDOMDelete = document.querySelector("#liveToastDelete")
const closeButton = document.querySelector("#closeButton")

//Local Storage dan veriyi getir diziye ata yada dizi oluştur. 
let listArr = localStorage.getItem('New Todo') ? JSON.parse(localStorage.getItem('New Todo')) : [];
showTask();

function newElement() {
    if (inputValidation(TODO_ITEM)) {
        addItem(TODO_ITEM.value)
        addToast(toastDOMSuccess)
        TODO_ITEM.value = "" // gönderden sonra sıfırladım
    } else {
        addToast(toastDOMError)
        TODO_ITEM.value = ""
    }
}

//Input Denetleme : Boş ve space kabul etmez, kelimeler arası boşluk kullanılır.
function inputValidation(input) {
    if (input.value.trim() != 0) {
        return true
    } else {
        return false
    }
}

//Toast Göster
const addToast = (type) => new bootstrap.Toast(type).show();


// function getLocalItems() {
//     let getLocalStorage = localStorage.getItem("New Todo");
//     if (getLocalStorage == null) {
//         listArr = [];
//     } else {
//         listArr = JSON.parse(getLocalStorage); 
//     }
// }


//Eleman Ekleme
const addItem = () => {
    //getLocalItems();
    listArr.push(TODO_ITEM.value); //liste dizisine Not Ekleme
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //Local Storage Not Ekleme
    showTask();
}

function showTask() {
    //getLocalItems();
    let newLiTag = ""; // yeni li oluşturdum
    listArr.forEach((element, index) => { //dizideki her bir elemanın nasıl bir li tagi yapısı oluşturmasını ve tekrar etmesini söyledim
        newLiTag +=
            `
        <li>${element}
        <span id="closeButton" class="closeBtn" onclick="removeItem(${index})"><i class="fas fa-trash"></i></span></li>
        `;
    });
    todoList.innerHTML = newLiTag; // oluşturduğum li yi listeye ekledim
}

function removeItem(index) { 
    let getLocalStorage = localStorage.getItem("New Todo"); // local storagedan veri çağırma
    listArr = JSON.parse(getLocalStorage); // diziyi JSON yapısına çevirdim.
    listArr.splice(index, 1); // dizide belirttiğim indexdeki öğeden başla 1 öğe ayır 
    localStorage.setItem("New Todo", JSON.stringify(listArr));  //silme sonrası local storage güncelleme
    addToast(toastDOMDelete)
    showTask();
}