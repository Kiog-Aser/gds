const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Add keyboard event listener
document.addEventListener('keydown', (e) => {
  // Only trigger if not typing in input fields
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.key === ' ') { // Space bar to flip card
    e.preventDefault();
    cardsEl[currentActiveCard].classList.toggle('show-answer');
  } else if (e.key === 'ArrowRight') { // Right arrow for next card
    nextBtn.click();
  } else if (e.key === 'ArrowLeft') { // Left arrow for previous card
    prevBtn.click();
  }
});

// The rest of your existing code below...
// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
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
// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event listeners

// Next button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Prev button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});


// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

{/*// Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
}); */}