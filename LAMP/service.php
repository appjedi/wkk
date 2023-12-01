<?php

session_start();

$token = isset($_GET['token']) ? $_GET['token'] : 0;

if ($token != 1819)
    die("$token No Authorized!");

if (!isset($_GET['action']))
    die("No Action Id");

//service.php?token=1819&action=6&tablId=1
include_once "util/sendmail.php";
include_once "util/Database.php";

switch ($_GET['action']) {
    case 1:
        getDojo($_GET['dojo']);
        break;
    case 2:

        getPage($_GET['pageId']);
        break;
    case 3:
        getSensei($_GET['senseiId']);
        break;
    case 4:
        getStudents($_GET['dojoId']);
        break;
    case 5:
        getVideos();
        break;
    case 6:
        if ($token != 1819)
            die("No Authorized!");
        getTable($_GET['tblId']);
        break;
    case 7:
        getContactBody($_GET['contId']);
        break;
    case 9:
        delContactUs($_GET['id']);
        break;
    case 8:
        getMessageBody($_GET['id']);
        break;

    case 10:
        getRankInfo($_GET['id']);
        break;
    case 11:
        getWeeklyVideos();
        break;
}

function delContactUs($id) {
    $dao = new Database(1);
    $sql = "DELETE FROM contact_us WHERE id = $id";
    $dao->execute($sql);
    $dao->close();
    echo "Contact Message $id deleted";
}

function getContactBody($id) {
    $dao = new Database(1);
    //echo "SELECT message FROM contact_us WHERE id = $id";
    $data = $dao->query("SELECT subject, message FROM contact_us WHERE id = $id")->fetch();
    //echo $data;
    echo "Subject: " . $data['subject'] . "|Message: " . $data['message'];
    //$dao->execute ("UPDATE contact_us SET status=2, message_read=SYSDATE() WHERE id = $id");
}

function getMessageBody($id, $tbl = 1) {
    try {
        $dao = new Database(1);
        $query = "SELECT message FROM appjedin_wkk_prod.contact_wkk WHERE id = $id";
        if ($tbl == 2) {
            $query = "SELECT message FROM students WHERE appjedin_wkk_prod.student_id = $id";
        }

        //echo "SELECT message FROM contact_us WHERE id = $id";
        $data = $dao->query($query)->fetch();
        //echo $data;
       
        echo $data['message'];
    } catch (Exception $ex) {
        die("Error: " . $ex);
    }
}

function getTable($tblId) {
    $db = new Database(1);
    $tables = array('', 'students', 'email_list', 'videos', 'logger', 'registration');
    $tbl = $tables[$tblId];
    $sql = "SELECT * FROM $tbl";
    //echo $sql;
    $data = $db->json($sql);
    echo $data;
    $db->close();
}

function getVideos() {
    $db = new Database(1);

    $sql = "SELECT * FROM videos WHERE status=1 ORDER by section_id, sort_order";
    echo $db->json($sql, 1, "", "<br/>");
    $db->close();
}

function getWeeklyVideos() {
    $db = new Database(1);

    $sql = "SELECT * FROM view_weekly_videos WHERE status=1 ORDER by section_id, sort_order";
    echo $db->json($sql, 1, "", "");
    $db->close();
}

function getSensei($id) {
    $db = new Database(1);
    $query = "SELECT * FROM black_belts " . ($id > 0 ? " WHERE id=$id" : "");
    //  echo $query;
    echo $db->json($query);
    $db->close();
}

function getStudents($dojoId) {
    $db = new Database(1);
    $sql = "SELECT * FROM view_students " . ($dojoId > 0 ? " WHERE dojo_id=$dojoId" : "");
    // echo $sql;
    echo $db->json($sql);
    $db->close();
}

function getDojo($pg) {
    $msg = file_get_contents("dojos/$pg");
    echo $msg;
}

function getPage($idx) {
    $pages = Array('index.php', 'contactus.html', 'freeWeek.html', 'katas.html', 'overview.html', 'procedures.html', 'style.html', 'library.html',
        'terminology.html', 'photo-gallery.html', 'videos.html', 'events.html');
    $msg = file_get_contents("pages/" . $pages[$idx]);
    echo $msg;
}

function getRankInfo($idx) {
    $pages = Array('white-belt.php', 'yellow-belt.php', 'orange-belt.php', 'green-belt.php', 'blue-belt.php', 'purple-belt.php', 'brown3-belt.php', 'brown2-belt.php',
        'brown1-belt.php');
    $msg = file_get_contents("pages/" . $pages[$idx - 1]);
    echo $msg;
}

function tester() {
    $msg = file_get_contents("http://wadokikai.org/videos.php");
    echo $msg;
}

function updateTest() {
    $sql = "UPDATE black_belts SET rank=1 WHERE id=7";
    echo $sql;
    $db = new Database(1);
    echo $db->execute($sql);
    $db->close();
}

function insertTest() {
    $sql = "INSERT INTO logger (log_date, level, message) VALUES (SYSDATE(), 1, 'test logger');";

    echo $sql;

    $db = new Database(1);
    echo $db->execute($sql);
    $db->close();
}

?>