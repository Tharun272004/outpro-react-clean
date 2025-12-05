// Basic static data for the basic UI clone
const movies = [
  { id:1, title:"The Great Escape", year:1963, genre:"Action", overview:"Allied prisoners plan escape from a German camp.", poster:"https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Great+Escape" },
  { id:2, title:"Inception", year:2010, genre:"Sci-Fi", overview:"A thief who steals corporate secrets through dream-sharing tech.", poster:"https://via.placeholder.com/300x450/111827/ffffff?text=Inception" },
  { id:3, title:"Interstellar", year:2014, genre:"Sci-Fi", overview:"A team travels through a wormhole in space to ensure humanity's survival.", poster:"https://via.placeholder.com/300x450/0b3b57/ffffff?text=Interstellar" },
  { id:4, title:"The Dark Knight", year:2008, genre:"Action", overview:"Batman faces the Joker in a battle for Gotham City's soul.", poster:"https://via.placeholder.com/300x450/111111/ffffff?text=The+Dark+Knight" },
  { id:5, title:"La La Land", year:2016, genre:"Musical", overview:"An aspiring actress and a jazz musician pursue their dreams in LA.", poster:"https://via.placeholder.com/300x450/3b1f2b/ffffff?text=La+La+Land" },
  { id:6, title:"Parasite", year:2019, genre:"Thriller", overview:"A poor family schemes to infiltrate a wealthy household.", poster:"https://via.placeholder.com/300x450/0e3a2b/ffffff?text=Parasite" },
  { id:7, title:"Spirited Away", year:2001, genre:"Animation", overview:"A girl enters a world of spirits and must save her parents.", poster:"https://via.placeholder.com/300x450/224b5a/ffffff?text=Spirited+Away" },
  { id:8, title:"Mad Max: Fury Road", year:2015, genre:"Action", overview:"Post-apocalyptic road-war between Furiosa and Immortan Joe.", poster:"https://via.placeholder.com/300x450/2f1b1b/ffffff?text=Mad+Max" },
  { id:9, title:"The Matrix", year:1999, genre:"Sci-Fi", overview:"A hacker discovers reality is a simulation and joins a rebellion.", poster:"https://via.placeholder.com/300x450/0a0a0a/ffffff?text=The+Matrix" },
  { id:10, title:"The Shawshank Redemption", year:1994, genre:"Drama", overview:"A banker sentenced to life in prison forms a friendship and finds hope.", poster:"https://via.placeholder.com/300x450/2b2b2b/ffffff?text=Shawshank" }
];

// Row categories to display
const categories = [
  { key: 'trending', title: 'Trending Now', items: movies.slice(0,6) },
  { key: 'toprated', title: 'Top Rated', items: movies.slice(2,8) },
  { key: 'recommended', title: 'Recommended For You', items: movies.slice(4) }
];

// DOM
const rowsEl = document.getElementById('rows');
const heroTitle = document.getElementById('hero-title');
const heroOverview = document.getElementById('hero-overview');
const heroBg = document.getElementById('hero-bg');
const searchInput = document.getElementById('search');

const modal = document.getElementById('movie-modal');
const modalPoster = document.getElementById('modal-poster');
const modalTitle = document.getElementById('modal-title');
const modalOverview = document.getElementById('modal-overview');
const modalGenre = document.getElementById('modal-genre');
const modalYear = document.getElementById('modal-year');
const modalClose = document.getElementById('modal-close');

// Utility to create row elements
function createRow(category){
  const row = document.createElement('section');
  row.className = 'row';
  const h = document.createElement('h3');
  h.textContent = category.title;
  row.appendChild(h);

  const track = document.createElement('div');
  track.className = 'row-track';
  track.setAttribute('data-key', category.key);

  category.items.forEach(m => {
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('data-id', m.id);

    const img = document.createElement('img');
    img.src = m.poster;
    img.alt = `${m.title} poster`;

    const body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML = `<h4 class="card-title">${m.title}</h4>
                      <div class="card-meta">${m.year} • ${m.genre}</div>`;

    card.appendChild(img);
    card.appendChild(body);

    // click and keyboard open modal
    card.addEventListener('click', () => openModal(m));
    card.addEventListener('keypress', (e) => { if(e.key === 'Enter') openModal(m); });

    track.appendChild(card);
  });

  row.appendChild(track);
  return row;
}

function renderRows(){
  rowsEl.innerHTML = '';
  categories.forEach(cat => {
    rowsEl.appendChild(createRow(cat));
  });
}

// pick a hero movie (first in trending) and set hero UI
function setHero(movie){
  heroTitle.textContent = movie.title;
  heroOverview.textContent = movie.overview;
  heroBg.style.backgroundImage = `linear-gradient(180deg, rgba(2,6,12,0.0) 0%, rgba(2,6,12,0.65) 60%), url('${movie.poster}')`;
}

// Modal functions
function openModal(movie){
  modalPoster.src = movie.poster;
  modalTitle.textContent = movie.title;
  modalOverview.textContent = movie.overview;
  modalGenre.textContent = movie.genre;
  modalYear.textContent = movie.year;
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=> {
  if(e.target === modal) closeModal();
});
document.addEventListener('keydown', (e)=> {
  if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

// Simple client-side search
function doSearch(q){
  q = q.trim().toLowerCase();
  if(!q){ // restore
    categories.forEach(cat => cat.items = movies.slice(0)); // restore original selections (simple)
    renderRows();
    setHero(movies[0]);
    return;
  }
  // filter movies by title or genre or year
  const filtered = movies.filter(m => {
    return m.title.toLowerCase().includes(q) ||
           m.genre.toLowerCase().includes(q) ||
           String(m.year).includes(q);
  });
  // show one row with results
  categories.forEach(cat => cat.items = filtered);
  renderRows();
  if(filtered.length) setHero(filtered[0]);
  else {
    // show empty row
    rowsEl.innerHTML = '<p style="color:var(--muted);padding:20px">No results found.</p>';
    heroTitle.textContent = 'No results';
    heroOverview.textContent = 'Try another search term.';
    heroBg.style.backgroundImage = `linear-gradient(180deg, rgba(2,6,12,0.0) 0%, rgba(2,6,12,0.65) 60%), url('https://via.placeholder.com/1400x600/111/fff?text=No+Results')`;
  }
}

// initialize
function init(){
  renderRows();
  setHero(movies[0]);
  // search debounce
  let timer;
  searchInput.addEventListener('input', (e)=>{
    clearTimeout(timer);
    timer = setTimeout(()=> doSearch(e.target.value), 200);
  });

  // add simple horizontal scroll controls: wheel to scroll quickly
  document.querySelectorAll('.row-track').forEach(track=>{
    track.addEventListener('wheel', (ev)=>{
      ev.preventDefault();
      track.scrollLeft += ev.deltaY;
    });
  });
}

init();
