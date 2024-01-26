<?php

    include('libs/init.php');

    //nos conectamos a la base de datos
    include('libs/conexion_bbdd.php');


    //comprobamos si recibimos id_usuario y nombre de tarea

    if (!isset($_GET['id_usuario'])) {
        $respuesta['error'] = "Faltan datos amigo";
        echo json_encode($respuesta);
        exit;
        
    }

    $usuarioTarea = $_GET['id_usuario'];

    $sql = "SELECT id_tarea, nombre, completada
    FROM tareas
    WHERE id_usuario = :id_usuario";
    //preparemos sentencia
    $stmt = $conexionBBDD->prepare($sql);
    //ejecutamos sentencia
    $stmt->execute([
        ":id_usuario" => $usuarioTarea,
    ]);
    //obtenemos el resultado
    $tareas = $stmt->fetchAll(PDO::FETCH_ASSOC);



    if (count($tareas) >= 0) {
        $respuesta['success'] = true;
        $respuesta['data'] = $tareas;
    }else{
        $respuesta['success'] = false;
        $respuesta['error'] = "No se ha podido recuperar las tarea";
    }
    echo json_encode($respuesta);
?>