import db from '$lib/prisma';

export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');

	if (!session) {
		//if there is no session load page as normal
		return await resolve(event);
	}
	//find the user based on the session.
	const user = await db.user.findUnique({
		where: { userAuthToken: session },
		select: { email: true, name: true, image: true, id: true }
	});

	//if `user` exists set `event.locals`
	if (user) {
		event.locals.user = { email: user.email, name: user.name, picture: user.image };
	}

	return await resolve(event);
}
