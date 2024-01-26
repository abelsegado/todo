<?php

    include('libs/init.php');

    //nos conectamos a la base de datos
    include('libs/conexion_bbdd.php');


    //comprobamos si recibimos id_usuario y nombre de tarea

    if (!isset($_GET['id_tarea'])) {
        $respuesta['error'] = "Faltan datos amigo";
        echo json_encode($respuesta);
        exit;
        
    }

    $idTarea = $_GET['id_tarea'];

    $sql = "DELETE FROM tareas
    WHERE id_tarea = :id_tarea";
    //preparemos sentencia
    $stmt = $conexionBBDD->prepare($sql);
    //ejecutamos sentencia
    $stmt->execute([
        ":id_tarea" => $idTarea,
    ]);
    //obtenemos el resultado
    $tareas = $stmt->rowCount();



    if ($tareas>0) {
        $respuesta['success'] = true;
        $respuesta['data'] = $tareas;
    }else{
        $respuesta['success'] = false;
        $respuesta['error'] = "No se ha podido eliminar la tarea";
    }
    echo json_encode($respuesta);
?>