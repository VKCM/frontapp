<?php
$STATIC_DIR = "http://static.vkcm.ru/";
require_once($_SERVER["DOCUMENT_ROOT"] . "/partials/header.html");
if(isset($_GET["page"])) {
  require_once($_SERVER["DOCUMENT_ROOT"] . "/pages/".$_GET["page"].".html");
}
require_once($_SERVER["DOCUMENT_ROOT"] . "/partials/footer.html");

//require_once ( $_SERVER["DOCUMENT_ROOT"] . "/../app/engine/load.php");
