# Brainstorming de Design - Jogo Impostor

## Contexto
Uma aplicação web interativa para o jogo de mesa "Impostor", onde jogadores são sorteados como impostores ou recebem um tema. O design deve ser divertido, envolvente e facilitar a experiência de jogo em grupo.

---

## Ideia 1: Minimalismo Moderno com Foco em Interação
**Movimento de Design:** Bauhaus contemporâneo + Design de Interação
**Probabilidade:** 0.08

### Princípios Centrais
1. **Clareza Absoluta:** Cada elemento tem um propósito claro; nada é decorativo
2. **Espaço Negativo Generoso:** Amplo espaçamento entre elementos para reduzir cognitivo
3. **Hierarquia Tipográfica Forte:** Contraste marcante entre títulos e corpo
4. **Micro-interações Significativas:** Animações que comunicam estado, não apenas decoram

### Filosofia de Cores
- Paleta: Cinza neutro (fundo), Azul elétrico (ação primária), Vermelho vibrante (impostores)
- Lógica: Cores neutras criam calma; cores vibrantes destacam momentos críticos
- Intenção: Reduzir ruído visual, permitir foco total no jogo

### Paradigma de Layout
- **Estrutura Vertical Fluida:** Fluxo linear de cima para baixo, sem distrações laterais
- **Cards Isolados:** Cada seção (adicionar jogador, revelar, resultado) em seu próprio espaço
- **Centralização Dinâmica:** Conteúdo principal centralizado, mas com assimetria sutil nas bordas

### Elementos Assinatura
1. **Botões Geométricos:** Formas quadradas com cantos ligeiramente arredondados, sem sombras (apenas bordas)
2. **Tipografia Monoespaçada para Nomes:** Reforça identidade de "código/sistema"

### Filosofia de Interação
- Cliques devem ter feedback imediato (mudança de cor, escala)
- Transições suaves entre telas (fade, slide sutil)
- Estados desabilitados claramente indicados (opacidade reduzida)

### Animação
- Entrada de elementos: Fade-in suave (200ms)
- Revelação de tema/impostor: Flip card com rotação 3D (400ms)
- Transição entre jogadores: Slide horizontal (300ms)
- Hover em botões: Escala 1.05 + mudança de cor (150ms)

### Sistema Tipográfico
- **Display:** Poppins Bold (títulos principais)
- **Corpo:** Inter Regular (instruções, nomes)
- **Destaque:** Courier New (informações críticas como tema/status)
- Hierarquia: 3.5rem → 2rem → 1.25rem → 1rem

---

## Ideia 2: Design Lúdico e Playful
**Movimento de Design:** Ilustração Contemporânea + Gamificação
**Probabilidade:** 0.07

### Princípios Centrais
1. **Diversão Visual:** Cores saturadas, formas orgânicas, ilustrações
2. **Narrativa Emocional:** Cada tela conta uma história visual
3. **Surpresa e Delight:** Elementos inesperados que fazem o usuário sorrir
4. **Acessibilidade Lúdica:** Complexidade visual sem sacrificar clareza

### Filosofia de Cores
- Paleta: Gradientes (roxo → rosa → laranja), Verde neon, Amarelo quente
- Lógica: Cores vibrantes criam energia; gradientes sugerem movimento
- Intenção: Criar atmosfera festiva, reforçar que é um jogo

### Paradigma de Layout
- **Assimetria Controlada:** Elementos desalinhados intencionalmente para criar movimento
- **Sobreposição de Camadas:** Elementos que se sobrepõem para profundidade
- **Espaço Orgânico:** Sem grid rígido; formas fluem naturalmente

### Elementos Assinatura
1. **Ilustrações Customizadas:** Mascotes para impostores e jogadores normais
2. **Ícones Animados:** Pequenas animações em loop para cada estado do jogo

### Filosofia de Interação
- Botões são "clicáveis" visualmente (parecem 3D, com sombra)
- Feedback tátil simulado (bounce, vibração visual)
- Celebração ao revelar impostor (confete, animação)

### Animação
- Entrada de elementos: Bounce (300ms)
- Revelação: Spin com efeito de "scratch" (500ms)
- Transição entre jogadores: Flip com efeito de carta (400ms)
- Hover em botões: Bounce + mudança de cor (200ms)
- Confete ao final: Animação de partículas (1000ms)

### Sistema Tipográfico
- **Display:** Fredoka Bold (amigável, moderno)
- **Corpo:** Fredoka Regular (consistência)
- **Destaque:** Fredoka Extra Bold (impacto)
- Hierarquia: 4rem → 2.5rem → 1.5rem → 1rem

---

## Ideia 3: Estética Noir/Mistério
**Movimento de Design:** Film Noir + Dark Academia
**Probabilidade:** 0.06

### Princípios Centrais
1. **Suspense Visual:** Iluminação dramática, contraste alto
2. **Elegância Sombria:** Sofisticação através da escuridão
3. **Revelação Gradual:** Informações aparecem progressivamente
4. **Atmosfera Intensa:** Cada elemento reforça o mistério

### Filosofia de Cores
- Paleta: Preto profundo (fundo), Ouro/Cobre (destaque), Cinza fumaça (secundário)
- Lógica: Escuridão cria tensão; ouro destaca momentos críticos
- Intenção: Transformar jogo em experiência cinematográfica

### Paradigma de Layout
- **Spotlight Dinâmico:** Foco em um elemento por vez, resto em sombra
- **Simetria Formal:** Estrutura clássica, mas com iluminação assimétrica
- **Profundidade Exagerada:** Múltiplas camadas de sombra

### Elementos Assinatura
1. **Efeito de Spotlight:** Luz que segue o foco (CSS radial-gradient)
2. **Tipografia com Sombra:** Texto com glow effect

### Filosofia de Interação
- Cliques revelam informações (como abrir cortinas)
- Transições lentas e deliberadas (não apressadas)
- Feedback é sutil mas perceptível

### Animação
- Entrada de elementos: Fade-in lento com blur (400ms)
- Revelação: Cortina se abrindo (600ms)
- Transição entre jogadores: Fade + mudança de spotlight (500ms)
- Hover em botões: Glow intenso (200ms)

### Sistema Tipográfico
- **Display:** Playfair Display Bold (elegância clássica)
- **Corpo:** Lora Regular (sofisticação)
- **Destaque:** Playfair Display Extra Bold (impacto)
- Hierarquia: 3.5rem → 2rem → 1.25rem → 1rem

---

## Decisão Final
**Selecionado: Ideia 1 - Minimalismo Moderno com Foco em Interação**

Razão: Oferece clareza máxima para um jogo em grupo, onde a compreensão rápida é crítica. Micro-interações significativas reforçam feedback do jogo. Escalável e acessível.
