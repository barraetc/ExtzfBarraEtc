/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/

Ext.require('Ext.window.MessageBox');


Ext.define('ExtZF.controller.admin.Users', {
    extend: 'Ext.app.Controller',
  
    stores: ['Users'],
    models: ['Users'], 
    views: [
                'admin.users.List',
                'admin.users.Edit'
            ],
    refs: [{
                ref: 'admiUsersEdit',
                selector: 'editPanel'
            },{
                ref:'usersList',
                selector:'adminUsersList'
            }],


    init: function() 
    {
        this.control(
        {
            // evento duplo click na tela principal(viewport) --> usuariolista(grid)
            'adminUsersList': {
                itemdblclick: this.editUser
            },
            // evento click no botao (definido com action: incluir) da grid definida como usuariolista
            'adminUsersList button[action=new]': {
                click: this.editUser
            },
            // evento click no botao (definido com action: delete) da grid definida como usuariolista
            'adminUsersList button[action=delete]': {
                click: this.deleteUser
            },
            // evento click no botao (definido com action: save) do formulario definido como usuarioedicao
            'admiUsersEdit button[action=save]': {
                click: this.saveUser
            }
        });
    },
    // Função para popular o formulario
    editUser: function(grid, record) 
    {
        var view = Ext.widget('admiUsersEdit');
        view.setTitle('Edição');
        if(!record.data){
            record = new ExtZF.model.Users();
            this.getUsersStore().add(record);
            view.setTitle('Novo');
        }
      	view.down('form').loadRecord(record);
            
    },

    // Função para popular o formulario
    deleteUser: function() 
    {
        var grid = this.getUsersList(); // recupera lista de usuários
        ids = grid.getSelectionModel().getSelection(); // recupera linha selecionadas

        if(ids.length === 0)
        {
        	Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
        	return ;
        }

        Ext.Msg.confirm('Confirmação', 'Tem certeza que deseja apagar o(s) registro(s) selecionado(s)?',
		function(opt)
                {
                    if(opt === 'no')
                            return;
                    // exibe uma mascará na grid com a mensagem abaixo
                    grid.el.mask('Excluindo registro(s)');
                    store = this.getUsersStore();
                    store.remove(ids);
                    store.sync();
                    grid.el.unmask();
			
		}, this);
    },

    saveUser: function(button) 
    {
        var me=this;
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm() // recupera item abaixo(filho) da window do tipo form
           
        if (form.isValid()) {

            r = form.getRecord();
            form.updateRecord(r);


            r.save({
                success: function(a,b){
                    Ext.log({msg:"Salvo com sucesso!",level:"info",dump:a});
                    win.close();
                    me.getUsersStore().load();
                },
                failure:function(a,b){
                    Ext.log({msg:"Erro ao salvar!",level:"error"});
                }
                });
            
        }

    }

});