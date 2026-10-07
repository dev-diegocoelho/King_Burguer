const navigation = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navigationLinks = document.querySelectorAll('.nav-links a');
const desktopQuery = window.matchMedia('(min-width: 48rem)');

const setMenuOpen = (isOpen) => {
	navigation.classList.toggle('is-open', isOpen);
	menuToggle.setAttribute('aria-expanded', String(isOpen));
	menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
};

menuToggle.addEventListener('click', () => {
	setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navigationLinks.forEach((link) => {
	link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
		setMenuOpen(false);
		menuToggle.focus();
	}
});

desktopQuery.addEventListener('change', (event) => {
	if (event.matches) setMenuOpen(false);
});

const carouselImage = document.querySelector('[data-carousel-image]');
const carouselLabel = document.querySelector('[data-carousel-label]');
const carouselStatus = document.querySelector('[data-carousel-status]');
const carouselPrevious = document.querySelector('[data-carousel-previous]');
const carouselNext = document.querySelector('[data-carousel-next]');
const carouselSlides = [
	{
		name: 'Tartarugas Animação',
		source: 'public/images/kids-ninja-leonardo-56586a.gif',
		alt: 'Brinquedo das Tartarugas Ninja do King Jr.'
	},
	{
		name: 'Samurai',
		source: 'public/images/samurai.png',
		alt: 'Arte samurai da coleção Kids Menu'
	},
	{
		name: 'Tartarugas Ninja',
		source: 'public/images/tartarugas.png',
		alt: 'Arte das Tartarugas Ninja da coleção Kids Menu'
	}
];
let activeCarouselSlide = 0;

const showCarouselSlide = (slideIndex) => {
	activeCarouselSlide = (slideIndex + carouselSlides.length) % carouselSlides.length;
	const slide = carouselSlides[activeCarouselSlide];

	carouselImage.src = slide.source;
	carouselImage.alt = slide.alt;
	carouselLabel.textContent = slide.name;
	carouselStatus.textContent = `${activeCarouselSlide + 1} de ${carouselSlides.length}`;
};

carouselPrevious.addEventListener('click', () => {
	showCarouselSlide(activeCarouselSlide - 1);
});

carouselNext.addEventListener('click', () => {
	showCarouselSlide(activeCarouselSlide + 1);
});

const menuFilters = document.querySelector('[data-menu-filters]');
const menuItems = document.querySelectorAll('[data-menu-category]');
const menuStatus = document.querySelector('[data-menu-status]');

menuFilters.addEventListener('click', (event) => {
	const selectedFilter = event.target.closest('[data-menu-filter]');
	if (!selectedFilter) return;

	const activeCategory = selectedFilter.dataset.menuFilter;
	let visibleItems = 0;

	menuFilters.querySelectorAll('[data-menu-filter]').forEach((filter) => {
		const isActive = filter === selectedFilter;
		filter.classList.toggle('is-active', isActive);
		filter.setAttribute('aria-pressed', String(isActive));
	});

	menuItems.forEach((item) => {
		const isVisible = activeCategory === 'todos' || item.dataset.menuCategory === activeCategory;
		item.hidden = !isVisible;
		if (isVisible) visibleItems += 1;
	});

	menuStatus.textContent = `${visibleItems} ${visibleItems === 1 ? 'produto exibido' : 'produtos exibidos'}`;
});
