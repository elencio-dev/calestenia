// ═══════════════════════════════════════════════════════════════════════════
//   MOVEMENT LIBRARY — 55+ exercises
// ═══════════════════════════════════════════════════════════════════════════

export interface Movement {
  name: string;
  cat: 'push' | 'pull' | 'legs' | 'core' | 'skill' | 'mobility';
  phase: number;
  muscle: string;
  icon: string;
  cues: string[];
  how: string;
  progression: string;
}

export const MOV: Record<string, Movement> = {
  "wall-pushup": { name:"Flexão na Parede",cat:"push",phase:0,muscle:"Peitoral, Tríceps (forma)",icon:"🤚",cues:["Mãos na parede na altura dos ombros","Desça o nariz até a parede","Cotovelos a 45° do corpo","Corpo em linha reta"],how:"De pé a ~60cm da parede, coloque as mãos na parede. Dobre os cotovelos e leve o peito à parede, mantenha o corpo reto, empurre de volta.",progression:"wall-pushup → incline-pushup → knee-pushup → pushup"},
  "incline-pushup": { name:"Flexão Inclinada",cat:"push",phase:0,muscle:"Peitoral, Tríceps",icon:"📐",cues:["Use mesa ou banco alto","Corpo em linha reta","Cotovelos 45°","Peito toca a borda"],how:"Mãos numa superfície elevada (mesa, banco, escada). Corpo em linha reta. Desça até o peito tocar. Quanto mais alto, mais fácil.",progression:"wall-pushup → incline-pushup → knee-pushup"},
  "knee-pushup": { name:"Flexão no Joelho",cat:"push",phase:0,muscle:"Peitoral, Tríceps, Ombros",icon:"🦵",cues:["Joelhos no chão, cruzar tornozelos","Corpo em diagonal linha reta","Cotovelos 45°","Peito toca o chão"],how:"Apoio nos joelhos, cruce os tornozelos. Mantenha corpo reto dos joelhos à cabeça. Desça o peito ao chão e empurre de volta.",progression:"incline-pushup → knee-pushup → pushup"},
  "pushup": { name:"Flexão",cat:"push",phase:1,muscle:"Peitoral, Tríceps, Deltóide anterior",icon:"💪",cues:["Corpo RÍGIDO como uma prancha","Cotovelos 45° do tronco","Peito toca o chão","Core contraído o tempo todo"],how:"Posição de prancha completa. Pés unidos ou à largura dos ombros. Desça controlado (2s) até o peito tocar o solo. Suba explosivo.",progression:"knee-pushup → pushup → diamond-pushup → archer-pushup"},
  "wide-pushup": { name:"Flexão Aberta",cat:"push",phase:1,muscle:"Peitoral externo, Ombros",icon:"↔️",cues:["Mãos 1.5× largura dos ombros","Foco total no peitoral","Descida lenta 3 segundos","Cotovelos para os lados"],how:"Mãos mais abertas que o normal, dedos levemente para fora. A abertura aumenta a amplitude de movimento no peitoral.",progression:"pushup → wide-pushup → ring-pushup"},
  "diamond-pushup": { name:"Flexão Diamante",cat:"push",phase:2,muscle:"Tríceps (cabeça longa), Peitoral interno",icon:"💎",cues:["Polegar + indicador formam diamante","Cotovelos roçam o corpo na descida","Foco no tríceps","Não deixe quadril cair"],how:"Mãos juntas sob o peito, polegares e indicadores se tocam. Descida controlada com cotovelos contra o corpo. Excelente para tríceps.",progression:"pushup → diamond-pushup → close-ring-pushup"},
  "archer-pushup": { name:"Flexão Arqueiro",cat:"push",phase:2,muscle:"Peitoral unilateral, Tríceps",icon:"🏹",cues:["Uma mão próxima, outra bem afastada","Desça para o lado da mão próxima","Braço afastado quase reto","Alterne sempre os lados"],how:"Mãos bem abertas. Desça inclinando para um lado enquanto o outro braço quase estica. Progressão para flexão com uma mão.",progression:"wide-pushup → archer-pushup → one-arm-pushup"},
  "explosive-pushup": { name:"Flexão Explosiva",cat:"push",phase:2,muscle:"Peitoral, Potência",icon:"💥",cues:["Desça controlado","Suba com máxima explosão","Mãos decolam do chão","Aterrissagem suave e imediata"],how:"Flexão normal na descida, mas na subida empurre com tanta força que as mãos saiam do chão. Desenvolve potência e velocidade.",progression:"pushup → explosive-pushup → clapping-pushup"},
  "clapping-pushup": { name:"Flexão com Palma",cat:"push",phase:3,muscle:"Peitoral, Potência, Coordenação",icon:"👏",cues:["Subida ultra-explosiva","Bata palmas rápido","Aterrissagem com cotovelos levemente dobrados","Nunca bata com braços retos"],how:"Suba com tanta explosão que dá tempo de bater palmas antes de aterrissar. Aterrisse sempre com os cotovelos semi-dobrados.",progression:"explosive-pushup → clapping-pushup → behind-back-clapping-pushup"},
  "pseudo-planche-pushup": { name:"Pseudo Planche Push-up",cat:"push",phase:3,muscle:"Ombros, Peitoral, Core",icon:"🌀",cues:["Mãos viradas para trás","Ombros à frente das mãos","Cotovelos colados ao corpo","Pressão constante para baixo"],how:"Mãos apontando para os pés, coloque os ombros bem na frente das mãos. Faça a flexão com cotovelos colados. Progressão para a planche.",progression:"pushup → pseudo-planche-pushup → tuck-planche-pushup"},
  "pike-pushup": { name:"Pike Push-up",cat:"push",phase:1,muscle:"Deltóide (ombros), Tríceps",icon:"▲",cues:["Quadril bem alto (V invertido)","Cabeça desce ENTRE as mãos","Cotovelos levemente para fora","Simula desenvolvimento de ombros"],how:"Posição de downward dog do yoga. Quadril alto formando V. Desça a cabeça entre as mãos. Quanto mais vertical o corpo, mais difícil.",progression:"pike-pushup → elevated-pike-pushup → wall-handstand-pushup"},
  "elevated-pike-pushup": { name:"Pike Push-up Elevado",cat:"push",phase:2,muscle:"Deltóide, Tríceps (mais intenso)",icon:"🔼",cues:["Pés em banco/cadeira","Quadril muito alto","Máxima verticalização do corpo","Foco máximo nos ombros"],how:"Igual ao pike pushup mas com os pés elevados num banco. Torna o movimento muito mais parecido com o desenvolvimento de barra.",progression:"pike-pushup → elevated-pike-pushup → wall-handstand-pushup"},
  "wall-handstand-pushup": { name:"Handstand Push-up (Parede)",cat:"push",phase:3,muscle:"Deltóide, Tríceps, Core",icon:"🙃",cues:["Pés apoiados na parede","Desça a cabeça ao chão","Core totalmente rígido","Suba com força dos ombros"],how:"Apoio de mãos com pés na parede. Desça lentamente até a cabeça quase tocar o chão. Empurre de volta. O exercício mais difícil de ombros.",progression:"elevated-pike-pushup → wall-handstand-pushup → freestanding-handstand-pushup"},
  "bench-dip": { name:"Dip no Banco",cat:"push",phase:0,muscle:"Tríceps, Deltóide posterior",icon:"🪑",cues:["Mãos na borda do banco atrás","Pés no chão dobrados","Desça até 90° no cotovelo","Ombros afastados das orelhas"],how:"Sentado na borda de uma cadeira/banco, coloque as mãos na borda. Deslize para fora e desça flexionando os cotovelos. Suba.",progression:"bench-dip → dip → weighted-dip"},
  "dip": { name:"Mergulho (Parallel Dip)",cat:"push",phase:1,muscle:"Tríceps, Peitoral inferior, Deltóide",icon:"⬇️",cues:["Ombros PARA BAIXO (não suba até as orelhas)","Desça até 90° ou abaixo","Sem balanço do corpo","Controlado tanto na subida quanto descida"],how:"Entre barras paralelas (ou duas cadeiras), segure e desça controlado. A inclinação do corpo para frente recruta mais peitoral.",progression:"bench-dip → dip → ring-dip"},
  "korean-dip": { name:"Korean Dip",cat:"push",phase:3,muscle:"Deltóide posterior, Tríceps",icon:"🇰🇷",cues:["Barra atrás do corpo","Cotovelos dobram para trás","Ombros vão abaixo da barra","Controle extremo"],how:"Segure a barra atrás de você. Desça com os cotovelos para trás (diferente do dip normal). Excelente para deltóide posterior.",progression:"dip → korean-dip → ring-korean-dip"},
  "dead-hang": { name:"Dead Hang",cat:"pull",phase:0,muscle:"Antebraços, Ombros (descompressão)",icon:"🪝",cues:["Corpo completamente relaxado","Ombros levemente ativos (não passivos)","Respire fundo","Construa tempo gradualmente"],how:"Pendurado na barra, relaxe completamente. Começa com 10-15s e vai aumentando. Fortalece a pegada e prepara para as barras.",progression:"dead-hang → active-hang → scapular-pull → australian-pullup"},
  "active-hang": { name:"Active Hang",cat:"pull",phase:0,muscle:"Trapézio, Serátil anterior",icon:"💪",cues:["Retraia as escápulas (ombros descem)","Brazos retos, só escápulas movem","Sem dobrar cotovelos","Mantenha o tempo"],how:"Pendurado, puxe as escápulas para baixo e para trás SEM dobrar os cotovelos. É como se quisesse colocar as escápulas nos bolsos.",progression:"dead-hang → active-hang → scapular-pull"},
  "scapular-pull": { name:"Scapular Pull-up",cat:"pull",phase:0,muscle:"Trapézio, Rombóides (base da barra fixa)",icon:"🔙",cues:["Braços quase retos","Retraia e eleve as escápulas","Suba apenas 5-8cm","Movimento PEQUENO mas intenso"],how:"Pendurado na barra, sem dobrar os cotovelos, puxe as escápulas para baixo elevando o corpo levemente. Preparo essencial para barras.",progression:"active-hang → scapular-pull → australian-pullup"},
  "australian-pullup": { name:"Remada Australiana",cat:"pull",phase:0,muscle:"Costas, Bíceps, Rombóides",icon:"🦘",cues:["Corpo em linha reta (OBRIGATÓRIO)","Peito toca a barra no topo","Escápulas retraídas no topo","Desce COMPLETAMENTE (braços retos)"],how:"Deitado sob uma barra baixa (ou mesa), segure e mantenha o corpo reto. Puxe o peito até tocar a barra. Mais fácil que a barra fixa.",progression:"scapular-pull → australian-pullup → pullup"},
  "negative-pullup": { name:"Barra Negativa",cat:"pull",phase:1,muscle:"Costas, Bíceps (força excêntrica)",icon:"📉",cues:["Pule ou use degrau para subir","Desça MUITO lento (5-8 segundos)","Controle até o braço completamente estendido","É a mais importante progressão"],how:"Suba pulando ou com auxílio, comece com o queixo acima da barra. Desça o mais lentamente possível. Constrói força real para a barra fixa.",progression:"australian-pullup → negative-pullup → pullup"},
  "pullup": { name:"Barra Fixa (Pull-up)",cat:"pull",phase:1,muscle:"Grande dorsal, Bíceps, Rombóides, Trapézio",icon:"🏋️",cues:["Pegada pronada (palmas para fora)","INICIE com as escápulas — não com os braços","Cotovelos apontam para o chão","Queixo ACIMA da barra","Desça COMPLETAMENTE"],how:"Pegada afastada, palmas para fora. Puxe as escápulas para baixo PRIMEIRO, depois dobre os cotovelos. Queixo passa a barra no topo.",progression:"negative-pullup → pullup → close-grip-pullup → archer-pullup"},
  "chinup": { name:"Chinada (Chin-up)",cat:"pull",phase:1,muscle:"Bíceps, Grande dorsal",icon:"🙌",cues:["Pegada supinada (palmas para você)","Cotovelos apontam para frente","Puxe até o queixo acima","Bíceps faz mais trabalho"],how:"Pegada mais estreita com palmas para o seu rosto. Mais fácil que pull-up por recrutar mais bíceps. Ótima para iniciantes.",progression:"negative-pullup → chinup → pullup"},
  "close-grip-pullup": { name:"Barra Pegada Fechada",cat:"pull",phase:2,muscle:"Grande dorsal (inferior), Bíceps",icon:"🤏",cues:["Mãos juntas ou próximas","Cotovelos para frente","Puxe para o peito não para o queixo","Maior amplitude"],how:"Mãos juntas ou com 10-15cm entre elas. Puxe até o peito tocar a barra ou quase. Recruta mais o grande dorsal inferior.",progression:"pullup → close-grip-pullup → commando-pullup"},
  "commando-pullup": { name:"Commando Pull-up",cat:"pull",phase:2,muscle:"Grande dorsal, Core, oblíquos",icon:"🪖",cues:["Pegada neutra alternada","Suba para um lado, depois o outro","Alternar o lado a cada rep","Core firme evita rotação"],how:"Mãos neutras (como martelar) uma à frente da outra. Suba levando ora a orelha esquerda, ora a direita até a barra.",progression:"pullup → commando-pullup → archer-pullup"},
  "archer-pullup": { name:"Pull-up Arqueiro",cat:"pull",phase:3,muscle:"Grande dorsal unilateral",icon:"🏹",cues:["Uma mão pegada normal, outra estendida","Puxe para o lado da mão fechada","Braço estendido quase reto","Alterne em cada rep"],how:"Mãos afastadas: uma normal, outra segura a barra com menos força e quase esticada. Puxe para o lado da mão fechada. Progressão para 1 braço.",progression:"commando-pullup → archer-pullup → one-arm-pullup"},
  "typewriter-pullup": { name:"Typewriter Pull-up",cat:"pull",phase:3,muscle:"Grande dorsal, Core lateral",icon:"⌨️",cues:["Suba para o centro","Deslize para a esquerda","Deslize para a direita","Desça do centro"],how:"Sobe no centro, no topo deslize lateralmente até a mão esquerda quase esticada, depois deslize para a direita, então desça.",progression:"archer-pullup → typewriter-pullup → one-arm-pullup"},
  "muscle-up-negative": { name:"Muscle-Up Negativo",cat:"pull",phase:3,muscle:"Full upper body — transição",icon:"📊",cues:["Comece ACIMA da barra","Desça a fase de dip (cotovelos para trás)","DEPOIS desça a fase de pull-up","Total: 8-10 segundos de descida"],how:"Pule para cima da barra. Desça lentamente a fase de dip (corpo desce abaixo da barra) e depois continue descendo até braços esticados.",progression:"pullup+dip → muscle-up-negative → muscle-up"},
  "muscle-up": { name:"Muscle-Up",cat:"pull",phase:4,muscle:"Grande dorsal, Peitoral, Tríceps — movimento completo",icon:"👑",cues:["Pegada falsa (polegar por cima)","Explosão para cima com quadril","Transição os cotovelos por cima DA barra","Empurre para cima como um dip"],how:"Com momentum controlado, puxe a barra em direção ao quadril (não ao queixo), transite os cotovelos acima da barra e empurre.",progression:"muscle-up-negative → muscle-up → strict-muscle-up"},
  "inverted-row": { name:"Remada Invertida",cat:"pull",phase:0,muscle:"Costas médias, Rombóides, Bíceps",icon:"🔄",cues:["Corpo RÍGIDO igual prancha","Puxe até o peito tocar a barra","Cotovelos apontam para trás","Escápulas retraídas no topo"],how:"Como australiana mas com os pés mais afastados ou elevados. Mãos pegam o batente de uma porta, grade, barra baixa. Puxa o peito.",progression:"inverted-row → feet-elevated-row → australian-pullup"},
  "squat": { name:"Agachamento",cat:"legs",phase:0,muscle:"Quadríceps, Glúteos, Isquiotibiais",icon:"🏋️",cues:["Pés largura dos ombros, levemente para fora","Joelhos SEGUEM a direção dos pés","Desça até as coxas paralelas ao chão","Calcanhar no chão o tempo todo"],how:"Como se fosse sentar numa cadeira baixa. Peso nos calcanhares. Descida controlada até os quadríceps ficarem paralelos ao solo.",progression:"squat → jump-squat → bulgarian-split → pistol-squat"},
  "jump-squat": { name:"Agachamento com Salto",cat:"legs",phase:1,muscle:"Quadríceps, Glúteos, Potência",icon:"⬆️",cues:["Agacha até 90°","Sobe com máxima explosão","Aterrissa suave, dobra os joelhos","Absorve o impacto com controle"],how:"Agacha normal e ao subir, impulsiona tão forte que os pés saem do chão. Ao cair, absorva com os joelhos dobrados.",progression:"squat → jump-squat → broad-jump"},
  "lunge": { name:"Afundo",cat:"legs",phase:0,muscle:"Quadríceps, Glúteos, Equilíbrio",icon:"🚶",cues:["Passo largo à frente","Joelho traseiro quase toca o chão","Joelho da frente não passa do pé","Tronco ereto"],how:"Um passo largo para frente. Desça até o joelho traseiro quase tocar o chão. O joelho da frente deve ficar acima do tornozelo.",progression:"squat → lunge → reverse-lunge → walking-lunge"},
  "reverse-lunge": { name:"Afundo Reverso",cat:"legs",phase:1,muscle:"Quadríceps, Glúteos (mais glúteo)",icon:"↩️",cues:["Passo para TRÁS","Joelho traseiro quase ao chão","Melhor para joelhos que o afundo normal","Concentra no glúteo da frente"],how:"Ao invés de dar um passo para frente, recue uma perna. Mais seguro para os joelhos e recruta mais glúteo.",progression:"lunge → reverse-lunge → bulgarian-split"},
  "bulgarian-split": { name:"Afundo Búlgaro",cat:"legs",phase:1,muscle:"Quadríceps unilateral, Glúteo, Equilíbrio",icon:"🇧🇬",cues:["Pé traseiro em banco ou sofá","Joelho anterior não passa do pé","Desça controlado","Empurre pelo calcanhar da frente"],how:"Pé traseiro apoiado num banco atrás. Agache com a perna da frente. Um dos exercícios mais difíceis e eficientes de pernas.",progression:"lunge → bulgarian-split → pistol-squat"},
  "pistol-squat": { name:"Pistol Squat",cat:"legs",phase:3,muscle:"Quadríceps unilateral, Glúteo, Equilíbrio",icon:"🔫",cues:["Uma perna estendida à frente","Desça lentamente em controle","Calcanhar plano no chão","Joelho acompanha o pé"],how:"Em pé numa perna, estenda a outra à frente. Agache lentamente. É um dos marcadores de força e equilíbrio mais difíceis.",progression:"bulgarian-split → pistol-squat"},
  "shrimp-squat": { name:"Shrimp Squat",cat:"legs",phase:3,muscle:"Quadríceps, Glúteo, Força unilateral extrema",icon:"🦐",cues:["Perna traseira dobrada atrás","Toque o joelho no chão","Tronco ereto","Força total na perna da frente"],how:"Em pé numa perna, dobre a perna traseira segurando o tornozelo atrás. Desça até o joelho tocar o chão. Mais difícil que o pistol squat.",progression:"pistol-squat → shrimp-squat"},
  "nordic-curl": { name:"Nordic Curl",cat:"legs",phase:2,muscle:"Isquiotibiais (força excêntrica extrema)",icon:"🏔️",cues:["Pés presos embaixo de algo","Desça o mais lento possível","Use as mãos para parar no chão","Puxe de volta com isquiotibiais"],how:"Ajoelhado com pés presos. Desça o tronco para frente o mais lento possível. Quando não aguentar, apoie as mãos. Suba contraindo os ísquios.",progression:"leg-curl → nordic-curl"},
  "glute-bridge": { name:"Ponte de Glúteo",cat:"legs",phase:0,muscle:"Glúteos, Isquiotibiais, Core",icon:"🌉",cues:["Pés planos no chão, joelhos 90°","Eleve o quadril ao máximo","Esprema os glúteos no topo","Não arqueie a lombar excessivamente"],how:"Deitado de costas, joelhos dobrados. Empurre o quadril para cima espremendo os glúteos. Mantenha 1-2 segundos no topo.",progression:"glute-bridge → single-leg-bridge → hip-thrust"},
  "calf-raise": { name:"Elevação de Panturrilha",cat:"legs",phase:0,muscle:"Gastrocnêmio, Sóleo",icon:"🦶",cues:["Suba nas pontas dos pés","Máxima amplitude (calcanhares abaixo do degrau)","Desça lento (3s)","Segure 1s no topo"],how:"De pé, suba nas pontas dos pés. Para mais intensidade, use um degrau para maior amplitude. Uma perna = mais difícil.",progression:"calf-raise → single-leg-calf-raise"},
  "single-leg-calf-raise": { name:"Elevação Panturrilha 1 Perna",cat:"legs",phase:1,muscle:"Gastrocnêmio, Sóleo (unilateral)",icon:"🦿",cues:["Equilíbrio numa perna","Máxima amplitude","Desça controlado","Sem compensar com o corpo"],how:"Igual à elevação normal mas em uma perna. Essencial para prevenir lesões e construir força real nas panturrilhas.",progression:"calf-raise → single-leg-calf-raise"},
  "plank": { name:"Prancha",cat:"core",phase:0,muscle:"Core completo, Ombros, Glúteos",icon:"📏",cues:["Corpo em linha reta (cabeça ao calcanhar)","Quadril NÃO cai nem sobe","Core contraído, respire","Ombros acima dos cotovelos"],how:"Apoio nos antebraços e pontas dos pés. Corpo completamente reto. Ative o core como se fosse receber um soco no estômago.",progression:"plank → extended-plank → rk-planche-lean"},
  "side-plank": { name:"Prancha Lateral",cat:"core",phase:0,muscle:"Oblíquos, Core lateral",icon:"↕️",cues:["Corpo em linha lateral reta","Quadril não afunda","Braço de cima no ar ou na cintura","Respire normalmente"],how:"Apoio num antebraço, corpo lateral reto. Quadril alto. O oblíquo sustenta o corpo. Aumenta gradualmente o tempo.",progression:"plank → side-plank → side-plank-rotation"},
  "dead-bug": { name:"Dead Bug",cat:"core",phase:0,muscle:"Core profundo (transverso abdominal)",icon:"🐛",cues:["Costas completamente no chão (lombar plana)","Braço e perna OPOSTOS se estendem","Expire ao estender","NUNCA perca o contato da lombar com o chão"],how:"Deitado de costas. Braços e pernas no ar (90°). Estenda o braço direito e perna esquerda simultaneamente. Retorne. Alterne.",progression:"dead-bug → hollow-body → l-sit"},
  "hollow-body": { name:"Hollow Body Hold",cat:"core",phase:1,muscle:"Core completo, Hip flexors",icon:"🍌",cues:["Lombar COLADA ao chão","Pernas estendidas e elevadas","Braços sobre a cabeça","Aperte o core como se fosse ser partido ao meio"],how:"Deitado, braços acima da cabeça, pernas levantadas formando um arco côncavo. A lombar não pode sair do chão. Essencial para a planche.",progression:"dead-bug → hollow-body → hollow-body-rock"},
  "leg-raise": { name:"Elevação de Pernas",cat:"core",phase:0,muscle:"Hip flexors, Core inferior",icon:"🦵",cues:["Lombar colada ao chão","Pernas juntas e retas","Desça LENTO (3 segundos)","Não bata as pernas no chão"],how:"Deitado de costas. Eleve as pernas retas até 90°. Desça lentamente sem tocar o chão. Controle é essencial.",progression:"leg-raise → hanging-leg-raise → toes-to-bar"},
  "hanging-leg-raise": { name:"Elevação de Pernas Suspensa",cat:"core",phase:2,muscle:"Core completo, Hip flexors (suspensão)",icon:"🏗️",cues:["Pendurado na barra","Pernas juntas e retas","Suba até 90° ou mais","Sem balançar o corpo"],how:"Pendurado na barra, eleve as pernas retas até a horizontal. Sem balanço. Exige força de antebraço e core simultaneamente.",progression:"leg-raise → hanging-leg-raise → toes-to-bar"},
  "l-sit": { name:"L-Sit",cat:"core",phase:2,muscle:"Hip flexors, Core, Tríceps, Ombros",icon:"⊥",cues:["Pernas paralelas ao chão","Corpo completamente reto","Ombros para baixo (não encolher)","Braços completamente retos"],how:"Apoiado em paralelas ou chão entre pernas. Eleve o corpo e mantenha as pernas paralelas ao chão. Um dos moves mais técnicos.",progression:"tuck-l-sit → l-sit → v-sit"},
  "dragon-flag": { name:"Dragon Flag",cat:"core",phase:3,muscle:"Core completo (o mais difícil)",icon:"🐉",cues:["Segure um poste ou banco atrás","Corpo COMPLETAMENTE reto","Desça SUPER lento (5 segundos)","Não quebre o quadril"],how:"Deitado, segure algo atrás da cabeça. Eleve o corpo todo mantendo linha reta. Desça lentamente. Popularizado por Bruce Lee.",progression:"hanging-leg-raise → dragon-flag"},
  "back-lever": { name:"Back Lever",cat:"skill",phase:3,muscle:"Bíceps, Core, Deltóide posterior",icon:"🔁",cues:["Segure a barra acima","Gire para baixo da barra","Corpo paralelo ao chão","Ombros na linha do corpo"],how:"Pendurado, gire o corpo para baixo ficando paralelo ao chão de frente para baixo. Os bíceps e ombros sustentam o peso.",progression:"back-lever-tuck → back-lever"},
  "front-lever-tuck": { name:"Front Lever Tuck",cat:"skill",phase:3,muscle:"Grande dorsal, Core",icon:"🌠",cues:["Pendurado na barra","Gire para ficar de frente para cima","Joelhos dobrados ao peito","Corpo paralelo ao chão"],how:"Pendurado, eleve o quadril girando para ficar com o peito para cima e o corpo paralelo ao chão, com joelhos dobrados. Base do front lever.",progression:"front-lever-tuck → front-lever-one-leg → front-lever"},
  "front-lever": { name:"Front Lever",cat:"skill",phase:4,muscle:"Grande dorsal, Core, Bíceps",icon:"🌟",cues:["Corpo completamente horizontal","Frente para cima","Braços completamente retos","Escápulas retraídas"],how:"A versão completa do front lever com pernas retas. Um dos movimentos mais avançados da calistenia. Requer meses de progressão.",progression:"front-lever-tuck → front-lever"},
  "wall-handstand": { name:"Handstand na Parede",cat:"skill",phase:1,muscle:"Ombros, Core, Equilíbrio",icon:"🤸",cues:["Mãos a ~20cm da parede","Peito DE FRENTE para a parede","Core completamente rígido","Pressione o chão com as mãos"],how:"Apoio de mãos com o peito voltado para a parede. Mais difícil e melhor que com as costas. Aprende a alinhar o corpo.",progression:"pike-pushup → wall-handstand → freestanding-handstand"},
  "freestanding-handstand": { name:"Handstand Livre",cat:"skill",phase:3,muscle:"Ombros, Core, Propriocepção",icon:"🤸",cues:["Mãos na largura dos ombros","Dedos espalhados para equilíbrio","Core e glúteos rígidos","Pequenos ajustes nos dedos para balancear"],how:"Apoio de mãos sem suporte. O equilíbrio vem dos dedos e pequenos ajustes. Leva tempo. Pratique kicks ups contra a parede primeiro.",progression:"wall-handstand → freestanding-handstand"},
  "human-flag-tuck": { name:"Human Flag Tuck",cat:"skill",phase:4,muscle:"Core lateral, Deltóides, Latíssimo",icon:"🚩",cues:["Braço de baixo empurra","Braço de cima puxa","Joelhos dobrados ao peito","Corpo paralelo ao chão"],how:"Segure num poste vertical. Um braço empurra para baixo, outro puxa para cima. Inicie com joelhos dobrados ao peito.",progression:"side-plank → human-flag-tuck → human-flag"},
  "thoracic-rotation": { name:"Rotação Torácica",cat:"mobility",phase:0,muscle:"Coluna torácica, Mobilidade",icon:"🔃",cues:["De lado no chão, joelhos dobrados","Braço de cima gira para trás","Siga o braço com os olhos","Sem forçar"],how:"Deitado de lado, joelhos empilhados. Abra o braço de cima para trás tentando chegar no chão. Ótimo para mobilidade de ombros.",progression:"Mobilidade básica → avançada"},
  "hip-flexor-stretch": { name:"Alongamento do Hip Flexor",cat:"mobility",phase:0,muscle:"Iliopsoas, Quadríceps",icon:"🧘",cues:["Posição de afundo fundo","Quadril desce para baixo","Não curve a lombar","Respire e relaxe na posição"],how:"Posição de cavaleiro ajoelhado (afundo com joelho no chão). Empurre o quadril para frente e para baixo. Essencial para saúde da coluna.",progression:"Mobilidade básica"},
  "wrist-circles": { name:"Círculos de Punho",cat:"mobility",phase:0,muscle:"Punhos, Antebraços (prevenção de lesão)",icon:"⭕",cues:["Movimentos lentos e completos","Ambas as direções","Pressão gradual","OBRIGATÓRIO antes de handstand e push-ups"],how:"Gire os punhos em círculos completos. Essencial para prevenir lesões antes de qualquer treino de empurrar.",progression:"Aquecimento permanente"},
  "shoulder-dislocates": { name:"Shoulder Dislocates",cat:"mobility",phase:0,muscle:"Ombros, Mobilidade total",icon:"🔄",cues:["Use um bastão ou toalha","Braços bem abertos","Passe por cima da cabeça e por trás","Nunca force"],how:"Com um bastão ou toalha, passe os braços de frente para trás por cima da cabeça. Gradualmente reduza a largura do grip.",progression:"Aquecimento permanente"},
};

export interface ExerciseEntry {
  id: string;
  sets: number;
  reps?: number;
  duration?: number;
  rest: number;
}

export interface DayData {
  name: string;
  color: string;
  exercises?: ExerciseEntry[];
  rest?: boolean;
  challenge?: {
    name: string;
    target: number;
    unit: string;
    icon: string;
  } | null;
}

export interface WeekProgram {
  theme: string;
  days: Record<number, DayData>;
}

const day = (name: string, color: string, exercises: ExerciseEntry[], challenge: DayData['challenge']): DayData => ({ name, color, exercises, challenge });
const rest = (name = "Descanso"): DayData => ({ name, color: "#374151", rest: true });
const ex = (id: string, sets: number, repsOrDuration: number | string, restTime: number): ExerciseEntry => {
  if (typeof repsOrDuration === "string" && repsOrDuration.endsWith("s")) {
    return { id, sets, duration: parseInt(repsOrDuration), rest: restTime };
  }
  return { id, sets, reps: repsOrDuration as number, rest: restTime };
};

// PHASE 1: Foundation (Weeks 1-4)
const PHASE1: Record<number, WeekProgram> = {
  1: { theme:"Primeiros Passos — Aprender a Forma", days: {
    1: day("Empurrar Iniciante A","#F97316",[ex("wrist-circles",2,"60s",30),ex("wall-pushup",3,10,60),ex("bench-dip",3,8,60),ex("plank",3,"20s",45)],{name:"30 Wall Push-ups",target:30,unit:"reps",icon:"🤚"}),
    2: day("Puxar Iniciante A","#60A5FA",[ex("dead-hang",3,"10s",60),ex("scapular-pull",3,"10s",60),ex("inverted-row",3,5,90)],{name:"3min Dead Hang Total",target:180,unit:"seg",icon:"🪝"}),
    3: rest("Mobilidade Ativa"),
    4: day("Pernas & Glúteo A","#4ADE80",[ex("glute-bridge",3,15,45),ex("squat",3,10,60),ex("lunge",3,8,60),ex("calf-raise",3,15,45)],{name:"100 Agachamentos",target:100,unit:"reps",icon:"🏋️"}),
    5: day("Core Iniciante A","#A855F7",[ex("dead-bug",3,8,45),ex("plank",3,"20s",45),ex("side-plank",2,"15s",45),ex("leg-raise",3,8,45)],{name:"5min Prancha Total",target:300,unit:"seg",icon:"🎯"}),
    6: day("Full Body Leve","#F59E0B",[ex("wall-pushup",2,10,45),ex("inverted-row",2,5,60),ex("squat",2,15,45),ex("plank",2,"20s",45)],null),
    0: rest("Descanso Total"),
  }},
  2: { theme:"Fundação — Aumentando Volume", days: {
    1: day("Empurrar A+","#F97316",[ex("wrist-circles",2,"60s",30),ex("incline-pushup",3,10,60),ex("bench-dip",3,10,60),ex("pike-pushup",3,6,75),ex("plank",3,"25s",45)],{name:"50 Incline Push-ups",target:50,unit:"reps",icon:"📐"}),
    2: day("Puxar A+","#60A5FA",[ex("dead-hang",4,"12s",60),ex("scapular-pull",3,"15s",60),ex("inverted-row",3,7,90),ex("active-hang",3,"10s",60)],{name:"4min Dead Hang Total",target:240,unit:"seg",icon:"🪝"}),
    3: rest("Mobilidade Ativa"),
    4: day("Pernas B","#4ADE80",[ex("glute-bridge",3,20,45),ex("squat",4,12,60),ex("reverse-lunge",3,8,60),ex("calf-raise",3,20,45)],{name:"150 Agachamentos",target:150,unit:"reps",icon:"🏋️"}),
    5: day("Core B","#A855F7",[ex("dead-bug",3,10,45),ex("plank",4,"25s",45),ex("side-plank",3,"20s",45),ex("leg-raise",3,10,45),ex("hollow-body",2,"15s",60)],{name:"6min Prancha Total",target:360,unit:"seg",icon:"🎯"}),
    6: day("Full Body Moderado","#F59E0B",[ex("incline-pushup",3,10,60),ex("inverted-row",3,7,75),ex("squat",3,15,45),ex("glute-bridge",3,15,45),ex("plank",3,"25s",45)],null),
    0: rest("Descanso Total"),
  }},
  3: { theme:"Fundação — Força Real Começa", days: {
    1: day("Empurrar B","#F97316",[ex("wrist-circles",2,"60s",30),ex("knee-pushup",3,12,60),ex("bench-dip",4,10,60),ex("pike-pushup",3,8,75),ex("plank",3,"30s",45)],{name:"60 Knee Push-ups",target:60,unit:"reps",icon:"🦵"}),
    2: day("Puxar B","#60A5FA",[ex("dead-hang",4,"15s",60),ex("scapular-pull",4,"15s",60),ex("inverted-row",3,8,90),ex("active-hang",3,"15s",60)],{name:"5min Dead Hang Total",target:300,unit:"seg",icon:"🪝"}),
    3: rest("Mobilidade Ativa"),
    4: day("Pernas C","#4ADE80",[ex("glute-bridge",3,20,45),ex("squat",4,15,60),ex("bulgarian-split",3,6,75),ex("calf-raise",4,20,45)],{name:"200 Agachamentos",target:200,unit:"reps",icon:"🏋️"}),
    5: day("Core C","#A855F7",[ex("dead-bug",3,12,45),ex("plank",4,"30s",45),ex("side-plank",3,"25s",45),ex("leg-raise",4,10,45),ex("hollow-body",3,"20s",60)],{name:"8min Prancha Total",target:480,unit:"seg",icon:"🎯"}),
    6: day("Full Body Força","#F59E0B",[ex("knee-pushup",3,12,60),ex("inverted-row",3,8,75),ex("squat",3,20,45),ex("glute-bridge",3,20,45),ex("plank",3,"30s",45)],null),
    0: rest("Descanso Total"),
  }},
  4: { theme:"Fundação — Semana de Consolidação", days: {
    1: day("Empurrar C — Avaliação","#F97316",[ex("wrist-circles",2,"60s",30),ex("pushup",3,5,60),ex("bench-dip",4,12,60),ex("pike-pushup",3,8,75),ex("plank",3,"30s",45)],{name:"TESTE: Max Pushups",target:20,unit:"reps",icon:"💪"}),
    2: day("Puxar C — Avaliação","#60A5FA",[ex("dead-hang",3,"20s",60),ex("scapular-pull",4,"20s",60),ex("inverted-row",4,8,90),ex("australian-pullup",3,4,90)],{name:"TESTE: Max Dead Hang",target:60,unit:"seg",icon:"🪝"}),
    3: rest("Descanso Ativo"),
    4: day("Pernas D — Avaliação","#4ADE80",[ex("squat",5,15,60),ex("lunge",4,10,60),ex("glute-bridge",4,20,45),ex("calf-raise",4,20,45)],{name:"TESTE: 200 Squats",target:200,unit:"reps",icon:"🏋️"}),
    5: day("Core D — Avaliação","#A855F7",[ex("plank",5,"30s",45),ex("side-plank",4,"25s",45),ex("dead-bug",4,12,45),ex("leg-raise",4,10,45)],{name:"TESTE: 3min Prancha",target:180,unit:"seg",icon:"🎯"}),
    6: day("Full Body Leve","#F59E0B",[ex("wall-pushup",3,10,45),ex("inverted-row",3,6,60),ex("squat",3,15,45),ex("plank",3,"20s",45)],null),
    0: rest("Descanso Total"),
  }},
};

// PHASE 2: Beginner (Weeks 5-12) 
const PHASE2: Record<number, WeekProgram> = {
  5: { theme:"Iniciante — Primeira Barra Real", days: {
    1: day("Push: Flexão Real!","#60A5FA",[ex("wrist-circles",2,"60s",30),ex("pushup",4,6,75),ex("dip",3,5,90),ex("pike-pushup",4,8,75),ex("plank",4,"30s",45)],{name:"30 Flexões",target:30,unit:"reps",icon:"💪"}),
    2: day("Pull: Barra Negativa!","#60A5FA",[ex("negative-pullup",4,4,120),ex("australian-pullup",4,8,90),ex("dead-hang",4,"20s",60)],{name:"20 Barras Negativas",target:20,unit:"reps",icon:"📉"}),
    3: rest("Mobilidade Ativa"),
    4: day("Pernas: Força Aumenta","#4ADE80",[ex("squat",4,15,60),ex("bulgarian-split",4,8,75),ex("jump-squat",3,10,60),ex("calf-raise",4,20,45)],{name:"250 Agachamentos",target:250,unit:"reps",icon:"🏋️"}),
    5: day("Core: Hollow Body","#A855F7",[ex("hollow-body",4,"20s",60),ex("plank",4,"40s",45),ex("hanging-leg-raise",3,8,60),ex("dragon-flag",3,4,90)],{name:"10min Prancha Total",target:600,unit:"seg",icon:"🎯"}),
    6: day("Full Body Moderado","#F59E0B",[ex("pushup",3,8,60),ex("australian-pullup",3,8,75),ex("squat",4,15,45),ex("plank",3,"30s",45)],null),
    0: rest("Descanso Total"),
  }},
  9: { theme:"Iniciante — 10 Barras é Possível!", days: {
    1: day("Push Intermediário A","#60A5FA",[ex("pushup",5,12,75),ex("diamond-pushup",4,8,90),ex("dip",4,8,90),ex("elevated-pike-pushup",4,8,90)],{name:"80 Flexões",target:80,unit:"reps",icon:"💪"}),
    2: day("Pull: 10 Barras!","#60A5FA",[ex("pullup",5,4,120),ex("chinup",4,6,90),ex("negative-pullup",4,6,120),ex("dead-hang",3,"30s",60)],{name:"PRIMEIRA VEZ: 10 Barras",target:10,unit:"reps",icon:"🏋️"}),
    3: rest("Mobilidade Profunda"),
    4: day("Pernas Avançando","#4ADE80",[ex("squat",5,20,60),ex("bulgarian-split",5,10,75),ex("jump-squat",4,15,60),ex("single-leg-calf-raise",4,15,45)],{name:"300 Agachamentos",target:300,unit:"reps",icon:"🏋️"}),
    5: day("Core Avançando","#A855F7",[ex("hollow-body",5,"25s",60),ex("l-sit",3,"10s",90),ex("hanging-leg-raise",4,10,60),ex("dragon-flag",4,5,90)],{name:"L-Sit 30s",target:30,unit:"seg",icon:"⊥"}),
    6: day("Full Body + Skills","#F59E0B",[ex("pushup",4,12,60),ex("pullup",4,4,90),ex("squat",4,20,45),ex("wall-handstand",5,"20s",60)],null),
    0: rest("Descanso Total"),
  }},
  12: { theme:"Iniciante Final — Consolidar Tudo", days: {
    1: day("Push Final Iniciante","#60A5FA",[ex("pushup",5,15,75),ex("diamond-pushup",5,10,90),ex("wide-pushup",4,12,75),ex("dip",5,10,90),ex("elevated-pike-pushup",4,10,90)],{name:"100 Flexões",target:100,unit:"reps",icon:"💪"}),
    2: day("Pull Final Iniciante","#60A5FA",[ex("pullup",6,5,120),ex("chinup",5,8,90),ex("close-grip-pullup",4,5,120),ex("dead-hang",3,"40s",60)],{name:"30 Barras",target:30,unit:"reps",icon:"🏋️"}),
    3: rest("Mobilidade"),
    4: day("Pernas Final Iniciante","#4ADE80",[ex("squat",5,20,60),ex("bulgarian-split",5,12,75),ex("jump-squat",5,15,60),ex("nordic-curl",3,8,90)],{name:"400 Agachamentos",target:400,unit:"reps",icon:"🏋️"}),
    5: day("Core Final Iniciante","#A855F7",[ex("hollow-body",5,"30s",60),ex("l-sit",4,"15s",90),ex("hanging-leg-raise",5,12,60),ex("dragon-flag",4,6,90)],{name:"L-Sit 1min Total",target:60,unit:"seg",icon:"⊥"}),
    6: day("Teste Final Fase 2","#F59E0B",[ex("pushup",4,20,60),ex("pullup",4,8,90),ex("squat",4,25,45),ex("wall-handstand",5,"30s",60)],null),
    0: rest("Descanso Total"),
  }},
};

// PHASE 3: Intermediate (Weeks 13-24)
const PHASE3: Record<number, WeekProgram> = {
  13: { theme:"Intermediário — Muscle-Up Negativo", days: {
    1: day("Push Intermediário","#F59E0B",[ex("pushup",5,20,75),ex("diamond-pushup",5,12,90),ex("archer-pushup",4,8,90),ex("elevated-pike-pushup",5,12,90),ex("dip",5,12,90)],{name:"150 Push Total",target:150,unit:"reps",icon:"💪"}),
    2: day("Pull: Muscle-Up Negativo!","#F59E0B",[ex("muscle-up-negative",4,4,180),ex("pullup",5,8,120),ex("commando-pullup",4,8,120),ex("front-lever-tuck",4,"10s",120)],{name:"Muscle-Up Neg 20",target:20,unit:"reps",icon:"📊"}),
    3: rest("Mobilidade Profunda"),
    4: day("Pernas Intermediário","#4ADE80",[ex("pistol-squat",4,4,120),ex("bulgarian-split",5,12,90),ex("nordic-curl",4,10,120),ex("jump-squat",4,20,75)],{name:"Pistol 20 Reps",target:20,unit:"reps",icon:"🔫"}),
    5: day("Core + Skills","#A855F7",[ex("front-lever-tuck",5,"15s",120),ex("l-sit",5,"20s",90),ex("dragon-flag",5,8,120),ex("hollow-body",4,"40s",60)],{name:"Front Lever Tuck 1min",target:60,unit:"seg",icon:"🌠"}),
    6: day("Handstand + Skill","#F59E0B",[ex("wall-handstand",8,"30s",90),ex("muscle-up-negative",4,5,180),ex("freestanding-handstand",8,"10s",120)],null),
    0: rest("Descanso Total"),
  }},
  20: { theme:"Intermediário — Handstand Livre", days: {
    1: day("Push Avançado A","#F59E0B",[ex("pushup",6,20,75),ex("archer-pushup",5,10,90),ex("diamond-pushup",5,15,90),ex("elevated-pike-pushup",5,15,90),ex("dip",5,15,90)],{name:"200 Push Total",target:200,unit:"reps",icon:"💪"}),
    2: day("Pull: Archer Pull-up","#F59E0B",[ex("pullup",6,10,120),ex("archer-pullup",4,6,150),ex("muscle-up-negative",5,5,180),ex("front-lever-tuck",5,"20s",120)],{name:"Archer Pullup 24",target:24,unit:"reps",icon:"🏹"}),
    3: rest("Mobilidade Profunda"),
    4: day("Pernas: Pistol Squat!","#4ADE80",[ex("pistol-squat",5,6,120),ex("shrimp-squat",4,5,120),ex("nordic-curl",5,10,120),ex("jump-squat",5,20,75)],{name:"Pistol 40 Reais",target:40,unit:"reps",icon:"🔫"}),
    5: day("Core: Front Lever","#A855F7",[ex("front-lever-tuck",6,"20s",120),ex("l-sit",5,"25s",90),ex("dragon-flag",5,10,120),ex("back-lever",3,"8s",150)],{name:"Front Lever Tuck 2min",target:120,unit:"seg",icon:"🌠"}),
    6: day("Handstand Livre!","#F59E0B",[ex("freestanding-handstand",10,"20s",120),ex("muscle-up-negative",5,6,180),ex("wall-handstand-pushup",4,8,120)],null),
    0: rest("Descanso Total"),
  }},
  24: { theme:"Intermediário Final — Pronto pra Elite", days: {
    1: day("Push Final Intermediário","#F59E0B",[ex("pushup",6,25,75),ex("archer-pushup",5,12,90),ex("explosive-pushup",4,12,90),ex("wall-handstand-pushup",4,8,120),ex("dip",6,18,90)],{name:"250 Push Total",target:250,unit:"reps",icon:"💪"}),
    2: day("Pull Final Intermediário","#F59E0B",[ex("pullup",6,12,120),ex("typewriter-pullup",4,6,150),ex("muscle-up-negative",5,6,180),ex("front-lever-tuck",6,"25s",120)],{name:"Typewriter 24",target:24,unit:"reps",icon:"⌨️"}),
    3: rest("Mobilidade Profunda"),
    4: day("Pernas Final Intermediário","#4ADE80",[ex("pistol-squat",5,8,120),ex("shrimp-squat",4,6,120),ex("nordic-curl",5,12,120),ex("jump-squat",5,25,75)],{name:"Pistol 50 Reais",target:50,unit:"reps",icon:"🔫"}),
    5: day("Core Final Intermediário","#A855F7",[ex("front-lever-tuck",6,"25s",120),ex("l-sit",6,"30s",90),ex("dragon-flag",6,12,120),ex("back-lever",4,"10s",150)],{name:"Front Lever Tuck 3min",target:180,unit:"seg",icon:"🌠"}),
    6: day("TESTE HABILIDADE","#F59E0B",[ex("freestanding-handstand",10,"30s",120),ex("human-flag-tuck",5,"8s",150),ex("muscle-up-negative",5,6,150)],null),
    0: rest("Descanso Total"),
  }},
};

// PHASE 4: Advanced (Weeks 25-40)
const PHASE4: Record<number, WeekProgram> = {
  25: { theme:"Avançado — Muscle-Up Real!", days: {
    1: day("Push Avançado A","#F97316",[ex("pseudo-planche-pushup",6,15,90),ex("archer-pushup",6,12,90),ex("wall-handstand-pushup",6,12,120),ex("clapping-pushup",5,12,120),ex("korean-dip",4,10,120),ex("dip",5,25,90)],{name:"200 Push Total",target:200,unit:"reps",icon:"💥"}),
    2: day("Pull: MUSCLE-UP!","#F97316",[ex("muscle-up",3,2,180),ex("muscle-up-negative",5,6,150),ex("pullup",5,15,90),ex("typewriter-pullup",5,8,120),ex("front-lever-tuck",5,"25s",120)],{name:"Muscle-Up 6 Reais",target:6,unit:"reps",icon:"👑"}),
    3: rest("Mobilidade Profunda"),
    4: day("Pernas Avançado A","#4ADE80",[ex("pistol-squat",6,10,120),ex("shrimp-squat",5,8,120),ex("nordic-curl",6,12,120),ex("jump-squat",5,20,90),ex("single-leg-calf-raise",6,25,60)],{name:"Pistol 70 Reais",target:70,unit:"reps",icon:"🔫"}),
    5: day("Core Avançado A","#A855F7",[ex("front-lever-tuck",6,"30s",120),ex("l-sit",6,"30s",90),ex("dragon-flag",6,12,120),ex("back-lever",4,"12s",150),ex("human-flag-tuck",4,"8s",150)],{name:"Front Lever Tuck 3min",target:180,unit:"seg",icon:"🌠"}),
    6: day("Skills Elite A","#F59E0B",[ex("freestanding-handstand",10,"35s",120),ex("wall-handstand-pushup",6,15,120),ex("human-flag-tuck",5,"10s",150),ex("muscle-up",3,3,180)],null),
    0: rest("Descanso Total"),
  }},
  32: { theme:"Avançado — Front Lever Progressão", days: {
    1: day("Push Avançado D","#F97316",[ex("wall-handstand-pushup",6,15,120),ex("pseudo-planche-pushup",6,20,90),ex("archer-pushup",6,15,90),ex("clapping-pushup",5,15,120),ex("korean-dip",5,12,120)],{name:"250 Push Total",target:250,unit:"reps",icon:"💥"}),
    2: day("Pull: Front Lever Progressão","#F97316",[ex("muscle-up",5,4,180),ex("front-lever-tuck",6,"30s",120),ex("typewriter-pullup",6,8,120),ex("archer-pullup",6,10,120),ex("back-lever",5,"15s",150)],{name:"Muscle-Up 20 Reais",target:20,unit:"reps",icon:"👑"}),
    3: rest("Mobilidade Profunda"),
    4: day("Pernas D — Shrimp Squat","#4ADE80",[ex("shrimp-squat",6,10,120),ex("pistol-squat",6,12,120),ex("nordic-curl",6,15,120),ex("jump-squat",6,20,90)],{name:"Shrimp Squat 30",target:30,unit:"reps",icon:"🦐"}),
    5: day("Core D — Front Lever Extendido","#A855F7",[ex("front-lever",3,"5s",180),ex("front-lever-tuck",6,"35s",120),ex("dragon-flag",6,15,120),ex("human-flag-tuck",5,"12s",150),ex("back-lever",5,"18s",150)],{name:"Front Lever Real 15s",target:15,unit:"seg",icon:"🌠"}),
    6: day("Skills Pro A","#F59E0B",[ex("freestanding-handstand",10,"45s",120),ex("front-lever",3,"5s",180),ex("human-flag-tuck",6,"12s",150),ex("muscle-up",4,5,180)],null),
    0: rest("Descanso Total"),
  }},
  40: { theme:"Avançado Final — Tudo Junto", days: {
    1: day("Push: Nível Elite","#F97316",[ex("wall-handstand-pushup",8,18,120),ex("pseudo-planche-pushup",8,20,90),ex("clapping-pushup",6,15,120),ex("archer-pushup",6,18,90),ex("korean-dip",6,15,120)],{name:"300 Push Total",target:300,unit:"reps",icon:"💥"}),
    2: day("Pull: Front Lever + Muscle-Up","#F97316",[ex("muscle-up",6,6,180),ex("front-lever",5,"8s",180),ex("typewriter-pullup",6,10,120),ex("archer-pullup",6,12,120),ex("back-lever",6,"20s",150)],{name:"Front Lever 40s",target:40,unit:"seg",icon:"🌠"}),
    3: rest("Mobilidade"),
    4: day("Pernas: Força Absoluta","#4ADE80",[ex("shrimp-squat",6,12,120),ex("pistol-squat",6,15,120),ex("nordic-curl",6,15,120),ex("jump-squat",6,25,90)],{name:"Shrimp Squat 60",target:60,unit:"reps",icon:"🦐"}),
    5: day("Core Máximo","#A855F7",[ex("front-lever",5,"10s",180),ex("dragon-flag",6,15,120),ex("human-flag-tuck",6,"15s",150),ex("back-lever",6,"20s",150),ex("l-sit",6,"35s",90)],{name:"Front Lever 50s",target:50,unit:"seg",icon:"🌠"}),
    6: day("Skills Pro Total","#F59E0B",[ex("freestanding-handstand",12,"50s",120),ex("front-lever",5,"10s",180),ex("human-flag-tuck",6,"15s",150),ex("muscle-up",5,8,180)],null),
    0: rest("Descanso Total"),
  }},
};

// PHASE 5: Pro (Weeks 41-52)
const PHASE5: Record<number, WeekProgram> = {
  41: { theme:"PRO — Skills de Ginasta", days: {
    1: day("Push PRO A","#A855F7",[ex("wall-handstand-pushup",8,20,120),ex("pseudo-planche-pushup",8,25,90),ex("clapping-pushup",6,18,120),ex("korean-dip",6,18,120),ex("archer-pushup",8,20,90)],{name:"300 Push PRO",target:300,unit:"reps",icon:"💥"}),
    2: day("Pull PRO A","#A855F7",[ex("muscle-up",6,8,180),ex("front-lever",6,"12s",180),ex("typewriter-pullup",6,12,120),ex("back-lever",6,"25s",150),ex("human-flag-tuck",6,"18s",150)],{name:"Front Lever 1min Total",target:72,unit:"seg",icon:"🌠"}),
    3: rest("Mobilidade Pro"),
    4: day("Pernas PRO A","#A855F7",[ex("shrimp-squat",8,15,120),ex("pistol-squat",8,15,120),ex("nordic-curl",8,15,120),ex("jump-squat",8,25,90)],{name:"Shrimp Squat 100",target:100,unit:"reps",icon:"🦐"}),
    5: day("Core PRO A","#A855F7",[ex("front-lever",6,"15s",180),ex("dragon-flag",8,18,120),ex("human-flag-tuck",6,"20s",150),ex("back-lever",6,"25s",150),ex("l-sit",6,"40s",90)],{name:"Skills Core 1h30",target:5400,unit:"seg",icon:"🌠"}),
    6: day("Skills PRO Total","#A855F7",[ex("freestanding-handstand",12,"60s",120),ex("front-lever",6,"15s",180),ex("human-flag-tuck",8,"20s",150),ex("muscle-up",6,10,180)],null),
    0: rest("Descanso Total"),
  }},
  48: { theme:"PRO Avançado — Elite Real", days: {
    1: day("Push PRO Elite","#A855F7",[ex("wall-handstand-pushup",10,20,120),ex("pseudo-planche-pushup",10,25,90),ex("clapping-pushup",8,20,120),ex("korean-dip",8,20,120)],{name:"350 Push Elite",target:350,unit:"reps",icon:"💥"}),
    2: day("Pull PRO Elite","#A855F7",[ex("muscle-up",8,10,180),ex("front-lever",6,"20s",180),ex("typewriter-pullup",8,12,120),ex("back-lever",8,"30s",150)],{name:"Muscle-Up 80 Total",target:80,unit:"reps",icon:"👑"}),
    3: rest("Mobilidade"),
    4: day("Pernas PRO Elite","#A855F7",[ex("shrimp-squat",10,15,120),ex("pistol-squat",10,15,120),ex("nordic-curl",8,18,120)],{name:"Shrimp 150 Total",target:150,unit:"reps",icon:"🦐"}),
    5: day("Core PRO Elite","#A855F7",[ex("front-lever",8,"20s",180),ex("dragon-flag",8,20,120),ex("human-flag-tuck",8,"25s",150),ex("back-lever",8,"30s",150)],{name:"Front Lever 2min Total",target:120,unit:"seg",icon:"🌠"}),
    6: day("Skills PRO Máximo","#A855F7",[ex("freestanding-handstand",15,"60s",120),ex("front-lever",8,"20s",180),ex("muscle-up",8,12,180),ex("human-flag-tuck",8,"25s",150)],null),
    0: rest("Descanso Total"),
  }},
  52: { theme:"🏆 SEMANA 52 — VOCÊ É PRO!", days: {
    1: day("CELEBRAÇÃO: Push Tudo","#A855F7",[ex("wall-handstand-pushup",10,25,120),ex("pseudo-planche-pushup",10,25,90),ex("clapping-pushup",8,20,120),ex("archer-pushup",8,20,90),ex("korean-dip",8,20,120),ex("dip",8,30,90)],{name:"400 Push Comemorativo",target:400,unit:"reps",icon:"🏆"}),
    2: day("CELEBRAÇÃO: Pull Tudo","#A855F7",[ex("muscle-up",10,10,180),ex("front-lever",8,"25s",180),ex("typewriter-pullup",8,12,120),ex("archer-pullup",8,12,120),ex("back-lever",8,"30s",150),ex("human-flag-tuck",6,"25s",150)],{name:"Muscle-Up 100 histórico",target:100,unit:"reps",icon:"👑"}),
    3: rest("Merecido Descanso"),
    4: day("CELEBRAÇÃO: Pernas Tudo","#A855F7",[ex("shrimp-squat",10,20,120),ex("pistol-squat",10,20,120),ex("nordic-curl",10,20,120),ex("jump-squat",8,30,90)],{name:"Pernas Lendário",target:200,unit:"reps",icon:"🦐"}),
    5: day("CELEBRAÇÃO: Core Tudo","#A855F7",[ex("front-lever",10,"25s",180),ex("dragon-flag",10,20,120),ex("human-flag-tuck",10,"25s",150),ex("back-lever",10,"30s",150),ex("l-sit",10,"45s",90)],{name:"Core Lendário Total",target:7200,unit:"seg",icon:"🌠"}),
    6: day("CELEBRAÇÃO: Skills Completo","#A855F7",[ex("freestanding-handstand",15,"60s",120),ex("front-lever",10,"25s",180),ex("muscle-up",10,15,180),ex("human-flag-tuck",10,"25s",150),ex("back-lever",8,"30s",150)],null),
    0: rest("Descanso — VOCÊ É PRO! 🏆"),
  }},
};

export const ALL_WEEKS: Record<number, WeekProgram> = { ...PHASE1, ...PHASE2, ...PHASE3, ...PHASE4, ...PHASE5 };

export function getWeekProgram(weekNum: number): WeekProgram {
  const keys = Object.keys(ALL_WEEKS).map(Number).sort((a, b) => a - b);
  let best = keys[0];
  for (const k of keys) {
    if (weekNum >= k) best = k;
    else break;
  }
  return ALL_WEEKS[best];
}

export interface PhaseInfo {
  id: string;
  name: string;
  weeks: [number, number];
  color: string;
  icon: string;
  goal: string;
}

export const PHASES_INFO: PhaseInfo[] = [
  { id:"foundation", name:"FUNDAÇÃO", weeks:[1,4], color:"#4ADE80", icon:"🌱", goal:"Aprender forma perfeita, hábito e base de força" },
  { id:"beginner", name:"INICIANTE", weeks:[5,12], color:"#60A5FA", icon:"⚡", goal:"Primeira barra fixa, 20 flexões, diário consistente" },
  { id:"intermediate", name:"INTERMEDIÁRIO", weeks:[13,24], color:"#F59E0B", icon:"🔥", goal:"10 barras, muscle-up negativo, handstand livre, pistol squat" },
  { id:"advanced", name:"AVANÇADO", weeks:[25,40], color:"#F97316", icon:"💪", goal:"Muscle-up limpo, front lever tuck, human flag tuck, shrimp squat" },
  { id:"pro", name:"PRO", weeks:[41,52], color:"#A855F7", icon:"🏆", goal:"Front lever completo, planche, human flag, freestanding handstand" },
];

export function getCurrentPhase(weekNum: number): PhaseInfo {
  return PHASES_INFO.find(p => weekNum >= p.weeks[0] && weekNum <= p.weeks[1]) || PHASES_INFO[0];
}

export interface AchievementDef {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export const ACHIEVEMENTS_DEF: AchievementDef[] = [
  { id:"first", name:"Primeiro Passo", desc:"Complete 1 treino", icon:"👟" },
  { id:"week1", name:"Semana Completa", desc:"6 treinos feitos", icon:"📅" },
  { id:"pushup10", name:"10 Flexões Seguidas", desc:"Marco iniciante", icon:"💪" },
  { id:"pushup20", name:"20 Flexões Seguidas", desc:"Iniciante sólido", icon:"🔥" },
  { id:"pushup50", name:"50 Flexões Seguidas", desc:"Impressionante", icon:"💥" },
  { id:"pullup1", name:"Primeira Barra Fixa", desc:"Momento histórico", icon:"⚡" },
  { id:"pullup5", name:"5 Barras Seguidas", desc:"Bom progresso", icon:"🏋️" },
  { id:"pullup10", name:"10 Barras Seguidas", desc:"Intermediário real", icon:"🌟" },
  { id:"pullup20", name:"20 Barras Seguidas", desc:"Elite das barras", icon:"👑" },
  { id:"plank60", name:"1 Min Prancha", desc:"Core de aço", icon:"🧱" },
  { id:"plank180", name:"3 Min Prancha", desc:"Core de titânio", icon:"🏰" },
  { id:"month1", name:"1 Mês Consistente", desc:"Hábito formado", icon:"📆" },
  { id:"month3", name:"3 Meses Guerreiro", desc:"Disciplina real", icon:"⚔️" },
  { id:"month6", name:"6 Meses Lendário", desc:"Você é diferente", icon:"🗡️" },
  { id:"week13", name:"Fase Intermediária", desc:"13 semanas concluídas", icon:"🎯" },
  { id:"week25", name:"Fase Avançada", desc:"25 semanas concluídas", icon:"🚀" },
  { id:"week52", name:"PRO COMPLETADO", desc:"52 semanas! VOCÊ É PRO!", icon:"🏆" },
  { id:"pistol", name:"Pistol Squat", desc:"Agachamento em 1 perna", icon:"🔫" },
  { id:"muscleup", name:"Muscle-Up Limpo", desc:"O objetivo de todos", icon:"👑" },
  { id:"handstand", name:"Handstand 30s Livre", desc:"Equilibrista real", icon:"🤸" },
  { id:"frontlever", name:"Front Lever", desc:"Ginasta de verdade", icon:"🌠" },
];
