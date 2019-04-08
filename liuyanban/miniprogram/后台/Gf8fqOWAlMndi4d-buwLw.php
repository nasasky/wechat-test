<?php
//页面编码
header("Content-type:text/html;charset=utf-8");
//储存登录行为
session_start();
//直接把用户名赋给kejiweixun
$_SESSION['kejiweixun']="kejiweixun";
echo "<script>window.location.href='index.php';</script>";  
?>