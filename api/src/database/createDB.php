<?php

$dump = \file_get_contents(__DIR__."\dump\structure.sql");//pega o dump e separa em vários comandos
require_once __DIR__."/../../env.php";
$DB_HOST = $ENV["DB_HOST"];
try {
  $connection = new \PDO("mysql:host=$DB_HOST;charset=utf8", $ENV["DB_USERNAME"], $ENV["DB_PASSWORD"]);
  $connection->setAttribute(PDO::ATTR_AUTOCOMMIT, 0);//impede que o banco salve todas as alterações manualmente, essencial para aplicar transactions
} catch (PDOException $e) {
  exit("Impossível criar a base de dados");
}
// try {
  $connection->beginTransaction();//tenta executar o dump por meio de uma transação (uma ação que pode ser revertida)
  $connection->exec($dump);
  sleep(1);//existe um problema aqui:
  /*
  O PHP trabalha de maneira síncrona na execução do código, só que o banco de dados não.
  Por isso eu preciso atrasar a execução do resto do script, para dar tempo da tabela ser criada, deixei assim pois esse script só será (na teoria) executado uma vez, que seria na primeira requisição que o servidor receber
  */
  $connection->commit();        
// } catch (Throwable $e) {//denovo, se der erro ele para tudo (e volta ao estado anterior do banco)
//   $connection->rollBack();
// }
$connection = null;

?>