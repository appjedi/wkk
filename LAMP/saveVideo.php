<?php

header('Access-Control-Allow-Origin: *');

function error_exit($s) {
    echo "Error: $s";
    exit();
}

include_once "util/Database.php";
//https://www.youtube.com/embed/VJG58ALS0BM	
/*
  $token="1819";
  $title="First Virtual Karate class bow in";
  $url="https://www.youtube.com/embed/";
  $dateOfVideo="2020-04-01";
 */
$sort_order = 0;
$status = 1;
$hostedBy = 1;
$section = 1;
$eventId = 20200401;
$section = 1;

extract($_POST);
if (!$token || $token != "1819")
    die("Not Authorized! $token");


/* If Submit Button Clicked */
if ($title && $url) {
    //$url = "https://www.youtube.com/embed/$code";

    $dao = new Database(1);
echo "one</p>";
    $sql = null;
    $sp = "call usp_video_save (?,?,?,?,?,?,?,?,?,?,?)";
    $source=1;
    $category=1;
    $values = [$videoId,$url,$dateOfVideo,$title,$source,$hostedBy,$category,$section,$eventId,$status,$sort_order];
    echo "two</p>";

    /*
    if ($videoId == 0) {
        $sql = " INSERT INTO videos (title,url,video_date, sort_order, status,hosted_by,section_id,event_id, inserted)
              VALUES ('$title', '$url', '$dateOfVideo',$sortOrder,$status,$hostedBy,$section,$eventId,SYSDATE())";
       // echo $sql;
    } else {
        $sql = "UPDATE videos SET title='$title',url='$url',video_date='$dateOfVideo', sort_order=$sortOrder, status=$status,"
                . "hosted_by=$hostedBy,section_id=$section,event_id=$eventId WHERE id=$videoId";
    }
    */
    //echo $sql;
    echo "333</p>";

    $dao->callproc($sp, $values);
    echo "444</p>";

    if ($reorder==1)
        $dao->execute("UPDATE videos SET sort_order=sort_order+1 WHERE section=$section");

    echo "1~Saved id: $videoId!";
    /*
      $url="http://timlin.net/wkk/send2wkk.php?token=Limerick&email=$email&fullname=$fullname&phone=$phone";
      $msg = file_get_contents($url);
      echo $msg;
     * 
     */
    //
    // Connect to MySQL
    /*
      $sql = "insert into contact_wkk (email, last_name, first_name, phone, comments, subject, dojo_id, sensei_id) " .
      " values ('$email', '$fullname', '$dojo', '$phone', '$message', '$subjiect', '$dojo', $contactId);";
     */

//echo $sql;
} else {

    echo "-1~Missing data [$lname] [$email]!\n";
}
// echo "<h2><a href='http://www.wadokikai.org'>Return to main page</a></h2>";
