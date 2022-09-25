/** @type {import('./$types').RequestHandler} */
import {
	getAllDataFromModel,
	getDataFromModel,
	updateRecord,
} from '$lib/prisma.js';
import { getNewDeadline, isPastDeadline } from '$lib/utils/date.js';
import { NOTE, REVISE_MODE, WEB_API_KEY } from '$lib/utils/constants.js';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const isAuthorized =
		request.headers.get('authorization') === `Bearer ${WEB_API_KEY}`;
	// Its experimental use, in future the revise system will be reworked
	const { isReviseMode } = await getDataFromModel(REVISE_MODE, {
		where: {
			id: 1,
		},
	});

	if (isAuthorized && isReviseMode) {
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

		return new Response(undefined, {
			status: 200,
			statusText: 'Updated deadlines',
		});
	} else {
		return new Response(undefined, { status: 401 });
	}
}
