"use strict";

const DataBase = [];

const addPostBtn = document.querySelector('.add-post-btn'),
    content = document.querySelector('.content'),
    navElements = document.querySelectorAll('.nav-element'),
    sideBar = document.querySelector('.side-bar'),
    addPost = document.querySelector('.add-post '),
    modalSubmit = document.querySelector('.modal__submit'),
    publishBtn = document.querySelector('.publish');

const navElementsArray = Array.from(navElements);
const modalSubmitElems = [...modalSubmit.elements].filter((elem) => elem.tagName != 'BUTTON');

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

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    
    const itemObject = {};

    for (const elem of modalSubmitElems) {
        itemObject[elem.name] = elem.value;
    }
    itemObject["id"] = DataBase.length + 100;
    DataBase.push(itemObject);

    modalSubmit.reset();
});