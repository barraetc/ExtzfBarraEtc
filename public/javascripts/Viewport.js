Ext.define('Js.Viewport', {

    extend: 'Ext.container.Viewport',
    id: 'etcLayout',
    alias: 'etcViewport',
    layout: {
        type: 'border',
        padding: 5
    },
    items : [
    {
                
        region: 'north',
        split       : false,
        collapsible : false,
        height      : 57,
        margins     : '0 0 0 0',
        id: 'ctnTop',
        tbar        : {
            id          : 'basic-statusbar',
            items       : [
            '<span style="font-size:1.3em"><b>CRUD X - Extjs+ZF</b></span>',
            '->',{
                text    : '',
                id      : 'text',
                iconCls : 'silk-user'
            },
            'Bem Vindo(a), <span id="main_username" class="username">' + username + '</span></b>',
            '-',{xtype : 'authMenu'}]
        },
        items : {
            xtype : 'etcToolbar'
        }
    },
    {
        
        region      : 'west',
        collapsed   :false,
        width       : 200,
        layout      : 'accordion',
        activeItem  : 0,
        id          : 'ctnLeft',
        collapsible     :true,
        split           :true,
        collapseMode    : 'mini',
        items       : [

                        {
                            xtype   : 'panel',
                            title   : 'Exemplo 1',
                            id      : 'etcPanel1',
                            layout  : 'fit'
                        },{
                            xtype: 'panel',
                            title: 'Exemplo 2',
                            id: 'etcPanel2'
                        }
                        ]
    },
    {
        xtype: 'container',
        region: 'center',
        id: 'ctnCenter',
        layout: 'fit',
        items :
        {
            xtype : 'tabpanel',
            layout:'fit',
            id:'etcTabPanel',
            items:[{
                    xtype    : "panel",
                    title    : "Home",
                    iconCls  : "icon-dashboard",
                    closable : false,
                    html     : 'Bem vindo'
                }]
        }
    },
    {
        region      : 'east',
        width       : 100,
        id          : 'ctnRight',
        collapsible : true,
        collapsed  : true,
        split       : false
    },
    {
        xtype       : 'container',
        region      : 'south',
        height      : 16,
        id          : 'ctnBotton',
        collapsible  : true
    }
    ]
});