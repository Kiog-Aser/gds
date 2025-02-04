const cardsContainer = document.getElementById('cards-container');
const timerEl = document.getElementById('timer');
const showTimerCheckbox = document.getElementById('show-timer');
const correctCountEl = document.getElementById('correct-count');
const wrongCountEl = document.getElementById('wrong-count');
const scoreModal = document.getElementById('score-modal');
const restartBtn = document.getElementById('restart-game');

// Spel status
let isGameActive = false;
let currentCardIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timeLeft = 180; // 3 minuten
let timerInterval = null;
const cardsEl = [];

const cardsData = [
  // === 1e verbuiging (silva) ===
  { 
    question: 'SILVA', 
    answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.' 
  },
  { 
    question: 'SILVAE', 
    answer: 'gen. vrwl. enk.<br>dat. vrwl. enk.<br>nom. vrwl. mv.<br>voc. vrwl. mv.' 
  },
  { 
    question: 'SILVAM', 
    answer: 'acc. vrwl. enk.' 
  },
  { 
    question: 'SILVĀ', 
    answer: 'abl. vrwl. enk.' 
  },
  { 
    question: 'SILVARUM', 
    answer: 'gen. vrwl. mv.' 
  },
  { 
    question: 'SILVAS', 
    answer: 'acc. vrwl. mv.' 
  },
  { 
    question: 'SILVIS', 
    answer: 'dat. vrwl. mv.<br>abl. vrwl. mv.' 
  },

  // === 2e verbuiging (servus) ===
  { 
    question: 'SERVUS', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
  },
  { 
    question: 'SERVE', 
    answer: 'voc. mnl. enk.' 
  },
  { 
    question: 'SERVI', 
    answer: 'gen. mnl. enk.<br>nom. mnl. mv.<br>voc. mnl. mv.' 
  },
  { 
    question: 'SERVUM', 
    answer: 'acc. mnl. enk.' 
  },
  { 
    question: 'SERVŌ', 
    answer: 'dat. mnl. enk.<br>abl. mnl. enk.' 
  },
  { 
    question: 'SERVORUM', 
    answer: 'gen. mnl. mv.' 
  },
  { 
    question: 'SERVOS', 
    answer: 'acc. mnl. mv.' 
  },
  { 
    question: 'SERVIS', 
    answer: 'dat. mnl. mv.<br>abl. mnl. mv.' 
  },

  // === 2e verbuiging (puer) ===
  { 
    question: 'PUER', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
  },
  { 
    question: 'PUERI', 
    answer: 'gen. mnl. enk.<br>nom. mnl. mv.<br>voc. mnl. mv.' 
  },
  { 
    question: 'PUERUM', 
    answer: 'acc. mnl. enk.' 
  },
  { 
    question: 'PUERŌ', 
    answer: 'dat. mnl. enk.<br>abl. mnl. enk.' 
  },
  { 
    question: 'PUERORUM', 
    answer: 'gen. mnl. mv.' 
  },
  { 
    question: 'PUEROS', 
    answer: 'acc. mnl. mv.' 
  },
  { 
    question: 'PUERIS', 
    answer: 'dat. mnl. mv.<br>abl. mnl. mv.' 
  },

  // === 2e verbuiging (templum) ===
  { 
    question: 'TEMPLUM', 
    answer: 'nom. onz. enk.<br>voc. onz. enk.<br>acc. onz. enk.' 
  },
  { 
    question: 'TEMPLI', 
    answer: 'gen. onz. enk.' 
  },
  { 
    question: 'TEMPLŌ', 
    answer: 'dat. onz. enk.<br>abl. onz. enk.' 
  },
  { 
    question: 'TEMPLA', 
    answer: 'nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
  },
  { 
    question: 'TEMPLORUM', 
    answer: 'gen. onz. mv.' 
  },
  { 
    question: 'TEMPLIS', 
    answer: 'dat. onz. mv.<br>abl. onz. mv.' 
  },

  // === 3e verbuiging (rex) ===
  { 
    question: 'REX', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
  },
  { 
    question: 'REGIS', 
    answer: 'gen. mnl. enk.' 
  },
  { 
    question: 'REGEM', 
    answer: 'acc. mnl. enk.' 
  },
  { 
    question: 'REGE', 
    answer: 'abl. mnl. enk.' 
  },
  { 
    question: 'REGES', 
    answer: 'nom. mnl. mv.<br>voc. mnl. mv.<br>acc. mnl. mv.' 
  },
  { 
    question: 'REGUM', 
    answer: 'gen. mnl. mv.' 
  },
  { 
    question: 'REGIBUS', 
    answer: 'dat. mnl. mv.<br>abl. mnl. mv.' 
  },
  // REGĪ → REGĪ (correctie macron)
  { 
    question: 'REGĪ', 
    answer: 'dat. mnl. enk.' 
  },

  // === 3e verbuiging (turris) ===
  { 
    question: 'TURRIS', 
    answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.<br>gen. vrwl. enk.' 
  },
  { 
    question: 'TURRIM', 
    answer: 'acc. vrwl. enk.' 
  },
  { 
    question: 'TURRĪ', 
    answer: 'dat. vrwl. enk.<br>abl. vrwl. enk.' 
  },
  { 
    question: 'TURRĒS', 
    answer: 'nom. vrwl. mv.<br>voc. vrwl. mv.' 
  },
  { 
    question: 'TURRIUM', 
    answer: 'gen. vrwl. mv.' 
  },
  { 
    question: 'TURRIBUS', 
    answer: 'dat. vrwl. mv.<br>abl. vrwl. mv.' 
  },

  // === 3e verbuiging (corpus) ===
  { 
    question: 'CORPUS', 
    answer: 'nom. onz. enk.<br>voc. onz. enk.<br>acc. onz. enk.'  // Samengevoegd
  },
  { 
    question: 'CORPORIS', 
    answer: 'gen. onz. enk.' 
  },
  { 
    question: 'CORPORĪ', 
    answer: 'dat. onz. enk.' 
  },
  { 
    question: 'CORPORE', 
    answer: 'abl. onz. enk.' 
  },
  { 
    question: 'CORPORA', 
    answer: 'nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
  },
  { 
    question: 'CORPORUM', 
    answer: 'gen. onz. mv.' 
  },
  { 
    question: 'CORPORIBUS', 
    answer: 'dat. onz. mv.<br>abl. onz. mv.' 
  },

  // === 4e verbuiging (cornu) ===
  { 
    question: 'CORNU', 
    answer: 'nom. onz. enk.<br>voc. onz. enk.<br>acc. onz. enk.' 
  },
  { 
    question: 'CORNŪS', 
    answer: 'gen. onz. enk.' 
  },
  { 
    question: 'CORNŪ', 
    answer: 'dat. onz. enk.<br>abl. onz. enk.' 
  },
  { 
    question: 'CORNUA', 
    answer: 'nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
  },
  { 
    question: 'CORNUUM', 
    answer: 'gen. onz. mv.' 
  },
  { 
    question: 'CORNIBUS', 
    answer: 'dat. onz. mv.<br>abl. onz. mv.' 
  },

  // === 5e verbuiging (res) ===
  { 
    question: 'RES', 
    answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.' 
  },
  { 
    question: 'REI', 
    answer: 'gen. vrwl. enk.<br>dat. vrwl. enk.' 
  },
  { 
    question: 'REM', 
    answer: 'acc. vrwl. enk.' 
  },
  { 
    question: 'RĒ', 
    answer: 'abl. vrwl. enk.' 
  },
  { 
    question: 'RERUM', 
    answer: 'gen. vrwl. mv.' 
  },
  { 
    question: 'REBUS', 
    answer: 'dat. vrwl. mv.<br>abl. vrwl. mv.' 
  },

    { 
      question: 'LONGUS', 
      answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
    },
    { 
      question: 'LONGE', 
      answer: 'voc. mnl. enk.' 
    },
    { 
      question: 'LONGĪ', 
      answer: 'gen. mnl. enk.<br>nom. mnl. mv.<br>voc. mnl. mv.<br>gen. onz. enk.' 
    },
    { 
      question: 'LONGUM', 
      answer: 'acc. mnl. enk.<br>nom. onz. enk.<br>voc. onz. enk.<br>acc. onz. enk.' 
    },
    { 
      question: 'LONGŌ', 
      answer: 'dat. mnl. enk.<br>abl. mnl. enk.' 
    },
    { 
      question: 'LONGŌRUM', 
      answer: 'gen. mnl. mv.<br>gen. onz. mv.' 
    },
    { 
      question: 'LONGŌS', 
      answer: 'acc. mnl. mv.' 
    },
    // LONGĪS samengevoegd
    { 
      question: 'LONGĪS', 
      answer: 'dat. mnl. mv.<br>abl. mnl. mv.<br>dat. vrwl. mv.<br>abl. vrwl. mv.<br>dat. onz. mv.<br>abl. onz. mv.' 
    },  
    { 
      question: 'LONGA', 
      answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.<br>nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
    },
    { 
      question: 'LONGAE', 
      answer: 'gen. vrwl. enk.<br>dat. vrwl. enk.<br>nom. vrwl. mv.<br>voc. vrwl. mv.' 
    },
    { 
      question: 'LONGAM', 
      answer: 'acc. vrwl. enk.' 
    },
    { 
      question: 'LONGĀ', 
      answer: 'abl. vrwl. enk.' 
    },
    { 
      question: 'LONGĀRUM', 
      answer: 'gen. vrwl. mv.' 
    },
    { 
      question: 'LONGĀS', 
      answer: 'acc. vrwl. mv.' 
    },

    // === Adjectieven (ingens) ===
    // INGENS samengevoegd
    { 
      question: 'INGENS', 
      answer: 'nom. mnl. enk.<br>voc. mnl. enk.<br>nom. vrwl. enk.<br>voc. vrwl. enk.<br>nom. onz. enk.<br>voc. onz. enk.<br>acc. onz. enk.' 
    },
    { 
      question: 'INGENTIS', 
      answer: 'gen. mnl. enk.<br>gen. vrwl. enk.<br>gen. onz. enk.' 
    },
    { 
      question: 'INGENTĪ', 
      answer: 'dat. mnl. enk.<br>dat. vrwl. enk.<br>dat. onz. enk.' 
    },
    { 
      question: 'INGENTEM', 
      answer: 'acc. mnl. enk.<br>acc. vrwl. enk.' 
    },
    { 
      question: 'INGENTĒS', 
      answer: 'nom. mnl. mv.<br>voc. mnl. mv.<br>nom. vrwl. mv.<br>voc. vrwl. mv.<br>acc. mnl. mv.' 
    },
    { 
      question: 'INGENTIA', 
      answer: 'nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
    },

    // === Adjectieven (dulcis) ===
  // DULCIS samengevoegd (2 entries)
  { 
    question: 'DULCIS', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.<br>nom. vrwl. enk.<br>voc. vrwl. enk.<br>gen. mnl. enk.<br>gen. vrwl. enk.<br>gen. onz. enk.' 
  },
    { 
      question: 'DULCE', 
      answer: 'nom. onz. enk.<br>voc. onz. enk.<br>acc. onz. enk.' 
    },
    { 
      question: 'DULCĪ', 
      answer: 'dat. mnl. enk.<br>dat. vrwl. enk.<br>dat. onz. enk.' 
    },
    { 
      question: 'DULCEM', 
      answer: 'acc. mnl. enk.<br>acc. vrwl. enk.' 
    },
    { 
      question: 'DULCĒS', 
      answer: 'nom. mnl. mv.<br>voc. mnl. mv.<br>nom. vrwl. mv.<br>voc. vrwl. mv.' 
    },
    { 
      question: 'DULCIA', 
      answer: 'nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
    },
    { 
      question: 'DULCIUM', 
      answer: 'gen. mnl. mv.<br>gen. vrwl. mv.<br>gen. onz. mv.' 
    },

    // === Adjectieven (celer) ===
    { 
      question: 'CELER', 
      answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
    },
    { 
      question: 'CELERIS', 
      answer: 'gen. mnl. enk.<br>nom. vrwl. enk.<br>voc. vrwl. enk.<br>gen. vrwl. enk.<br>gen. onz. enk.' 
    },
    { 
      question: 'CELERĪ', 
      answer: 'dat. mnl. enk.<br>dat. vrwl. enk.<br>dat. onz. enk.' 
    },
    { 
      question: 'CELEREM', 
      answer: 'acc. mnl. enk.<br>acc. vrwl. enk.' 
    },
    { 
      question: 'CELERE', 
      answer: 'nom. onz. enk.<br>voc. onz. enk.<br>acc. onz. enk.' 
    },
    { 
      question: 'CELERĒS', 
      answer: 'nom. mnl. mv.<br>voc. mnl. mv.<br>nom. vrwl. mv.<br>voc. vrwl. mv.' 
    },
    { 
      question: 'CELERIA', 
      answer: 'nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
    },

  // === Persoonlijke voornaamwoorden ===
  { 
    question: 'TU', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
  },
  { 
    question: 'TUĪ', 
    answer: 'gen. mnl. enk.' 
  },
  { 
    question: 'TIBI', 
    answer: 'dat. mnl. enk.' 
  },
  { 
    question: 'TĒ', 
    answer: 'acc. mnl. enk.<br>abl. mnl. enk.' 
  },
  { 
    question: 'SUĪ', 
    answer: 'gen. mnl. enk.<br>gen. mv. enk.' 
  },
  { 
    question: 'SIBI', 
    answer: 'dat. mnl. enk.' 
  },
  // SĒ samengevoegd
  { 
    question: 'SĒ', 
    answer: 'acc. mnl. enk.<br>abl. mnl. enk.<br>acc. mnl. mv.<br>abl. mnl. mv' 
  }
  ,
  { 
    question: 'NŌS', 
    answer: 'nom. mnl. mv.<br>voc. mnl. mv.<br>acc. mnl. mv.' 
  },
  { 
    question: 'NOSTRĪ', 
    answer: 'gen. mnl. mv.' 
  },
  { 
    question: 'NŌBĪS', 
    answer: 'dat. mnl. mv.<br>abl. mnl. mv.' 
  },
  { 
    question: 'VŌS', 
    answer: 'nom. mnl. mv.<br>voc. mnl. mv.<br>acc. mnl. mv.' 
  },
  { 
    question: 'VESTRĪ', 
    answer: 'gen. mnl. mv.' 
  },
  { 
    question: 'VŌBĪS', 
    answer: 'dat. mnl. mv.<br>abl. mnl. mv.' 
  },

  // === Aanwijzende voornaamwoorden ===
  // Hic
  { 
    question: 'HIC', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
  },
  { 
    question: 'HAEC', 
    answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.<br>nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
  },
  { 
    question: 'HOC', 
    answer: 'nom. onz. enk.<br>voc. onz. enk.' 
  },
  { 
    question: 'HUIUS', 
    answer: 'gen. mnl. enk.<br>gen. vrwl. enk.<br>gen. onz. enk.' 
  },
  { 
    question: 'HUIC', 
    answer: 'dat. mnl. enk.<br>dat. vrwl. enk.<br>dat. onz. enk.' 
  },
  { 
    question: 'HŌC', 
    answer: 'abl. mnl. enk.<br>abl. onz. enk.' 
  },
  { 
    question: 'HĀC', 
    answer: 'abl. vrwl. enk.' 
  },

  // Iste
  { 
    question: 'ISTE', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
  },
  { 
    question: 'ISTA', 
    answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.' 
  },
  { 
    question: 'ISTUD', 
    answer: 'nom. onz. enk.<br>voc. onz. enk.' 
  },
  { 
    question: 'ISTIUS', 
    answer: 'gen. mnl. enk.<br>gen. vrwl. enk.<br>gen. onz. enk.' 
  },
  { 
    question: 'ISTĪ', 
    answer: 'dat. mnl. enk.<br>nom. mnl. mv.<br>voc. mnl. mv.<br>dat. vrwl. enk.<br>dat. onz. enk.' 
  },
  { 
    question: 'ISTŌ', 
    answer: 'abl. mnl. enk.<br>abl. onz. enk.' 
  },
  { 
    question: 'ISTĀ', 
    answer: 'abl. vrwl. enk.' 
  },

  // Ille
  { 
    question: 'ILLE', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
  },
  { 
    question: 'ILLA', 
    answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.<br>nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
  },
  { 
    question: 'ILLUD', 
    answer: 'nom. onz. enk.<br>voc. onz. enk.' 
  },
  { 
    question: 'ILLIUS', 
    answer: 'gen. mnl. enk.<br>gen. vrwl. enk.<br>gen. onz. enk.' 
  },
  { 
    question: 'ILLĪ', 
    answer: 'dat. mnl. enk.<br>nom. mnl. mv.<br>voc. mnl. mv.<br>dat. vrwl. enk.<br>dat. onz. enk.' 
  },
  { 
    question: 'ILLŌ', 
    answer: 'abl. mnl. enk.<br>abl. onz. enk.' 
  },
  { 
    question: 'ILLĀ', 
    answer: 'abl. vrwl. enk.' 
  },

  // Ipse
  { 
    question: 'IPSE', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
  },
  { 
    question: 'IPSA', 
    answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.<br>nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
  },
  { 
    question: 'IPSUM', 
    answer: 'acc. mnl. enk.<br>nom. onz. enk.<br>voc. onz. enk.<br>acc. mnl. enk.' 
  },
  { 
    question: 'IPSĪUS', 
    answer: 'gen. mnl. enk.<br>gen. vrwl. enk.<br>gen. onz. enk.' 
  },
  { 
    question: 'IPSĪ', 
    answer: 'dat. mnl. enk.<br>nom. mnl. mv.<br>voc. mnl. mv.<br>dat. vrwl. enk.<br>dat. onz. enk.' 
  },
  { 
    question: 'IPSŌ', 
    answer: 'abl. mnl. enk.<br>abl. onz. enk.' 
  },
  { 
    question: 'IPSĀ', 
    answer: 'abl. vrwl. enk.' 
  },

  // Idem
  { 
    question: 'IDEM', 
    answer: 'nom. mnl. enk.<br>voc. mnl. enk.<br>nom. onz. enk.<br>voc. onz. enk.<br>acc. onz. enk.' 
  },
  { 
    question: 'EADEM', 
    answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.' 
  },
  { 
    question: 'EIVSDEM', 
    answer: 'gen. mnl. enk.<br>gen. vrwl. enk.<br>gen. onz. enk.' 
  },
  { 
    question: 'EIDEM', 
    answer: 'dat. mnl. enk.<br>dat. vrwl. enk.<br>dat. onz. enk.' 
  },
  { 
    question: 'EŌDEM', 
    answer: 'abl. mnl. enk.<br>abl. onz. enk.' 
  },
  { 
    question: 'EĀDEM', 
    answer: 'abl. vrwl. enk.' 
  },

  // === Betrekkelijke voornaamwoorden ===
  { 
    question: 'QUĪ', 
    answer: 'nom. mnl. mv.<br>voc. mnl. mv.' 
  },
  { 
    question: 'QUAE', 
    answer: 'nom. vrwl. enk.<br>voc. vrwl. enk.<br>nom. vrwl. mv.<br>voc. vrwl. mv.<br>nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
  },
  { 
    question: 'QUOD', 
    answer: 'nom. onz. enk.<br>voc. onz. enk.' 
  },
  { 
    question: 'CVI', 
    answer: 'dat. mnl. enk.<br>dat. vrwl. enk.<br>dat. onz. enk.' 
  },
  { 
    question: 'QVĀ', 
    answer: 'abl. vrwl. enk.' 
  },
  // QUŌ → QUŌ (macron)
  { 
    question: 'QVŌ', 
    answer: 'abl. mnl. enk.<br>abl. onz. enk.' 
  },
    { 
      question: 'MENSIS', 
      answer: 'nom. mnl. enk.<br>voc. mnl. enk.<br>gen. mnl. enk.' 
    },
    { 
      question: 'MENSEM', 
      answer: 'acc. mnl. enk.' 
    },
    { 
      question: 'MENSĪ', 
      answer: 'dat. mnl. enk.' 
    },
    { 
      question: 'MENSE', 
      answer: 'abl. mnl. enk.' 
    },
    { 
      question: 'MENSĒS', 
      answer: 'nom. mnl. mv.<br>voc. mnl. mv.<br>acc. mnl. mv.' 
    },
    { 
      question: 'MENSIUM', 
      answer: 'gen. mnl. mv.' 
    },
    { 
      question: 'MENSIBUS', 
      answer: 'dat. mnl. mv.<br>abl. mnl. mv.' 
    },

    // === 3e verbuiging (animal) ===
    { 
      question: 'ANIMAL', 
      answer: 'nom. onz. enk.<br>voc. onz. enk.<br>acc. onz. enk.' 
    },
    { 
      question: 'ANIMALIS', 
      answer: 'gen. onz. enk.' 
    },
    { 
      question: 'ANIMALĪ', 
      answer: 'dat. onz. enk.' 
    },
    { 
      question: 'ANIMALE', 
      answer: 'abl. onz. enk.' 
    },
    { 
      question: 'ANIMALIA', 
      answer: 'nom. onz. mv.<br>voc. onz. mv.<br>acc. onz. mv.' 
    },
    { 
      question: 'ANIMALIUM', 
      answer: 'gen. onz. mv.' 
    },
    { 
      question: 'ANIMALIBUS', 
      answer: 'dat. onz. mv.<br>abl. onz. mv.' 
    },

    // === 4e verbuiging (motus) ===
    { 
      question: 'MOTŪS', 
      answer: 'nom. mnl. enk.<br>voc. mnl. enk.' 
    },
    { 
      question: 'MOTŪS', 
      answer: 'gen. mnl. enk.' 
    },
    { 
      question: 'MOTUĪ', 
      answer: 'dat. mnl. enk.' 
    },
    { 
      question: 'MOTUM', 
      answer: 'acc. mnl. enk.' 
    },
    { 
      question: 'MOTŪ', 
      answer: 'abl. mnl. enk.' 
    },
    { 
      question: 'MOTŪS', 
      answer: 'nom. mnl. mv.<br>voc. mnl. mv.' 
    },
    { 
      question: 'MOTUUM', 
      answer: 'gen. mnl. mv.' 
    },
    { 
      question: 'MOTIBUS', 
      answer: 'dat. mnl. mv.<br>abl. mnl. mv.' 
    },
      // CORRECTIES: CVIVS → CUIUS
      { 
        question: 'CUIUS', 
        answer: 'gen. mnl. enk.<br>gen. vrwl. enk.<br>gen. onz. enk.' 
      },
];


// Initialiseer het spel
function initGame() {
    cardsData.forEach((data, index) => {
        const card = document.createElement('div');
        card.className = `card ${index === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <div class="inner-card">
                <div class="inner-card-front">
                    <p>${data.question}</p>
                </div>
                <div class="inner-card-back">
                    <p>${data.answer}</p>
                </div>
            </div>
        `;
        cardsEl.push(card);
        cardsContainer.appendChild(card);
    });
}

// Nieuwe shuffle functie
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Aangepaste initGame functie
function initGame() {
    // Maak een kopie van de originele array en shuffle
    const shuffledCards = [...cardsData];
    shuffleArray(shuffledCards);

    shuffledCards.forEach((data, index) => {
        const card = document.createElement('div');
        card.className = `card ${index === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <div class="inner-card">
                <div class="inner-card-front">
                    <p>${data.question}</p>
                </div>
                <div class="inner-card-back">
                    <p>${data.answer}</p>
                </div>
            </div>
        `;
        cardsEl.push(card);
        cardsContainer.appendChild(card);
    });
}

// Pas de startGame functie aan om elke keer opnieuw te shufflen
function startGame() {
    isGameActive = true;
    currentCardIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    timeLeft = 180;

    // Reset en shuffle kaarten
    cardsContainer.innerHTML = '';
    cardsEl.length = 0;
    initGame();

    // ... rest van de functie blijft hetzelfde ..

    updateScoreDisplay();
    updateTimerDisplay();
    showTimerCheckbox.checked = true;

    cardsEl.forEach(card => {
        card.classList.remove('show-answer', 'active');
        card.style.display = 'none';
    });

    cardsEl[0].style.display = 'block';
    cardsEl[0].classList.add('active');

    timerInterval = setInterval(updateTimer, 1000);
}

// Timer update
function updateTimer() {
    if (!isGameActive) return;

    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) endGame();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerEl.textContent = `${minutes}:${seconds}`;
    timerEl.style.visibility = showTimerCheckbox.checked ? 'visible' : 'hidden';
}

// Score update
function updateScoreDisplay() {
    correctCountEl.textContent = correctAnswers;
    wrongCountEl.textContent = wrongAnswers;
}

// Volgende kaart
function showNextCard() {
    if (currentCardIndex >= cardsEl.length - 1) {
        endGame();
        return;
    }

    cardsEl[currentCardIndex].classList.remove('active');
    currentCardIndex++;
    cardsEl[currentCardIndex].style.display = 'block';
    cardsEl[currentCardIndex].classList.add('active');
}

// Einde spel
function endGame() {
    isGameActive = false;
    clearInterval(timerInterval);

    document.getElementById('total-cards').textContent = currentCardIndex + 1;
    document.getElementById('final-correct').textContent = correctAnswers;
    document.getElementById('final-wrong').textContent = wrongAnswers;

    scoreModal.style.display = 'flex';
}

document.addEventListener('keydown', (e) => {
    if (!isGameActive) return;

    // Spatiebalk voor flip
    if (e.code === 'Space') {
        e.preventDefault();
        const currentCard = cardsEl[currentCardIndex];
        currentCard.classList.toggle('show-answer');
    }

    // Bestaande sneltoetsen
    switch(e.key.toLowerCase()) {
        case 'c':
            correctAnswers++;
            showNextCard();
            break;
        case 'f':
            wrongAnswers++;
            showNextCard();
            break;
        case 'n':
            showNextCard();
            break;
    }
    updateScoreDisplay();
});

document.getElementById('correct').addEventListener('click', () => {
    correctAnswers++;
    updateScoreDisplay();
    showNextCard();
});

document.getElementById('wrong').addEventListener('click', () => {
    wrongAnswers++;
    updateScoreDisplay();
    showNextCard();
});

document.getElementById('skip').addEventListener('click', showNextCard);

restartBtn.addEventListener('click', () => {
    scoreModal.style.display = 'none';
    startGame();
});

// Initialisatie
initGame();
startGame();