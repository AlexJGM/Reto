<?php

$conn = new PDO('mysql:host=192.168.1.136;dbname=reto', 'reto', 'reto');
$stmt = $conn->prepare('SELECT * FROM cotizacion_empresas');
$stmt->execute();
$cotizaciones = $stmt->fetchAll();
foreach ($cotizaciones as $cotizacion) {
  $val = $cotizacion['valores'] + rand(-100, 100) / 100;
  $val = $val < 0 ? 0 : $val;
  $stmt = $conn->prepare("UPDATE cotizacion_empresas SET valores = :val, Fecha = :fecha WHERE id = :id");
  $stmt->execute([
    'val' => $val,
    'fecha' => (new DateTime())->format('Y-m-d'),
    'id' => $cotizacion['id']
  ]);
}

$response = [
  'status' => 'success',
  'data' => $cotizaciones,
];
header('Content-Type: application/json');
echo json_encode($response);