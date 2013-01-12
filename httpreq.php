<?php
# Parse the HTTP Host header and request URI
# and write the data out in JSON format.

header('Content-type: application/json');
$hostname = $_SERVER['HTTP_HOST'];
$pathname = $_SERVER['REQUEST_URI'];

$data = array('hostname' => $hostname, 'pathname' => $pathname);

echo json_encode($data);
?>

