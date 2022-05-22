DROP TABLE IF EXISTS `Equipamentos`;

CREATE TABLE `Equipamentos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL COMMENT 'Nome do equipamento',
  `ip` char(15) NOT NULL COMMENT 'ip do equipamento',
  `protocolo` varchar(255) NOT NULL COMMENT 'nome do protocolo do equipamento',
  `logica_valores` varchar(255) NOT NULL COMMENT 'nome do arquivo que lida com a logica do equipamento',
  `tipo_equipamento` enum('I','O','IO') NOT NULL COMMENT 'tipo do equipamento',
  `token` char(100) NOT NULL COMMENT 'token psk',
  `ativado` enum('A','D') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip` (`ip`),
  UNIQUE KEY `token` (`token`),
  KEY `Equipamentos_tipo_equipamento_IDX` (`tipo_equipamento`) USING BTREE,
  KEY `Equipamentos_tipo_equipamento_token_IDX` (`tipo_equipamento`,`token`) USING BTREE,
  KEY `Equipamentos_protocolo_IDX` (`protocolo`) USING BTREE,
  KEY `Equipamentos_logica_valoeres_IDX` (`logica_valores`) USING BTREE,
  KEY `Equipamentos_nome_IDX` (`nome`) USING BTREE,
  KEY `Equipamentos_ip_IDX` (`ip`,`token`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Tags`;

CREATE TABLE `Tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `ativado` enum('A','D') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `TagsEquipamentos`;

CREATE TABLE `TagsEquipamentos` (
  `id` bigint(20) unsigned NOT NULL,
  `id_equipamento` int(10) unsigned NOT NULL,
  `id_tag` int(10) unsigned NOT NULL,
  `logica` varchar(255) NOT NULL,
  `tipo_equipamento` enum('I','O') NOT NULL,
  `ativado` enum('A','D') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`),
  KEY `id_equipamento` (`id_equipamento`),
  KEY `id_tag` (`id_tag`),
  KEY `TagsEquipamentos_tipo_equipamento_IDX` (`tipo_equipamento`) USING BTREE,
  CONSTRAINT `TagsEquipamentos_ibfk_1` FOREIGN KEY (`id_equipamento`) REFERENCES `Equipamentos` (`id`),
  CONSTRAINT `TagsEquipamentos_ibfk_2` FOREIGN KEY (`id_tag`) REFERENCES `Tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE PROCEDURE `ProjetoIntegradorVIII`.`GET_PROCEDURE`(IN dPROCEDURE VARCHAR(255))
BEGIN
	SELECT
		PARAMETER_NAME
		,DATA_TYPE
		,CHARACTER_MAXIMUM_LENGTH
		,NUMERIC_PRECISION
		,NUMERIC_SCALE
		,DATETIME_PRECISION
	FROM information_schema.parameters 
	WHERE 
		SPECIFIC_NAME = dPROCEDURE
		AND ROUTINE_TYPE = 'PROCEDURE'
		AND PARAMETER_MODE = 'IN'
	;

END;

CREATE PROCEDURE ProjetoIntegradorVIII.PUT_EQUIPAMENTO(IN nome VarChar(255), IN ip Char(15), IN protocolo VarChar(255), IN logica_valores VarChar(255), IN tipo_equipamento ENUM('I', 'O', 'IO'),IN token char(100))
BEGIN
	INSERT INTO Equipamentos (
		`nome`
		,`ip`
		,`protocolo`
		,`logica_valores`
		,`tipo_equipamento`
		,`token`
	) VALUES (
		nome
		,ip
		,protocolo
		,logica_valores
		,'O'
		,token
	);
END;

CREATE PROCEDURE ProjetoIntegradorVIII.DELETE_EQUIPAMENTO(IN id int)
BEGIN
	UPDATE Equipamentos SET Equipamentos.ativado = 'D' WHERE Equipamentos.id = id;
END;

