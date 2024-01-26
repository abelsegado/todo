<?php
    //comprobar si el archivo objeto.json existe
    if(file_exists('objeto.json')){
        //leer el archivo json
        $json = file_get_contents('objeto.json');
        //convertirlo a array
        $array = json_decode($json, true);
    }else{
        //si no existe, crearlo con un array vacio
        $array = [];
    }
    
    //añadir valores de ejemplos al array decodeado con push
    array_push($array, [
        'id' => 1,
        'nombre' => 'Pepe',
        'apellidos' => 'Perez',
    ]);

    print_r($array);
    //encodea el array en json
    $json = json_encode($array);

    file_put_contents('objeto.json', $json);




?>