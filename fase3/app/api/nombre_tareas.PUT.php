<?php

    include('libs/init.php');

    //nos conectamos a la base de datos
    include('libs/conexion_bbdd.php');

    //recibimos datos por JSON
    include('libs/extraer_datos_json.php');

    //comprobamos si recibimos id_usuario y nombre de tarea

    if (!isset($_GET['id'])) {
        $respuesta['error'] = "Faltan dato id de la tarea";
        echo json_encode($respuesta);
        exit;
        
    }

    if (!isset($data['nombre'])) {
        $respuesta['error'] = "Falta el nombre de la tarea";
        echo json_encode($respuesta);
        exit;
        
    }

    $idTarea = $_GET['id'];
    $nombreTarea = $data['nombre'];

    $sql = "UPDATE tareas
    SET nombre = :nombre
    WHERE id_tarea = :id_tarea";
    //preparemos sentencia
    $stmt = $conexionBBDD->prepare($sql);
    //ejecutamos sentencia
    $stmt->execute([
        "id_tarea" => $idTarea,
        "nombre" => $nombreTarea
    ]);
    //obtenemos el resultado
    $tareas = $stmt->rowCount();



    if ($tareas>0) {
        $respuesta['success'] = true;
        $respuesta['data'] = $tareas;
    }else{
        $respuesta['success'] = false;
        $respuesta['error'] = "No se ha podido modificar la tarea";
    }
    echo json_encode($respuesta);
?>