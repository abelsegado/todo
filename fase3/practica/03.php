<?php
    //obten los valores de las variables y las operaciones
    $valor1 = isset($_POST['valor1']) ? $_POST['valor1'] : 0;
    $valor2 = isset($_POST['valor2']) ? $_POST['valor2'] : 0;
    $operacion = isset($_POST['operacion']) ? $_POST['operacion'] : '';
    $resultado = 0;

    switch (isset($operacion)) {
        case 'suma':
            $resultado = $valor1 + $valor2;
            break;
        case 'resta':
            $resultado = $valor1 - $valor2;
            break;
        case 'multiplicacion':
            $resultado = $valor1 * $valor2;
            break;
        case 'division':
            $resultado = $valor1 / $valor2;
            break;
        default:
            $resultado='operacion no valida';
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="" method="POST">
        <label name="valor1">Valor 1:</label>
        <input type="number" id="valor1" name="valor1" required>
        <label name="valor2">Valor 2:</label>
        <input type="number" id="valor2" name="valor2" required>
        <label name="operacion">Operacion:</label>
        <select name="operacion" id="operacion">
            <option value="suma">Suma</option>
            <option value="resta">Resta</option>
            <option value="multiplicacion">Multiplicacion</option>
            <option value="division">Division</option>
        </select>
        <input type="submit" value="Calcular">
    </form>
    <p>Resultado:</p>
    <?php
        echo $resultado;
    ?>
<?php

?>
</body>
</html>