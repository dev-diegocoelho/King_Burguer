const ingredientsShowcase = document.querySelector('.ingredients-showcase');
const ingredientCards = ingredientsShowcase?.querySelectorAll('.ingredients-showcase__card');
const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if (ingredientsShowcase && ingredientCards?.length && !reducedMotionPreference.matches && 'IntersectionObserver' in window) {
	ingredientsShowcase.classList.add('is-animating');

	const ingredientObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	}, {
		threshold: 0.2,
		rootMargin: '0px 0px -40px 0px'
	});

	ingredientCards.forEach((card) => ingredientObserver.observe(card));
}

(() => {
	const premiumIngredients = document.querySelector('.premium-ingredients');
	const premiumIngredientsElements = premiumIngredients?.querySelectorAll(
		'.premium-ingredients__title, .premium-ingredients__subtitle, .premium-ingredients__image, .premium-ingredients__content'
	);

	if (
		!premiumIngredients ||
		!premiumIngredientsElements?.length ||
		reducedMotionPreference.matches ||
		!('IntersectionObserver' in window)
	) return;

	premiumIngredients.classList.add('is-animating');

	const premiumIngredientsObserver = new IntersectionObserver((entries, observer) => {
		const sectionEntry = entries.find((entry) => entry.isIntersecting);
		if (!sectionEntry) return;

		premiumIngredientsElements.forEach((element) => element.classList.add('is-visible'));
		observer.unobserve(premiumIngredients);
	}, {
		threshold: 0.2,
		rootMargin: '0px 0px -40px 0px'
	});

	premiumIngredientsObserver.observe(premiumIngredients);
})();
