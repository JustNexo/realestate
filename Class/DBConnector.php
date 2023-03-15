<?php
class DBConnector
{
    private $host = 'localhost';
    private $user = 'username';
    private $password = 'password';
    private $dbName = 'objects';
    private $charset = 'utf8mb4';

    protected $pdo;

    public function __construct()
    {
        $dsn = "mysql:host=$this->host;dbname=$this->dbName;charset=$this->charset";

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            $this->pdo = new PDO($dsn, $this->user, $this->password, $options);
        } catch (PDOException $e) {
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function executeQuery(string $query, array $params = [])
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);

        return $stmt;
    }
}