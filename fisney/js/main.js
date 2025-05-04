// Sample movie data with real video paths
const movies = [
  {
    id: 1,
    title: "Ocean Adventure",
    description: "Follow the journey of marine explorers as they discover the hidden wonders of the deep sea. This documentary showcases breathtaking underwater footage and reveals the mysteries of marine life.",
    poster: "public/assets/images/movie1.jpg",
    videoSrc: "public/assets/videos/mymovie.mp4",
    year: "2023",
    duration: "1h 45m",
    genre: "Documentary",
    rating: "PG"
  },
  {
    id: 2,
    title: "Mountain Quest",
    description: "A team of climbers attempts to conquer the world's most challenging peaks. Through blizzards and treacherous conditions, they push the limits of human endurance in this thrilling adventure.",
    poster: "public/assets/images/movie2.jpg",
    videoSrc: "public/assets/videos/mymovie.mp4", // Using same video for demo
    year: "2022",
    duration: "2h 10m",
    genre: "Adventure",
    rating: "PG-13"
  },
  {
    id: 3,
    title: "Desert Mysteries",
    description: "Uncover ancient secrets hidden beneath the sands of time. Archaeological discoveries reveal lost civilizations and forgotten technologies that challenge our understanding of history.",
    poster: "public/assets/images/movie3.jpg",
    videoSrc: "public/assets/videos/mymovie.mp4", // Using same video for demo
    year: "2023",
    duration: "1h 55m",
    genre: "Documentary",
    rating: "PG"
  },
  {
    id: 4,
    title: "Forest Kingdom",
    description: "Explore the rich biodiversity of Earth's most vibrant ecosystems. From the canopy to the forest floor, discover the intricate relationships between plants, animals, and their environment.",
    poster: "public/assets/images/movie4.jpg",
    videoSrc: "public/assets/videos/mymovie.mp4", // Using same video for demo
    year: "2021",
    duration: "1h 40m",
    genre: "Nature",
    rating: "G"
  }
];

// Check if we're on the homepage
if (document.getElementById('movieGrid')) {
  // Render movie cards on the homepage
  renderMovieGrid();
}

// Check if we're on the player page
if (document.getElementById('videoPlayer')) {
  // Set up the player page
  setupPlayerPage();
}

/**
 * Renders all movie cards on the homepage grid
 */
function renderMovieGrid() {
  const movieGrid = document.getElementById('movieGrid');
  
  // Create HTML for each movie card
  const movieCardsHTML = movies.map(movie => `
    <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105">
      <div class="relative">
        <img src="${movie.poster}" alt="${movie.title}" class="w-full h-64 object-cover">
        <div class="absolute top-2 right-2 bg-blue-600 text-xs font-bold px-2 py-1 rounded">
          ${movie.rating}
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2">${movie.title}</h3>
        <div class="flex items-center text-sm text-gray-400 mb-2">
          <span>${movie.year}</span>
          <span class="mx-2">•</span>
          <span>${movie.duration}</span>
          <span class="mx-2">•</span>
          <span>${movie.genre}</span>
        </div>
        <p class="text-gray-300 text-sm mb-4 line-clamp-2">${movie.description}</p>
        <button 
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full transition duration-200"
          onclick="playMovie(${movie.id})"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4l12 6-12 6z"></path>
          </svg>
          Play Now
        </button>
      </div>
    </div>
  `).join('');
  
  // Insert the movie cards into the grid
  movieGrid.innerHTML = movieCardsHTML;
}

/**
 * Handles the "Play Now" button click
 * @param {number} movieId - The ID of the movie to play
 */
function playMovie(movieId) {
  // Store the selected movie ID in localStorage
  localStorage.setItem('currentMovieId', movieId);
  // Navigate to the player page
  window.location.href = '/player.html'; // Ensure the path is correct
}

/**
 * Sets up the player page with the selected movie
 */
function setupPlayerPage() {
  // Get the movie ID from localStorage
  const movieId = parseInt(localStorage.getItem('currentMovieId')) || 1;
  
  // Find the movie in our data
  const movie = movies.find(m => m.id === movieId) || movies[0];
  
  // Update the page with movie details
  document.getElementById('movieTitle').textContent = movie.title;
  document.getElementById('movieDescription').textContent = movie.description;
  
  // Set up the video player
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.querySelector('source').src = movie.videoSrc;
  
  // Load the video
  videoPlayer.load();
  
  // Render related movies (excluding the current one)
  renderRelatedMovies(movie.id);
  
  // Update page title
  document.title = `Fisney - ${movie.title}`;
  
  // Save watch history
  saveToWatchHistory(movie);
}

/**
 * Renders related movies in the sidebar
 * @param {number} currentMovieId - The ID of the current movie to exclude
 */
function renderRelatedMovies(currentMovieId) {
  const relatedMoviesContainer = document.getElementById('relatedMovies');
  if (!relatedMoviesContainer) return;
  
  // Get other movies (excluding current)
  const otherMovies = movies.filter(movie => movie.id !== currentMovieId);
  
  // Create HTML for related movies
  const relatedMoviesHTML = otherMovies.slice(0, 3).map(movie => `
    <div class="flex items-start space-x-3 cursor-pointer" onclick="playMovie(${movie.id})">
      <img src="${movie.poster}" alt="${movie.title}" class="w-20 h-28 object-cover rounded">
      <div>
        <h3 class="font-semibold">${movie.title}</h3>
        <p class="text-xs text-gray-400">${movie.duration} • ${movie.genre}</p>
      </div>
    </div>
  `).join('');
  
  // Insert the related movies
  relatedMoviesContainer.innerHTML = relatedMoviesHTML;
}

// Add this line to make the playMovie function available globally
window.playMovie = playMovie;

// Add custom CSS for line clamping (for movie descriptions)
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    /* Custom video player styling */
    video::-webkit-media-controls-panel {
      background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    }
    
    /* Smooth transitions */
    .transition {
      transition: all 0.3s ease;
    }
  </style>
`);

/**
 * Saves a movie to watch history
 * @param {Object} movie - The movie to save to history
 */
function saveToWatchHistory(movie) {
  // Get existing watch history or initialize empty array
  let watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
  
  // Check if movie is already in history
  const existingIndex = watchHistory.findIndex(item => item.id === movie.id);
  
  // If movie exists in history, remove it (to add it to the front)
  if (existingIndex !== -1) {
    watchHistory.splice(existingIndex, 1);
  }
  
  // Add movie to the beginning of history
  watchHistory.unshift({
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    timestamp: new Date().toISOString()
  });
  
  // Keep only the last 10 items
  watchHistory = watchHistory.slice(0, 10);
  
  // Save back to localStorage
  localStorage.setItem('watchHistory', JSON.stringify(watchHistory));
  
  // Render watch history if on player page
  if (document.getElementById('watchHistoryContainer')) {
    renderWatchHistory();
  }
}

/**
 * Renders the watch history section
 */
function renderWatchHistory() {
  const container = document.getElementById('watchHistoryContainer');
  if (!container) return;
  
  // Get watch history
  const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
  
  if (watchHistory.length === 0) {
    container.innerHTML = '<p class="text-gray-400 col-span-full">No watch history yet.</p>';
    return;
  }
  
  // Create HTML for watch history
  const historyHTML = watchHistory.map(item => `
    <div class="bg-gray-800 rounded overflow-hidden shadow cursor-pointer" onclick="playMovie(${item.id})">
      <div class="relative">
        <img src="${item.poster}" alt="${item.title}" class="w-full h-32 object-cover">
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <div class="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div class="bg-blue-500 h-full" style="width: ${getRandomProgress()}%"></div>
          </div>
        </div>
      </div>
      <div class="p-2">
        <h3 class="font-medium text-sm truncate">${item.title}</h3>
        <p class="text-xs text-gray-400">${formatTimestamp(item.timestamp)}</p>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = historyHTML;
}

/**
 * Formats a timestamp into a readable string
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted date
 */
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else {
    return `${diffDays} days ago`;
  }
}

/**
 * Gets a random progress percentage for demo purposes
 * In a real app, this would be the actual watch progress
 */
function getRandomProgress() {
  return Math.floor(Math.random() * 100);
}

// Initialize watch history on player page
if (document.getElementById('watchHistoryContainer')) {
  renderWatchHistory();
}