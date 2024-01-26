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
        <input type="number" id="age" name="age" required>
        <input type="submit" value="Enviar">
    </form>

    <?php
    $age = $_POST['age'];
    if (isset($age)) {
        if ($age >= 18) {
            echo "<p>Mayor de edad</p>";
        } else {
            echo "<p>Menor de edad</p>";
        }
    }
    ?>
</body>
</html>