-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2021 a las 02:00:34
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `help_desk`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `cargar_notf` (IN `solic` INT, IN `fecha` DATETIME, IN `area` INT)  BEGIN
	DECLARE cant INT;
	SELECT COUNT(h.id_solicitud) FROM historial h WHERE h.id_solicitud = solic INTO cant;
	IF(cant > 4) THEN
		INSERT INTO notificaciones(fecha_ingreso_historial, id_area_historial, id_solicitud_historial, fecha, descripcion, estado)
		VALUES (fecha, area, solic, CURRENT_TIMESTAMP,CONCAT("Solicitud pasada ", cant, " veces"), "Pendiente");
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quince_dias` ()  BEGIN
	DECLARE v_fecha DATETIME;
	DECLARE v_area INTEGER;
	DECLARE v_solic INTEGER;
    DECLARE fechas CURSOR FOR SELECT h.fecha_ingreso, h.id_area,
		s.id_solicitud
        FROM historial h JOIN solicitudes s
        ON h.id_solicitud = s.id_solicitud
        WHERE DATEDIFF(now(), h.fecha_ingreso) > 15
        AND h.fecha_egreso IS NULL;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET @hecho = TRUE;
     OPEN fechas;
    	L1:LOOP
            FETCH fechas INTO v_fecha, v_area, v_solic;
			IF(@hecho) THEN
                LEAVE L1;
            END IF;
            INSERT INTO notificaciones(fecha_ingreso_historial, id_area_historial, id_solicitud_historial, fecha, descripcion, estado, createdAt, updatedAt)
			VALUES (v_fecha, v_area, v_solic, CURRENT_TIMESTAMP,"Han pasado 15 dias", "Pendiente", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    	END LOOP L1;
     CLOSE fechas;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `treinta_horas` ()  BEGIN
	DECLARE v_fecha DATETIME;
	DECLARE v_area INTEGER;
	DECLARE v_solic INTEGER;
    DECLARE fechas CURSOR FOR SELECT h.fecha_ingreso, h.id_area,
		s.id_solicitud
        FROM historial h JOIN solicitudes s
        ON h.id_solicitud = s.id_solicitud
        WHERE TIMESTAMPDIFF(HOUR, h.fecha_ingreso, CURRENT_TIMESTAMP) > 36
        AND h.fecha_egreso IS NULL
		AND s.prioridad LIKE "%Alta%";
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET @hecho = TRUE;
	BEGIN
     OPEN fechas;
    	L1:LOOP
            FETCH fechas INTO v_fecha, v_area, v_solic;
			IF(@hecho) THEN
                LEAVE L1;
            END IF;
            INSERT INTO notificaciones(fecha_ingreso_historial, id_area_historial, id_solicitud_historial, fecha, descripcion, estado, createdAt, updatedAt) 					
			VALUES (v_fecha, v_area, v_solic, CURRENT_TIMESTAMP,"Han pasado 36 Horas", "Pendiente", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    	END LOOP L1;
     CLOSE fechas;
	END;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id_area` int(11) NOT NULL,
  `nombre_area` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id_area`, `nombre_area`, `createdAt`, `updatedAt`) VALUES
(1, 'Gestion', '2021-06-23 00:00:00', '2021-06-23 00:00:00'),
(2, 'Help Desk', '2021-06-23 00:00:00', '2021-06-23 00:00:00'),
(3, 'Calidad', '2021-06-23 00:00:00', '2021-06-23 00:00:00'),
(4, 'Ventas', '2021-06-23 02:43:02', '2021-06-23 02:43:02'),
(5, 'Servicio Técnico', '2021-06-23 02:43:40', '2021-06-23 02:43:40'),
(6, 'Informacion', '2021-06-23 02:44:23', '2021-06-23 02:44:23'),
(7, 'Prueba', '2021-06-24 19:17:08', '2021-06-24 19:17:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `dni` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `celular` bigint(20) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`dni`, `nombre`, `apellido`, `mail`, `contraseña`, `celular`, `estado`, `fecha_creacion`, `createdAt`, `updatedAt`) VALUES
(12345678, 'Fernando', 'Perez', 'unmail@mail.com', '$2b$10$hzkCReVFFHxkEmbJWBPj6.vBnWfHjSd9lQ8klxb08wCwUtHyMMow2', 0, 0, '2021-06-24', '2021-06-24 19:15:38', '2021-06-24 19:18:39'),
(24678952, 'Natalia', 'Dim', 'natalia@gmail.com', '$2b$10$4EYD/JRRc6cA4/5nYOpzt.KasmcBWKoE6QvxuV1/VtwuNiKIC3FbK', 2657220011, 1, '2021-06-23', '2021-06-23 17:04:28', '2021-06-23 17:05:23'),
(33145789, 'Magnus', 'Mefisto', 'magnus_mefisto@gmail.com', '$2b$10$ajzR8aFozjntDVOuA0Tm.eKy3kFGoS4Diy6YQ6FP5YOde5ey5nEpK', 0, 1, '2021-06-23', '2021-06-23 06:30:59', '2021-06-24 06:03:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `dni` int(11) NOT NULL,
  `id_area` int(11) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `celular` bigint(20) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`dni`, `id_area`, `nombre`, `apellido`, `mail`, `contraseña`, `celular`, `estado`, `fecha_creacion`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Administrador', 'Administrador', 'admin@admin.com', '$2b$10$pOyrG.TkYU50vZBJeLvNC.aQJmfhrnWeRmfLRpy0vScIhjKCPAN6O', NULL, 1, '2021-06-23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14497997, 2, 'Juan', 'Torres', 'torres@gmail.com', '$2b$10$16NKJod9DwXJ4A9c34PNbuQigL8WEWU3TbIVjhAt6ucvIZ9UnmfCW', 0, 1, '2021-06-23', '2021-06-23 03:23:09', '2021-06-24 19:17:41'),
(24102007, 3, 'Sofia', 'Bazan', 'bazan@gmail.com', '$2b$10$b1zJHJLkbgXH2FGcQGptLu6KLG/jFvvlvoZMwvsKT//nJgGzu0hka', 0, 1, '2021-06-23', '2021-06-23 03:25:08', '2021-06-23 06:24:45'),
(37505706, 1, 'Carlos', 'Peluffo', 'peluffo@gmail.com', '$2b$10$sxvNUAQQrrHXpqGUbMNQne1N02kxaFntOD0WP6TTq8BOoX07zQMeS', 2657302766, 1, '2021-06-23', '2021-06-23 03:22:29', '2021-06-24 05:10:51'),
(39919818, 6, 'Agustina', 'Ortiz', 'ortiz@gmail.com', '$2b$10$e/3Nxh5pJFneNPEio7koDO/Tre8/ojWCauBh1DBaET1C7YgYa.rna', 112658749, 1, '2021-06-23', '2021-06-23 03:24:03', '2021-06-24 08:04:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `fecha_ingreso` datetime NOT NULL,
  `id_area` int(11) NOT NULL,
  `id_solicitud` int(11) NOT NULL,
  `fecha_egreso` datetime DEFAULT NULL,
  `dni_empleado` int(11) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `detalle_razon` varchar(255) DEFAULT NULL,
  `detalle_solucion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`fecha_ingreso`, `id_area`, `id_solicitud`, `fecha_egreso`, `dni_empleado`, `estado`, `detalle_razon`, `detalle_solucion`, `createdAt`, `updatedAt`) VALUES
('2021-06-01 18:16:26', 2, 5, '2021-06-24 19:33:14', 14497997, 'Resuelto', NULL, 'Se le informo al usuario sobre el producto', '0000-00-00 00:00:00', '2021-06-24 19:33:14'),
('2021-06-04 17:18:26', 2, 4, '2021-06-23 17:47:05', 14497997, 'Resuelto', NULL, 'Se le informo al cliente', '0000-00-00 00:00:00', '2021-06-23 17:47:05'),
('2021-06-20 07:15:50', 2, 2, NULL, NULL, 'Pendiente', NULL, NULL, '0000-00-00 00:00:00', '2021-06-23 17:33:09'),
('2021-06-20 17:09:25', 2, 3, '2021-06-23 17:48:25', 14497997, 'Pendiente', 'Atiende informes, es urgente', NULL, '0000-00-00 00:00:00', '2021-06-23 17:48:25'),
('2021-06-20 17:48:25', 6, 3, '2021-06-23 17:49:36', 39919818, 'Resuelto', NULL, 'Se le informo correctamente al cliente', '2021-06-23 17:48:25', '2021-06-23 17:49:36'),
('2021-06-20 18:16:44', 2, 6, '2021-06-23 18:17:47', 14497997, 'Pendiente', 'Alta prioridad no atendida en 36 hs', NULL, '0000-00-00 00:00:00', '2021-06-23 18:17:47'),
('2021-06-20 18:17:46', 5, 6, NULL, NULL, 'Pendiente', 'Alta prioridad no atendida en 36 hs', NULL, '2021-06-23 18:17:46', '2021-06-23 18:17:46'),
('2021-06-23 06:32:25', 2, 1, '2021-06-23 06:40:23', 14497997, 'Pendiente', 'Para que brinde información al cliente', NULL, '0000-00-00 00:00:00', '2021-06-23 06:40:23'),
('2021-06-23 06:40:23', 6, 1, '2021-06-23 06:58:37', 39919818, 'Pendiente', 'Dale la información vos vago atorrante', NULL, '2021-06-23 06:40:23', '2021-06-23 06:58:37'),
('2021-06-23 06:58:37', 2, 1, '2021-06-23 07:03:09', 14497997, 'Pendiente', 'Atiende Área información', NULL, '2021-06-23 06:58:37', '2021-06-23 07:03:09'),
('2021-06-23 07:03:09', 6, 1, '2021-06-23 07:06:31', 39919818, 'Pendiente', 'Le corresponde a Help Desk, vago atorrante!', NULL, '2021-06-23 07:03:09', '2021-06-23 07:06:31'),
('2021-06-23 07:06:31', 2, 1, '2021-06-23 07:11:07', 14497997, 'Pendiente', 'Atiende informacion dije.', NULL, '2021-06-23 07:06:31', '2021-06-23 07:11:07'),
('2021-06-23 07:11:06', 6, 1, '2021-06-23 07:11:59', 39919818, 'Pendiente', 'No la voy a atender dije. Estoy jugando tf2', NULL, '2021-06-23 07:11:06', '2021-06-23 07:11:59'),
('2021-06-23 07:11:59', 2, 1, '2021-06-24 08:49:56', 14497997, 'Pendiente', 'Probando las vistas, atendela', NULL, '2021-06-23 07:11:59', '2021-06-24 08:49:56'),
('2021-06-24 07:56:47', 2, 9, '2021-06-24 08:03:42', 14497997, 'Pendiente', 'Prueba vista de empleado', NULL, '0000-00-00 00:00:00', '2021-06-24 08:03:42'),
('2021-06-24 08:03:42', 6, 9, NULL, NULL, 'Pendiente', 'Prueba vista de empleado', NULL, '2021-06-24 08:03:42', '2021-06-24 08:03:42'),
('2021-06-24 08:49:55', 6, 1, '2021-06-24 19:28:56', 39919818, 'Pendiente', 'Tranfiriendo a help desk', NULL, '2021-06-24 08:49:55', '2021-06-24 19:28:56'),
('2021-06-24 19:28:56', 2, 1, NULL, NULL, 'Pendiente', 'Tranfiriendo a help desk', NULL, '2021-06-24 19:28:56', '2021-06-24 19:28:56');

--
-- Disparadores `historial`
--
DELIMITER $$
CREATE TRIGGER `trg_notf_4v` AFTER INSERT ON `historial` FOR EACH ROW BEGIN
	CALL cargar_notf(
		NEW.id_solicitud, NEW.fecha_ingreso,
		NEW.id_area);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id_notificacion` int(11) NOT NULL,
  `fecha_ingreso_historial` datetime NOT NULL,
  `id_area_historial` int(11) NOT NULL,
  `id_solicitud_historial` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id_notificacion`, `fecha_ingreso_historial`, `id_area_historial`, `id_solicitud_historial`, `fecha`, `descripcion`, `estado`, `createdAt`, `updatedAt`) VALUES
(15, '2021-06-20 07:15:50', 2, 2, '2021-06-24 19:23:10', 'Han pasado 36 Horas', 'Atendida', '2021-06-24 19:23:10', '2021-06-24 19:24:19'),
(16, '2021-06-20 18:17:46', 5, 6, '2021-06-24 19:23:10', 'Han pasado 36 Horas', 'Pendiente', '2021-06-24 19:23:10', '2021-06-24 19:23:10'),
(17, '2021-06-01 18:16:26', 2, 5, '2021-06-24 19:23:27', 'Han pasado 15 dias', 'Pendiente', '2021-06-24 19:23:27', '2021-06-24 19:23:27'),
(18, '2021-06-20 07:15:50', 2, 2, '2021-06-24 19:24:10', 'Han pasado 36 Horas', 'Pendiente', '2021-06-24 19:24:10', '2021-06-24 19:24:10'),
(19, '2021-06-20 18:17:46', 5, 6, '2021-06-24 19:24:10', 'Han pasado 36 Horas', 'Pendiente', '2021-06-24 19:24:10', '2021-06-24 19:24:10'),
(20, '2021-06-01 18:16:26', 2, 5, '2021-06-24 19:24:27', 'Han pasado 15 dias', 'Pendiente', '2021-06-24 19:24:27', '2021-06-24 19:24:27'),
(21, '2021-06-20 07:15:50', 2, 2, '2021-06-24 19:25:10', 'Han pasado 36 Horas', 'Pendiente', '2021-06-24 19:25:10', '2021-06-24 19:25:10'),
(22, '2021-06-20 18:17:46', 5, 6, '2021-06-24 19:25:10', 'Han pasado 36 Horas', 'Pendiente', '2021-06-24 19:25:10', '2021-06-24 19:25:10'),
(23, '2021-06-24 19:28:56', 2, 1, '2021-06-24 19:28:56', 'Solicitud pasada 9 veces', 'Atendida', '0000-00-00 00:00:00', '2021-06-24 19:29:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210602023408-create-area.js'),
('20210602023428-create-empleado.js'),
('20210602023444-create-cliente.js'),
('20210602023712-create-solicitud.js'),
('20210602023830-create-historial.js'),
('20210602023947-create-notificacion.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id_solicitud` int(11) NOT NULL,
  `dni_cliente` int(11) NOT NULL,
  `detalle` varchar(255) NOT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `fecha_solicitud` datetime NOT NULL,
  `prioridad` varchar(255) DEFAULT NULL,
  `nro_ticket` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `solicitudes`
--

INSERT INTO `solicitudes` (`id_solicitud`, `dni_cliente`, `detalle`, `tipo`, `fecha_solicitud`, `prioridad`, `nro_ticket`, `createdAt`, `updatedAt`) VALUES
(1, 33145789, 'Probando la nueva base de datos', 'informacion', '2021-06-23 06:32:25', 'Media', 455065148, '2021-06-23 06:32:25', '2021-06-24 08:49:56'),
(2, 33145789, 'Probando una segunda vez para prioridad alta', 'reclamo', '2021-06-23 07:15:50', 'Alta', 310211014, '2021-06-23 07:15:50', '2021-06-23 17:33:09'),
(3, 24678952, 'Solicitud para alta prioridad', 'incidente', '2021-06-23 17:09:25', 'Alta', 2032686443, '2021-06-23 17:09:25', '2021-06-23 17:48:25'),
(4, 24678952, 'Prueba de resolucion en help desk', 'reclamo', '2021-06-23 17:18:26', 'Baja', 1752979167, '2021-06-23 17:18:26', '2021-06-23 17:47:05'),
(5, 24678952, 'No atendida en 15 días', 'compra', '2021-06-23 18:16:26', 'Baja', 611826400, '2021-06-23 18:16:26', '2021-06-24 19:33:14'),
(6, 24678952, 'Alta prioridad no atendida', 'incidente', '2021-06-23 18:16:44', 'Alta', 320838395, '2021-06-23 18:16:44', '2021-06-23 18:17:47'),
(9, 24678952, 'Para probar la vista de empleados', 'incidente', '2021-06-24 07:56:47', 'Baja', 17343676, '2021-06-24 07:56:47', '2021-06-24 08:03:42');

--
-- Disparadores `solicitudes`
--
DELIMITER $$
CREATE TRIGGER `trg_historial` AFTER INSERT ON `solicitudes` FOR EACH ROW BEGIN
	INSERT INTO historial(fecha_ingreso, id_area, id_solicitud, estado)
	VALUES (CURRENT_TIMESTAMP, 2, NEW.id_solicitud, "Pendiente");
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id_area`),
  ADD UNIQUE KEY `nombre_area` (`nombre_area`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD KEY `id_area` (`id_area`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`fecha_ingreso`,`id_area`,`id_solicitud`),
  ADD KEY `id_area` (`id_area`),
  ADD KEY `id_solicitud` (`id_solicitud`),
  ADD KEY `dni_empleado` (`dni_empleado`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id_notificacion`),
  ADD KEY `fecha_ingreso_historial` (`fecha_ingreso_historial`),
  ADD KEY `id_area_historial` (`id_area_historial`),
  ADD KEY `id_solicitud_historial` (`id_solicitud_historial`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD UNIQUE KEY `nro_ticket` (`nro_ticket`),
  ADD KEY `dni_cliente` (`dni_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id_notificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes` (`id_solicitud`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_ibfk_3` FOREIGN KEY (`dni_empleado`) REFERENCES `empleados` (`dni`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`fecha_ingreso_historial`) REFERENCES `historial` (`fecha_ingreso`) ON DELETE CASCADE,
  ADD CONSTRAINT `notificaciones_ibfk_2` FOREIGN KEY (`id_area_historial`) REFERENCES `historial` (`id_area`) ON DELETE CASCADE,
  ADD CONSTRAINT `notificaciones_ibfk_3` FOREIGN KEY (`id_solicitud_historial`) REFERENCES `historial` (`id_solicitud`) ON DELETE CASCADE;

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`dni_cliente`) REFERENCES `clientes` (`dni`) ON DELETE CASCADE;

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `control_quince` ON SCHEDULE EVERY 60 SECOND STARTS '2021-06-23 01:53:27' ON COMPLETION PRESERVE DISABLE DO BEGIN 
		CALL quince_dias();
END$$

CREATE DEFINER=`root`@`localhost` EVENT `control_treinta` ON SCHEDULE EVERY 60 SECOND STARTS '2021-06-23 01:55:10' ON COMPLETION PRESERVE DISABLE DO BEGIN 
		CALL treinta_horas();
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
