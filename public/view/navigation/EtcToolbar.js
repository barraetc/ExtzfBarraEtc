Ext.define('ExtZF.view.navigation.EtcToolbar', {
    extend: 'Ext.Toolbar',
    alias:      'widget.etcToolbar',
    id:         'tbrMenu',
    initComponent: function() {
        this.items = [
        {
            text: 'Arquivo',
            id: 'btnArquivo',
            iconCls : 'icon-file',
            menu: [
            {
                text: 'Item 1',
                id: 'mniItemI',
                iconCls : 'icon-programacao',
                data        : 'plano.Programacoes',
                action      : "loadController",
                createView  : "planoProgramacoesContainer"
            }
            ]
        },
        {
            text: 'Administra&ccedil;&atilde;o',
            id: 'btnAdmin',
            iconCls : 'icon-admin',
            menu: [
            {
                text: 'Usuários',
                data: 'admin.Users',
                action: 'loadController',
                createView : 'adminUsersList',
                iconCls: 'icon-user'
            }
            ]

        },{
            text: 'Sair',
            id: 'btnSair',
            iconCls : 'icon-sair',
            action : 'logout'
        }
        ];
        this.superclass.initComponent.call(this);
    }
});