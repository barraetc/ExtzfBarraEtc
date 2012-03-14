/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/

Ext.define('ExtZF.view.access.auth.Changepassword',{
    extend :'Ext.window.Window',
     alias : 'widget.accessAuthChangepassword',
    iconCls : 'icon-cadeado'
    ,bodyStyle : 'padding:10px;'
    ,title : 'Alterar senha'
    ,labelAlign : 'right'
    ,width : 300
    ,height : 180
    ,labelWidth : 45
    ,minHeight : 180
    ,minWidth : 320
    ,autoShow : true,
    initComponent: function() {
        this.items =[{
            xtype: 'form',
            id  : 'frmChangepassword',
            items : [
                {xtype: 'textfield'
                ,inputType : 'password'
                ,fieldLabel : 'Senha atual'
                ,emptyText  : 'Informe a senha atual'
                ,msgTarget  : 'side'
                ,itemId     : 'passwd'
                ,inputId    : 'passwd'
                ,allowBlank : false
                ,selectOnFocus : true
                ,enableKeyEvents: true}
            ,{
                xtype : 'textfield'
                ,inputType : 'password'
                ,fieldLabel : 'Nova senha'
                ,emptyText : 'Informe a nova senha'
                ,msgTarget : 'side'
                ,itemId     : 'new_passwd'
                ,inputId    : 'new_passwd'
                ,allowBlank : false
                ,selectOnFocus : true
                ,enableKeyEvents: true
            },{
                xtype : 'textfield'
                ,inputType : 'password'
                ,fieldLabel : 'Confirme'
                ,emptyText : 'Confirme a nova senha'
                ,msgTarget : 'side'
                ,itemId     : 'confirm_passwd'
                ,inputId    : 'confirm_passwd'
                ,allowBlank : false
                ,selectOnFocus : true
                ,enableKeyEvents: true
            }
            ]

        }];
        this.buttons = [{
                xtype : 'button'
                ,id     : 'alterar'
                ,text : 'Alterar'
                ,iconCls: 'icon-alterar'
                ,action : 'change'
                }]
        this.callParent(arguments);
    }

 
});
