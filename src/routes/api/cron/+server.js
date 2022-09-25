/** @type {import('./$types').RequestHandler} */
import { getAllDataFromModel, updateRecord } from '$lib/prisma.js';
import { getNewDeadline, isPastDeadline } from '$lib/utils/date.js';
import { NOTE, WEB_API_KEY } from '$lib/utils/constants.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const isAuthorized =
		request.headers.get('authorization') === `Bearer ${WEB_API_KEY}`;

	if (isAuthorized) {
		const notes = await getAllDataFromModel(NOTE);

		for (let i = 0; i < notes.length; ++i) {
			const { reviseDeadline, reviseCount } = notes[i];

			if (reviseCount <= 3 && isPastDeadline(reviseDeadline)) {
				const query = {
					where: {
						name: notes[i].name,
					},
					data: {
						reviseDeadline: getNewDeadline(reviseDeadline, reviseCount),
						reviseCount: reviseCount + 1,
					},
				};

				await updateRecord(NOTE, query);
			}
		}

		return new Response(undefined, { status: 200, statusText: 'Updated deadlines' });
	} else {
		return new Response(undefined, { status: 401 });
	}
}
