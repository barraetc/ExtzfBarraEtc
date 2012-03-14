/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/

Ext.define('ExtZF.store.Users', {
    extend: 'Ext.data.Store',
    alias : 'ExtZF.store.Users',
    model: 'ExtZF.model.Users', // Modelo do store definido em model/Usuario.js
    autoLoad: true,
    remoteSort: true // ordenar registros pelo servidor

});