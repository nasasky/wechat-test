<?php
header("Content-type:text/html;charset=utf-8");
session_start();
unset($_SESSION['kejiweixun']);
echo "<script>window.location.href='index.php';</script>";
?>