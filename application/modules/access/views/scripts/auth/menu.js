/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/

Ext.define('ExtZF.view.access.auth.Menu', {
    extend  : 'Ext.button.Button',
    alias   : 'widget.authMenu',
    id      : 'authMenu',
    text    : 'Alterar senha',
    iconCls : 'icon-change',
    action : 'change'

});