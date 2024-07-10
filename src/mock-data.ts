export const mock = [
	{
		name: '1st',
		id: '1st',
		level: '1st',
		child: [
			{
				name: '2nd',
				id: '2nd',
				level: '1st-2nd',
				child: [
					{
						name: '3rd',
						id: '3rd',
						level: '1st-2nd-3rd',
						child: [],
					},
					{
						name: 'bro',
						id: 'bro',
						level: '1st-2nd-bro',
						child: [],
					},
				],
			},
			{
				name: 'another',
				id: 'another',
				level: '1st-another',
				child: [],
			},
		],
	},
	{
		name: 'okay',
		id: 'okay',
		level: 'okay',
		child: [],
	},
];
