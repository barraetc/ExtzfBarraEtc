<?php
/**
 * CRUD básico com integração do  ExtJS + Zend Framework
 * 
 * @author Marcone Costa <blog@barraetc.com.br>
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 **/
class Application_Model_Users {

    private $password_md5;
    private $salt;
    /**
     * 
     * @return Data_Model_DbTable_Row_User
     */
    public function getUser($id) {
        $id = (int) $id;
        $users_table = new Application_Model_DbTable_Users();
        $user = $users_table->fetchRow('id = ' . $id);
        if (!$user) {
            throw new Exception("Usuário não encontrado: $id");
        }
        return $user;
    }
    /**
     *
     * @param array $data
     * @return Data_Model_DbTable_Row_user 
     */
    public function addUser($data) {
        $users_table = new Application_Model_DbTable_Users();
        $users_table->getAdapter()->beginTransaction();
        
        $password = isset($data['passwd'])?$data['passwd']:null;
        $this->makePassword($password);
        $data['passwd'] = $this->password_md5;
        $data['salt'] = $this->salt;
        $id = $users_table->insert($data);
        $users_table->getAdapter()->commit();
        
        return $users_table->fetchRow('id = ' . $id);;
    }
    /**
     *
     * @param string $where
     * @param string $password 
     */
    function updatePassword($where, $password=null) {
        $users_table = new Application_Model_DbTable_Users();
        $data = array();
       
        $users_table->getAdapter()->beginTransaction();
        $this->makePassword($password);
        $data['passwd'] = $this->password_md5;
        $data['salt'] = $this->salt;
        $users_table->update($data, $where);
        $users_table->getAdapter()->commit();
        return $users_table->fetchRow($where);
    }
    /**
     *
     * @param array $data
     * @param string $where 
     * @return Data_Model_DbTable_Row_user
     */
    function updateUser(array $data, $where) {
        $users_table = new Application_Model_DbTable_Users();
        $users_table->getAdapter()->beginTransaction();
        if (isset($data['passwd'])) {
            $this->makePassword($data['passwd']);
            $data['passwd'] = $this->password_md5;
            $data['salt'] = $this->salt;
        }
        $users_table->update($data, $where);
        $users_table->getAdapter()->commit();
        return $users_table->fetchRow($where);
    }

    function deleteUser($id) {
        
        $users_table = new Application_Model_DbTable_Users();
        $users_table->update(array('enabled'=>false), "id=$id");
    }

    function restoreUser($id) {
        $users_table = new Application_Model_DbTable_Users();
        $users_table->update(array('enabled'=>true), "id=$id");
    }

    private function makePassword($password=null) {
        // define a senha padrão
        
        $password= $password?$password:'123456';
        
        $this->salt = md5(time());
        $this->password_md5 = md5($password . $this->salt);
    }
    /**
     *
     * @param type $where
     * @param type $order
     * @param type $count
     * @param type $offset 
     * @return Zend_Db_Table_Rowset_Abstract
     */
    public function getAll($where = null, $order = null, $count = null, $offset = null){
        $users_table = new Application_Model_DbTable_Users();
        return $users_table->fetchAll($where, $order, $count, $offset);
    }
}

