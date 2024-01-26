<?php
    //nos conectamos a la base de datos
    $dsn="mysql:host=localhost;dbname=todo";
    $user="root";
    $pass="";

    try {
        $conexionBBDD = new PDO($dsn, $user, $pass);
        $conexionBBDD->exec("set names utf8");
    } catch (PDOException $e) {
        $respuesta['error'] = "Error: " . $e->getMessage();
        echo json_encode($respuesta);
        exit;
    }
?>