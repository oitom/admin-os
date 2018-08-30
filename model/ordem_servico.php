<?php
Class Ordem_Servico
{
    public function getOSAssistenciaTecnica(){
        $conn = new Conexao();
        $pdo = $conn->getConexao();
        $pdo->query("set names utf8");
        $consulta = $pdo->query("SELECT count(*) as qtd, assistencia_tecnica as assistencia FROM `ordem_servico` GROUP BY assistencia_tecnica ORDER BY count(*) DESC");
        $res = $consulta->fetchAll(PDO::FETCH_ASSOC);
        
        return $res;
    }

    public function getQtdStatus(){
        $conn = new Conexao();
        $pdo = $conn->getConexao();
        $pdo->query("set names utf8");
        $consulta = $pdo->query("SELECT count(*) as qtd, status FROM `ordem_servico` GROUP BY status");
        $res = $consulta->fetchAll(PDO::FETCH_ASSOC);
        
        return $res;
    }

    public function getTipoGarantia(){
        $conn = new Conexao();
        $pdo = $conn->getConexao();
        $pdo->query("set names utf8");
        $consulta = $pdo->query("SELECT DISTINCT `tipo_garantia` FROM `ordem_servico`");
        $res = $consulta->fetchAll(PDO::FETCH_ASSOC);
        
        return $res;
    }

    public function getOsAbertaGarantia(){
        $conn = new Conexao();
        $pdo = $conn->getConexao();
        $pdo->query("set names utf8");
        $consulta = $pdo->query("SELECT count(*) as qtd, `tipo_garantia` FROM `ordem_servico` WHERE `status` != 'Finalizado' GROUP BY `tipo_garantia`");
        $res = $consulta->fetchAll(PDO::FETCH_ASSOC);
        
        return $res;
    }

    public function getOsAbertaPorMes(){
        $conn = new Conexao();
        $pdo = $conn->getConexao();
        $pdo->query("set names utf8");
        $consulta = $pdo->query("SELECT COUNT(*) as qtd, MONTH(STR_TO_DATE(`data_abertura`,'%d/%m/%Y')) as mes, YEAR(STR_TO_DATE(`data_abertura`,'%d/%m/%Y')) as ano FROM `ordem_servico` WHERE `status` != 'Finalizado' GROUP by MONTH(STR_TO_DATE(`data_abertura`,'%d/%m/%Y')), YEAR(STR_TO_DATE(`data_abertura`,'%d/%m/%Y'))");
        $res = $consulta->fetchAll(PDO::FETCH_ASSOC);
        
        return $res;
    }

    public function getOsPorEstado(){
        $conn = new Conexao();
        $pdo = $conn->getConexao();
        $pdo->query("set names utf8");
        $consulta = $pdo->query("SELECT COUNT(*) as qtd, `estado_consumidor`as estado FROM `ordem_servico` GROUP BY `estado_consumidor` ORDER BY  COUNT(*) DESC");
        $res = $consulta->fetchAll(PDO::FETCH_ASSOC);
        
        return $res;
    }

    public function getPesquisa($pesquisa){
        $conn = new Conexao();
        $pdo = $conn->getConexao();
        $pdo->query("set names utf8");
        $consulta = $pdo->query("SELECT * FROM `ordem_servico` WHERE 
            numero_os like '%$pesquisa%' OR 
            tipo_garantia like '%$pesquisa%' OR 
            assistencia_tecnica  like '%$pesquisa%' OR 
            data_abertura  like '%$pesquisa%' OR 
            status  like '%$pesquisa%' OR 
            data_ultimo_status  like '%$pesquisa%' OR 
            model_produto  like '%$pesquisa%' OR 
            cidade_consumidor  like '%$pesquisa%' OR 
            estado_consumidor  like '%$pesquisa%' LIMIT 20");
        $res = $consulta->fetchAll(PDO::FETCH_ASSOC);
        
        return $res;
    }
}
?>