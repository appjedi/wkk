<?php

header('Access-Control-Allow-Origin: *');

function error_exit($s)
{
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
$sortOrder = 0;
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

    $sql = null;
    $sp = "call usp_video_save (?,?,?,?,?,?,?,?,?,?,?,?)";
    $source = 1;
    $category = 1;
    $values = [$videoId, $url, $dateOfVideo, $title, $source, $hostedBy, $category, $section, $eventId, $status, $sortOrder, $reorder];

    $rows = $dao->callproc($sp, $values);
    $json = json_encode($rows);
    echo $json;
    //echo "{status:1, message:'Saved id: $videoId!'}";
} else {

    echo "-1~Missing data [$lname] [$email]!\n";
}
// echo "<h2><a href='http://www.wadokikai.org'>Return to main page</a></h2>";
