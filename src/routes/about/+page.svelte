<script lang="ts">
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.page.title}</title>
</svelte:head>

<main class="content-page">
	<h1>{data.page.title}</h1>

	

	<section class="section-block about-coach-section">
		<div class="page-wrap coach-layout">
			<div>
				<p class="section-kicker">Who You'll Train With</p>
				<h2>Meet Coach Adam</h2>
				<div class="copy-stack">
					<p>
						I'm Adam Pierre, and I built ONXX because I got tired of watching good men—fathers,
						professionals, guys with real responsibilities—get sold garbage fitness advice that
						doesn't fit their lives.
					</p>
					<p>
						You don't need a 6-day bodybuilding split. You don't need to "crush it" or "go beast
						mode." You need a clear, intelligent plan that builds you up instead of breaking you
						down.
					</p>
				</div>
			</div>
			<div class="credential-panel">
				<h3>Credentials</h3>
				<ul>
					
					<li>ISSA Certified Personal Trainer & Nutrition Coach</li>
					<li>ISSA Corrective Exercise Specialist</li>
					<li>Original Strength Pro Coach</li>
					<li>Plan Strong</li>
					<li>Built Stong</li>
					<li>Strong Endurance</li>
					<li>Bioforce Conditioning Coach</li>
					<li>Nearly a decade coaching men to real-world strength</li>
				</ul>
			</div>
		</div>
	</section>
</main>

<style>
	.content-page {
		margin: 0 auto;
		max-width: 52rem;
		padding: 2rem 1rem 4rem;
	}

	h1 {
		font-size: 2rem;
		margin: 0 0 1rem;
	}

	.source {
		font-size: 0.875rem;
		margin: 0 0 1.25rem;
	}

	.markdown :global(*) {
		max-width: 100%;
	}

	.markdown :global(p),
	.markdown :global(ul),
	.markdown :global(ol),
	.markdown :global(blockquote) {
		line-height: 1.7;
		margin: 0 0 1rem;
	}

	.section-kicker {
		margin: 0 0 1rem;
		color: var(--color-onxx-red);
		font-family: var(--font-heading, 'Allerta Stencil', system-ui, sans-serif);
		font-size: 0.78rem;
		font-weight: 400;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.section-block {
		padding: clamp(4.5rem, 9vw, 7rem) 0;
	}

	.about-coach-section {
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.page-wrap {
		width: min(100% - 2rem, 72rem);
		margin-inline: auto;
	}

	.coach-layout {
		display: grid;
		gap: clamp(2rem, 6vw, 5rem);
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		align-items: center;
	}

	.copy-stack {
		display: grid;
		gap: 1.1rem;
	}

	.about-coach-section h2 {
		max-width: 13ch;
		margin: 0;
		font-family: var(--font-h1-h2, 'Saira Stencil', system-ui, sans-serif);
		font-size: clamp(2.4rem, 6vw, 5rem);
		font-weight: 400;
		letter-spacing: -0.06em;
		line-height: 0.9;
		text-transform: uppercase;
		text-wrap: balance;
	}

	.credential-panel {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(17, 17, 17, 0.82);
		padding: clamp(1.4rem, 4vw, 2rem);
		color: var(--color-onxx-muted);
		line-height: 1.65;
	}

	.credential-panel h3 {
		margin: 0 0 0.85rem;
		color: var(--color-onxx-text);
		font-size: 1.3rem;
		line-height: 1.15;
	}

	.credential-panel ul {
		display: grid;
		gap: 0.7rem;
		padding-left: 1.1rem;
		margin: 0;
	}

	@media (max-width: 900px) {
		.coach-layout {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 540px) {
		.about-coach-section h2 {
			letter-spacing: -0.055em;
		}
	}
</style>
