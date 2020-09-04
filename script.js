const addPostBtn = document.querySelector('.add-post-btn'),
    content = document.querySelector('.content'),
    navElements = document.querySelectorAll('.nav-element'),
    sideBar = document.querySelector('.side-bar'),
    addPost = document.querySelector('.add-post ');

navElementsArray = Array.from(navElements);

addPostBtn.onclick = function() {
    content.classList.toggle('hide');
    addPost.classList.toggle('hide');
}

sideBar.addEventListener('click', (e) => {
    let target = e.target;
    
    navElementsArray.forEach(element => {
        element.classList.remove('active');
    });

    target.classList.add('active');
})

