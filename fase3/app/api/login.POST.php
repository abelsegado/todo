<?php

    include('libs/init.php');

    //nos conectamos a la base de datos
    include('libs/conexion_bbdd.php');

    //recibimos datos por JSON
    include('libs/extraer_datos_json.php');

    //comprobamos si recibimos usuario y clave

    if (!isset($data['usuario']) || !isset($data['clave'])) {
        $respuesta['error'] = "Faltan datoss";
        echo json_encode($respuesta);
        exit;
        
    }

    $usuarioLogueado = $data['usuario'];
    $usuarioClave= $data['clave'];

    $sql = "SELECT id_usuario,nombre
    FROM usuarios
    WHERE usuario = :usuario
    AND contraseña = :clave";
    //preparemos sentencia
    $stmt = $conexionBBDD->prepare($sql);
    //ejecutamos sentencia
    $stmt->execute([
        ":usuario" => $usuarioLogueado,
        ":clave" => $usuarioClave
    ]);
    //obtenemos el resultado
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $respuesta['success'] = true;
        $respuesta['data'] = $result;
    }else{
        $respuesta['success'] = false;
        $respuesta['error'] = "Usuario no encontrado";
    }
    echo json_encode($respuesta);
?>