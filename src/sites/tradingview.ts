import injectUI, { isAlreadyInjected } from '../lib/inject-ui';
import { isEnabled } from '../lib/is-enabled';
import { Store } from '../store';

export function checkSite(): boolean {
	return window.location.host.includes('tradingview.com');
}

export function eradicate(store: Store) {
	function eradicateRetry() {
		const settings = store.getState().settings; //  Where is this state beign set?

		if (settings == null || !isEnabled(settings)) {
			return;
		}

		// Don't do anything if the UI hasn't loaded yet
		const feed = document.querySelector('.chart-page');

		console.log(feed);

		if (feed == null) {
			return;
		}

		const container = feed;

		// Add News Feed Eradicator quote/info panel
		if (container && !isAlreadyInjected()) {
			console.log('Trying to inject UI');
			// Hack so that injectUI can handle dark theme
			document.body.style.background = 'var(--yt-spec-general-background-a)';
			document.body.style.display = 'none'; // Maybe check in the future how I can implement it right
			injectUI(container, store);
		}
	}

	// This delay ensures that the elements have been created before we attempt
	// to replace them
	setInterval(eradicateRetry, 1000);
}
