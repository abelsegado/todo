<?php
    $listaUsuarios = [
        [
            'id' => 1,
            'nombre' => 'Pepe',
            'apellidos' => 'Perez',
            'email' => 'pepe@pe.com'
        ],
        [
            'id' => 2,
            'nombre' => 'Juan',
            'apellidos' => 'Lopez',
            'email' => 'juan@ju.com'
        ],
        [
            'id' => 3,
            'nombre' => 'Maria',
            'apellidos' => 'Garcia',
            'email' => 'maria@ma.com'
        ],
        [
            'id' => 4,
            'nombre' => 'Luis',
            'apellidos' => 'Sanchez',
            'email' => 'luis@lu.com'
        ],
        [
            'id' => 5,
            'nombre' => 'Ana',
            'apellidos' => 'Martinez',
            'email' => 'ana@an.com'
        ]
    ]
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
   

    <?php
    foreach ($listaUsuarios as $usuario) {
        //pinta el objeto en una tabla
        echo "<table>";
        echo "<tr>";
        echo "<td>";
        echo $usuario['id'];
        echo "</td>";
        echo "<td>";
        echo $usuario['nombre'];
        echo "</td>";
        echo "<td>";
        echo $usuario['apellidos'];
        echo "</td>";
        echo "<td>";
        echo $usuario['email'];
        echo "</td>";
        echo "</tr>";
        echo "</table>";
        
    }
    ?>
<?php

?>
</body>
</html>