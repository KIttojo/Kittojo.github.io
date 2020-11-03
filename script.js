"use strict";

let currentdate = new Date();
let dateNow = currentdate.getDate() + '.'
            + (currentdate.getMonth() + 1) + '.'
            + currentdate.getFullYear();

const DataBase = [];

const addPostBtn = document.querySelector('.add-post-btn'),
    content = document.querySelector('.content'),
    navElements = document.querySelectorAll('.nav-element'),
    sideBar = document.querySelector('.side-bar'),
    addPost = document.querySelector('.add-post '),
    newPostText = document.querySelector('.new-post-text'),
    modalSubmit = document.querySelector('.modal__submit'),
    publishBtn = document.querySelector('.publish');

const navElementsArray = Array.from(navElements);
const modalSubmitElems = [...modalSubmit.elements].filter((elem) => elem.tagName != 'BUTTON');

const renderPosts = () => {
    let element = DataBase[DataBase.length - 1];
    
    content.insertAdjacentHTML('afterbegin', `
        <div class="post" id="${element.id}" data-author="${document.cookie}" onmouseover="updateViews(id);">
        <div class="post-line"></div>
        <div class="post-content">
            <div class="article-name">${element.PostTitle}</div>
            <div class="article-content">${element.PostText}</div>
    
            <div class="post-info">
                <span class="article-info">v: 5</span>
                <span class="article-info">d: ${element.date}</span>
            </div>
        </div>
        `);
};

addPostBtn.onclick = function() {
    content.classList.toggle('hide');
    addPost.classList.toggle('hide');
};

sideBar.addEventListener('click', (e) => {
    let target = e.target;
    
    navElementsArray.forEach(element => {
        element.classList.remove('active');
    });

    target.classList.add('active');
});

modalSubmit.addEventListener('input', () => {
    const validForm = modalSubmitElems.every(elem => elem.value);
    publishBtn.disabled = !validForm;

    validForm ? publishBtn.classList.remove('disabled') : publishBtn.classList.add('disabled');
});

newPostText.addEventListener('click', () => {
    if (newPostText.scrollHeight > newPostText.clientHeight) {
        let height = window.getComputedStyle(newPostText).height;
        let newHeight = String(Number(height.replace('px', '')) + 25) + 'px';
        
        newPostText.style.height = newHeight;
        console.log(newHeight);
    }
}); //нужно написать функцию отдельно и повесить её на элемент + закрытие при отправке формы + написать else при удалении текста

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    
    const itemObject = {};

    for (const elem of modalSubmitElems) {
        itemObject[elem.name] = elem.value;
    }
    itemObject["id"] = DataBase.length + 100;
    itemObject["date"] = dateNow;
    DataBase.push(itemObject);
    // console.log(DataBase);

    modalSubmit.reset();

    renderPosts();
});

// const updateViews = (id) =>{
//     console.log(id);
// };

function onloadPopular() {
    console.log(DataBase);
    DataBase.forEach(element => {
        console.log(element);
        // content.insertAdjacentHTML('afterbegin', `
        // <div class="post" id="${element.id}" onmouseover="updateViews(id);">
        // <div class="post-line"></div>
        // <div class="post-content">
        //     <div class="article-name">${element.PostTitle}</div>
        //     <div class="article-content">${element.PostText}</div>
    
        //     <div class="post-info">
        //         <span class="article-info">v: 5</span>
        //         <span class="article-info">d: ${element.date}</span>
        //     </div>
        // </div>
        // `);
    });
};

function setUserId() {
    const UsrId = new Date().valueOf();
    if (!document.cookie) {
        document.cookie = "user=" + UsrId;
    }
};
