// 导航栏响应式功能
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 关闭导航菜单当点击链接
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // 彩蛋功能
    initializeEasterEgg();
    
    // 如果是彩蛋页面，初始化彩蛋页面特效
    if (document.body.classList.contains('egg-page')) {
        initializeEggPage();
    }
    
    // 如果是摄影页面，初始化筛选功能
    if (document.querySelector('.filter-buttons')) {
        initializePhotoFilter();
    }
});

// 彩蛋功能初始化
function initializeEasterEgg() {
    const eggLock = document.getElementById('eggLock');
    const passwordModal = document.getElementById('passwordModal');
    const closeModal = document.querySelector('.close');
    const eggOptions = document.querySelectorAll('.egg-option');
    const passwordField = document.getElementById('passwordField');
    const submitPassword = document.getElementById('submitPassword');
    const passwordMessage = document.getElementById('passwordMessage');
    
    if (!eggLock) return;
    
    // 密码配置
    const passwords = {
        'family': '20060630',
        'girlfriend': '202511'
    };
    
    let selectedEggType = 'family';
    
    // 打开模态框
    eggLock.addEventListener('click', function() {
        passwordModal.style.display = 'block';
        passwordField.value = '';
        passwordMessage.textContent = '';
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', function() {
        passwordModal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === passwordModal) {
            passwordModal.style.display = 'none';
        }
    });
    
    // 选择彩蛋类型
    eggOptions.forEach(option => {
        option.addEventListener('click', function() {
            eggOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedEggType = this.getAttribute('data-type');
            passwordField.value = '';
            passwordMessage.textContent = '';
        });
    });
    
    // 提交密码
    submitPassword.addEventListener('click', function() {
        const enteredPassword = passwordField.value;
        
        if (enteredPassword === passwords[selectedEggType]) {
            passwordMessage.textContent = '密码正确！跳转中...';
            passwordMessage.style.color = 'green';
            
            // 根据选择的彩蛋类型跳转
            setTimeout(function() {
                if (selectedEggType === 'family') {
                    window.location.href = 'family.html';
                } else {
                    window.location.href = 'girlfriend.html';
                }
            }, 1000);
        } else {
            passwordMessage.textContent = '密码错误，请重试！';
            passwordMessage.style.color = 'red';
            passwordField.value = '';
        }
    });
    
    // 按回车键提交密码
    passwordField.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            submitPassword.click();
        }
    });
}

// 摄影作品筛选功能
function initializePhotoFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 筛选作品
            photoItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 彩蛋页面特效
function initializeEggPage() {
    // 家庭彩蛋页面特效
    if (document.body.classList.contains('family-egg')) {
        // 添加温馨背景元素
        createFamilyBackground();
        
        // 自动播放背景音乐
        const audio = document.getElementById('bgMusic');
        if (audio) {
            audio.volume = 0.5;
            // 注意：现代浏览器通常不允许自动播放音频，需要用户交互
            document.body.addEventListener('click', function() {
                audio.play().catch(e => console.log('音频播放需要用户交互'));
            }, { once: true });
        }
    }
    
    // 女友彩蛋页面特效
    if (document.body.classList.contains('girlfriend-egg')) {
        // 创建爱心特效
        createHearts();
        
        // 自动播放背景音乐
        const audio = document.getElementById('bgMusic');
        if (audio) {
            audio.volume = 0.5;
            document.body.addEventListener('click', function() {
                audio.play().catch(e => console.log('音频播放需要用户交互'));
            }, { once: true });
        }
    }
}

// 创建家庭彩蛋背景特效
function createFamilyBackground() {
    const container = document.querySelector('.egg-page');
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 5 + 2 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = '#FFD700';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
        
        container.appendChild(star);
    }
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
}

// 创建爱心特效
function createHearts() {
    const container = document.querySelector('.egg-page');
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // 随机属性
        const size = Math.random() * 20 + 10;
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.backgroundColor = color;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = delay + 's';
        
        container.appendChild(heart);
    }
    
    // 添加更多动画细节
    const style = document.createElement('style');
    style.textContent = `
        .heart {
            animation: fall linear infinite;
        }
        
        @keyframes fall {
            to {
                transform: translateY(-100vh) rotate(45deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// 图片上传预览功能（用于女友彩蛋页）
function setupImageUpload() {
    const uploadInput = document.getElementById('photoUpload');
    const videoUpload = document.getElementById('videoUpload');
    const photoGrid = document.querySelector('.photo-grid');
    const videoContainer = document.getElementById('videoContainer');
    
    if (uploadInput && photoGrid) {
        uploadInput.addEventListener('change', function(e) {
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const gridItem = document.createElement('div');
                        gridItem.className = 'photo-grid-item';
                        
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = '上传的照片';
                        
                        gridItem.appendChild(img);
                        photoGrid.appendChild(gridItem);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }
    
    if (videoUpload && videoContainer) {
        videoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const video = document.createElement('video');
                    video.src = e.target.result;
                    video.controls = true;
                    video.style.width = '100%';
                    video.style.maxWidth = '500px';
                    video.style.borderRadius = '10px';
                    
                    videoContainer.innerHTML = '';
                    videoContainer.appendChild(video);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}
