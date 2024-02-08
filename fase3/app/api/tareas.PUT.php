<?php

    include('libs/init.php');

    //nos conectamos a la base de datos
    include('libs/conexion_bbdd.php');

    //recibimos datos por JSON
    include('libs/extraer_datos_json.php');

    //comprobamos si recibimos id_usuario y nombre de tarea

    if (!isset($_GET['id'])) {
        $respuesta['error'] = "Faltan datos amigo";
        echo json_encode($respuesta);
        exit;
        
    }

    if (!isset($data['completada'])) {
        $respuesta['error'] = "Faltan datos amigo del completada";
        echo json_encode($respuesta);
        exit;
        
    }

    $idTarea = $_GET['id'];
    $completada = $data['completada'];

    $sql = "UPDATE tareas
    SET completada = :completada
    WHERE id_tarea = :id_tarea";
    //preparemos sentencia
    $stmt = $conexionBBDD->prepare($sql);
    //ejecutamos sentencia
    $stmt->execute([
        "id_tarea" => $idTarea,
        "completada" => $completada
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