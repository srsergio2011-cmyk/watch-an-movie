import { useMemo, useState } from 'react';
import { Bookmark, Check, ChevronDown, ChevronLeft, ChevronRight, Clapperboard, Film, Heart, Info, Menu, Play, Search, Star, X } from 'lucide-react';

const movies = [
  { id: 1, title: 'Dune: Parte Dos', original: 'Dune: Part Two', year: 2024, rating: 8.6, duration: '2h 46min', genre: 'Ciencia ficción', director: 'Denis Villeneuve', image: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg', description: 'Paul Atreides se une a Chani y a los fremen mientras busca venganza contra los conspiradores que destruyeron a su familia. Enfrentado a una elección entre el amor de su vida y el destino del universo, intentará evitar un futuro terrible que solo él puede prever.', tags: ['Épica', 'Aventura'] },
  { id: 2, title: 'Oppenheimer', original: 'Oppenheimer', year: 2023, rating: 8.3, duration: '3h 0min', genre: 'Drama', director: 'Christopher Nolan', image: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIm8Msa0KPI.jpg', backdrop: 'https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', description: 'La historia del físico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.', tags: ['Historia', 'Biografía'] },
  { id: 3, title: 'Pobres criaturas', original: 'Poor Things', year: 2023, rating: 7.8, duration: '2h 21min', genre: 'Ciencia ficción', director: 'Yorgos Lanthimos', image: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg', backdrop: 'https://image.tmdb.org/t/p/original/5mzr6JZbrqnqD8rCEvPhuCE5Fw2.jpg', description: 'La increíble historia y la evolución fantástica de Bella Baxter, una joven devuelta a la vida por el brillante y poco ortodoxo Dr. Godwin Baxter.', tags: ['Fantasía', 'Comedia'] },
  { id: 4, title: 'Spider-Man: Cruzando el Multiverso', original: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: 8.6, duration: '2h 20min', genre: 'Animación', director: 'Joaquim Dos Santos', image: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', backdrop: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg', description: 'Miles Morales regresa para el siguiente capítulo de la saga Spider-Verse, una aventura que llevará al simpático vecino de Brooklyn a cruzar dimensiones.', tags: ['Aventura', 'Acción'] },
  { id: 5, title: 'La sociedad de la nieve', original: 'Society of the Snow', year: 2023, rating: 8.0, duration: '2h 24min', genre: 'Drama', director: 'J. A. Bayona', image: 'https://image.tmdb.org/t/p/w500/2e853FDVSIso600RqAMunPxiZjq.jpg', backdrop: 'https://image.tmdb.org/t/p/original/2CzH9v8aN2Q6U8x3ZpK9m2n.jpg', description: 'En 1972, el vuelo 571 de la Fuerza Aérea Uruguaya se estrella en el corazón de los Andes. Los supervivientes se aferran a la vida en uno de los entornos más hostiles del planeta.', tags: ['Supervivencia', 'Basada en hechos reales'] },
  { id: 6, title: 'El gato con botas: el último deseo', original: 'Puss in Boots: The Last Wish', year: 2022, rating: 7.9, duration: '1h 42min', genre: 'Animación', director: 'Joel Crawford', image: 'https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg', backdrop: 'https://image.tmdb.org/t/p/original/a2tys4sD7xzVaogPntGsT1ypVoT.jpg', description: 'El Gato con Botas descubre que su pasión por la aventura le ha pasado factura: ha gastado ocho de sus nueve vidas. Emprende un viaje épico para encontrar el mítico Último Deseo.', tags: ['Aventura', 'Comedia'] },
  { id: 7, title: 'Interstellar', original: 'Interstellar', year: 2014, rating: 8.7, duration: '2h 49min', genre: 'Ciencia ficción', director: 'Christopher Nolan', image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', backdrop: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg', description: 'Un equipo de exploradores viaja más allá de esta galaxia para descubrir si la humanidad tiene un futuro entre las estrellas.', tags: ['Espacio', 'Drama'] },
  { id: 8, title: 'Todo a la vez en todas partes', original: 'Everything Everywhere All at Once', year: 2022, rating: 7.8, duration: '2h 19min', genre: 'Ciencia ficción', director: 'Daniel Kwan', image: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', backdrop: 'https://image.tmdb.org/t/p/original/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg', description: 'Una inmigrante china de mediana edad se ve envuelta en una aventura demencial en la que solo ella puede salvar el mundo explorando otros universos.', tags: ['Multiverso', 'Comedia'] },
  { id: 9, title: 'El viaje de Chihiro', original: 'Spirited Away', year: 2001, rating: 8.5, duration: '2h 5min', genre: 'Animación', director: 'Hayao Miyazaki', image: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', backdrop: 'https://image.tmdb.org/t/p/original/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg', description: 'Durante la mudanza de su familia a los suburbios, una niña de diez años deambula por un mundo gobernado por dioses, brujas y espíritus.', tags: ['Fantasía', 'Clásico'] },
  { id: 10, title: 'Parásitos', original: 'Parasite', year: 2019, rating: 8.5, duration: '2h 12min', genre: 'Suspense', director: 'Bong Joon-ho', image: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', backdrop: 'https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg', description: 'La familia de Ki-taek está en paro y vive en un sótano. Un día, su hijo empieza a dar clases particulares en casa de los Park, una familia adinerada.', tags: ['Thriller', 'Drama'] },
  { id: 11, title: 'La La Land', original: 'La La Land', year: 2016, rating: 7.9, duration: '2h 8min', genre: 'Romance', director: 'Damien Chazelle', image: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', backdrop: 'https://image.tmdb.org/t/p/original/nadTlnTE6DdgmYsN4iWc2a2wiaI.jpg', description: 'Mientras navegan la incertidumbre, los sueños y los amores de Los Ángeles, una actriz y un músico se cruzan y enamoran.', tags: ['Música', 'Drama'] },
  { id: 12, title: 'El caballero oscuro', original: 'The Dark Knight', year: 2008, rating: 9.0, duration: '2h 32min', genre: 'Acción', director: 'Christopher Nolan', image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', backdrop: 'https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg', description: 'Batman se enfrenta a su mayor reto cuando el Joker sume Gotham en el caos y obliga al Caballero Oscuro a cruzar la línea entre héroe y vigilante.', tags: ['Crimen', 'Drama'] },
];

const genres = ['Todas', 'Ciencia ficción', 'Drama', 'Animación', 'Acción', 'Suspense', 'Romance'];

function MovieCard({ movie, onSelect, favorite, onFavorite, rank }) {
  return (
    <article className="movie-card" onClick={() => onSelect(movie)}>
      <div className="poster-wrap">
        <img src={movie.image} alt={`Póster de ${movie.title}`} loading="lazy" />
        {rank && <span className="rank">{String(rank).padStart(2, '0')}</span>}
        <button className={`save-button ${favorite ? 'saved' : ''}`} aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'} onClick={(event) => { event.stopPropagation(); onFavorite(movie.id); }}><Bookmark size={17} fill={favorite ? 'currentColor' : 'none'} /></button>
        <div className="poster-overlay"><span className="quick-view"><Play size={14} fill="currentColor" /> Ver detalles</span></div>
      </div>
      <div className="card-info"><div className="card-title-row"><h3>{movie.title}</h3><span className="rating"><Star size={12} fill="currentColor" /> {movie.rating}</span></div><p>{movie.year} <span>·</span> {movie.genre}</p></div>
    </article>
  );
}

function MovieModal({ movie, onClose, favorite, onFavorite }) {
  if (!movie) return null;
  return <div className="modal-backdrop" onClick={onClose}><section className="movie-modal" role="dialog" aria-modal="true" aria-label={movie.title} onClick={(e) => e.stopPropagation()}>
    <button className="modal-close" onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
    <div className="modal-art" style={{ backgroundImage: `linear-gradient(0deg, #171715 0%, rgba(23,23,21,.14) 100%), url(${movie.backdrop})` }} />
    <div className="modal-content"><span className="eyebrow">PELÍCULA DESTACADA</span><h2>{movie.title}</h2><div className="modal-meta"><span className="rating"><Star size={14} fill="currentColor" /> {movie.rating}</span><span>{movie.year}</span><span>{movie.duration}</span><span>{movie.genre}</span></div><p className="modal-description">{movie.description}</p><p className="director"><strong>Dirección</strong> {movie.director}</p><div className="tag-list">{movie.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="modal-actions"><button className="primary-button" onClick={() => onClose()}><Play size={16} fill="currentColor" /> Explorar película</button><button className="secondary-button" onClick={() => onFavorite(movie.id)}>{favorite ? <Check size={16} /> : <Bookmark size={16} />} {favorite ? 'En mi lista' : 'Mi lista'}</button></div></div>
  </section></div>;
}

export default function App() {
  const [activeGenre, setActiveGenre] = useState('Todas');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const featured = movies[0];
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const filtered = useMemo(() => movies.filter((movie) => {
    const matchesGenre = activeGenre === 'Todas' || movie.genre === activeGenre;
    const matchesSearch = `${movie.title} ${movie.original} ${movie.director} ${movie.genre}`.toLowerCase().includes(search.toLowerCase());
    const matchesFavorites = !showFavorites || favorites.includes(movie.id);
    return matchesGenre && matchesSearch && matchesFavorites;
  }), [activeGenre, search, showFavorites, favorites]);
  const isFiltering = Boolean(search || showFavorites || activeGenre !== 'Todas');

  const scrollToMovies = () => document.getElementById('peliculas')?.scrollIntoView({ behavior: 'smooth' });

  return <main>
    <header className="topbar"><a className="brand" href="#inicio" aria-label="Watch an Movie inicio"><span className="brand-icon"><Clapperboard size={19} /></span><span>watch <em>an</em> movie<span className="brand-dot">.</span></span></a>
      <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}><a className="active" href="#inicio" onClick={() => setMobileMenu(false)}>Inicio</a><a href="#peliculas" onClick={() => { setShowFavorites(false); setMobileMenu(false); }}>Películas</a><button className={showFavorites ? 'nav-fav active' : 'nav-fav'} onClick={() => { setShowFavorites(!showFavorites); setMobileMenu(false); scrollToMovies(); }}><Bookmark size={15} /> Mi lista{favorites.length > 0 && <span className="fav-count">{favorites.length}</span>}</button></nav>
      <div className="header-actions"><button className="search-trigger" onClick={() => { scrollToMovies(); document.getElementById('movie-search')?.focus(); }} aria-label="Buscar películas"><Search size={18} /></button><button className="menu-trigger" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menú">{mobileMenu ? <X size={21} /> : <Menu size={21} />}</button><div className="avatar">S</div></div>
    </header>

    <section className="hero" id="inicio" style={{ backgroundImage: `linear-gradient(90deg, #10100f 3%, rgba(16,16,15,.93) 25%, rgba(16,16,15,.45) 58%, rgba(16,16,15,.2) 100%), linear-gradient(0deg, #10100f 0%, transparent 25%, rgba(16,16,15,.15) 100%), url(${featured.backdrop})` }}>
      <div className="hero-content"><div className="hero-kicker"><span className="kicker-line" /> LA PELÍCULA DE LA SEMANA</div><div className="hero-heading"><h1>Dune: <span>Parte Dos</span></h1><span className="hero-index">01 <i>/ 04</i></span></div><div className="hero-meta"><span className="rating"><Star size={15} fill="currentColor" /> {featured.rating}</span><span>{featured.year}</span><span>{featured.duration}</span><span className="quality">4K UHD</span></div><p className="hero-description">El destino de un mundo. El nacimiento de una leyenda. Paul Atreides se une a los fremen en un viaje épico que cambiará el universo para siempre.</p><div className="hero-tags"><span>Épica</span><span>Aventura</span><span>Ciencia ficción</span></div><div className="hero-actions"><button className="primary-button" onClick={() => setSelectedMovie(featured)}><Play size={16} fill="currentColor" /> Descubrir película</button><button className="hero-more" onClick={() => setSelectedMovie(featured)}><Info size={17} /> Más información</button></div></div>
      <div className="hero-side-note"><span>DESTACADA</span><span className="side-line" /></div><div className="hero-pagination"><button aria-label="Anterior"><ChevronLeft size={17} /></button><span className="pagination-active" /><span /><span /><span /><button aria-label="Siguiente"><ChevronRight size={17} /></button></div>
    </section>

    <section className="content-section" id="peliculas"><div className="section-heading"><div><span className="eyebrow">SELECCIÓN PARA TI</span><h2>{showFavorites ? 'Mi lista' : search ? 'Resultados de búsqueda' : 'Películas para descubrir'}<span className="title-dot">.</span></h2></div><div className="section-controls"><label className="search-box"><Search size={16} /><input id="movie-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar películas..." /><kbd>⌘ K</kbd>{search && <button aria-label="Limpiar búsqueda" onClick={() => setSearch('')}><X size={14} /></button>}</label><button className="sort-button" onClick={() => setShowAll(!showAll)}>Más populares <ChevronDown size={15} /></button></div></div>
      <div className="genre-list">{genres.map((genre) => <button key={genre} className={activeGenre === genre ? 'genre-chip selected' : 'genre-chip'} onClick={() => { setActiveGenre(genre); setShowFavorites(false); }}>{genre}</button>)}</div>
      {!showFavorites && !search && activeGenre === 'Todas' && <div className="subheading"><h3>Populares ahora</h3><button className="text-button" onClick={() => setShowAll(!showAll)}>{showAll ? 'Ver menos' : 'Ver todas'} <ChevronRight size={15} /></button></div>}
      {filtered.length ? <div className="movie-grid">{(showAll || isFiltering ? filtered : filtered.slice(0, 8)).map((movie, index) => <MovieCard key={movie.id} movie={movie} rank={!isFiltering ? index + 1 : null} onSelect={setSelectedMovie} favorite={favorites.includes(movie.id)} onFavorite={toggleFavorite} />)}</div> : <div className="empty-state"><div className="empty-icon"><Film size={24} /></div><h3>{showFavorites ? 'Tu lista está esperando' : 'No encontramos películas'}</h3><p>{showFavorites ? 'Guarda películas que quieras ver y aparecerán aquí.' : 'Prueba con otro título, director o género.'}</p>{showFavorites && <button className="primary-button" onClick={() => { setShowFavorites(false); scrollToMovies(); }}>Explorar películas</button>}</div>}
    </section>
    <footer><a className="brand footer-brand" href="#inicio"><span className="brand-icon"><Clapperboard size={17} /></span><span>watch <em>an</em> movie<span className="brand-dot">.</span></span></a><p>Un buen plan empieza con una buena película.</p><span className="copyright">© 2025 Watch an Movie</span></footer>
    <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} favorite={selectedMovie ? favorites.includes(selectedMovie.id) : false} onFavorite={toggleFavorite} />
  </main>;
}
