<?php
require_once ("DBConnector.php");

class Property
{
    private $db;

    public function __construct(DBConnector $db)
    {
        $this->db = $db;
    }

    private function getUserId($token){
        $query = "SELECT id FROM realtors WHERE token=:token";
        $data = [
            'token' => $token,
        ];
        $stmt = $this->db->executeQuery($query, $data);
        $user_id = $stmt->fetch();
        return $user_id['id'];
    }

    public function getAllProperties($token)
    {
        if ($token != null) {
            if (is_numeric($user_id = $this->getUserId($token))){

            $query = "SELECT p.id, p.name, p.address, p.description, p.price, GROUP_CONCAT(pi.file_name) as images
          FROM properties p
          LEFT JOIN property_images pi ON p.id = pi.property_id
          WHERE realtor_id=:user_id
          GROUP BY p.id";
            $data = [
                'user_id' => $user_id
            ];
            $stmt = $this->db->executeQuery($query, $data);
            $properties = $stmt->fetchAll();
            }else{
                http_response_code(403);
                return array("success" => "false");
            }
        }else{
            $query = "SELECT p.id, p.name, p.address, p.description, p.price, GROUP_CONCAT(pi.file_name) as images
          FROM properties p
          LEFT JOIN property_images pi ON p.id = pi.property_id
          GROUP BY p.id";
            $stmt = $this->db->executeQuery($query);
            $properties = $stmt->fetchAll();
        }

        return $properties;
    }

    public function addProperty(){
        $jsonData = file_get_contents('php://input');
        $decodedData = json_decode($jsonData, true);

        if ($decodedData['token'] != null) {

            if (is_numeric($user_id = $this->getUserId($decodedData['token']))){

                $query = "INSERT INTO properties SET
                            name=:name, address=:address, description=:description, price=:price, realtor_id=:id";
                $data = [
                    'name' => $decodedData['name'],
                    'address' => $decodedData['address'],
                    'description' => $decodedData['description'],
                    'price' => $decodedData['price'],
                    'id' => $user_id
                ];

                $stmt = $this->db->executeQuery($query, $data);

                $stmt->fetchAll();
                $last_id = $this->getLastId();

                $images = array();

                if (isset($decodedData['images'])) {
                    foreach ($decodedData['images'] as $base64_image) {
                        $image_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64_image));
                        $images[] = $image_data;
                    }
                }
                if ($images != null) {
                    foreach ($images as $imageData) {
                        $target_dir = "uploads/";
                        $file_ext = 'jpg';
                        $temp = explode('/', $imageData);
                        $temp2 = explode(';', $temp[1]);
                        $ext = explode('/', $temp2[0]);

                        if (count($ext) > 1) {
                            $file_ext = strtolower($ext[1]);
                        }

                        $new_filename = uniqid('', true) . '.' . $file_ext;
                        $target_file = $target_dir . $new_filename;

                        if (file_put_contents($target_file, $imageData)) {
                            $query = "INSERT INTO property_images SET property_id=:last_id, file_name=:file_name";
                            $data = [
                                'last_id' => $last_id,
                                'file_name' => $new_filename,
                            ];
                            print_r($data);
                            $stmt = $this->db->executeQuery($query, $data);
                            $stmt->fetchAll();
                        } else {
                            echo "Error saving file.";
                        }
                    }
                }

            }else{
                http_response_code(403);
                return array("success" => "false");
            }
        }else{
            return array("success" => "false");
        }
    }

    private function getLastId(){
        $query = "SELECT id FROM properties ORDER BY id DESC LIMIT 1";
        $stmt = $this->db->executeQuery($query);
        $result123 = $stmt->fetch();
        return $result123['id'];
    }

    public function getPropertyById($id)
    {

        $query = "SELECT p.id, p.name, p.address, p.description, p.price, GROUP_CONCAT(pi.file_name) as images
          FROM properties p
          LEFT JOIN property_images pi ON p.id = pi.property_id
          WHERE p.id=:id
          GROUP BY p.id
          LIMIT 1";
        $data = [
            'id' => $id
        ];
        $stmt = $this->db->executeQuery($query, $data);

        return $stmt->fetchAll();
    }
}

