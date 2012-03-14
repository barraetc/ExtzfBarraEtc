/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/

Ext.define('ExtZF.view.admin.users.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.admiUsersEdit',
    title : 'Edição de Usuário',
    layout: 'fit',
    autoShow: true, 
    width : 740,
    initComponent: function() {
    	// Itens da janela
        this.items = [{
                xtype: 'form',
                bodyPadding: 13,
                padding:8,
                items: [{
                    xtype       : 'textfield',
                    name        : 'name',
                    ref         : 'name',
                    fieldLabel  : 'Nome',
                    allowBlank  : false,
                    anchor      :'95%'
                },
                {
                    xtype       : 'textfield',
                    name        : 'email',
                    ref         : 'email',
                    fieldLabel  : 'Email',
                    allowBlank  : false,
                    vtype       : 'email',
                    anchor      :'95%'
                },
                {
                    xtype       : 'textfield',
                    name        : 'username',
                    ref         : 'username',
                    fieldLabel  : 'Login',
                    allowBlank  : false
                }
            ]}
        ];

        this.buttons = [{
            text: 'Salvar',
            action: 'save',
            iconCls: 'icon-save'
        },
        {
            text: 'Cancelar',
            scope: this,
            handler: this.close,
            iconCls : 'icon-cancel'
        }];

        this.callParent(arguments);
    }
});