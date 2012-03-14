<?php

/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/


class Data_UsersController extends Zend_Rest_Controller {

    public function init() {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                ->addActionContext('put', array('json', 'xml'))
                ->addActionContext('post', array('json', 'xml'))
                ->addActionContext('get', array('json', 'xml'))
                ->addActionContext('delete', array('json', 'xml'))
                ->initContext('json');
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function indexAction() {
        $users_model = new Application_Model_Users();
        $users = $users_model->getAll(null, 'id');
        $this->_helper->viewRenderer->setNoRender(true);
        $arr = array('rows' => $users->toArray(), 'total' => count($users));
        $this->view->rows = $users->toArray();
        $this->view->total = count($users);
        $this->view->success = true;
    }

    public function getAction() {
        $users_model = new Application_Model_Users();
        try {
            $user = $users_model->getUser($this->_getParam('id'));
            $this->view->rows = $user->toArray();
            $this->view->total = count($user);
        } catch (Exception $e) {
            $this->view->success = false;
            $this->view->msg = "Erro abrir o registro<br>" . $e->getMessage() . "<br>" . $e->getTraceAsString();
        }
    }

    public function postAction() {
        if ($this->getRequest()->isPost()) {
            try {
                $users_model = new Application_Model_Users();
                $formData = $this->getRequest()->getPost('rows');
                $formData = json_decode($formData, true);
                unset($formData['id']);
                $obj = $users_model->addUser($formData);
                $this->view->msg = "Dados inseridos com sucesso!";
                $this->view->rows = $obj->toArray();
                $this->view->success = true;
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao inserir registro<br>" . $e->getMessage() . "<br>" . $e->getTraceAsString();
            }
        } else {
            $this->view->msg = "Método " . $this->getRequest()->getMethod();
        }
    }

    public function putAction() {
        if (($this->getRequest()->isPut())) {
            try {
                $users_model = new Application_Model_Users();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData, true);
                $id = $formData['id'];
                unset($formData['id']);
                if (isset($formData['passwd'])) {
                    $user = $users_model->updatePassword("id=$id", $formData['passwd']);
                    $sess = new Zend_Session_Namespace('changePassword');
                    if (isset($sess->forceChange)) {
                        $users_model->updateUser(array('change_passwd' => 'false'), "id=$id");
                        Zend_Session::destroy('changePassword');
                        $this->logar($user->username, $formData['passwd']);
                        $user = $users_model->getUser($id);
                    }
                } else {
                    $user = $users_model->updateUser($formData, "id=$id");
                }
                $this->view->msg = "Dados atualizados com sucesso!";

                $this->view->rows = $user->toArray();
                $this->view->success = true;
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar usuário<br>" . $e->getMessage();
            }
        } else {
            $this->view->msg = "Método " . $this->getRequest()->getMethod();
        }
    }

    public function deleteAction() {
        if ($this->getRequest()->isDelete()) {
            try {
                $users_model = new Application_Model_Users();
                $id = $this->_getParam('id');
                $users_model->deleteUser($id);
                $this->view->success = true;
                $this->view->msg = "Usuário apagado com sucesso!";
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->msg = "Erro ao apagar usuário<br>" . $e->getTraceAsString();
            }
        } else {
            $this->view->msg = "Método " . $this->getRequest()->getMethod();
            ;
            $this->view->parametros = $this->_getAllParams();
        }
    }


}

