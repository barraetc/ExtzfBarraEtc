<?php
/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/

class Acesso_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        if(!$swContext->hasContext('js')){
            $swContext->addContext('js', array('suffix' => 'js'));
        }
        
        $swContext->addActionContext('app', array( 'js'))
                    ->initContext('js');
        
        
    }

    public function indexAction()
    {
        $this->_helper->layout()->setLayout('access');
    }



}



