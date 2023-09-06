<?php

class Database {

    //http://localhost:8888/phpMyAdmin

    private $dsn = "mysql:dbname=wadokika_main;host=wadokikai.com;port=3306";
    private $usr = 'wadokika_php';
    private $pwd = "php4sql@wkk";
    private $host = "wadokikai.com";
    private $dbh = null;
    private $stmt = null;
    private $admin = "java1234";
    private $os = "LIN";

    public function __construct($args = null) {
        //*Read connection infomration from file: database.txt
        $this->os = strtoupper(substr(PHP_OS, 0, 3));
        if ($args==9)
        {
             $this->dbh = new PDO('sqlite:wkk.db');
             return;
        }
        //$args = "2";
        try {
           
            if ($args != null)
                if (strrpos($args, "~") > 0)
                    list($this->dsn, $this->usr, $this->pwd, $this->admin) = explode("~", $args);
                else
                    $this->connect($args);
            else {
                $handle = fopen("database.txt", "r");
                $this->dsn = str_replace("\r\n", "", fgets($handle));
                fclose($handle);
                $id = $this->dsn[0];
                if ($id > '0' && $id <= '9')
                    $this->connect($id);
                else if (strrpos($this->dsn, "~"))
                    list($this->dsn, $this->usr, $this->pwd, $this->admin) = explode("~", $this->dsn);
            }

            $this->dbh = new PDO($this->dsn, $this->usr, $this->pwd);
        } catch (PDOException $ex) {
            echo "Error: $ex";
        }
    }

    public function connect($id) {
        switch ($id) {
            case 1:
                //echo "<br/><br/>connect 1<br/><br/>";
                $this->dsn = "mysql:dbname=appjedin_wkk_prod;host=localhost;port=3306";
                $this->usr = "appjedin_wkk_data";
                $this->pwd = "Kata2022!";
                break;
            case 2:
                //$dbh = new PDO('mysql:host=localhost;dbname=test', $user, $pass);
                $this->dsn = "mysql:dbname=appjedin_timslist;host=localhost;port=3306";
                $this->usr ="appjedin_clark";
                $this->pwd ="ClarkData$2020";
                break;  
            case 3:
                //http://localhost:8888/phpMyAdmin
                $this->dsn = "mysql:dbname=symto;host=localhost;port=3306";
                $this->usr = "symtouser";
                $this->pwd = "Symto1234";
                break;
            case 4:

                //echo "<p>default db</p>";
                $this->dsn = "mysql:dbname=wadokikai;host=localhost;port=3306";
                $this->usr = "devuser";
                $this->pwd = "dev1234$";
                break;
        }
        // echo "connecting to: ".$this->dsn;
        $this->admin = "roxboro";
    }

    public function getNewInstance($db) {
        if (strrpos($db, "~"))
            list($dsn, $usr, $pwd, $admin) = explode("~", $db);
        else {
            switch ($db) {
                case 1:
                    $dsn = "mysql:dbname=clinbook;host=appjedi.net;port=3306";
                    $usr = 'clinbookuser';
                    $pwd = "MarcusWelby1234!";
                    $host = "appjedi.net";
                    echo "getNewInstance: " . $dsn;

                    break;
                case 2:
                    $dsn = "mysql:dbname=test;host=$host;port=3306";
                    $usr = "root";
                    $pwd = null;
                    break;
                default:
                    extract($this->query("SELECT * FROM database_servers WHERE id = $db")->fetch());
            }
        }
        $new = new Database($db);
        /*
          $new->dbh=new PDO($dsn, $usr, $pwd);
          $new->dsn = $dsn;
          $new->usr = $usr;
          $new->pwd = $pwd;
          //$new->admin =$admin;
         */
        return $new;
    }

    public function prepare($sql) {
        $this->stmt = $this->dbh->prepare($sql);
        return $this->stmt;
    }

    public function validate($array) {
        $keys = array_keys($array);
        foreach ($keys as $key) {
            $array[$key] = str_replace("'", "`", $array[$key]);
        }
        return $array;
    }
    public function callproc($sp, $values=null)
    {
        try {
            $this->stmt = $this->dbh->prepare($sql);
            $this->stmt->execute($values);
            $rows=$this->stmt-fetchAll();
    
            return $rows;   
        }catch (PDOException $ex){
            echo "callproc.ERROR";
            echo $ex;
        }
    }
    public function jQuerySet($array) {
        $keys = array_keys($array);
        $str = "";
        foreach ($keys as $key) {
            $val = trim($array[$key]);
            if ($key[0] >= 'a' && $key[0] <= 'z')
                $str .= "\t\t\t$('#" . $key . "').val('" . str_replace("\r\n", "@@crlf", $val) . "');\n";
        }
        return $str;
    }

    public function htmlInput($array, $type) {
        $keys = array_keys($array);
        $str = "";
        foreach ($keys as $key) {
            $val = trim($array[$key]);
            if ($key[0] >= 'a' && $key[0] <= 'z')
                $str .= "<input type='" . $type . "' name='" . $key . "' value='" . $val . "'/>\n";
        }
        return $str;
    }

    public function call($sql) {
        return $this->query("call $sql");
    }

    public function execute($sql = null) {
        try {
            if ($sql != null)
                $this->stmt = $this->dbh->prepare($sql);
            //echo $sql;
            $retval = $this->stmt->execute(); //or die (implode(':', $this->stmt->errorInfo()));
            if (!($retval))
                return -1;

            if (substr(strtoupper($sql), 0, 1) != "I")
                return 1;

            $this->query("SELECT LAST_INSERT_ID()");
            $row = $this->fetch();
            return $row[0];
        } catch (PDOException $e) {
            echo "$sql failed reason: $e";
            return -2;
        }
    }

    public function exec() {
        return $this->stmt->execute(); //or die (implode(':', $this->stmt->errorInfo()));
    }

    public function query($sql) {
        try {
            //echo $sql;
            $this->stmt = $this->dbh->prepare($sql);
            $this->stmt->execute();

            return $this->stmt;
        } catch (PDOException $e) {
            die('Query failed: ' . $e->getMessage());
        }
    }

    public function rowCount() {
        return $this->stmt->rowCount();
    }

    public function fetch() {
        try {
            return $this->stmt->fetch();
        } catch (PDOException $e) {
            die('Fetch failed: ' . $e->getMessage());
        }
    }

    public function isAdmin($pwd) {
        return $pwd == "wkk2020!";
    }
    public function json ($sql)
    {
        $statement = $this->dbh->prepare($sql);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }
    public function jsonOLD($sql, $arr = 1, $firstRow = "", $nl = "") {
        $stmt = $this->query($sql);
        if ($stmt->rowCount() == 0)
            return null;
        $idx = 0;
        $retval = ($arr == 1 ? "[" : "") . $firstRow;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $retval .= ($idx == 0 ? "{" : "},$nl{");

            $col = 0;
            foreach ($row as $value) {
                $meta = $stmt->getColumnMeta($col);
                $name = $meta['name'];
                $val = str_replace("\r\n", "@@crlf", $value);
                $val = str_replace("\"", "``", $value);
                $retval .= ($col == 0 ? "" : ",") . "$name:\"$val\"";
                $col++;
            }
            $idx++;
        }
        if ($idx == 0)
            return ($arr == 1 ? "[{status: -1}]" : "{status: -1}");
        $retval .= ($arr == 1 ? "}]" : "}");
        return $retval;
    }

    function toJson($arr) {
        $ct = count($arr);
        $retval = "[";
        foreach ($arr as &$row) {
            if ($retval != "[")
                $retval .= ", ";
            $json = "{";
            foreach ($row as $key => $val) {
                if ($json != "{")
                    $json .= ", ";
                $json .= "$key: \"$val\"";
            }

            $retval .= "$json}";
        }
        return $retval . "]";
    }

    public function htmlTable($sql, $arr = 1, $firstRow = "") {
        $stmt = $this->query($sql);
        if ($stmt->rowCount() == 0)
            return null;
        $colCount = $stmt->columnCount();
        $idx = 0;
        $retval = "<table border><tr>";
        for ($idx = 0; $idx < $colCount; $idx++) {
            $meta = $stmt->getColumnMeta($idx);
            $name = $meta['name'];
            $retval .= "<th>$name</th>";
        }
        //echo $retval;
        $retval .= "</tr>";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $col = 0;
            $retval .= "<tr>";
            foreach ($row as $value) {
                $retval .= "<td>$value</td>";
                $col++;
            }
            $retval .= "</tr>";

            $idx++;
        }

        return "$retval</table>";
    }

    public function jsan($sql, $header = '', $arr = 1) {
        $stmt = $this->query($sql);
        if ($stmt->rowCount() == 0)
            return null;
        $idx = 0;
        $retval = ($arr == 1 ? "[" : "") . $header;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $retval .= "],[";
            $col = 0;
            foreach ($row as $value) {
                $val = str_replace("\r\n", "@@crlf", $value);
                if (is_numeric($val))
                    $retval .= $col == 0 ? "$val" : ",$val";
                else {
                    $retval .= $col == 0 ? "'$val'" : ",'$val'";
                }
                $col++;
            }
            $idx++;
        }
        $retval .= ($arr == 1 ? "]]" : "]");
        return $retval;
    }

    public function logger($lvl, $msg) {
        $this->execute("INSERT INTO logger(log_date, level, message) VALUES(SYSDATE(), $lvl, '$msg')");
    }

    public function getOptions($id) {
        return $this->json("SELECT code, label, code as id FROM select_options WHERE status=1 AND group_id=$id ORDER BY sort_order");
    }

    public function points($act, $uid, $source, $sourceText = '', $pts = 1) {
        /*
         * System:
         * 1. ajax.php.
         * 2. intake-service.php.
         * 3. start.php - login.
         * 4. intake.php.
         */
        $query = "INSERT INTO points (point_dt, user_id, action_id, source, points, source_text) "
                . "VALUES (SYSDATE(), $uid, $act, $source,$pts,'$sourceText')";
//echo $query;
        try {
            $this->execute($query);
        } catch (Exception $ex) {
            echo $ex->getMessage();
        }
    }

    public function copyFrom($from, $tbl, $tbl2 = null) {
        try {
            $db = $this->getNewInstance($from);
            echo "copy table: $tbl";

            $stmt = $db->prepare("SELECT * FROM $tbl");
            $stmt->execute();
            if ($stmt->rowCount() == 0)
                return null;
            $idx = 0;
            $retval = "";
            // if($tbl2!=null)$tbl=$tbl2;
            $this->execute("TRUNCATE TABLE $tbl");
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $insert = " INSERT INTO $tbl (";
                $values = " VALUES(";
                $col = 0;
                foreach ($row as $value) {
                    $meta = $stmt->getColumnMeta($col);
                    $name = $meta['name'];
                    if ($col == 0) {
                        $values .= "\"$value\"";
                        $insert .= "$name";
                    } else {
                        $values .= ",\"$value\"";
                        $insert .= ",$name";
                    }
                    $col++;
                }
                $insert .= ") $values);";
                echo "<p>$insert</p>";
                if ($this->execute($insert) < 0)
                    echo "<h1>FAILED!!</h1>";
                $idx++;
            }
            return $retval;
        } catch (PDOException $ex) {
            echo "Copy Error: $ex";
        }
    }

    public function loginId($user) {
        $agent = "IE"; //$_SERVER['HTTP_USER_AGENT'];

        $jsonUser = "";
        $query = "SELECT *, '$agent' as agent, roleId FROM usersView WHERE user";

        $query .= "_id = $user";

        // echo $query;
        $stmt = $this->query($query);
        if ($stmt->rowCount() == 0)
            return null;
        //if (!$stmt)return null;
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $un = $row['username'];
        //echo "found: $un";
        $sql = "INSERT INTO user_log (username, agent, login_date, status) VALUES('$un','$agent',SYSDATE(),1)";
//        echo $sql;
        $this->execute($sql);

        return $row;
    }

    public function login($user, $pwd = "", $roleId = 1) {

        $agent = $_SERVER['HTTP_USER_AGENT'];
        $jsonUser = "";
        $query = "SELECT *, '$agent' as agent, role_id as roleId FROM view_users WHERE user";

        if (is_numeric($user))
            $query .= "_id = $user";
        else
            $query .= "name='$user' AND password='$pwd'";

        //echo $query
        $stmt = $this->query($query);
        if ($stmt->rowCount() == 0)
            return null;
        //if (!$stmt)return null;
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $un = $row['username'];
        $sql = "INSERT INTO user_log (username, agent, login_date, status) VALUES('$un','$agent',SYSDATE(),1)";
//        echo $sql;
        $this->execute($sql);

        return $row;
    }

    public function getUser($id) {
        if ($id == null) {
            $jsonUser = $_SESSION["webappUserObj"];
            if (!$jsonUser)
                return null;
            return $jsonUser;
        }else {
            return $this->json("SELECT * FROM view_users WHERE user_id=$id", 0);
        }
    }

    public function getUserRow($id) {
        if ($id == null) {
            $jsonUser = $_SESSION["webappUserObj"];
            if (!$jsonUser)
                return null;
            return $jsonUser;
        }else {
            return $this->query("SELECT * FROM view_users WHERE user_id=$id", 0)->fetch(PDO::FETCH_ASSOC);
        }
    }

    public function getUserArray($id) {
        if ($id == null) {
            $jsonUser = $_SESSION["webappUserObj"];
            if (!$jsonUser)
                return null;
            return $jsonUser;
        }else {
            return $this->json("SELECT user_id As id, username, lastname, firstname, email,phone FROM users WHERE user_id=$id", 0);
        }
    }

    public function getAdmin() {
        return $this->admin;
    }

    public function errorInfo() {
        return $this->stmt->errorInfo();
    }

    public function setInt($index, $value) {
        $this->stmt->bindParam($index, $value, PDO::PARAM_INT);
    }

    public function setString($index, $value) {
        $this->stmt->bindParam($index, $value, PDO::PARAM_STR, 60);
    }

    public function setBool($index, $value) {
        $this->stmt->bindParam($index, $value, PDO::PARAM_BOOL);
    }

    public function setLob($index, $value) {
        $this->stmt->bindParam($index, $value, PDO::PARAM_LOB);
    }

    public function authorized($pwd) {
        return $pwd == $this->admin;
    }

    public function getStatesAsJson() {
        return '{code:"AL",text:"Alabama"},
            {code:"AK",text:"Alaska"},
            {code:"AZ",text:"Arizona"},
            {code:"AR",text:"Arkansas"},
            {code:"CA",text:"California"},
            {code:"CO",text:"Colorado"},
            {code:"CT",text:"Connecticut"},
            {code:"DE",text:"Delaware"},
            {code:"DC",text:"District Of Columbia"},
            {code:"FL",text:"Florida"},
            {code:"GA",text:"Georgia"},
            {code:"HI",text:"Hawaii"},
            {code:"ID",text:"Idaho"},
            {code:"IL",text:"Illinois"},
            {code:"IN",text:"Indiana"},
            {code:"IA",text:"Iowa"},
            {code:"KS",text:"Kansas"},
            {code:"KY",text:"Kentucky"},
            {code:"LA",text:"Louisiana"},
            {code:"ME",text:"Maine"},
            {code:"MD",text:"Maryland"},
            {code:"MA",text:"Massachusetts"},
            {code:"MI",text:"Michigan"},
            {code:"MN",text:"Minnesota"},
            {code:"MS",text:"Mississippi"},
            {code:"MO",text:"Missouri"},
            {code:"MT",text:"Montana"},
            {code:"NE",text:"Nebraska"},
            {code:"NV",text:"Nevada"},
            {code:"NH",text:"New Hampshire"},
            {code:"NJ",text:"New Jersey"},
            {code:"NM",text:"New Mexico"},
            {code:"NY",text:"New York"},
            {code:"NC",text:"North Carolina"},
            {code:"ND",text:"North Dakota"},
            {code:"OH",text:"Ohio"},
            {code:"OK",text:"Oklahoma"},
            {code:"OR",text:"Oregon"},
            {code:"PA",text:"Pennsylvania"},
            {code:"RI",text:"Rhode Island"},
            {code:"SC",text:"South Carolina"},
            {code:"SD",text:"South Dakota"},
            {code:"TN",text:"Tennessee"},
            {code:"TX",text:"Texas"},
            {code:"UT",text:"Utah"},
            {code:"VT",text:"Vermont"},
            {code:"VA",text:"Virginia"},
            {code:"WA",text:"Washington"},
            {code:"WV",text:"West Virginia"},
            {code:"WI",text:"Wisconsin"},
            {code:"WY",text:"Wyoming"}}';
    }

    public function close() {
        $this->dbh = null;
        //mysql_close( $dbh );
    }

    public function error($msg) {
        die("<h1 align='center'><font color='red'>$msg!</font></h1>");
    }

    public function message($msg) {
        echo $msg;
    }

}

?>
