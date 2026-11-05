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
	settings: 'Ajustes',
	version: 'Versión',
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
			'Spinny es un producto de nubuza («nosotros»). Al usarlo aceptas estos términos. Si no estás de acuerdo, no lo uses. Si tienes menos de 14 años, tu madre, padre o tutor debe aceptarlos por ti.',
			'Spinny es gratis. Úsala para decidir cosas del día a día; no la uses para decisiones importantes, sorteos con premio ni apuestas.',
			'Eres responsable de lo que escribas y compartas. No compartas datos personales de otras personas en una ruleta.',
			'Uso aceptable. No uses Spinny contra la ley ni para perjudicar a nadie, y no intentes romper, sobrecargar, extraer datos de forma masiva ni saltarte la seguridad de la app o de los servicios que usa.',
			'Servicios de terceros. Spinny se apoya en servicios de otros: Cloudflare (alojamiento). Al usarlos se aplican sus propias condiciones. No los controlamos, no podemos prometer que estén siempre disponibles y no respondemos de lo que hagan o muestren. Los anuncios que pueda haber los sirven esos servicios, y no respondemos de lo que anuncien.',
			'Sin garantías. Spinny es gratis y se ofrece «tal cual» y «según disponibilidad», sin garantías de ningún tipo, en la medida en que la ley lo permita. No prometemos que esté libre de errores, que funcione sin interrupciones, que sea exacto ni que sirva para un fin concreto. Lo usas bajo tu responsabilidad, y te corresponde comprobar sus resultados antes de fiarte de ellos y guardar tus propias copias de seguridad. Podemos cambiar, pausar o cerrar la app, o cualquier parte de ella, en cualquier momento.',
			'Responsabilidad. En la medida en que la ley lo permita, no respondemos de daños indirectos o consecuentes, lucro cesante, pérdida de datos, material, tiempo o dinero desperdiciados, ni de cómo tú u otras personas uséis la app o lo que produce. Si la usas para un negocio o una profesión, nuestra responsabilidad total frente a ti se limita a 1 €. Si alguien nos reclama porque has incumplido estos términos o la ley al usar la app, respondes tú, en la medida en que la ley lo permita. Nada de estos términos limita la responsabilidad que la ley no permite limitar, como la derivada de dolo, culpa grave, muerte o lesiones, ni tus derechos como consumidor.',
			'Cambios en estos términos. Podemos actualizar estos términos; la nueva versión se publica en esta página con una fecha nueva. Si sigues usando la app después de un cambio, aceptas la nueva versión.',
			'Ley aplicable y reclamaciones. Si algo va mal, escríbenos primero a me@nubuza.com: la mayoría de los problemas se arreglan rápido. Estos términos se rigen por la ley española. Si usas la app como consumidor, conservas además la protección de las leyes imperativas del país donde vives y puedes reclamar ante los tribunales de tu domicilio. Si la usas para un negocio o una profesión, son competentes en exclusiva los tribunales de España. Si alguna parte de estos términos resulta no válida, el resto sigue aplicándose.',
			'Copyright (c) 2026 nubuza, todos los derechos reservados.'
		]
	}
};
