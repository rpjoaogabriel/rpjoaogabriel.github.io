  function() {
        const body = document.body;
        const toggleBtn = document.getElementById('themeToggleBtn');
        const statusText = document.getElementById('statusText');
        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const subtext = document.getElementById('subtext');
        const instruction = document.getElementById('instruction');
        const canvas = document.getElementById('rainCanvas');
        const ctx = canvas.getContext('2d');

        // Estado do tema
        let isMatrixTheme = false;

        // ---- Configuração da chuva digital ----
        let rainDrops = [];
        let rainAnimationId = null;
        const fontSize = 14;
        let columns;
        const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const chars = katakana + latin;

        function initRain() {
            columns = Math.floor(window.innerWidth / fontSize);
            rainDrops = [];
            for (let i = 0; i < columns; i++) {
                rainDrops.push({
                    x: i * fontSize,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 3 + 2,
                    char: chars[Math.floor(Math.random() * chars.length)]
                });
            }
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initRain();
        }

        function animateRain() {
            if (!isMatrixTheme) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                rainAnimationId = null;
                return;
            }
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px "Courier New", monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const drop = rainDrops[i];
                drop.char = chars[Math.floor(Math.random() * chars.length)];
                const brightness = Math.random();
                if (brightness > 0.95) ctx.fillStyle = '#ffffff';
                else if (brightness > 0.8) ctx.fillStyle = '#66ff99';
                else ctx.fillStyle = '#00cc33';

                ctx.fillText(drop.char, drop.x, drop.y);
                drop.y += drop.speed;
                if (drop.y > canvas.height) {
                    drop.y = 0;
                    drop.speed = Math.random() * 3 + 2;
                }
            }
            rainAnimationId = requestAnimationFrame(animateRain);
        }

        // ---- Conteúdo dos temas ----
        const contentDefault = {
            title: 'ledger:~$ cat boasvindas.txt',
            description: 'Terminal de consulta ativo. Este ambiente mescla a precisão de um <strong style="color: var(--accent);">livro-razão contábil</strong> com a agilidade de uma <strong>interface de linha de comando</strong>.',
            subtext: '<strong>Último lançamento:</strong><br>&gt; débito  conhecimento_web  1500,00<br>&gt; crédito design_retro       750,50<br>&gt; saldo parcial: <span style="color: var(--accent);">+ 749,50</span>',
            instruction: 'Para acessar o modo visual alternativo (Matrix 1999), utilize o botão abaixo ou pressione a tecla <kbd>M</kbd>.',
            btnText: '▶ ABRIR TERMINAL MATRIX',
            statusText: 'SISTEMA: LEDGER/TERMINAL ATIVO'
        };

        const contentMatrix = {
            title: 'MATRIX://NEO',
            description: 'Sistema Matrix carregado. Fundo escuro, texto verde neon (estilo terminal dos filmes). A chuva digital completa a atmosfera cyberpunk de 1999.',
            subtext: '<em>"Siga o coelho branco... 🐇"</em><br>Knock, knock, Neo.',
            instruction: 'Retorne ao tema de ledger/terminal usando o botão ou a tecla <kbd>M</kbd>.',
            btnText: '◀ FECHAR MATRIX',
            statusText: 'SISTEMA: MATRIX 1999 ATIVO'
        };

        // ---- Função de troca ----
        function toggleTheme() {
            isMatrixTheme = !isMatrixTheme;

            if (isMatrixTheme) {
                body.classList.add('matrix-theme');
                toggleBtn.innerHTML = contentMatrix.btnText;
                statusText.textContent = contentMatrix.statusText;
                title.textContent = contentMatrix.title;
                description.innerHTML = contentMatrix.description;
                subtext.innerHTML = contentMatrix.subtext;
                instruction.innerHTML = contentMatrix.instruction;
                if (!rainAnimationId) animateRain();
            } else {
                body.classList.remove('matrix-theme');
                toggleBtn.innerHTML = contentDefault.btnText;
                statusText.textContent = contentDefault.statusText;
                title.textContent = contentDefault.title;
                description.innerHTML = contentDefault.description;
                subtext.innerHTML = contentDefault.subtext;
                instruction.innerHTML = contentDefault.instruction;
                if (rainAnimationId) {
                    cancelAnimationFrame(rainAnimationId);
                    rainAnimationId = null;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
        }

        // ---- Eventos ----
        toggleBtn.addEventListener('click', toggleTheme);
        window.addEventListener('resize', resizeCanvas);

        // Atalho de teclado: tecla "M"
        window.addEventListener('keydown', function(e) {
            if (e.key === 'm' || e.key === 'M') {
                if (document.activeElement === document.body ||
                    document.activeElement === toggleBtn) {
                    e.preventDefault();
                    toggleTheme();
                }
            }
        });

        // Inicialização
        resizeCanvas();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(
            '%c📒 Ledger Terminal pronto. Pressione "M" para alternar para o modo Matrix.',
            'color: #1a2b3c; font-family: monospace; background: #f4efe0; padding: 4px;'
        );
    })();
