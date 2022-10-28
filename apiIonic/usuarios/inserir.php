<?php 
    require_once("../conexao.php");

    $postjson = json_decode(file_get_contents('php://input'),true);

    $nome = $postjson['nome'];
    $email = $postjson['email'];
    $cpf = $postjson['cpf'];
    $senha = $postjson['senha'];
    $nivel = $postjson['nivel'];

    $id = $postjson['id'];
    $antigo = $postjson['antigo'];
    $antigo2 = $postjson['antigo2'];

    if($nome == ""){
        echo json_encode(array('mensagem'=>'Campo nome vazio'));
        exit();
    }
    if($email == ""){
        echo json_encode(array('mensagem'=>'Campo email vazio'));
        exit();
    }
    if($cpf == ""){
        echo json_encode(array('mensagem'=>'Campo cpf vazio'));
        exit();
    }
    if($senha == ""){
        echo json_encode(array('mensagem'=>'Campo senha vazio'));
        exit();
    }
    if($nivel == ""){
        echo json_encode(array('mensagem'=>'Campo nivel vazio'));
        exit();
    }

// EVITAR DUPLICIDADE NO EMAIL
    if($antigo2 != $email){
        $query_con = $pdo->prepare("SELECT * from usuarios WHERE email = :email");
        $query_con->bindValue(":email", $email);
        $query_con->execute();
        $res_con = $query_con->fetchAll(PDO::FETCH_ASSOC);
        if(@count($res_con) > 0){
            echo json_encode(array('mensagem'=>'O email do usuário já está cadastrado!'));
            exit();
        }
    }

// EVITAR DUPLICIDADE NO CPF
    if($antigo != $cpf){
        $query_con = $pdo->prepare("SELECT * from usuarios WHERE cpf = :cpf");
        $query_con->bindValue(":cpf", $cpf);
        $query_con->execute();
        $res_con = $query_con->fetchAll(PDO::FETCH_ASSOC);
        if(@count($res_con) > 0){
            echo json_encode(array('mensagem'=>'O CPF do usuário já está cadastrado!'));
            exit();
        }
    }

    if($id == ""){
        $res = $pdo->prepare("INSERT INTO usuarios SET nome = :nome, email = :email, cpf = :cpf, senha = :senha, nivel = :nivel");
    }else{
        $res = $pdo->prepare("UPDATE usuarios SET nome = :nome, email = :email, cpf = :cpf, senha = :senha, nivel = :nivel WHERE id = :id");
        $res->bindValue(":id", $id);
    }

	$res->bindValue(":nome", $nome);
	$res->bindValue(":email", $email);
	$res->bindValue(":cpf", $cpf);
	$res->bindValue(":senha", $senha);
	$res->bindValue(":nivel", $nivel);
	$res->execute();

    echo json_encode(array('mensagem'=>'Salvo com Sucesso','sucesso'=>true));

?>