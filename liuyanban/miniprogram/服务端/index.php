<?php
$con = mysql_connect("数据库地址","账号","密码");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("数据库名", $con);
//设置数据库字符集  
mysql_query("SET NAMES UTF8");
$userliuyan = $_GET["userliuyan"];
$fileurl = $_GET["filename"];
$lyurl = $_GET["xgurl"];
$filename = substr($fileurl,11);
mysql_query("INSERT INTO test (userliuyan,filename,lyurl) VALUES ('$userliuyan','$filename','$lyurl')");
mysql_close($con);
?>