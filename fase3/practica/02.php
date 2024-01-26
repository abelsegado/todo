<?php
$texto = '';

if (isset($_POST['texto'])) {
    $numerosArray = explode(',', $_POST['texto']);
    echo '<ul>';
    foreach ($numerosArray as $numero) {
        $texto.= '<li>' . $numero . '</li>';
    }

    echo '</ul>';
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
        <label for="age">Edad:</label>
        <input type="text" id="age" name="texto" required>
        <input type="submit" value="Enviar">
    </form>

<?php
echo $texto;
?>
</body>
</html>