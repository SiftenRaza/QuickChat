//SIDEBAR
let menuItems = document.querySelectorAll('.menu-list');
let notification = document.querySelector('#notification');

//MESSAGES

let messages = document.querySelector('#message-list');
let messageBox = document.querySelector('.messages');

/*--search--*/
let inputSearch = document.querySelector('#input-search');
let messageProfile = document.querySelectorAll('.msgs .profile');

/*---theme---*/
let theme = document.querySelector('#theme');
let themeModal = document.querySelector('.customize-theme');
let fontSizes = document.querySelectorAll('.font');
let colorPicker = document.querySelectorAll('.color');
let root = document.querySelector(':root');



//CONSOLE
console.log("Menu Items:", menuItems);
console.log("Notification Element:", notification);
console.log("Message Box:", messageBox);
console.log("Messages Element:", messages);
console.log("Message Search Input:", inputSearch);
console.log("Message Profiles:", messageProfile);
/*===================----SIDEBAR----=====================*/
/* remove active class from all menu-item   */
let changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
};

/* notification-popup */
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');

        /* notifcation */
        if (item.id != 'notification') {
            document.querySelector('.notification-popup').style.display = 'none';
        } else {
            document.querySelector('.notification-popup').style.display = 'block';
            document.querySelector('#notification .notification-count').style.display = 'none';
        }

        /*  theme  */
     /*   if (item.id != 'theme') {
            document.querySelector('.customize-theme').style.display = 'none';
        } else {
            document.querySelector('.customize-theme').style.display = 'flex';

        }*/
    });
});

/*=======================MESSAGES==================*/
let searchMsgs = () => {
    let value = inputSearch.value.toLowerCase();
    messageProfile.forEach(chat => {
        let name = chat.querySelector('h4').textContent.toLowerCase();
        if (name.indexOf(value) != -1) {
            chat.style.display = 'flex';
        } else {
            chat.style.display = 'none';
        }
    });
};


/* highlight messages card when messages menu item is clicked */
messages.addEventListener('click', () => {
    messageBox.style.boxShadow = '0 0 1rem var(--primary-color)';
    setTimeout(() => {
            messageBox.style.boxShadow = 'none';
        }, 2000
    );
    messages.querySelector('.notification-count').style.display = "none";
});


/* message-search  */
inputSearch.addEventListener('keyup', searchMsgs);






/*==================  Customize-THEME   =================*/

//open
let openModal = () => {
    themeModal.style.display = 'flex';
};
//close
let closeModal = () => {
    themeModal.style.display = 'none';
};

/* open customize-theme */
theme.addEventListener('click', function () {
    openModal();
});

/* close customize-theme */
window.addEventListener('click', function (event) {
    if (!themeModal.contains(event.target) && event.target !== theme) {
        closeModal();

    }

});

//==========================FONT-SIZE========================
// remove active class from font size selector
let removeFontActive = () =>{
    fontSizes.forEach(font => {
        font.classList.remove('active-f');
    });
}
    fontSizes.forEach(font => {
        font.addEventListener('click', () => {
            removeFontActive();
            let fontSize;
            font.classList.toggle('active-f');
            if (font.classList.contains('font1')) {
                fontSize = '10px';
            } else if (font.classList.contains('font2')) {
                fontSize = '13px';
            } else if (font.classList.contains('font3')) {
                fontSize = '16px';
            } else if (font.classList.contains('font4')) {
                fontSize = '19px';
            } else if (font.classList.contains('font5')) {
                fontSize = '22px';
            }

            document.querySelector('html').style.fontSize = fontSize;
        });
    });

//===================  CHANGE PRIMARY-COLOR  =================
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.color').forEach(option => {
        option.addEventListener('click', (event) => {
            const selectedColor = event.target.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', selectedColor);
        });
    });
});

//==================== CHANGE THE BODY-COLOR ========================
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.box-btns').forEach(option => {
        option.addEventListener('click', (event) => {
            const selectedColor = event.target.getAttribute('data-color');
            document.documentElement.style.setProperty('--body-color', selectedColor);
        });
    });
});

//===================== REQUEST ==================================
/*----request----*/
let requests = document.querySelectorAll('.request');

let acptAlert = document.querySelector('.alertBox1');
let declAlert = document.querySelector('.alertBox2');

requests.forEach(request => {
    let acceptBtn= request.querySelector('.accept');
    let declineBtn= request.querySelector('.decline');


   acceptBtn.addEventListener('click', () => {
       declAlert.style.display = "none";

        request.style.display = "none";
        acptAlert.style.display = "flex";
        setTimeout(() => {
            acptAlert.style.display = "none";
        },2000);
    });


   declineBtn.addEventListener('click', () => {
       acptAlert.style.display = "none";

        request.style.display = "none";
        declAlert.style.display = "flex";
        setTimeout(() => {
            declAlert.style.display = "none";
        },2000);
    });


});

