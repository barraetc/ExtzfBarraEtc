Ext.Loader.setConfig({
    enabled: true,
    paths :{
    'Js'    : './javascripts',
    'Ext.ux'    : '../extjs/examples/ux'
    }
});
if(env=='production'){
    Ext.Loader.setConfig('disableCaching',false);
}

Ext.application({
    name: 'ExtZF', 
    appFolder: baseUrl,
    autoCreateViewport :false,
    controllers: [
        'access.Auth',
        'Navigation'
    ],
    
    launch: function() {
         Ext.create('Js.Viewport');
    }

});
