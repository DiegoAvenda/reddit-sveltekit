import { redirect, fail } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';
import db from '$lib/prisma';
import bcrypt from 'bcrypt';

export const load = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/bio');
	}
};

export const actions = {
	OAuth2: async () => {
		const redirectURL = 'http://localhost:5173/oauth';

		const oAuth2Client = new OAuth2Client(SECRET_CLIENT_ID, SECRET_CLIENT_SECRET, redirectURL);

		// Generate the url that will be used for the consent dialog.
		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.email profile openid',
			prompt: 'consent'
		});
		throw redirect(302, authorizeUrl);
	},

	email: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (typeof email !== 'string' || typeof password != 'string' || !email || !password) {
			return fail(400, { invalid: true });
		}

		let setUserAuthToken = crypto.randomUUID();

		await db.user.upsert({
			where: { email },
			update: { userAuthToken: setUserAuthToken },
			create: { email, password: await bcrypt.hash(password, 10), userAuthToken: setUserAuthToken }
		});

		cookies.set('session', setUserAuthToken, {
			maxAge: 60 * 60 * 24 * 5 * 1000, //5 days
			httpOnly: true,
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax'
		});

		throw redirect(303, '/bio');
	}
};
