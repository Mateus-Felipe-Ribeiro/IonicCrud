<?php 
    require_once("../conexao.php");

    $postjson = json_decode(file_get_contents('php://input'),true);

    $id = @$postjson['id'];

    
?>