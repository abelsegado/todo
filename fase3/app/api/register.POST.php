<?php

    include('libs/init.php');

    //nos conectamos a la base de datos
    include('libs/conexion_bbdd.php');

    //recibimos datos por JSON
    include('libs/extraer_datos_json.php');

    //comprobamos si recibimos los datos

    if (!isset($data['nombre']) || !isset($data['usuario']) || !isset($data['contraseña'])) {
        $respuesta['error'] = "Faltan datos";
        echo json_encode($respuesta);
        exit;
        
    }

    $usuario = $data['usuario'];
    $nombreUsuario= $data['nombre'];
    $claveUsuario= $data['contraseña'];

    $sql = "INSERT INTO usuarios (usuario, nombre, contraseña)
    VALUES (:usuario, :nombre, :clave)";


    //preparemos sentencia
    $stmt = $conexionBBDD->prepare($sql);
    //ejecutamos sentencia
    try {
        $stmt->execute([
        ':usuario' => $usuario,
        ':nombre' => $nombreUsuario,
        ':clave' => $claveUsuario
    ]);
    } catch (PDOException $e) {
        if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
            $respuesta['success'] = false;
            $respuesta['error'] = "El usuario ya existe";
            echo json_encode($respuesta);
            exit;
        }
        $respuesta['error'] = $e->getMessage();
        echo json_encode($respuesta);
        exit;
    }
    // //obtenemos el resultado
    // $result = $stmt->fetch(PDO::FETCH_ASSOC);

    //obtenemos el ultimo id insertado
    $idUsuarioInsertado = $conexionBBDD->lastInsertId();

    if ($idUsuarioInsertado) {
        $respuesta['success'] = true;
        $respuesta['data'] = $idUsuarioInsertado;
    }else{
        $respuesta['success'] = false;
        $respuesta['error'] = "No se ha insertado el usuario";
    }
    echo json_encode($respuesta);
?>