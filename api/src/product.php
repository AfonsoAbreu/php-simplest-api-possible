<?php

require_once "../vendor/autoload.php";

use Firebase\JWT;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$action = strtolower($_SERVER['REQUEST_METHOD']);

switch ($action) {
  case "get":
    require_once "./database/getConnection.php";
    $stmt = $DB->query("SELECT * FROM tb_produto");
    $response = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      array_push($response, $row);
    }
    http_response_code(200);
    echo json_encode($response);
    break;
  case "post":
    if (isset($_COOKIE["auth_token"])) {
      require "../env.php";
      $token = $_COOKIE["auth_token"];
      try {
        $token = JWT\JWT::decode($token, $ENV["JWT_SECRET"], ["HS512"]);
      } catch (JWT\SignatureInvalidException $e) {
        http_response_code(401);
        echo json_encode(["error" => "Forbidden"]);
        return;
      } catch (JWT\ExpiredException $e) {
        http_response_code(401);
        echo json_encode(["error" => "Expired Session"]);
        return;
      } catch (JWT\BeforeValidException $e) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid Session"]);
        return;
      } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid Session"]);
        return;
      }
    } else {
      http_response_code(403);
      echo json_encode(["error" => "Unauthorized"]);
      return;
    }

    $body = json_decode(file_get_contents("php://input"), true);
    if (
      isset($body["nm_produto"]) && 
      isset($body["vl_produto"]) && 
      isset($body["ds_compra"]) && 
      isset($body["im_produto"])
    ) {
      require "./database/getConnection.php";
      $DB->beginTransaction();
      $query = $DB->prepare("INSERT INTO tb_produto (nm_produto, vl_produto, ds_compra, im_produto) VALUES (?, ?, ?, ?)");

      try {
        $query->execute([
          htmlspecialchars($body["nm_produto"], ENT_QUOTES, 'UTF-8'),
          (float)htmlspecialchars($body["vl_produto"], ENT_QUOTES, 'UTF-8'),
          htmlspecialchars($body["ds_compra"], ENT_QUOTES, 'UTF-8'),
          htmlspecialchars($body["im_produto"], ENT_QUOTES, 'UTF-8')
        ]);
      } catch (PDOException $e) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid POST data"]);
        return;
        $DB->rollBack();
      }
      $DB->commit();
      http_response_code(200);
    } else {
      http_response_code(400);
      echo json_encode(["error" => "Invalid POST data"]);
      return;
    }    
    break;
  default:
    http_response_code(400);
    echo json_encode(["error" => "Unsupported http verb"]);
}

?>