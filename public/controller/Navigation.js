Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.Navigation', {
    extend: 'Ext.app.Controller',
     views: [
    'navigation.EtcToolbar'
    ],
    constructor: function() {
            this.ref({
                    ref: 'viewport',
                    selector: 'viewport'
                },{
                    ref: 'etcTabPanel',
                    selector: 'principal'
                });

            this.callParent(arguments);
	},
    init: function() {
        me=this;
        this.control(
        {
            'menuitem[action=loadController]': {
                click: this.loadControllerFromMenu
            },
            '[action=logout]': {
                click: this.logout
            }
            
        });
    },
    
    logout: function() {
        Ext.Ajax.request({
            url: baseUrl+'/access/auth/logout',
            params : {format : 'json'},
            success: function(response){
                window.location.reload();
            }
        });
    },
    
   
    loadControllerFromMenu : function(obj){
        this.loadController(obj);
    },
    loadController : function(a,record,c){
         var view ="",
                screen = Ext.getCmp('etcTabPanel'),
                options,
                titulo = a.text;
        
        screen.el.mask('Carregando....');
        var novaAba = screen.items.findBy(
            function( aba )
            { 
                return aba.title === titulo; 
            }
        ); 

        // cria nova aba no centro da aplicação
        if(!novaAba){
            view = this.criaView(a);
            view.title = titulo;
            view.iconCls = a.iconCls;
            novaAba = screen.add(view);
        }
        screen.setActiveTab(novaAba);
        screen.el.unmask();
               
    },
    criaView :function(a){
        var controller = this.getController(a.data),
        args = Array.prototype.slice.call(arguments, 1);
        view = Ext.widget(a.createView)
        options = {single: true};

        // Call the controller init method when the view is rendered
        view.mon(view, 'render', function() {
                Ext.log('executing init on Controller ' + controller.id + ' passing: ', args);
                controller.init.apply(controller, args);
                 
        }, this, options);

        // Remove the controller and destroy the view when the view component is deactivated
        
        view.mon(view, 'destroy', function(view) {
                Ext.log('removing controller ' + controller.id + ' & destroying controller ' + view.id);

                view.destroy();

               // Ext.destroy(this.application.controllers.remove(this));
        }, this, options);
        
        return view;

    }

});