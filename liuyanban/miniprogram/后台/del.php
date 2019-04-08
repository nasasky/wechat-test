<?php
header("Content-type:text/html;charset=utf-8");
//获取数据库配置
require_once("config.php");
//连接数据库
$con = mysql_connect($host,$username,$password);
if (!$con)
  {
  die('连接数据库失败，失败原因：' . mysql_error());
  }
//设置数据库字符集  
mysql_query("SET NAMES UTF8");
//查询数据库
mysql_select_db($db, $con);
//获取当前id
$id = $_GET['id']; 
//删除不要审核的留言
mysql_query("DELETE FROM $tb WHERE id='$id'");
echo "<script>history.go(-1);</script>";
mysql_close();
?>