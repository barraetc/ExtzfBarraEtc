/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/
Ext.define('ExtZF.view.access.auth.Form',{
    extend :'Ext.window.Window',
     alias : 'widget.accessAuthForm',
    iconCls : 'icon-cadeado'
    ,bodyStyle : 'padding:10px;'
    ,title : 'Autenticação'
    ,labelAlign : 'right'
    ,closable : false
    ,constrain : true
    ,width : 300
    ,height : 140
    ,labelWidth : 45
    ,minHeight : 140
    ,minWidth : 220
    ,autoShow : true
    ,items:[{
        xtype: 'form',
        id  : 'frmLogin',
        items : [
            {xtype: 'textfield'
            ,fieldLabel : 'Usuário'
            ,emptyText  : 'Informe seu login'
            ,msgTarget  : 'side'
            ,itemId     : 'username'
            ,inputId    : 'username'
            ,allowBlank : false
            ,selectOnFocus : true
            ,enableKeyEvents: true}
        ,{
            xtype : 'textfield'
            ,inputType : 'password'
            ,fieldLabel : 'Senha'
            ,emptyText : '*senha*'
            ,msgTarget : 'side'
            ,itemId     : 'passwd'
            ,inputId    : 'passwd'
            ,allowBlank : false
            ,selectOnFocus : true
            ,enableKeyEvents: true
        }
        ]

    }]
    ,buttons: [{
            xtype : 'button'
            ,id     : 'entrar'
            ,text : 'Entrar'
            ,iconCls: 'icon-entrar'
            ,action : 'entrar'
            }]


 
});
