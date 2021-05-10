<?php

namespace src\database;

use PDO;
use PDOException;

class DBConnection {
  private $connection;

  public function __construct () {
    require __DIR__."/../../env.php";
    $DB_HOST = $ENV["DB_HOST"];
    $DB_DATABASE = $ENV["DB_DATABASE"];
    $DB_PORT = $ENV["DB_PORT"];
    try {
      $this->connection = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_DATABASE;port=$DB_PORT",
        $ENV["DB_USERNAME"],
        $ENV["DB_PASSWORD"]
      );
    } catch (PDOException $e) {
      if ($e->getCode() === 1049) {//caso a base não esteja criada
        require "createDB.php";
        try {//tenta denovo
          $this->connection = new PDO(
            "mysql:host=$DB_HOST;dbname=$DB_DATABASE;charset=utf8;port=$DB_PORT",
            $ENV["DB_USERNAME"],
            $ENV["DB_PASSWORD"]
          );
        } catch (PDOException $exc) {
          exit("Conexão mal-sucedida");
        }
      }
    }
    $this->connection->setAttribute(PDO::ATTR_AUTOCOMMIT, 0);//impede que o banco salve todas as alterações manualmente, essencial para aplicar transactions
  }

  public function getConnection () {//torna $connection readonly
    return $this->connection;
  }
}

?>