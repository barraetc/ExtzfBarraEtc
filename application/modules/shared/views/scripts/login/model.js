/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/

Ext.define('ExtZF.model.login.Model', {
    extend: 'Ext.data.Model',
    fields: ['id','username','passwd'],

    validations: [{
        type: 'length',
        field: 'passwd',
        min: 4
    }],
    proxy: {
    	simpleSortMode: true, 
        type: 'rest',
        url :   'data/users',
        reader: {
            type: 'json',
            root: 'rows',
            successProperty: 'success'
        },
        writer: {
            root: 'rows',
            type:   'json',
            encode: true 
        }
    }
});