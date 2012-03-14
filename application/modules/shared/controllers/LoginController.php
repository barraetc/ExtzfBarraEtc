<?php
/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/
class Shared_LoginController extends Zend_Controller_Action
{

    public function init()
    {
        $this->_helper->contextSwitch()
                 ->addContext('js', array('suffix' => 'js',
                     'headers' => array(
                              'Content-Type' => 'application/javascript'),
                          ))
                 ->addActionContext('Store','js')
                 ->addActionContext('Model','js')
                 ->initContext('js');
        $this->_helper->layout()->disableLayout();
    }

    public function storeAction()
    {
        // action body
    }

    public function modelAction()
    {
        // action body
    }


}





