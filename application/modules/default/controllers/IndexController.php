<?php
/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $this->_auth = Zend_Auth::getInstance ();
        if ($this->_auth->hasIdentity ()) {
           
            $ident = $this->_auth->getIdentity();
            $this->view->username = $ident->username;
            if($ident->change_passwd){
                $model_usuarios = new Application_Model_Users();
                $usuario = $model_usuarios->getUser($ident->id);
                if ($usuario->change_passwd){
                    $this->view->change_passwd = $ident->change_passwd;
                    $this->_helper->layout()->setLayout('access');
                }
            }
        }else{
           
            $this->_helper->layout()->setLayout('access');
        }
    }


}

