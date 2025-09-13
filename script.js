        // Candle blowing functionality
        const flame = document.getElementById('flame');
        const smoke = document.getElementById('smoke');
        const candle = document.getElementById('candle');
        const wishMessage = document.getElementById('wishMessage');
        let isCandleBlown = false;
        
        // Create audio element for birthday music
        const birthdayAudio = new Audio('audio/wish.mp3');
       
        
        function blowCandle() {
            if (isCandleBlown) return;
            
            isCandleBlown = true;
            
            // Add blown class to flame
            flame.classList.add('blown');
            
            // Create smoke effect
            smoke.style.animation = 'smokeAnimation 2s forwards';
            
            // Show wish message
            setTimeout(() => {
                wishMessage.classList.add('show');
            }, 1000);
            
            // Play blow sound
            const blowSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-small-gas-blow-torch-1081.mp3');
            blowSound.volume = 0.3;
            blowSound.play();
            
            // Play birthday music after blowing candle
            setTimeout(() => {
                birthdayAudio.play().catch(e => {
                    console.log("Audio play prevented: ", e);
                });
            }, 1500);
        }
        
        // Add event listeners for candle
        flame.addEventListener('click', blowCandle);
        candle.addEventListener('click', blowCandle);
        
        // Add touch event for mobile
        flame.addEventListener('touchstart', function(e) {
            e.preventDefault();
            blowCandle();
        });
        
        candle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            blowCandle();
        });
        
        // Show specific page and hide others
        function showPage(pageNumber) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the selected page
            document.getElementById('page' + pageNumber).classList.add('active');
            
            // Create animations for the new page
            createAnimations();
            
            // Reset carousel if we're on the gallery page
            if (pageNumber === 3) {
                resetCarousel();
            }
            
            // Reset candle if we're on the first page
            if (pageNumber === 1) {
                resetCandle();
            }
        }
        
        // Reset candle to initial state
        function resetCandle() {
            isCandleBlown = false;
            flame.classList.remove('blown');
            smoke.style.animation = 'none';
            wishMessage.classList.remove('show');
            
            // Reflow to reset animation
            setTimeout(() => {
                smoke.style.animation = '';
            }, 10);
        }
        
        // Carousel functionality
        let currentSlide = 0;
        const carousel = document.getElementById('carousel');
        const carouselDots = document.getElementById('carousel-dots');
        const slides = document.querySelectorAll('.carousel-item');
        
        // Create dots for carousel
        function createDots() {
            carouselDots.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentSlide) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentSlide = i;
                    updateCarousel();
                });
                carouselDots.appendChild(dot);
            });
        }
        
        // Move carousel
        function moveCarousel(direction) {
            currentSlide += direction;
            
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            } else if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            
            updateCarousel();
        }
        
        // Update carousel position
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Reset carousel to first slide
        function resetCarousel() {
            currentSlide = 0;
            updateCarousel();
            createDots();
        }
        
        // Create background animations
        function createAnimations() {
            // Remove existing animations
            document.querySelectorAll('.balloon, .confetti').forEach(el => el.remove());
            
            // Create balloons
            const colors = ['#ff9a9e', '#fad0c4', '#a1c4fd', '#c2e9fb', '#ffde7a', '#ff7b24'];
            
            for (let i = 0; i < 10; i++) {
                const balloon = document.createElement('div');
                balloon.classList.add('balloon');
                
                // Random properties
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 15 + 30;
                const left = Math.random() * 100;
                const delay = Math.random() * 15;
                
                // Apply styles
                balloon.style.left = `${left}vw`;
                balloon.style.width = `${size}px`;
                balloon.style.height = `${size * 1.2}px`;
                balloon.style.background = `radial-gradient(circle at 30% 30%, white, ${color} 60%)`;
                balloon.style.animationDelay = `${delay}s`;
                
                document.body.appendChild(balloon);
            }
            
            // Create confetti
            for (let i = 0; i < 30; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                // Random properties
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = Math.random() * 3 + 3;
                const size = Math.random() * 8 + 4;
                
                // Apply styles
                confetti.style.left = `${left}vw`;
                confetti.style.background = color;
                confetti.style.animationDelay = `${delay}s`;
                confetti.style.animationDuration = `${duration}s`;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                
                document.body.appendChild(confetti);
            }
        }
        
        // Initialize page with animations
        window.onload = function() {
            createAnimations();
            createDots();
        };
        
        // Add click effects
        document.body.addEventListener('click', function(e) {
            createClickEffect(e.clientX, e.clientY);
        });
        
        function createClickEffect(x, y) {
            const effect = document.createElement('div');
            effect.style.position = 'fixed';
            effect.style.left = `${x}px`;
            effect.style.top = `${y}px`;
            effect.style.width = '0';
            effect.style.height = '0';
            effect.style.borderRadius = '50%';
            effect.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
            effect.style.transform = 'translate(-50%, -50%)';
            effect.style.pointerEvents = 'none';
            effect.style.zIndex = '1000';
            
            document.body.appendChild(effect);
            
            // Animate
            const size = Math.random() * 80 + 40;
            effect.animate([
                { width: '0', height: '0', opacity: 1 },
                { width: `${size}px`, height: `${size}px`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            // Remove after animation
            setTimeout(() => {
                document.body.removeChild(effect);
            }, 1000);
        }
        
        // Touch swipe for carousel on mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const carouselContainer = document.querySelector('.carousel-container');
        
        carouselContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                moveCarousel(1); // Swipe left - next
            }
            
            if (touchEndX > touchStartX + 50) {
                moveCarousel(-1); // Swipe right - previous
            }
        }