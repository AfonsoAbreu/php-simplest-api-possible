<?php

use Firebase\JWT;

require_once "../vendor/autoload.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$action = strtolower($_SERVER['REQUEST_METHOD']);

switch ($action) {
  case "post":
    $body = json_decode(file_get_contents("php://input"), true);
    if (isset($body["email"]) && isset($body["password"])) {//se tem email e senha
      require_once "./database/getConnection.php";
      $query = $DB->prepare("SELECT * FROM tb_usuario WHERE cd_email_usuario = ?");//prepara select

      try {//caso algo dê errado, aborta
        $query->execute([$body["email"]]);
      } catch (PDOException $e) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid login credentials"]);
        return;
      }

      $user = $query->fetchAll(PDO::FETCH_ASSOC);
      if (count($user) !== 1 || $user[0]["cd_senha_usuario"] !== $body["password"]) {//caso não haja usuário ou a senha seja incorreta
        http_response_code(401);
        echo json_encode(["error" => "Invalid login credentials"]);
        return;
      }

      $user = $user[0];
      http_response_code(200);
      require __DIR__."/../env.php";
      $payload = [
        'iat' => time(),
        'iss' => $_SERVER['SERVER_NAME'],
        'exp' => time() + 3600,
        'data' => [
          'id' => $user["cd_usuario"]
        ]
      ];//carga do JWT
      $jwt = JWT\JWT::encode($payload, $ENV["JWT_SECRET"], "HS512");
      setcookie("auth_token", $jwt, time()+3600, "/", "", false, true);//gera o JWT e o coloca nos cookies como um HTTPCookie
    } else {
      http_response_code(401);
      echo json_encode(["error" => "Invalid login credentials"]);
    }
    break;
  case "get":
    if (isset($_COOKIE["auth_token"])) {//checagem se há o token, e se ele é válido
      require "../env.php";
      $token = $_COOKIE["auth_token"];
      try {
        $token = (array)JWT\JWT::decode($token, $ENV["JWT_SECRET"], ["HS512"]);
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


    require_once "./database/getConnection.php";
    $query = $DB->prepare("SELECT cd_usuario, cd_email_usuario FROM tb_usuario WHERE cd_usuario = ?");//prepara select
    try {//caso algo dê errado, aborta
      $query->execute([((array)($token["data"]))["id"]]);
    } catch (PDOException $e) {
      http_response_code(401);
      echo json_encode(["error" => "Invalid Token"]);
      return;
    }

    $user = $query->fetch(PDO::FETCH_ASSOC);
    if (!$user) {//caso não haja usuário
      http_response_code(401);
      echo json_encode(["error" => "Invalid Token"]);
      return;
    }

    echo json_encode($user);

    break;
  default:
    http_response_code(400);
    echo json_encode(["error" => "Unsupported http verb"]);
}

?>