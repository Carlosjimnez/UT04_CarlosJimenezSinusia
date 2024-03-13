<?php
    // Verificar si se recibió el JSON
    if (isset($_POST['json'])) {
        // Obtener el nombre y los datos del archivo JSON
        $fileName = isset($_POST['fileName']) ? $_POST['fileName'] : 'backup_' . date('Y-m-d') . '.json';
        $jsonData = $_POST['json'];

        // Directorio de destino para la copia de seguridad
        $targetDir = "./backup/";

        // Si el directorio no existe, intenta crearlo
        if (!file_exists($targetDir)) {
            // Intentar crear el directorio con permisos 0777
            if (!mkdir($targetDir, 0777, true)) {
                // Si la creación del directorio falla, mostrar un mensaje de error
                echo "Error al crear el directorio de copias de seguridad";
                exit; // Salir del script
            }
        }

        // Ruta completa del archivo de copia de seguridad
        $targetName = $targetDir . $fileName;

        // Escribir los datos en el archivo
        if (file_put_contents($targetName, $jsonData) !== false) {
            echo "Copia realizada correctamente";
        } else {
            echo "Error al guardar la copia de seguridad";
        }
    } else {
        echo "No se ha recibido ningún archivo JSON";
    }
?>
