<?php
require_once('Class/DBConnector.php');
require_once('Class/User.php');

$db = new DBConnector();

$user = new User($db);

$result = @$user->login($_POST['username'], $_POST['password'], $_POST['token']);

header('Content-Type: application/json');
echo json_encode($result);