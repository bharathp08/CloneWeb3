// Sample movie data (replace with your own or fetch from API)
const movies = [
  {
    id: 1,
    title: "The Lion King",
    poster: "assets/images/lion-king.jpg",
    banner: "assets/images/lion-king-banner.jpg",
    description: "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    section: "Recommended"
  },
  {
    id: 2,
    title: "Frozen II",
    poster: "assets/images/frozen2.jpg",
    banner: "assets/images/frozen2-banner.jpg",
    description: "Elsa, Anna, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient forest.",
    section: "New Releases"
  },
  {
    id: 3,
    title: "Avengers: Endgame",
    poster: "assets/images/endgame.jpg",
    banner: "assets/images/endgame-banner.jpg",
    description: "The Avengers assemble once more in order to reverse Thanos' actions and restore balance.",
    section: "Popular"
  },
  // Add more movies as needed
];

// Carousel logic
const featuredMovies = movies.slice(0, 3); // Pick first 3 as featured
let currentSlide = 0;

function renderCarousel() {
  const carouselInner = document.getElementById('carouselInner');
  if (!carouselInner) return;
  carouselInner.innerHTML = featuredMovies.map(movie => `
    <div class="min-w-full relative">
      <img src="${movie.banner}" alt="${movie.title}" class="w-full h-64 object-cover rounded-lg"/>
      <div class="absolute bottom-6 left-6 bg-black bg-opacity-60 px-4 py-2 rounded">
        <h2 class="text-2xl font-bold">${movie.title}</h2>
        <button onclick="goToMovie(${movie.id})" class="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold">Watch Now</button>
      </div>
    </div>
  `).join('');
  carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % featuredMovies.length;
  renderCarousel();
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + featuredMovies.length) % featuredMovies.length;
  renderCarousel();
}

if (document.getElementById('carousel')) {
  renderCarousel();
  document.getElementById('nextSlide').onclick = nextSlide;
  document.getElementById('prevSlide').onclick = prevSlide;
}

// Movie card rendering
function renderSection(sectionId, filterSection) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.innerHTML = movies.filter(m => m.section === filterSection).map(movie => `
    <div class="relative w-40 flex-shrink-0 group cursor-pointer transition-transform duration-200 transform hover:scale-105"
         onclick="goToMovie(${movie.id})">
      <img src="${movie.poster}" alt="${movie.title}" class="rounded-lg w-full h-56 object-cover"/>
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <button class="px-3 py-1 bg-blue-600 rounded text-white font-semibold mb-2">Watch Now</button>
        <span class="text-lg font-bold">${movie.title}</span>
      </div>
      <span class="block mt-2 text-center font-medium">${movie.title}</span>
    </div>
  `).join('');
}

if (document.getElementById('recommendedSection')) {
  renderSection('recommendedSection', 'Recommended');
}
if (document.getElementById('newReleasesSection')) {
  renderSection('newReleasesSection', 'New Releases');
}
if (document.getElementById('popularSection')) {
  renderSection('popularSection', 'Popular');
}

// Navigation to movie detail
window.goToMovie = function(id) {
  window.location.href = `movie.html?id=${id}`;
};

// Movie detail page logic
function renderMovieDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const movie = movies.find(m => m.id === id);
  if (!movie) return;
  const detail = document.getElementById('movieDetail');
  if (!detail) return;
  detail.innerHTML = `
    <div class="relative rounded-lg overflow-hidden">
      <img src="${movie.banner}" alt="${movie.title}" class="w-full h-72 object-cover"/>
      <div class="absolute bottom-6 left-6 bg-black bg-opacity-60 px-6 py-4 rounded">
        <h1 class="text-3xl font-bold mb-2">${movie.title}</h1>
        <p class="mb-4">${movie.description}</p>
        <button class="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold text-lg">Play</button>
      </div>
    </div>
  `;
}
if (window.location.pathname.endsWith('movie.html')) {
  renderMovieDetail();
}