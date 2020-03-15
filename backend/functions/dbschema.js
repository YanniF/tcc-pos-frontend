let db = {
	courses: [
		{
			id: 'XppRiWmBrVFmBJrCSXVR',
			title: 'Um curso super interessante',
			category: 'Vendas',
			description: 'Este eh um curso muito interessante',
			teacher: 'Max Postmann',
			finishedCount: 0,
			enrolledCount: 0,
			createdBy: 'xN8KLPIEKpXXEqAPZOplEQoACkI2',
			createdAt: '2020-03-10T22:03:19.612Z',
		},
	],
	modules: [
		{
			id: 'ACVEEIcm0NigtQBqUk78',
			title: 'Unidade 1: Hello World',
			createdAt: '2020-03-14T14:22:47.811Z',
			createdBy: 'xN8KLPIEKpXXEqAPZOplEQoACkI2',
		},
	],
	videos: [
		{
			id: 'HcA7kw6KnPj0qjHAxbKv',
			moduleId: 'ACVEEIcm0NigtQBqUk78',
			title: 'Animated Counter With JavaScript (HTML, CSS)',
			link: 'https://www.youtube.com/watch?v=a6XIMIKmj9k',
			createdAt: '2020-03-14T16:19:31.996Z',
			createdBy: 'xN8KLPIEKpXXEqAPZOplEQoACkI2',
		},
	],
	documents: [
		{
			id: 'CMFuyxSFPvqVxRibCDXl',
			moduleId: 'ACVEEIcm0NigtQBqUk78',
			title: 'Material Complementar 1',
			documentUrl: 'https://firebasestorage.googleapis.com/v0/b/yanni-evoluindo.appspot.com/o/2822918.txt?alt=media',
			createdAt: '2020-03-14T20:14:26.153Z',
			createdBy: 'xN8KLPIEKpXXEqAPZOplEQoACkI2',
		},
	],
	tests: [
		{
			id: 'GDnuG2TrYIxN7Xn897Xp',
			moduleId: 'ACVEEIcm0NigtQBqUk78',
			title: 'Teste unidade 1',
			createdAt: '2020-03-15T19:22:23.853Z',
			createdBy: 'xN8KLPIEKpXXEqAPZOplEQoACkI2',
			questions: [
				{
					id: 'JSzFANtYvgqIKpPshfVX',
					question: 'Which of the following is not considered a JavaScript operator?',
					options: [
						{
							id: 'a',
							title: 'new',
						},
						{
							id: 'b',
							title: 'this',
						},
						{
							id: 'c',
							title: 'delete',
						},
						{
							id: 'd',
							title: 'typeof',
						},
					],
					points: '2',
					answer: 'b',
				},
			],
		},
	],
};
