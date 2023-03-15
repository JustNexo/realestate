<?php
require_once('Class/DBConnector.php');
require_once('Class/Property.php');

$db = new DBConnector();

$property = new Property($db);

$result = $property->addProperty();

header('Content-Type: application/json');
echo json_encode($result);