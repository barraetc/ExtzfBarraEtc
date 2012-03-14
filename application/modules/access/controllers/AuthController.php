<?php
/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/
class Access_AuthController extends Zend_Controller_Action
{

    public function init()
    {
        $this->getResponse()
             ->setHeader('Content-type', 'text/javascript');
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        if (!$swContext->hasContext('js'))
            $swContext->addContext('js', array('suffix' => 'js'));

        $swContext->addActionContext('Controller', array('js'))
                ->addActionContext('Form', array('js'))
                ->addActionContext('checklogin', array('json'))
                ->addActionContext('login', array('json'))
                ->addActionContext('logout', array('json'))
                ->addActionContext('Menu', array('js'))
                ->addActionContext('Changepassword', array('js'))
                ->initContext();
        $this->_helper->layout()->disableLayout();
    }

    public function indexAction()
    {
        // action body
    }

    public function controllerAction()
    {
        
    }

    public function formAction()
    {
        // action body
    }

    public function loginAction()
    {
        if (!($this->_request->isPost())){
                $this->view->success = false;
                $this->view->msg = "Falha ao autenticar";
            }
        
        try {
 
            $db = Zend_Registry::get('db'); 
            $authadapter = new Zend_Auth_Adapter_DbTable($db);

            // Assign the authentication informations to the adapter
            $authadapter->setTableName('users')
                    ->setIdentityColumn('username')
                    ->setCredentialColumn('passwd')
                    ->setCredentialTreatment("MD5(  ? || salt)");
            //Zend_Registry::set('auth', $authadapter);
            $filter = new Zend_Filter ( );
            $filter->addFilter(new Zend_Filter_StringTrim())->addFilter(new Zend_Filter_StripTags())->addFilter(new Zend_Filter_Alnum());

            // Give the adapter the username and the password
            $username = $filter->filter($this->_request->getPost('username'));
            $password = $filter->filter($this->_request->getPost('passwd'));
            $authadapter->setIdentity($username)->setCredential($password);
            $auth = Zend_Auth::getInstance();
            $auth->clearIdentity();
            $auth->getStorage()->clear();
            $result = $authadapter->authenticate(); //  $auth->authenticate ($authadapter);

            $zf_auth = Zend_Auth::getInstance();

            if ($result->isValid()) {
                $zf_auth = Zend_Auth::getInstance();
                $auth->getStorage()->write($authadapter->getResultRowObject(null, array('passwd', 'salt')));
                if($auth->getIdentity()->change_passwd){
                    $this->view->forceChange = true;
                    $this->view->username = $auth->getIdentity()->username;
                    $sess = new Zend_Session_Namespace('changePassword');
                    $sess->forceChange =true;
                }
                
                $this->view->success = true;
                $this->view->msg = "Login efetuado!";


            } else {
                // Not valid, show the loginform
                $this->view->msg = "Usuário ou senha inválidos.";
                $this->view->success=false;
            }
        } catch (Zend_Auth_Exception $e) {
            $this->view->success=false;
            $this->view->errorMessage = $e->getMessage();
        } catch (Zend_Db_Adapter_Exception $e) {
            $this->view->success=false;
            $this->view->errorMessage = $e->getMessage();
        } catch (Zend_Exception $e) {
            $this->view->success=false;
            $this->view->errorMessage = $e->getMessage();
        }
    }
    public function checkloginAction(){
        $this->view->success = true;
        $this->view->msg = "Login efetuado!";
    }
    public function logoutAction()
    {
        Zend_Registry::_unsetInstance ();
        Zend_Auth::getInstance ()->clearIdentity ();
        Zend_Session::destroy();
        $this->view->success =true;
    }

    public function changepasswordAction()
    {
        // action body
    }

    public function menuAction()
    {
        // action body
    }


}





