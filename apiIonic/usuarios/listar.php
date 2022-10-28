<?php 
    require_once("../conexao.php");

    $postjson = json_decode(file_get_contents('php://input'),true);

    $busca = '%'.$postjson['nome'].'%';

    $query = $pdo->query("SELECT * from usuarios where nome LIKE '$busca' or cpf LIKE '$busca' order by id desc limit $postjson[start], $postjson[limit]");
    $res = $query->fetchAll(PDO::FETCH_ASSOC);
    $total_reg = @count($res);
    if($total_reg > 0){
        for($i=0;$i<$total_reg;$i++){
            foreach($res[$i] as $key => $value){}
            $dados[] = array(
                    'id' => $res[$i]['id'],
                    'nome' => $res[$i]['nome'],
                    'cpf' => $res[$i]['cpf'],
                    'email' => $res[$i]['email'],
                    'nivel' => $res[$i]['nivel']
                );
        }
        $result = json_encode(array('result'=>$dados));
        echo $result;
    }else{
        $result = json_encode(array('result'=>'0'));
        echo $result;     
    }
?>