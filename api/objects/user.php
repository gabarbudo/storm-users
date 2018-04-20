<?php
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
 
    // object properties
    public $user_id;
    public $first_name;
    public $middle_name;
    public $last_name;
    public $gender;
    public $email;
    public $date_time;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read users
    function read(){
     
        // select all query
        $query = "SELECT u.user_id, u.first_name, u.middle_name, u.last_name, u.gender, u.email, u.date_time
                FROM " . $this->table_name . " u ORDER BY u.date_time DESC";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }

    // create user
    function create(){
     
        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    first_name=:first_name, middle_name=:middle_name, last_name=:last_name, gender=:gender, email=:email";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        //$this->user_id=htmlspecialchars(strip_tags($this->user_id));
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->middle_name=htmlspecialchars(strip_tags($this->middle_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->gender=htmlspecialchars(strip_tags($this->gender));
        $this->email=htmlspecialchars(strip_tags($this->email));
        //$this->date_time=htmlspecialchars(strip_tags($this->date_time));
     
        // bind values
        //$stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":middle_name", $this->middle_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":gender", $this->gender);
        $stmt->bindParam(":email", $this->email);
        //$stmt->bindParam(":date_time", $this->date_time);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
     
        return false;
    }

    // used when filling up the update user form
    function readOne(){
     
        // query to read single record
        $query = "SELECT u.user_id, u.first_name, u.middle_name, u.last_name, u.gender, u.email, u.date_time
                FROM
                    " . $this->table_name . " u WHERE u.user_id = ? LIMIT 0,1";
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // bind id of user to be updated
        $stmt->bindParam(1, $this->user_id);
     
        // execute query
        $stmt->execute();
     
        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
        // set values to object properties
        $this->first_name = $row['first_name'];
        $this->middle_name = $row['middle_name'];
        $this->last_name = $row['last_name'];
        $this->gender = $row['gender'];
        $this->email = $row['email'];
    }

    // update the user
    function update(){
     
        // update query
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    first_name = :first_name,
                    middle_name = :middle_name,
                    last_name = :last_name,
                    gender = :gender,
                    email = :email
                WHERE
                    user_id = :user_id";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->middle_name=htmlspecialchars(strip_tags($this->middle_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->gender=htmlspecialchars(strip_tags($this->gender));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->user_id=htmlspecialchars(strip_tags($this->user_id));
     
        // bind new values
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":middle_name", $this->middle_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":gender", $this->gender);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":user_id", $this->user_id);
     
        // execute the query
        if($stmt->execute()){
            return true;
        }
     
        return false;
    }

    // delete the user
    function delete(){
     
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE user_id = ?";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->user_id=htmlspecialchars(strip_tags($this->user_id));
     
        // bind id of record to delete
        $stmt->bindParam(1, $this->user_id);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
     
        return false; 
    }

    // search users
    function search($keywords){
     
        // select all query
        $query = "SELECT
                    u.user_id, u.first_name, u.middle_name, u.last_name, u.gender, u.email, u.date_time
                FROM
                    " . $this->table_name . " u
                WHERE
                    u.first_name LIKE ? OR u.middle_name LIKE ? OR u.last_name LIKE ? OR u.gender LIKE ? OR u.email LIKE ?
                ORDER BY
                    u.date_time DESC";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";
     
        // bind
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);
        $stmt->bindParam(4, $keywords);
        $stmt->bindParam(5, $keywords);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }

    // read users with pagination
    public function readPaging($from_record_num, $records_per_page){
     
        // select query
        $query = "SELECT
                    u.user_id, u.first_name, u.middle_name, u.last_name, u.gender, u.email, u.date_time
                FROM
                    " . $this->table_name . " u
                ORDER BY u.date_time DESC
                LIMIT ?, ?";
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // bind variable values
        $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
        $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
     
        // execute query
        $stmt->execute();
     
        // return values from database
        return $stmt;
    }

    // used for paging users
    public function count(){
        $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
     
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
        return $row['total_rows'];
    }
}