/** Spanish is the root language and the source of truth for the shape (see i18n.test.ts). */
export const es = {
	meta: {
		title: 'Spinny · Ruleta para decidir entre opciones',
		description:
			'Escribe tus opciones, gira la ruleta y deja que decida la suerte. Gratis, sin registro y sin anuncios molestos. Tus opciones no salen de tu móvil.'
	},
	tagline: '¿No te decides? Gira la ruleta.',
	options: 'Opciones',
	optionsHint: 'Una por línea',
	placeholder: 'Pizza\nSushi\nTacos',
	spin: '¡Girar!',
	spinning: 'Girando…',
	needTwo: 'Escribe al menos dos opciones',
	count: { one: '{n} opción', other: '{n} opciones' },
	shuffle: 'Barajar',
	share: 'Compartir ruleta',
	copied: 'Enlace copiado',
	clear: 'Vaciar',
	confirmClear: '¿Borrar todas las opciones?',
	sharedLoaded: 'Ruleta compartida cargada',
	sharedBad: 'Ese enlace de ruleta no es válido',
	result: 'Ha salido…',
	again: 'Otra vez',
	removeAndSpin: 'Quitarla y girar',
	close: 'Cerrar',
	wheelLabel: 'Ruleta con {n} opciones',
	faqTitle: 'Preguntas frecuentes',
	faq: [
		{
			q: '¿Es aleatorio de verdad?',
			a: 'Sí. El ganador se elige con el generador criptográfico de tu navegador (crypto.getRandomValues), sin sesgo, y la ruleta gira hasta esa opción. Todas tienen la misma probabilidad.'
		},
		{
			q: '¿Dónde se guardan mis opciones?',
			a: 'Solo en tu dispositivo, en el almacenamiento del navegador. No tenemos servidor ni base de datos: nunca vemos lo que escribes.'
		},
		{
			q: '¿Cómo comparto una ruleta?',
			a: 'Pulsa «Compartir ruleta». Las opciones viajan dentro del propio enlace (tras el #), que nunca llega a ningún servidor.'
		},
		{
			q: '¿Cuántas opciones puedo poner?',
			a: 'Hasta 100, de hasta 60 caracteres cada una.'
		}
	],
	footer: {
		by: 'Una app de nubuza',
		privacy: 'Privacidad',
		terms: 'Términos',
		lang: 'English'
	},
	privacy: {
		title: 'Privacidad',
		body: [
			'Spinny la hace nubuza (nubuza.com). Funciona entera en tu navegador: no hay cuentas, ni servidor, ni base de datos nuestra.',
			'Tus opciones se guardan solo en tu dispositivo (IndexedDB). Puedes borrarlas con «Vaciar» o borrando los datos del sitio en tu navegador.',
			'Al compartir una ruleta, las opciones van dentro del enlace, después del #. Esa parte nunca se envía a ningún servidor; solo la verá quien reciba el enlace.',
			'Usamos Cloudflare Web Analytics para contar visitas de forma agregada. No usa cookies ni te identifica.',
			'No usamos cookies propias. Para cualquier duda, escríbenos a través de nubuza.com.'
		]
	},
	terms: {
		title: 'Términos',
		body: [
			'Spinny es gratis y se ofrece tal cual, sin garantías. Úsala para decidir cosas del día a día; no la uses para decisiones importantes, sorteos con premio ni apuestas.',
			'Eres responsable de lo que escribas y compartas. No compartas datos personales de otras personas en una ruleta.',
			'Copyright (c) 2026 nubuza, todos los derechos reservados.'
		]
	}
};
