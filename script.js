// 密码配置
const passwords = {
    family: '20060630',
    love: '202511'
};

// 主页彩蛋功能
document.addEventListener('DOMContentLoaded', function() {
    // 隐藏彩蛋入口点击事件
    const secretEntry = document.getElementById('secretEntry');
    const passwordModal = document.getElementById('passwordModal');
    const closeBtn = document.querySelector('.close');
    const submitBtn = document.getElementById('submitPassword');
    const passwordInput = document.getElementById('passwordInput');
    const passwordHint = document.getElementById('passwordHint');
    const passwordOptions = document.querySelectorAll('.password-option');
    
    let selectedEggType = 'family'; // 默认选择家人彩蛋
    
    // 显示密码模态框
    if (secretEntry) {
        secretEntry.addEventListener('click', function() {
            passwordModal.style.display = 'block';
        });
    }
    
    // 关闭模态框
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            passwordModal.style.display = 'none';
        });
    }
    
    // 选择彩蛋类型
    passwordOptions.forEach(option => {
        option.addEventListener('click', function() {
            passwordOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedEggType = this.dataset.type;
            
            // 更新提示
            if (selectedEggType === 'family') {
                passwordHint.textContent = '提示：对我们家很重要的一个日期 (YYYYMMDD格式)';
            } else {
                passwordHint.textContent = '提示：我们在一起的那一天 (YYYYMMDD格式)';
            }
        });
    });
    
    // 提交密码
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const enteredPassword = passwordInput.value;
            
            if (enteredPassword === passwords[selectedEggType]) {
                // 密码正确，跳转到对应页面
                if (selectedEggType === 'family') {
                    window.location.href = 'family-secret.html';
                } else {
                    window.location.href = 'love-secret.html';
                }
            } else {
                // 密码错误
                passwordHint.textContent = '密码错误，请重试！';
                passwordHint.style.color = 'red';
                passwordInput.value = '';
                
                // 清空错误提示
                setTimeout(() => {
                    passwordHint.textContent = selectedEggType === 'family' ? 
                        '提示：对我们家很重要的一个日期 (YYYYMMDD格式)' : 
                        '提示：我们在一起的那一天 (YYYYMMDD格式)';
                    passwordHint.style.color = '#666';
                }, 2000);
            }
        });
    }
    
    // 按回车键提交密码
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === passwordModal) {
            passwordModal.style.display = 'none';
        }
    });
});

// 彩蛋页面密码验证
function setupEggPage(pageType) {
    const passwordProtection = document.getElementById('passwordProtection');
    const pageContent = document.getElementById(pageType + 'Content');
    const passwordInput = document.getElementById(pageType + 'Password');
    const submitBtn = document.getElementById('submit' + pageType.charAt(0).toUpperCase() + pageType.slice(1) + 'Password');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const enteredPassword = passwordInput.value;
            
            if (enteredPassword === passwords[pageType]) {
                // 密码正确，显示内容
                passwordProtection.style.display = 'none';
                pageContent.classList.remove('hidden');
                
                // 尝试播放背景音乐（需要用户交互）
                if (bgMusic) {
                    bgMusic.volume = 0.5;
                    const playPromise = bgMusic.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            // 自动播放成功
                        }).catch(() => {
                            // 自动播放被阻止，显示播放按钮
                            if (musicToggle) {
                                musicToggle.textContent = '▶️ 播放音乐';
                            }
                        });
                    }
                }
            } else {
                // 密码错误
                alert('密码错误，请重试！');
                passwordInput.value = '';
            }
        });
    }
    
    // 音乐控制
    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.textContent = '⏸️ 暂停音乐';
            } else {
                bgMusic.pause();
                musicToggle.textContent = '▶️ 播放音乐';
            }
        });
    }
    
    // 按回车键提交密码
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
    }
}

// 家人彩蛋页面初始化
if (document.getElementById('familyContent')) {
    document.addEventListener('DOMContentLoaded', function() {
        setupEggPage('family');
    });
}

// 女友彩蛋页面初始化
if (document.getElementById('loveContent')) {
    document.addEventListener('DOMContentLoaded', function() {
        setupEggPage('love');
    });
}
