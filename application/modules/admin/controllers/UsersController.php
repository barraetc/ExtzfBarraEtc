<?php
/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/
class Admin_UsersController extends Zend_Controller_Action {

    public function init() {
        $this->_helper->contextSwitch()
                ->addContext('js', array('suffix' => 'js'))
                ->addActionContext('List', 'js')
                ->addActionContext('Edit', 'js')
                ->addActionContext('Controller', 'js')
                ->initContext('js');
        $this->_helper->layout()->disableLayout();
    }

    public function controllerAction() {
        
    }

    public function listAction() {
        // exemplo de código passado para o javascript
        $this->view->title = "Lista de Usuários";
    }

    public function editAction() {
        // action body
    }

}

