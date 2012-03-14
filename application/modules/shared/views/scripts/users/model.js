/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/


Ext.define('ExtZF.model.Users', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'email', 'username'],

    validations: [{
        type: 'length',
        field: 'name',
        min: 1
    }, {
        type: 'length',
        field: 'email',
        min: 1
    }],
    proxy: {
    	simpleSortMode: true, // envia parametros de ordenação separadamente (o padrão é sort	[{"property":"id","direction":"ASC"}])
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
            encode: true //importante para enviar os dados com uma array
        }
    }
});