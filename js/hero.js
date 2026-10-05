const hero = document.querySelector('.hero-promo');

if (hero) {
	const heroCopy = hero.querySelector('.hero-copy');
	const heroImage = hero.querySelector('.hero-image');

	heroCopy?.classList.add('hero-in');
	heroImage?.classList.add('hero-in');
}
