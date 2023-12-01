<?php
$token = $_GET['token'];
if ($token != "1819")
    die("Not Authorized!");

include_once "util/Database.php";
$db = new Database(1);

if (isset($_GET['nostatus']))
    $sql = "SELECT * FROM videos ORDER by sort_order";
else
    $sql = "SELECT * FROM videos WHERE status=1 ORDER by sort_order";

$data = $db->json($sql);
if (!$data)
    $data = "[]";
?>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>Wado Ki Kai</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src='scripts/datasets.js'></script>
    <script src='scripts/index.js'></script>
    <script>
        var videos = <?php echo $data ?>;
console.log(videos);
        $(document).ready(function() {
            $("#divEditForm").hide();
            //$("#divTopLogo").hide();
            pageReady();
        });

        function pageReady() {
            //alert(videos.length);
            if (videos.length < 0)
                return;
            var html = "<table border='1'><tr><th>Title</th><th>Date of Video</th>";
            for (var i in videos) {
                //alert(blackBelts[i].lname);
                html += `<tr><td><a href='javascript:edit(${i})'>${videos[i].title}</a></td>
                                <td>${videos[i].video_date}</td></tr>`
            }
            html += "</table><p>Total: " + videos.length + "</p>";
            $("#divSolidContent").html(html);
        }
        var GV_EDIT_IDX = -1;

        function edit(idx) {
            GV_EDIT_IDX = idx;
            $("#title").val(videos[idx].title);
            $("#url").val(videos[idx].url);
            $("#dateOfVideo").val(videos[idx].video_date);
            $("#status").val(videos[idx].status);
            $("#sort_order").val(videos[idx].sort_order);
            $("#hostedBy").val(videos[idx].hosted_by);
            $("#section").val(videos[idx].section_id);
            $("#videoId").html("&nbsp;ID: " + videos[idx].id);
            $("#divEditForm").show();
        }

        function addVideo() {
            GV_EDIT_IDX = -1;
            $("#title").val("");
            $("#url").val("https://www.youtube.com/embed/");
            $("#dateOfVideo").val("");
            $("#sort_order").val(0);
            $("#status").val(1);
            $("#hostedBy").val(1);
            $("#section").val(1);

            $("#divEditForm").show();
        }

        function cancel() {
            GV_EDIT_IDX = 0;
            $("#divEditForm").hide();

        }

        function saveVideo(contId, subject) {
            var token = prompt("Token: ");
            //https://timlin.net/wkk/
            //alert("sendcontact");
            var id = (GV_EDIT_IDX < 0 ? 0 : videos[GV_EDIT_IDX].id);
            const reorder = confirm("Reorder?") ? 1 : 0;
            const data = {
                videoId: id,
                title: $("#title").val(),
                url: $("#url").val(),
                dateOfVideo: $("#dateOfVideo").val(),
                sortOrder: $("#sort_order").val(),
                status: $("#status").val(),
                hostedBy: $("#hostedBy").val(),
                section: $("#section").val(),
                token: token,
                reorder: reorder,
            }
            console.log(JSON.stringify(data));
            $.post("saveVideo.php", {
                    videoId: id,
                    title: $("#title").val(),
                    url: $("#url").val(),
                    dateOfVideo: $("#dateOfVideo").val(),
                    sortOrder: $("#sort_order").val(),
                    status: $("#status").val(),
                    hostedBy: $("#hostedBy").val(),
                    section: $("#section").val(),
                    token: token,
                    reorder: reorder,
                },
                function(msg) {
                    console.log(msg);
                    const resp = JSON.parse(msg);
                    console.log(resp);
                    // var retvals = msg.split("~");
                    alert(resp[0].message);


                    GV_EDIT_IDX = -1;
                    pageReady();
                });
        }
    </script>
    <style>
        .classEditForm {
            position: absolute;
            top: 80px;
            left: 360px;
            width: 40%;
            z-index: 1000;
            color: #225599;
            background-color: #dfeeff;
            border: solid;
            text-align: left;
        }

        .formWrapper {

            padding: 10px;
        }

        .row {
            position: relative;
            height: 30px;
        }

        .col1 {
            position: absolute;
            left: 5px;
        }

        .col2 {
            position: absolute;
            left: 150px;
        }

        .textarea {
            position: relative;
            height: 100px;
        }

        .classImage {
            position: absolute;
            top: 15px;
            left: 480px;
        }
    </style>
</head>

<body class='htmlMain'>
    <h1>Videos: <a href="javascript:addVideo()">[+]</a></h1>
    <div id='divSolidContent' class='contentSolidStyle'></div>
    <div id='divEditForm' class='classEditForm'>
        <p id="videoId"></p>
        <br />
        <div class="row" id='divTitle'>
            <span class='col1'>
                <label class="left">Title: *</label>
            </span>
            <span class='col2'>
                <label class="input"><input name="title" id="title" alt="title" type="text" size='40' /> </label>
            </span>
        </div>
        <div class="row" id='divURL'>
            <span class='col1'>
                <label class="left">URL: *</label>
            </span>
            <span class='col2'>
                <label class="input"><input name="url" id="url" alt="url" type="text" size='40' /> </label>
            </span>
        </div>
        <div class='row' id='divDateOfVideo'>
            <span class='col1'>

                <label class="left">Date Of Video: *</label>
            </span>

            <span class='col2'>
                <input name="dateOfVideo" id="dateOfVideo" type="text" size='40' />
            </span>
        </div>

        <div class='row' id='divSortOrder'>

            <span class='col1'>

                <label class="left">Sort Order: </label>
            </span>
            <span class='col2'>

                <input name="sort_order" id="sort_order" type="text" /> &nbsp;&nbsp;
                Section: <input name="section" id="section" type="text" size="4" />
            </span>
        </div>
        <div class='row' id='divHostedBy'>

            <span class='col1'>
                <label class="left">Hosted By:</label>
            </span>

            <span class="col2">
                <select id="hostedBy" name="hostedBy">
                    <option value="0">Select a hosting by</option>
                    <option value="1">YouTube</option>
                    <option value="2">FaceBook</option>
                    <option value="9">Other</option>
                </select>
            </span>
        </div>
        <div class='row' id='divStatus'>

            <span class='col1'>
                <label class="left">Status:</label>
            </span>

            <span class="col2">
                <select id="status" name="status">
                    <option value="0">Select a status</option>
                    <option value="1">Active</option>
                    <option value="2">In-Active</option>
                    <option value="9">Other</option>
                </select>
            </span>
        </div>

        <div class='row' id='divFormButtons'>

            <span class="col2">
                <input name="button" value="Save" type="button" onclick='saveVideo()' />
                <input name="button" value="Cancel" type="button" onclick="cancel()" />
            </span>
        </div>
    </div>
</body>

</html>