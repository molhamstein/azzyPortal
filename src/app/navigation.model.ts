export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Applications',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'sample',
                        'title': 'Sample',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/sample',
                        'badge': {
                            'title': 25,
                            'bg'   : '#F44336',
                            'fg'   : '#FFFFFF'
                        }
                    }
                ]
            },
            {
                'id'   : 'calendar',
                'title': 'NAV.CALENDAR',
                'type' : 'item',
                'icon' : 'today',
                'url'  : '/calendar'
            },
            {
                'id'      : 'forms',
                'title'   : 'FORMS.TITLE',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'forms',
                        'title': 'UNPROCESSED_FORMS.TITLE',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/unprocessed',
                        
                    },
                    {
                        'id'   : 'forms',
                        'title': 'PROCESSED_FORMS.TITLE',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/processed',
                        
                    }
                ]
            },
        ];
    }
}
