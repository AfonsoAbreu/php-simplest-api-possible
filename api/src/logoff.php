<?php

use Firebase\JWT;

require_once "../vendor/autoload.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$action = strtolower($_SERVER['REQUEST_METHOD']);

switch ($action) {
  case "get":
    if (isset($_COOKIE["auth_token"])) {//checagem se há o token, e se ele é válido
      setcookie("auth_token", "", time() - 3600, "/", "", false, true);
    }
    break;
  default:
    http_response_code(400);
    echo json_encode(["error" => "Unsupported http verb"]);
}

?>