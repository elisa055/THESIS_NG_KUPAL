<?php
$documentRoot = '.';
$indexFile = 'index.html';
$authIndexFile = 'sign_log-page/index.html';
$dpoDashboard = 'DPO/dashboard.html';
$businessownerDashboard = 'business-owner/dashboard.html';


$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($requestUri == '/auth' && file_exists($authIndexFile)) {
    header('Content-Type: text/html');
    readfile($authIndexFile);

} elseif ($requestUri == '/dpo_dashboard' && file_exists($dpoDashboard)) {
    header('Content-Type: text/html');
    readfile($dpoDashboard);

} elseif ($requestUri == '/business_owner_dashboard' && file_exists($businessownerDashboard)) {
    header('Content-Type: text/html');
    readfile($businessownerDashboard);

} elseif (file_exists($indexFile)) {
    header('Content-Type: text/html');
    readfile($indexFile);

} else {
    header('HTTP/1.1 404 Not Found');
    echo 'Not Found';
}
?>