<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

    protected function _initRoutes() {
        $this->bootstrap('FrontController');
        $this->_frontController = $this->getResource('FrontController');
        $router = $this->_frontController->getRouter();
        $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/routes.ini', 'routes');

        $router->addConfig($config, 'routes');
        $restRoute = new Zend_Rest_Route($this->_frontController, array(), array('data'));
        $router->addRoute('rest', $restRoute);
    }

    function _initSession() {
        Zend_Session::start();
    }

    public function _initDbAdapter() {
        $this->bootstrap('db');
        $dbAdapter = $this->getResource('db');

        Zend_Registry::set('db', $dbAdapter);
    }

    public function _initLog() {
        $writer = new Zend_Log_Writer_Firebug();
        $logger = new Zend_Log($writer);
        Zend_Registry::set('logger', $logger);
    }

}

