export class NavigationModel {
    public model: any[];

    constructor() {
        this.model = [
            {
                'id': 'applications',
                'title': 'Calendar',
                'type': 'group',
                'children': [
                    {
                        'id': 'calendar',
                        'title': 'Nav.CALENDAR',
                        'type': 'item',
                        'icon': 'today',
                        'url': '/calendar',
                        'role': 'ReadCalendar'
                    },
                    {
                        'id': 'calendar',
                        'title': 'Client Calendar',
                        'type': 'item',
                        'icon': 'today',
                        'url': '/client-calendar/5ba69571166b277017d28b9d'
                    },
                    {
                        'id': 'users',
                        'title': 'Nav.USERS',
                        'type': 'item',
                        'icon': 'supervised_user_circle',
                        'url': '/users',
                        'role': 'UserDefinition'
                    },
                    {
                        'id': 'forms',
                        'title': 'Form.UNPROCESSED_FORMS.TITLE',
                        'type': 'item',
                        'icon': 'email',
                        'url': '/unprocessed',
                        'role': 'ReadForms'


                    },
                    {
                        'id': 'forms',
                        'title': 'Form.PROCESSED_FORMS.TITLE',
                        'type': 'item',
                        'icon': 'email',
                        'url': '/processed',
                        'role': 'ReadForms'


                    },
                    {
                        'id': 'forms',
                        'title': 'Form.CONTRACTED_FORMS.TITLE',
                        'type': 'item',
                        'icon': 'email',
                        'url': '/contracted',
                        'role': 'ReadForms'


                    },
                    {
                        'id': 'Contract_Type',
                        'title': 'Contract_Type.CONTRACT_TYPE.TITLE',
                        'type': 'item',
                        'icon': 'supervised_user_circle',
                        'url': '/contract-type',
                        'role': 'contractTypes'
                    },

                ]
            },

            // {
            //     'id': 'forms',
            //     'title': 'FORMS.TITLE',
            //     'type': 'group',
            //     'children': [
            //     ]
            // },
        ];
    }
}
