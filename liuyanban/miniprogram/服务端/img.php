<?php
// 允许上传的图片后缀
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
// echo $_FILES["file"]["size"];
$extension = end($temp);     // 获取文件后缀名
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 204800)   // 小于 200 kb
&& in_array($extension, $allowedExts))
{
    if ($_FILES["file"]["error"] > 0)
    {
        echo "错误：: " . $_FILES["file"]["error"] . "<br>";
    }
    else
    {
        $filename = $_FILES["file"]["name"];
        $filetype = $_FILES["file"]["type"];
        $filesize = ($_FILES["file"]["size"] / 1024);
        $fileurl = $_FILES["file"]["tmp_name"];
        $results = array("filename"=>"$filename","filetype"=>"$filetype","filesize"=>"$filesize","fileurl"=>"$fileurl");
        while ($row = mysql_fetch_assoc($result)) {
        $results[] = $row;
        }
        // 将数组转成json格式
        echo json_encode($results);


        // 判断当期目录下的 upload 目录是否存在该文件
        // 如果没有 upload 目录，你需要创建它，upload 目录权限为 777
        if (file_exists("upload/" . $_FILES["file"]["name"]))
        {
            $results = array("uploadresult"=>"file exists!");
            while ($row = mysql_fetch_assoc($result)) {
            $results[] = $row;
            }
            // 将数组转成json格式
            echo json_encode($results);
        }
        else
        {
            //如果 upload 目录不存在该文件则将文件上传到 upload 目录下
            move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $_FILES["file"]["name"]);
            $fileurl = "upload/" . $_FILES["file"]["name"];
            $results = array("fileurl"=>"$fileurl");
            while ($row = mysql_fetch_assoc($result)) {
            $results[] = $row;
            }
            // 将数组转成json格式
            // echo json_encode($results);
        }
    }
}
else
{
    echo "不支持的文件格式";
}
?>