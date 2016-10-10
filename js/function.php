<?php
$dbhost='http://sqld.duapp.com';
$username='2e268c2937534a18a78efbe4d12ef3d1';
$password='bbf3a2d138cd4a759555cf824f433600';
$dbname="NPWIJUroOZTkOVweCTFP";
$port=4050;
$charset='utf8';
$con=mysqli_connect($dbhost,$username,$password,$dbname,$port);
$sql="SELECT * FROM `song`";
$res=mysqli_query($con,$sql);
$arr=mysqli_fetch_all($res);
   $user=$_GET['name'];
   $len=count($arr);
   $flag=1;
   for ($i=0; $i <$len; $i++) {
   	if ($user==$arr[$i][0]) {
         $flag=0;
          break;
   	}

   }
   echo $flag;
 ?>
