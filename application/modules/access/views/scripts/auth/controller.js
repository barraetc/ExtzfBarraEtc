/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/
Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.access.Auth', {
    extend: 'Ext.app.Controller',
    stores: ['login.Store'],
    models: ['login.Model'],
     views: [
    'access.auth.Form',
    'access.auth.Changepassword',
    'access.auth.Menu'
    ],
    refs: [{
                ref:'loginWindow',
                selector:'accessAuthForm'
            },
            {
                ref:'changeWindow',
                selector:'accessAuthChangepassword'
            }
        ],
    init: function() {
        me=this;
        this.control(
        {
           'accessAuthForm button[action=entrar]': {
                click: this.login
            },
            'accessAuthChangepassword button[action=change]': {
                click: this.change
            },
            'accessAuthForm > form > textfield[itemId=senha]': {
                specialkey: this.onSpecialkey
            },
            'authMenu': {
                click: this.changeClick
            }
        });

        if(typeof username!='undefined' && username.length>0){
            if(typeof forceChange!='undefined' && forceChange){
                this.createChangeWindow();
            }
           
        }else{
            win = Ext.widget('accessAuthForm');

        }
    },
    changeClick: function() {
        cont = Ext.widget('accessAuthChangepassword');
    },
    change: function(button){
        me=this;
        var win = button.up('window');
        var passwd = win.down('#passwd');
        var new_passwd  = win.down('#new_passwd');
        var confirm_passwd = win.down('#confirm_passwd');
        if(new_passwd.value != confirm_passwd.value){
            Ext.Msg.alert('Alteração de senha', 'Senha não confere. Tente novamente!');
            return;
        }
        
        Ext.Ajax.request({
            url: baseUrl+'/access/auth/checklogin',
            params: {
                format: 'json',
                username : username, //definido em layout.phtml
                passwd   : passwd.value,
                onlyCheck : true
            },
            success: function(response){
                obj = Ext.decode(response.responseText);
                if(obj.success){
                    store =  Ext.StoreManager.get('login.Store');
                    record = store.findRecord('username',username);
                    record.set('passwd',new_passwd.value);
                    record.save({
                            success: function(a,b){
                                Ext.log({msg:"Senha alterada com sucesso!",level:"info"});
                                
                                win.close();
                                if(typeof me.forceChange!='undefined'){
                                    window.location.reload();
                                }

                            },
                            failure:function(a,b){
                                Ext.log({msg:"Erro ao salvar!",level:"error"});
                                Ext.Msg.alert('Alteração de senha', 'Erro ao alterar senha!');
                            }
                    })
                }else{
                    Ext.Msg.alert('Alteração de senha', 'Erro na autenticação. Senha atual não confere!');
                }
            },
            failure: function(){
                Ext.Msg.alert('Alteração de senha', 'Erro na autenticação!');
            }
        });
                
    },
    createChangeWindow: function(){
        win = Ext.widget('accessAuthChangepassword');
    },
    onSpecialkey: function(field,event){
        if(event.getKey()==event.ENTER){
        	this.login(field);
        }
    },
    login: function(button) {
        me=this;          
        var win    = button.up('window'), // recupera um item acima(pai) do button do tipo window
            form   = win.down('form').getForm()
			
	    if (form.isValid()) {
            form.submit({
            	scope: this,
                params: {format: 'json'},
            	url: baseUrl+'/access/auth/login?format=json',
                success: function(form, action) {
                    if(action.result.forceChange){
                        me.createChangeWindow();
                        me.forceChange = true
                        username = action.result.username;
                    }else{
                        window.location.reload();
                    }
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Erro', action.result.msg);
                }
            });
        }
    }
});