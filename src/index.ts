import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'dictionary',
	name: 'Dictionary',
	icon: 'note_add',
	description: 'Enter values in a predefined list',
	component: InterfaceComponent,
	types: ['json'],
	options: [
		{
			field: 'dictionary',
			type: 'json',
			name: 'Dictionary',
			meta: {
				width: 'full',
				interface: 'list',
				options: {
					template: '{{ key }}',
					fields: [
						{
							field: 'key',
							type: 'string',
							name: 'Key',
							meta: {
								interface: 'input',
								options: {
									placeholder: 'Add key...'
								}
							}
						},
						{
							field: 'description',
							type: 'text',
							name: 'Description',
							meta: {
								interface: 'input-multiline',
								options: {
									placeholder: 'Add description...'
								}
							}
						}
					]
				}
			}
		}
	]
});
