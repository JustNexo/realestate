<?php

class User
{

    private $db;

    public function __construct(DBConnector $db)
    {
        $this->db = $db;
    }

    public function login($username, $password, $token)
    {
        error_reporting( E_ERROR );

        if ($token != null){
            $query = "SELECT * FROM realtors WHERE token=:token";
            $data = [
                'token' => $token,
            ];
            $stmt = $this->db->executeQuery($query, $data);
            $stmt->fetchAll();
            if ($stmt->rowCount() === 1) {
                $response = array('success' => true);
            }else
                $response = array('success' => false);
        }else {
            $query = "SELECT * FROM realtors WHERE username=:username AND password=:password";
            $data = [
                'username' => $username,
                'password' => $password,
            ];
            $stmt = $this->db->executeQuery($query, $data);
            $stmt->fetchAll();
            if ($stmt->rowCount() === 1) {
                $query = "SELECT * FROM realtors WHERE username=:username";
                $data = [
                    'username' => $username,
                ];
                $stmt = $this->db->executeQuery($query, $data);
                $result = $stmt->fetch();
                setcookie('token', $result['token'], 0, '/', '', true, true);
                $response = array('success' => true, 'token' => $result['token']);
            } else {
                $response = array('success' => false);
            }
        }
        return $response;
    }
}