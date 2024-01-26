<?php
    $jsonData= file_get_contents('php://input');
    $data= json_decode($jsonData, true);

    //comprobamos si el JSON es correcto
    if($data===null){
        $respuesta['error'] = "Faltan datos";
        echo json_encode($respuesta);
        exit;
    }
?>