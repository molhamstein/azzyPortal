export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Calendar',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'calendar',
                        'title': 'NAV.CALENDAR',
                        'type' : 'item',
                        'icon' : 'today',
                        'url'  : '/calendar'
                    },
                    {
                        'id'   : 'calendar',
                        'title': 'Client Calendar',
                        'type' : 'item',
                        'icon' : 'today',
                        'url'  : '/client-calendar'
                    },
                ]
            },
           
            {
                'id'      : 'forms',
                'title'   : 'FORMS.TITLE',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'forms',
                        'title': 'Form.UNPROCESSED_FORMS.TITLE',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/unprocessed',
                        
                    },
                    {
                        'id'   : 'forms',
                        'title': 'Form.PROCESSED_FORMS.TITLE',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/processed',
                        
                    },
                    {
                        'id'   : 'forms',
                        'title': 'Form.CONTRACTED_FORMS.TITLE',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/contracted',
                        
                    }
                ]
            },
        ];
    }
}
