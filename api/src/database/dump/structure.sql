DROP DATABASE IF EXISTS 02_trabalho_pra_mencao;
CREATE DATABASE 02_trabalho_pra_mencao;
USE 02_trabalho_pra_mencao;

CREATE TABLE tb_produto (
  cd_produto INT AUTO_INCREMENT,
  nm_produto VARCHAR(40) NOT NULL,
  vl_produto DECIMAL(8,2) NOT NULL,
  ds_compra TINYTEXT NOT NULL,
  im_produto TINYTEXT NOT NULL,
  CONSTRAINT pk_produto PRIMARY KEY (cd_produto)
);

create table tb_usuario (
  cd_usuario INT AUTO_INCREMENT,
  cd_email_usuario VARCHAR(190) NOT NULL,
  cd_senha_usuario VARCHAR(190) NOT NULL,
  CONSTRAINT pk_usuario PRIMARY KEY (cd_usuario),
  CONSTRAINT uk_usuario UNIQUE KEY (cd_email_usuario)
);

INSERT INTO tb_usuario (cd_email_usuario, cd_senha_usuario) VALUES
("teste@teste.com", "teste");