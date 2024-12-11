<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Higurashi no Naku Koro ni | Когда плачут цикады - Карточная игра</title>
    <meta name="description"
    content="Карточная игра из визуальной новеллы Higurashi no Naku Koro ni - Когда плачут цикады.">
    <link rel="stylesheet" href="style.css">
    <link type="image/x-icon" href="favicon.ico" rel="shortcut icon">
    <link type="Image/x-icon" href="favicon.ico" rel="icon">
</head>

<!--Здесь только каркас страницы, все данные формируются динамически через JS-->
<body>
    <div id="main-page">
        <a href="/" class="button-back">
            <div class="button-back__text">На главную</div>
        </a>
        <div style="display: none;">
        <h1>Карточная игра по Когда плачут цикады</h1>
        </div>
        <div id="workarea">
            <div id="layer"></div>
            <div id="top-container">
                <div class="container-area" id="top-container-area"></div>
            </div>
            <div id="left-container">
                <div class="container-area" id="left-container-area"></div>
            </div>
            <div id="right-container">
                <div class="container-area" id="right-container-area"></div>
            </div>
            <div id="bottom-container">
                <div class="container-area" id="bottom-container-area"></div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>

</html>

<?php
    //сбор статистики для себя
    $file="log/logfile.log";    //куда пишем логи
    $col_zap=4999;        //строк в файле не более

    function getRealIpAddr() {
    if (!empty($_SERVER['HTTP_CLIENT_IP']))        // Определяем IP
    { $ip=$_SERVER['HTTP_CLIENT_IP']; }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))    // Если IP идёт через прокси
    { $ip=$_SERVER['HTTP_X_FORWARDED_FOR']; }
    else { $ip=$_SERVER['REMOTE_ADDR']; }
    return $ip;
    }

    if (strstr($_SERVER['HTTP_USER_AGENT'], 'YandexBot')) {$bot='YandexBot';}
    elseif (strstr($_SERVER['HTTP_USER_AGENT'], 'Googlebot')) {$bot='Googlebot';}
    else { $bot=$_SERVER['HTTP_USER_AGENT']; }

    $ip = getRealIpAddr();
    $date = date("H:i:s d.m.Y");        //дата события
    $home = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];    //какая страница сайта
    $lines = file($file);
    while(count($lines) > $col_zap) array_shift($lines);
    $ip_explode = explode('.', $ip);
    $ip = implode('.', array($ip_explode[0], $ip_explode[1], $ip_explode[2]));
    $lines[] = $date."|".$bot."|".$ip."|".$home."|\r\n";
    file_put_contents($file, $lines);
?>