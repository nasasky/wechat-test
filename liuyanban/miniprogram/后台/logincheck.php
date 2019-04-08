<?php
//页面编码
header("Content-type:text/html;charset=utf-8");
$psw = $_POST["psw"];
if($psw == "kejiweixun")  
        {  
            echo "<script>window.location.href='Gf8fqOWAlMndi4d-buwLw.php?biz=MjM5MzI4ODUzNg==&mid=2651436859&idx=1&sn=9e8e665c1ccc6df51464f26abd614bde&chksm=bd644f0c8a13c61a922dc294fb2f266c67d2a54bc1dd9e4dad02f6d837c761b9891fa45c1ba2&scene=0#rd';</script>";  
        }  
        else{  
            echo "<script>alert('密码错误...'); history.go(-1);</script>";  
        }
?>