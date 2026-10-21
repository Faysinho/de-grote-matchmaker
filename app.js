const candidates = [
  { name: 'Hussam', photo: 'hussam.jpg', bio: '22 jaar · 1m86 · buzzcut · gespierd & Syrische passie', detail: 'Vol energie, beschermend en met een warm hart. Hij brengt vuur én familiegevoel mee.' },
  { name: 'Vefa', photo: 'vefa.jpg', bio: '21 jaar · 1m93 · volle baard · gespierd & stevig gebouwd', detail: 'Een rustige rots in de branding: galant, bedachtzaam en altijd gastvrij.' },
  { name: 'Pascal', photo: 'pascal.jpg', bio: '23 jaar · 1m78 · short afro · atletisch & stijlvol', detail: 'Spontaan, stijlvol en relaxed. Met Pascal voelt zelfs een omweg als avontuur.' }
];

const questions = [
  { category: 'Gastvrijheid & eten', title: 'Je komt ’s avonds hongerig aan bij zijn familie. Hoe ziet de maaltijd eruit?', answers: [
    'Een gigantische tafel vol Syrische mezze en kibbeh. Je bord wordt 4x opnieuw opgeschept en als je vol zit, reageert hij licht dramatisch.',
    'Heerlijke çay en verse börek. Gastvrij, respectvol, en er wordt gestreden om wie het eten mag betalen.',
    'Een grote, gezellige BBQ met muziek op de achtergrond. “No stress” en iedereen staat te dansen.'
  ]},
  { category: 'Jaloersheid & bescherming', title: 'Iemand op een feestje staart iets te lang naar jou. Hoe reageert hij?', answers: [
    'Hij staat meteen op, loopt er direct op af met een strakke blik en vraagt: “Is er een probleem of zo?”',
    'Hij legt rustig zijn arm om je heen, kijkt de persoon kort en zelfverzekerd aan, maar blijft galant.',
    'Hij lacht het weg: “Laat hem kijken, jij bent toch met mij hier?” en trekt je mee de dansvloer op.'
  ]},
  { category: 'Lengte & postuur', title: 'Wat is jouw ideale lengte en postuur in een man?', answers: [
    'Een gespierde gast van rond de 1m86 met een strak fysiek.',
    'Een hele lange, gespierde en indrukwekkende gast van boven de 1m90 (1m93).',
    'Een atletische, stevig gebouwde man van gemiddelde lengte (1m78).'
  ]},
  { category: 'Discussie & mening', title: 'Jullie hebben een meningsverschil over iets politieks of maatschappelijks. Hoe verloopt het gesprek?', answers: [
    'Een vurige, intense discussie waarin hij zijn mening met 200% passie verdedigt.',
    'Een diepgaand, doordacht gesprek waarin hij rustig naar jouw standpunt luistert en met sterke argumenten komt.',
    'Hij lacht en zegt: “Waar maken we ons druk om? Het leven is te kort, laten we wat leuks doen.”'
  ]},
  { category: 'Haarstijl', title: 'Kies jouw favoriete kapsel bij een man:', answers: [
    'Een hele strakke, korte buzzcut.', 'Een verse, moderne burst fade.', 'Een stijlvolle, korte afro.'
  ]},
  { category: 'Gezichtsbeharing & grooming', title: 'Wat zie jij het liefste qua baardgroei?', answers: [
    'Een stijlvol sikje gecombineerd met een snor.', 'Een volle, strak onderhouden baard.', 'Gladgeschoren (clean shave) met een frisse uitstraling.'
  ]},
  { category: 'Jouw karakter op een feestje', title: 'Als jij op een druk feestje bent, waar kunnen we jou meestal vinden?', answers: [
    'In het centrum van de ruimte, luidkeels aan het praten en lachen met de grootste groep.',
    'In een rustigere hoek, in een diep en goed gesprek met een klein groepje.',
    'Midden op de dansvloer, de sfeer aan het maken met de beste moves.'
  ]},
  { category: 'Jouw vrije tijd & energie', title: 'Hoe laad jij je batterij het liefste op na een drukke week?', answers: [
    'Lekker uitgebreid gaan eten, shisha doen en onder de mensen zijn tot laat.',
    'Thuis tot rust komen met een goeie film, thee en een opgeruimd huis.',
    'Eropuit gaan, muziek luisteren, spontane dingen doen en meegaan met de flow.'
  ]},
  { category: 'Conflictbeheersing', title: 'Als er een klein misverstand ontstaat in een relatie, hoe reageer jij?', answers: [
    'Ik gooi het er meteen met passie uit, we praten het direct en hardop uit!',
    'Ik blijf kalm, denk er even over na en wil er rustig en vol respect over praten.',
    'Ik maak me niet snel druk, schud het van me af en zoek meteen naar een chille oplossing.'
  ]},
  { category: 'Het stress-dilemma', title: 'Er gaat iets helemaal mis tijdens het reizen (bijv. een gemiste vlucht). Hoe reageert hij?', answers: [
    'Hij wordt eerst heel druk en theatraal boos op de situatie, maar regelt daarna wel meteen een oplossing.',
    'Hij blijft heel kalm, analyseert rustig de opties en regelt beheerst een nieuw hotel/ticket.',
    'Hij schiet in de lach, zegt “No stress” en maakt er ter plekke een nieuw avontuur van.'
  ]}
];

const app = document.querySelector('#app');
let questionIndex = 0;
let picks = Array(questions.length).fill(null);
let transitionTimer;

function renderLanding() {
  app.innerHTML = `<section class="screen hero">
    <div class="hero-copy"><div class="eyebrow">Een quiz vol vlinders</div>
      <h1>De Grote<br><span class="gradient-text">Matchmaker</span></h1>
      <p>Welke van de 3 is jouw Droomman? Beantwoord 10 vragen over jezelf en jouw droomman, en ontdek wie van het trio jouw perfecte match is.</p>
      <button class="button" id="start">Start de Matchmaker <span class="arrow">→</span></button>
      <div class="hero-meta"><span class="avatar-dots"><i></i><i></i><i></i></span> 10 vragen <span>·</span> 3 mysterieuze matches <span>·</span> 2 min</div>
    </div>
    <div class="silhouette-stage" aria-label="Drie mysterieuze anonieme silhouetten"><span class="stage-tag">Wie wordt jouw match?</span><span class="stage-star s1">✦</span><span class="stage-star s2">✧</span><span class="stage-star s3">✦</span><div class="stage-glow"></div>
      ${[0,1,2].map((n)=>`<div class="silhouette" aria-hidden="true"><span class="hair"></span><span class="head"></span><span class="spark left"></span><span class="spark right"></span><span class="body"></span></div>`).join('')}
    </div>
  </section>`;
  document.querySelector('#start').addEventListener('click', () => { questionIndex = 0; picks = Array(questions.length).fill(null); renderQuestion(); });
}

function renderQuestion() {
  const q = questions[questionIndex];
  app.innerHTML = `<section class="screen quiz-card">
    <div class="quiz-top"><span class="q-count">Vraag ${questionIndex + 1} van ${questions.length}</span><span class="q-category">${q.category}</span></div>
    <div class="progress-track" role="progressbar" aria-label="Quizvoortgang" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${questionIndex + 1}"><div class="progress-fill" style="width:${(questionIndex + 1) * 10}%"></div></div>
    <h1 class="question-title">${q.title}</h1><p class="question-sub">Kies het antwoord dat het beste bij jou past.</p>
    <div class="answer-list">${q.answers.map((answer,i)=>`<button class="answer-card" data-answer="${i}"><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${answer}</span><span class="answer-icon">↗</span></button>`).join('')}</div>
    <div class="quiz-bottom"><button class="back-button" id="back" ${questionIndex === 0 ? 'disabled' : ''}>← Vorige vraag</button><span class="tiny-note">Jouw antwoorden blijven privé ♡</span></div>
  </section>`;
  document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => chooseAnswer(Number(button.dataset.answer))));
  document.querySelector('#back').addEventListener('click', () => { if (questionIndex > 0) { questionIndex--; renderQuestion(); } });
}

function chooseAnswer(answerIndex) {
  picks[questionIndex] = answerIndex;
  if (questionIndex < questions.length - 1) { questionIndex++; renderQuestion(); }
  else renderLoading();
}

function renderLoading() {
  app.innerHTML = `<section class="screen loading-card"><div class="loader-wrap"><div class="loader-ring"></div><div class="loader-heart">♥</div></div><h1 class="loading-title">De Matchmaker rekent...</h1><p class="loading-copy">Jouw droomman wordt gekozen!</p><div class="loading-dots">● ● ●</div></section>`;
  transitionTimer = window.setTimeout(renderResults, 3000);
}

function renderResults() {
  const scores = candidates.map((candidate,index)=>({ ...candidate, score: picks.filter(pick => pick === index).length, originalIndex:index }))
    .sort((a,b)=>b.score-a.score || a.originalIndex-b.originalIndex);
  const top = scores[0];
  const tied = scores.filter(item => item.score === top.score).length > 1;
  app.innerHTML = `<div class="screen results"><span class="result-kicker">✦ &nbsp; jouw match is bekend &nbsp; ✦</span><h1 class="result-title">Jouw droomman is<br><span class="gradient-text">${top.name}!</span></h1><p class="result-intro">Jullie klik? Die spat van het scherm. Dit is jouw uitslag op basis van je antwoorden.</p>
    <article class="result-card"><div class="winner-photo-wrap"><img src="${top.photo}" alt="${top.name}"/><span class="winner-ribbon">${tied ? 'JOUW TOPMATCH' : 'NUMMER 1 · JOUW MATCH'}</span></div><div class="winner-info"><div class="eyebrow">${tied ? 'Een gedeelde eerste plek' : 'De grote winnaar'}</div><h2>${top.name}</h2><span class="match-pill"><span class="heart">♥</span> ${top.score * 10}% match</span><p class="winner-bio"><strong>${top.bio}</strong><br>${top.detail}</p><div class="score-line"><span style="width:${top.score * 10}%"></span></div></div></article>
    <div class="ranking-label"><span>De rest van het trio</span><span>Jouw matchscore</span></div><div class="runner-grid">${scores.slice(1).map(person=>`<article class="runner-card"><div class="runner-image"><img src="${person.photo}" alt="${person.name}"/></div><div class="runner-info"><h3>${person.name}</h3><p>${person.bio}</p><div class="runner-score">♥ &nbsp;${person.score * 10}% match</div></div></article>`).join('')}</div>
    <button class="button restart-button" id="restart">Opnieuw testen <span class="arrow">↻</span></button></div><div class="confetti" aria-hidden="true">${Array.from({length:72},(_,i)=>`<i style="left:${(i*37)%100}%;background:${['#f45291','#8b64e8','#ffb36a','#79d8c0','#f6d66d'][i%5]};--duration:${3.2+(i%9)*.31}s;--delay:${(i%13)*.08}s;--drift:${((i*47)%150)-75}px"></i>`).join('')}</div>`;
  document.querySelector('#restart').addEventListener('click', () => { questionIndex = 0; picks = Array(questions.length).fill(null); renderLanding(); window.scrollTo({top:0,behavior:'smooth'}); });
  window.scrollTo({top:0,behavior:'smooth'});
}

renderLanding();
