import db from '$lib/prisma';

export const load = async ({ params }) => {
	let comments = await db.comment.findMany({
		where: { postId: params.slug },
		select: { user: true, post: true, userId: true, likes: true, message: true, id: true }
	});

	return { comments };
};

export const actions = {
	comentarComentario: async ({ request, locals, params }) => {
		const data = await request.formData();
		let parentId = data.get('parentId');
		let message = data.get('message');

		await db.comment.create({
			data: {
				message,
				user: { connect: { email: locals.user.email } },
				post: { connect: { id: params.slug } },
				parent: { connect: { id: parentId } }
			}
		});
	},

	like: async ({ request, locals }) => {
		const data = await request.formData();
		let id = data.get('parentId');
		try {
			await db.like.create({
				data: {
					user: { connect: { email: locals.user.email } },
					comment: { connect: { id } }
				}
			});
		} catch (error) {
			console.error(error);
		}
	},

	dislike: async ({ request }) => {
		const data = await request.formData();
		let commentId = data.get('parentId');
		let userId = data.get('userId');

		await db.like.delete({
			where: { userId_commentId: { userId, commentId } }
		});
	}
};
