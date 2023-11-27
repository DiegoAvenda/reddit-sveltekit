export const load = async (event) => {
	let fotos;
	if (event.locals.user) {
		fotos = event.locals.user.picture;
	} else {
		fotos = 'http://localhost:5173/src/lib/space.jpg';
	}
	return { fotos };
};
