<?php

    include('libs/init.php');

    //nos conectamos a la base de datos
    include('libs/conexion_bbdd.php');

    //recibimos datos por JSON
    include('libs/extraer_datos_json.php');

    //comprobamos si recibimos id_usuario y nombre de tarea

    if (!isset($data['id_usuario']) || !isset($data['nombre'])) {
        $respuesta['error'] = "Faltan datos";
        echo json_encode($respuesta);
        exit;
        
    }

    $usuarioLogueado = $data['id_usuario'];
    $usuarioClave= $data['nombre'];

    $sql = "INSERT INTO tareas (id_usuario, nombre, completada)
    VALUES (:usuario, :tarea, 0)";
    //preparemos sentencia
    $stmt = $conexionBBDD->prepare($sql);
    //ejecutamos sentencia
    $stmt->execute([
        ":usuario" => $usuarioLogueado,
        ":tarea" => $usuarioClave
    ]);
    // //obtenemos el resultado
    // $result = $stmt->fetch(PDO::FETCH_ASSOC);

    //obtenemos el ultimo id insertado
    $id_tareaInsertada = $conexionBBDD->lastInsertId();

    if ($id_tareaInsertada) {
        $respuesta['success'] = true;
        $respuesta['data'] = $id_tareaInsertada;
    }else{
        $respuesta['success'] = false;
        $respuesta['error'] = "No se ha podido insertar la tarea";
    }
    echo json_encode($respuesta);
?>