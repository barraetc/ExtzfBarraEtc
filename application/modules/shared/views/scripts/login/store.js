/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/
Ext.define('ExtZF.store.login.Store', {
    extend: 'Ext.data.Store',
    alias : 'ExtZF.store.login.Store',
    model: 'ExtZF.model.login.Model',
    autoLoad: true,
    remoteSort: true 
});