import { redirect, fail } from '@sveltejs/kit';
import db from '$lib/prisma';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/signup');
	}

	let userPosts = await db.user.findUnique({
		where: { email: locals.user.email },
		select: { name: true, posts: true }
	});

	return { userPosts };
};

export const actions = {
	editBio: async ({ request, locals }) => {
		const data = await request.formData();
		let name = data.get('name');

		await db.user.update({
			where: {
				email: locals.user.email
			},
			data: { name }
		});
		return { success: true };
	},

	editPost: async ({ request }) => {
		const data = await request.formData();
		let id = data.get('id');
		let title = data.get('title');
		let content = data.get('content');

		if (!content || !title) {
			return fail(400, { content, missing: true });
		}

		await db.post.update({
			where: { id },
			data: { title, content }
		});
		return { succes: true };
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		let id = data.get('id');

		await db.post.delete({
			where: { id }
		});
		return { succes: true };
	}
};
