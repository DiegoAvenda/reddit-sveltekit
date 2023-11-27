import db from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const response = await db.post.findMany({
		include: { author: true, comments: true }
	});
	return { feed: response };
};

export const actions = {
	createPost: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/signup');
		}
		const data = await request.formData();
		const title = data.get('title');
		const content = data.get('content');

		await db.post.create({
			data: {
				title,
				content,
				author: { connect: { email: locals.user.email } }
			}
		});

		return { success: true };
	},
	edit: async ({ request }) => {
		const data = request.formData();
		let title = data.get('title');
		let content = data.get('content');
		let id = data.get('id');

		await db.post.update({
			where: {
				id
			},
			data: { title, content }
		});
	},

	createComment: async ({ request, locals }) => {
		const data = await request.formData();
		let message = data.get('comment');
		let postId = data.get('postId');

		await db.comment.create({
			data: {
				message,
				user: { connect: { email: locals.user.email } },
				post: { connect: { id: postId } }
			}
		});
		throw redirect(303, '/posts');
	},

	logout: async ({ cookies }) => {
		cookies.delete('session');
	}
};
