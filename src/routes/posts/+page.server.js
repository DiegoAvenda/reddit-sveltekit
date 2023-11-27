import db from '$lib/prisma';

export const load = async () => {
	const response = await db.post.findMany({
		include: { author: true, comments: true }
	});

	return { feed: response };
};
