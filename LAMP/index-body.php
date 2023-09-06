<?php
$sessionId = 2;
$sessions = ['Next class', 'Monday, September 27th 6:30 PM', 'Wednesday, September 29th 6:30 PM', 'Friday, September 24th 6:00 PM'];
$text = $sessions[$sessionId];
$link = "<li><a id='virtualKarate1' href='login.php?sessionId=$sessionId'>$text</a></li>";
//$video = "<li><a id='videoOfTheDay' target='_video' href='https://www.youtube.com/watch?v=DQnTbImf91o'>Video of the Day:<br/> Ridge hand strike tot he throat</a></li>";
$video = "";
$pages = ['', 'contactus.html', 'schedule.html', 'curriculum.html', 'events.html', 'links.html'];
$pageId = isset($_GET['pageId']) ? $_GET['pageId'] : 0;
$iPod = stripos($_SERVER['HTTP_USER_AGENT'], "iPod");
$iPhone = stripos($_SERVER['HTTP_USER_AGENT'], "iPhone");
$iPad = stripos($_SERVER['HTTP_USER_AGENT'], "iPad");
$Android = stripos($_SERVER['HTTP_USER_AGENT'], "Android");
$webOS = stripos($_SERVER['HTTP_USER_AGENT'], "webOS");
$mobi = $iPhone || $Android;
?>
<body>
    <div id="container"> <a name="top"></a>
        <div id="pageHeader" onclick="javascript: window.location.href = 'http://www.wadokikai.org';">
            <h2></h2>
            <!-- for transparent Dragon image -->
            <h3><span>Wado Ki Kai Karate Do - To Learn From All Things.</span></h3>
        </div>
        <div id="quickSummary">
            <br/><br/>
            <h3>Welcome to Wado Ki Kai</h3>

        </div>


        <div id="explanation">

            <table>
                <tbody>
                    <tr>
                        <td headers="order"></td>
                    </tr>
                </tbody>
            </table>
            <h3>Fall 2022 Promotional:</h3>
            <ul>
            <li><a href='docs/2022FallPrelimSchedule.pdf'>Fall 2022 Preliminary Schedule</a></li>
            </ul>
            <div id="divVideoList">

            </div>
            <p>
                <br />
                <img src="images/index.jpg" alt="Fall Promo" name="mainImage" height="300" width="375" />
            </p>
            <h3> Congratulations!</h3><p><b>To our students from Alameda and Orinda who recently promoted (May 21, 2022)!</b><br/>
            <p>
                <img src='images/Promo-20220522-Group-Photo.jpg' height="360" width="420"/>
            </p>

            <br/>
            <h3>Alameda Best dojo of 2019</h3>
            <p>
                <a href='https://alameda.organizationtop-announcement.org/PressReleaseub.aspx?cc=DMMW-VBGF-EBSS' target="new">
                    <img src='images/AlamedaBestof2019.jpg'/>
                </a>
            </p>
            <h3>
                <span id="schoolName"></span>
            </h3>

            <h3>
                Congratulations!
            </h3>
            <p><b>To Sensei's Hursey Baker and Clark Bell, promoted to 5th dan black belt by Sensei Ferol Arce, 9th dan</b><br/>
                <img src='images/marin5thDan.jpeg' height='280px' width='320px'/>

                <br/>
                <a href='https://www.youtube.com/watch?v=-1D0HMbbHww&feature=youtu.be' target='new'><b>Watch presentation on YouTube here.</b></a>
            </p>                
        </div>
        <div id="supportingText">
            <h3>Wado Ki Kai Style</h3>
            <p>
                Welcome to our Karate Program! This Web Site has been
                prepared to help with an orientation to the martial arts by
                anticipating and answering questions you may have. However, if after
                browsing, you still have not gotten all the answers you want, please
                contact one of the Black Belt instructors by way of email or through a
                school and they will be happy to answer any of your questions.
            </p>
            <p>&nbsp;</p>
        </div>
        <!-- starts navigation items >>absolute position // IMPORTANT!!!, do not change anything in this section -->
        <div id="menu">
<?php include("pages/menu.html"); ?>
        </div>
        <!-- ends navigation items >>absolute position -->
        <div class="goTop"><a href="#top"> <img src="images/arrow.gif" alt="go to top" class="img" height="34" width="34" /> </a> </div>
        <div id="footerLink">
            <h2></h2>
<?php include("pages/footer.html"); ?>
            <p>
                ï¿½ Wado Ki Kai (TM) All rights reserved 2006 &#8226; All materials on this site are copyrighted<br />
                This site is built with Accessibility in mind: <a href="http://validator.w3.org/check?uri=http://www.wadokikai.com" title="Check the validity of this site&#8217;s XHTML">XHTML</a>
                &#8250; <a href="http://jigsaw.w3.org/css-validator/validator?uri=http://www.wadokikai.com/index.css&amp;usermedium=all" title="Check the validity of this site&#8217;s CSS">CSS</a>
                &#8250; <a href="http://www.contentquality.com/mynewtester/cynthia.exe?Url1=http://www.wadokikai.com" title="Check the accessibility of this site according to U.S. Section 508">508</a>
                validated &#8226; Site designed by <a href="http://www.lotusseedsdesign.com">Lotus Seeds Design</a>
            </p>
        </div>
        <!-- ends footerLink div -->
    </div>
    <!-- ends container div -->
</body>