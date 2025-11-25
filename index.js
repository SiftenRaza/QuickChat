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

        /* notification */
        const notificationPopup = document.querySelector('.notification-popup');
        
        if (item.id != 'notification') {
            if (notificationPopup) {
                notificationPopup.style.display = 'none';
            }
        } else {
            if (notificationPopup) {
                // Get the position of the notification menu item
                const rect = item.getBoundingClientRect();
                
                // Position the popup to the right of the menu item, aligned at the top
                notificationPopup.style.position = 'fixed';
                notificationPopup.style.top = rect.top + 'px'; // Align with top of menu item
                notificationPopup.style.left = (rect.right + 16) + 'px'; // 16px spacing to the right
                notificationPopup.style.display = 'block';
                notificationPopup.style.visibility = 'visible';
                notificationPopup.style.opacity = '1';
                notificationPopup.style.zIndex = '1000';
                notificationPopup.style.transform = 'none'; // Remove any transforms
                notificationPopup.style.margin = '0'; // Remove any margins
                
                // Adjust if popup goes off screen to the right
                setTimeout(() => {
                    const popupRect = notificationPopup.getBoundingClientRect();
                    if (popupRect.right > window.innerWidth - 20) {
                        // If popup extends beyond screen, position it to the left of menu item
                        notificationPopup.style.left = (rect.left - popupRect.width - 16) + 'px';
                    }
                    
                    // Adjust if popup goes below screen
                    if (popupRect.bottom > window.innerHeight - 20) {
                        notificationPopup.style.top = (window.innerHeight - popupRect.height - 20) + 'px';
                    }
                    
                    // Ensure popup doesn't go above screen
                    if (popupRect.top < 20) {
                        notificationPopup.style.top = '20px';
                    }
                }, 0);
            }
            const notificationCount = document.querySelector('#notification .notification-count');
            if (notificationCount) {
                notificationCount.style.display = 'none';
            }
        }

        /*  theme  */
     /*   if (item.id != 'theme') {
            document.querySelector('.customize-theme').style.display = 'none';
        } else {
            document.querySelector('.customize-theme').style.display = 'flex';

        }*/
    });
});

// Close notification popup when clicking outside
document.addEventListener('click', (e) => {
    const notificationPopup = document.querySelector('.notification-popup');
    const notificationItem = document.querySelector('#notification');
    
    if (notificationPopup && notificationPopup.style.display === 'block') {
        // Close if clicking outside the popup and notification menu item
        if (!notificationPopup.contains(e.target) && 
            !notificationItem.contains(e.target)) {
            notificationPopup.style.display = 'none';
        }
    }
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
let removeFontActive = () => {
    fontSizes.forEach(font => {
        font.classList.remove('active-f');
    });
}

fontSizes.forEach(font => {
    font.addEventListener('click', () => {
        removeFontActive();
        let fontSize;
        font.classList.toggle('active-f');
        
        // Get screen width to adjust font sizes for mobile
        const isMobile = window.innerWidth <= 768;
        
        if (font.classList.contains('font1')) {
            fontSize = isMobile ? '12px' : '10px';
        } else if (font.classList.contains('font2')) {
            fontSize = isMobile ? '14px' : '13px';
        } else if (font.classList.contains('font3')) {
            fontSize = isMobile ? '16px' : '16px';
        } else if (font.classList.contains('font4')) {
            fontSize = isMobile ? '18px' : '19px';
        } else if (font.classList.contains('font5')) {
            fontSize = isMobile ? '20px' : '22px';
        }

        document.querySelector('html').style.fontSize = fontSize;
    });
});

// Add responsive font size on window resize
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    const activeFont = document.querySelector('.font.active-f');
    
    if (activeFont) {
        let fontSize;
        if (activeFont.classList.contains('font1')) {
            fontSize = isMobile ? '12px' : '10px';
        } else if (activeFont.classList.contains('font2')) {
            fontSize = isMobile ? '14px' : '13px';
        } else if (activeFont.classList.contains('font3')) {
            fontSize = isMobile ? '16px' : '16px';
        } else if (activeFont.classList.contains('font4')) {
            fontSize = isMobile ? '18px' : '19px';
        } else if (activeFont.classList.contains('font5')) {
            fontSize = isMobile ? '20px' : '22px';
        }
        document.querySelector('html').style.fontSize = fontSize;
    }
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
    let acceptBtn = request.querySelector('.accept');
    let declineBtn = request.querySelector('.decline');

    acceptBtn.addEventListener('click', () => {
        declAlert.style.display = "none";
        
        // Add fascinating animation
        request.style.transition = 'all 0.5s ease';
        request.style.transform = 'scale(1.1) rotate(5deg)';
        request.style.opacity = '0.8';
        
        // Create celebration effect
        createCelebrationEffect(acceptBtn);
        
        setTimeout(() => {
            request.style.transform = 'scale(0) rotate(360deg)';
            request.style.opacity = '0';
        }, 300);
        
        setTimeout(() => {
            request.style.display = "none";
        }, 800);
        
        // Show success alert with animation
        acptAlert.style.display = "flex";
        acptAlert.style.animation = "bounceIn 0.5s ease";
        
        setTimeout(() => {
            acptAlert.style.animation = "bounceOut 0.5s ease";
            setTimeout(() => {
                acptAlert.style.display = "none";
            }, 500);
        }, 2000);
    });

    declineBtn.addEventListener('click', () => {
        acptAlert.style.display = "none";
        
        // Add fascinating animation
        request.style.transition = 'all 0.5s ease';
        request.style.transform = 'scale(0.9) rotate(-5deg)';
        request.style.opacity = '0.6';
        
        // Create shake effect
        request.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
            request.style.transform = 'translateX(-100%) rotate(-45deg)';
            request.style.opacity = '0';
        }, 300);
        
        setTimeout(() => {
            request.style.display = "none";
        }, 800);
        
        // Show decline alert with animation
        declAlert.style.display = "flex";
        declAlert.style.animation = "slideInDown 0.5s ease";
        
        setTimeout(() => {
            declAlert.style.animation = "slideOutDown 0.5s ease";
            setTimeout(() => {
                declAlert.style.display = "none";
            }, 500);
        }, 2000);
    });
});

// Celebration effect function
function createCelebrationEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create confetti particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        
        const colors = ['#5d5df8', '#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9ff3'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.transform = `translate(${vx}px, ${vy}px) scale(0)`;
        particle.style.transition = 'all 0.8s ease-out';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.transform = `translate(${vx}px, ${vy}px) scale(1)`;
            particle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
    
    // Create checkmark animation
    const checkmark = document.createElement('div');
    checkmark.innerHTML = '✓';
    checkmark.style.position = 'fixed';
    checkmark.style.left = centerX + 'px';
    checkmark.style.top = centerY + 'px';
    checkmark.style.fontSize = '3rem';
    checkmark.style.color = '#4caf50';
    checkmark.style.fontWeight = 'bold';
    checkmark.style.pointerEvents = 'none';
    checkmark.style.zIndex = '10001';
    checkmark.style.transform = 'translate(-50%, -50%) scale(0)';
    checkmark.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(checkmark);
    
    setTimeout(() => {
        checkmark.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }, 10);
    
    setTimeout(() => {
        checkmark.style.transform = 'translate(-50%, -50%) scale(1)';
        checkmark.style.opacity = '0';
    }, 300);
    
    setTimeout(() => {
        checkmark.remove();
    }, 600);
}


//=====================================
// CHAT FUNCTIONALITY (Frontend Only)
//=====================================

// Chat elements
const chatContainer = document.getElementById('chatContainer');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const closeChatBtn = document.getElementById('closeChat');
const chatUserName = document.getElementById('chatUserName');
const chatUserAvatar = document.getElementById('chatUserAvatar');
const messageProfiles = document.querySelectorAll('.msgs .profile');

// Current chat user
let currentChatUser = null;

// Initialize chat from localStorage or create empty
function getChatMessages(userId) {
    const chats = JSON.parse(localStorage.getItem('quickChatMessages') || '{}');
    return chats[userId] || [];
}

function saveChatMessage(userId, message) {
    const chats = JSON.parse(localStorage.getItem('quickChatMessages') || '{}');
    if (!chats[userId]) {
        chats[userId] = [];
    }
    chats[userId].push(message);
    localStorage.setItem('quickChatMessages', JSON.stringify(chats));
}

// Open chat with a user
function openChat(userElement) {
    const userName = userElement.querySelector('h4').textContent;
    const userAvatar = userElement.querySelector('img').src;
    const userId = userName.toLowerCase().replace(/\s+/g, '_');
    
    currentChatUser = userId;
    chatUserName.textContent = userName;
    chatUserAvatar.src = userAvatar;
    
    // Load messages
    loadChatMessages(userId);
    
    // Show chat container
    chatContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus input
    setTimeout(() => {
        chatInput.focus();
    }, 100);
}

// Load and display messages
function loadChatMessages(userId) {
    const messages = getChatMessages(userId);
    chatMessages.innerHTML = '';
    
    if (messages.length === 0) {
        // Add welcome message
        const welcomeMsg = {
            text: `Hi! This is the start of your conversation with ${chatUserName.textContent}.`,
            sender: 'system',
            time: new Date().toISOString()
        };
        displayMessage(welcomeMsg);
    } else {
        messages.forEach(msg => {
            displayMessage(msg);
        });
    }
    
    // Scroll to bottom
    scrollToBottom();
}

// Display a message
function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.sender === 'me' ? 'sent' : 'received'}`;
    
    const isSystem = message.sender === 'system';
    
    if (!isSystem) {
        const avatar = document.createElement('img');
        avatar.className = 'message-avatar';
        avatar.src = message.sender === 'me' 
            ? './images/profile-9.webp' 
            : chatUserAvatar.src;
        avatar.alt = message.sender === 'me' ? 'You' : chatUserName.textContent;
        messageDiv.appendChild(avatar);
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message.text;
    messageDiv.appendChild(contentDiv);
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    const messageTime = new Date(message.time);
    timeDiv.textContent = formatTime(messageTime);
    contentDiv.appendChild(timeDiv);
    
    chatMessages.appendChild(messageDiv);
}

// Format time
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
}

// Send message
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || !currentChatUser) return;
    
    const message = {
        text: text,
        sender: 'me',
        time: new Date().toISOString()
    };
    
    // Save to localStorage
    saveChatMessage(currentChatUser, message);
    
    // Display message
    displayMessage(message);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    scrollToBottom();
    
    // Simulate reply after 1-2 seconds
    setTimeout(() => {
        simulateReply();
    }, 1000 + Math.random() * 1000);
}

// Simulate automatic replies
function simulateReply() {
    if (!currentChatUser) return;
    
    const replies = [
        "That's interesting!",
        "I see what you mean.",
        "Thanks for sharing!",
        "Got it!",
        "Sounds good!",
        "I agree with you.",
        "Let me think about that...",
        "That makes sense!",
        "I understand.",
        "Nice to hear from you!"
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    const replyMessage = {
        text: randomReply,
        sender: 'other',
        time: new Date().toISOString()
    };
    
    // Save to localStorage
    saveChatMessage(currentChatUser, replyMessage);
    
    // Display message
    displayMessage(replyMessage);
    
    // Scroll to bottom
    scrollToBottom();
    
    // Update last message in message list
    updateLastMessage(currentChatUser, randomReply);
}

// Update last message in sidebar
function updateLastMessage(userId, message) {
    messageProfiles.forEach(profile => {
        const name = profile.querySelector('h4').textContent;
        const profileUserId = name.toLowerCase().replace(/\s+/g, '_');
        
        if (profileUserId === userId) {
            const small = profile.querySelector('small');
            if (small) {
                small.textContent = message.length > 30 ? message.substring(0, 30) + '...' : message;
            }
        }
    });
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Close chat
function closeChat() {
    chatContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentChatUser = null;
    chatInput.value = '';
}

// Event listeners
messageProfiles.forEach(profile => {
    profile.addEventListener('click', () => {
        openChat(profile);
    });
});

chatSendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

closeChatBtn.addEventListener('click', closeChat);

// Close chat on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatContainer.classList.contains('active')) {
        closeChat();
    }
});

// Initialize - load last messages for all users
function initializeChats() {
    messageProfiles.forEach(profile => {
        const name = profile.querySelector('h4').textContent;
        const userId = name.toLowerCase().replace(/\s+/g, '_');
        const messages = getChatMessages(userId);
        
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            const small = profile.querySelector('small');
            if (small && lastMessage.text) {
                const displayText = lastMessage.text.length > 30 
                    ? lastMessage.text.substring(0, 30) + '...' 
                    : lastMessage.text;
                small.textContent = displayText;
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeChats();
});


//=====================================
// BEAUTIFUL ENHANCEMENTS
//=====================================

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const icon = darkModeToggle.querySelector('i');
    if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
    
    showToast('Dark mode ' + (isDark ? 'enabled' : 'disabled'), 'success');
});

// Post Creation Modal
const createPostBtn = document.querySelector('.primary-btn, .create.btn');
const createPostModal = document.getElementById('createPostModal');
const closeCreatePost = document.getElementById('closeCreatePost');
const postImageInput = document.getElementById('postImageInput');
const postPreview = document.getElementById('postPreview');
const submitPost = document.getElementById('submitPost');
const postText = document.getElementById('postText');

createPostBtn?.addEventListener('click', () => {
    createPostModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCreatePost.addEventListener('click', () => {
    createPostModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    postText.value = '';
    postPreview.innerHTML = '';
    postPreview.style.display = 'none';
});

postImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            postPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            postPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

submitPost.addEventListener('click', () => {
    const text = postText.value.trim();
    if (!text && !postPreview.querySelector('img')) {
        showToast('Please add some content to your post', 'error');
        return;
    }
    
    showToast('Post created successfully!', 'success');
    createPostModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    postText.value = '';
    postPreview.innerHTML = '';
    postPreview.style.display = 'none';
    
    // You can add logic here to actually create the post
});

// Story Viewer
const stories = document.querySelectorAll('.story');
const storyViewer = document.getElementById('storyViewer');
const closeStory = document.getElementById('closeStory');
const storyProgress = document.getElementById('storyProgress');

stories.forEach(story => {
    story.addEventListener('click', () => {
        const storyImg = story.style.backgroundImage || 
            `url(${story.querySelector('img')?.src || './images/story-1.jpg'})`;
        const userName = story.querySelector('p')?.textContent || 'Your Story';
        
        document.getElementById('storyImage').style.backgroundImage = storyImg;
        document.getElementById('storyImage').style.backgroundSize = 'cover';
        document.getElementById('storyImage').style.backgroundPosition = 'center';
        document.getElementById('storyImage').src = '';
        document.getElementById('storyUserName').textContent = userName;
        document.getElementById('storyUserImg').src = story.querySelector('.profile-photo img')?.src || './images/profile-9.webp';
        document.getElementById('storyTime').textContent = 'Just now';
        
        storyViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset and start progress
        storyProgress.style.animation = 'none';
        setTimeout(() => {
            storyProgress.style.animation = 'storyProgress 5s linear';
        }, 10);
        
        // Auto close after 5 seconds
        setTimeout(() => {
            closeStoryViewer();
        }, 5000);
    });
});

closeStory.addEventListener('click', closeStoryViewer);

function closeStoryViewer() {
    storyViewer.classList.remove('active');
    document.body.style.overflow = 'auto';
    storyProgress.style.animation = 'none';
}

// Image Lightbox
const postImages = document.querySelectorAll('.post-image img');
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

postImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        imageLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeLightbox.addEventListener('click', () => {
    imageLightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

imageLightbox.addEventListener('click', (e) => {
    if (e.target === imageLightbox) {
        imageLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Like Animation
const likeButtons = document.querySelectorAll('.social-link .fa-heart');

likeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('fa-regular');
        this.classList.toggle('fa-solid');
        this.classList.toggle('liked');
        
        // Create floating heart
        const heart = document.createElement('div');
        heart.className = 'like-animation';
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.zIndex = '10000';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 600);
        
        showToast(this.classList.contains('fa-solid') ? 'Liked!' : 'Unliked', 'info');
    });
});

// Emoji Picker
const emojiPicker = document.getElementById('emojiPicker');
const emojiGrid = document.getElementById('emojiGrid');
const emojiCategories = document.querySelectorAll('.emoji-category');
let emojiBtn = null;

// Emoji data
const emojiData = {
    smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜'],
    gestures: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎'],
    hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝'],
    objects: ['📱', '💻', '⌚', '🖥️', '🖨️', '⌨️', '🖱️', '🖲️', '🕹️', '🗜️', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥']
};

function renderEmojis(category) {
    emojiGrid.innerHTML = '';
    emojiData[category].forEach(emoji => {
        const emojiItem = document.createElement('div');
        emojiItem.className = 'emoji-item';
        emojiItem.textContent = emoji;
        emojiItem.addEventListener('click', () => {
            if (chatInput) {
                chatInput.value += emoji;
                chatInput.focus();
            }
            emojiPicker.classList.remove('active');
        });
        emojiGrid.appendChild(emojiItem);
    });
}

emojiCategories.forEach(category => {
    category.addEventListener('click', () => {
        emojiCategories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        renderEmojis(category.dataset.category);
    });
});

// Initialize with smileys
if (emojiCategories.length > 0) {
    renderEmojis('smileys');
}

// Add emoji button to chat input
if (chatInput) {
    const emojiBtnContainer = document.createElement('button');
    emojiBtnContainer.className = 'chat-emoji-btn';
    emojiBtnContainer.innerHTML = '<i class="fa-solid fa-face-smile"></i>';
    emojiBtnContainer.style.cssText = 'background: none; border: none; color: #666; font-size: 1.25rem; cursor: pointer; padding: 0.5rem;';
    
    emojiBtnContainer.addEventListener('click', () => {
        emojiPicker.classList.toggle('active');
    });
    
    chatInputContainer.insertBefore(emojiBtnContainer, chatSendBtn);
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        info: 'fa-circle-info'
    };
    
    toast.innerHTML = `
        <i class="fa-solid ${icons[type]} toast-icon"></i>
        <span>${message}</span>
    `;
    
    const container = document.getElementById('toastContainer');
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Typing Indicator
let typingTimeout;
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message received';
    typingDiv.innerHTML = `
        <img src="${chatUserAvatar.src}" alt="" class="message-avatar">
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    
    return typingDiv;
}

// Update sendMessage to show typing indicator
const originalSendMessage = sendMessage;
sendMessage = function() {
    const text = chatInput.value.trim();
    if (!text || !currentChatUser) return;
    
    const message = {
        text: text,
        sender: 'me',
        time: new Date().toISOString()
    };
    
    saveChatMessage(currentChatUser, message);
    displayMessage(message);
    chatInput.value = '';
    scrollToBottom();
    
    // Show typing indicator
    const typingDiv = showTypingIndicator();
    
    // Simulate reply with typing delay
    setTimeout(() => {
        typingDiv.remove();
        simulateReply();
    }, 1500 + Math.random() * 1000);
};

// Loading Skeleton
function showSkeletonLoader() {
    const skeleton = document.getElementById('skeletonLoader');
    skeleton.classList.add('active');
    
    setTimeout(() => {
        skeleton.classList.remove('active');
    }, 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show welcome toast
    setTimeout(() => {
        showToast('Welcome to QuickChat! 🎉', 'success');
    }, 1000);
    
    // Add smooth scroll to posts
    const posts = document.querySelectorAll('.my-post');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    posts.forEach(post => {
        observer.observe(post);
    });
});

