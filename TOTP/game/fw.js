class SpectacularFireworks {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.fireworks = [];
        this.particles = [];
        this.colors = [
            '#ff1493', '#00ffff', '#ffd700', 
            '#7fff00', '#ff4500', '#1e90ff'
        ];
    }

    createFirework(x, y) {
        const hue = Math.random() * 360;
        const firework = {
            x: x,
            y: y,
            sx: x,
            sy: y,
            height: this.canvas.height,
            speed: Math.random() * 5 + 3,
            radius: Math.random() * 2 + 1,
            hue: hue,
            brightness: Math.random() * 50 + 50
        };
        this.fireworks.push(firework);
    }

    createExplosion(x, y, hue) {
        const particleCount = 200;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 10 + 5;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 3 + 1,
                hue: hue,
                brightness: Math.random() * 50 + 50,
                alpha: 1,
                decay: Math.random() * 0.02 + 0.015
            });
        }
    }

    update() {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';

        this.fireworks = this.fireworks.filter(firework => {
            firework.y -= firework.speed;
            
            this.ctx.beginPath();
            this.ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsl(${firework.hue}, 100%, ${firework.brightness}%)`;
            this.ctx.fill();

            if (firework.y <= firework.height / 2) {
                this.createExplosion(firework.x, firework.y, firework.hue);
                return false;
            }
            return true;
        });

        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.2;
            particle.alpha -= particle.decay;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 100%, ${particle.brightness}%, ${particle.alpha})`;
            this.ctx.fill();
            
            return particle.alpha > 0;
        });
    }

    start() {
        const animate = () => {
            this.update();
            requestAnimationFrame(animate);
        };
        animate();
    }
}

function initAdvancedFireworks() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const fireworks = new SpectacularFireworks(canvas);

    canvas.addEventListener('click', (e) => {
        fireworks.createFirework(e.clientX, e.clientY);
    });

    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight;
        fireworks.createFirework(x, y);
    }, 1500);

    fireworks.start();
}

//window.addEventListener('load', initAdvancedFireworks);