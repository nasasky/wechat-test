<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<?php
header("Content-type:text/html;charset=utf-8");
session_start();
 if(isset($_SESSION['kejiweixun'])){
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
$result = mysql_query("SELECT * FROM $tb ORDER BY ID desc");
echo "<br/><h3 style='text-align:center;'>科技微讯留言板后台</h3><br/>";
while($row = mysql_fetch_array($result))
  {
    $filename = $row["filename"];
    $lyurl = $row["lyurl"];
    echo "<div class='panel panel-default' style='width:95%;margin:10px auto;'>";
  echo "<div class='panel-body'>";
  $liuyan = $row["userliuyan"];
    if(empty($liuyan)){
      echo "<p style='color:#ccc;'>该用户比较懒，没有留言...</p>";
    }else{
      echo "$row[userliuyan]";
    }
  echo "</div>";
  echo "<div class='panel-footer'>$row[time]&nbsp;&nbsp;&nbsp;<a href='del.php?id=".$row['id']."&biz=MjM5MzI4ODUzNg==&mid=2651436859&idx=2&sn=804866e34a3717b8982638d3da9864db&chksm=bd644f0c8a13c61aec129587d069ca3ecce4cbceeb0ee7a167fd054421a93169738b9393c300&scene=0#rd'>删除</a>";
  if(empty($filename)){
    //
  }else{
    echo "&nbsp;&nbsp;&nbsp;<a href='http://www.likeyunba.com/uploadimg/upload/$filename' target='_blank'>查看图片</a>";
  }
  if(empty($lyurl)){
    //
  }else{
    echo "&nbsp;&nbsp;&nbsp;<a href='$lyurl' target='_blank'>查看链接</a>";
  }
  echo "</div>";
echo "</div>";
  }
  echo "<br/>";
echo "<p style='text-align:center;color:#666;'>暂无更多...<a href='exitlogin.php?biz=MjM5MzI4ODUzNg==&mid=2651436859&idx=1&sn=9e8e665c1ccc6df51464f26abd614bde&chksm=bd644f0c8a13c61a922dc294fb2f266c67d2a54bc1dd9e4dad02f6d837c761b9891fa45c1ba2&scene=0#rd'/>退出登录</p>";
mysql_close($con);
}else{
  echo "<script>location.href='login.html';</script>";
}
?>