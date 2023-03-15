<?php
require_once('Class/DBConnector.php');
require_once('Class/Property.php');

error_reporting( E_ERROR | E_PARSE );

$db = new DBConnector();

$property = new Property($db);

$id = $_GET['id'];
if (is_numeric($id))
    $properties = $property->getPropertyById($id);
else
    $properties = $property->getAllProperties($_POST['token']);
header('Content-Type: application/json');
echo json_encode($properties);