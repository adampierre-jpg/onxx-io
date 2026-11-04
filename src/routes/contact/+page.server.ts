import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

import type { Actions } from './$types.js';

const GOALS = ['Strength and conditioning', 'Nutrition', 'Both', 'Not sure yet'] as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type IntakeValues = {
	name: string;
	email: string;
	goal: string;
	roadblocks: string;
};

function readField(form: FormData, name: string): string {
	const value = form.get(name);
	return typeof value === 'string' ? value.trim() : '';
}

function splitName(name: string): { firstName: string; lastName: string } {
	const space = name.indexOf(' ');
	if (space === -1) {
		return { firstName: name, lastName: '' };
	}

	return {
		firstName: name.slice(0, space),
		lastName: name.slice(space + 1).trim()
	};
}

function isGoal(value: string): value is (typeof GOALS)[number] {
	return GOALS.some((goal) => goal === value);
}

export const actions = {
	default: async ({ request }) => {
		const submitted = await request.formData();
		const values: IntakeValues = {
			name: readField(submitted, 'name'),
			email: readField(submitted, 'email'),
			goal: readField(submitted, 'goal'),
			roadblocks: readField(submitted, 'roadblocks')
		};

		if (!values.name) {
			return fail(400, { error: 'Name is required.', values });
		}

		if (!EMAIL_REGEX.test(values.email)) {
			return fail(400, { error: 'A valid email is required.', values });
		}

		if (!isGoal(values.goal)) {
			return fail(400, { error: 'Choose a goal.', values });
		}

		if (!values.roadblocks) {
			return fail(400, {
				error: 'Tell us about roadblocks or injuries, or write None.',
				values
			});
		}

		const webhookUrl = env.DRA_MAKE_WEBHOOK_URL;

		if (!webhookUrl) {
			console.error('DRA_MAKE_WEBHOOK_URL is not configured.');
			return fail(500, { error: 'Lead sync is not configured.', values });
		}

		const { firstName, lastName } = splitName(values.name);

		try {
			const response = await fetch(webhookUrl, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					name: values.name,
					email: values.email,
					firstName,
					lastName,
					goal: values.goal,
					roadblocks: values.roadblocks,
					source: 'onxx.io Contact',
					submittedAt: new Date().toISOString()
				})
			});

			if (!response.ok) {
				console.error('Contact lead sync failed', response.status, await response.text());
				return fail(502, {
					error: 'Could not save your details. Try again, or email Adam directly.',
					values
				});
			}
		} catch (error) {
			console.error('Contact lead sync failed', error);
			return fail(502, {
				error: 'Could not save your details. Try again, or email Adam directly.',
				values
			});
		}

		return {
			success: true as const,
			firstName,
			lastName,
			email: values.email,
			values
		};
	}
} satisfies Actions;
