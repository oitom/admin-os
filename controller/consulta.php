<?php
include_once "../model/conexao.php";
include_once "../model/ordem_servico.php";

if(isset($_POST['op'])){
    $c = new Ordem_Servico();
    switch($_POST['op']){
        case 'getOSAssistenciaTecnica': 
            echo json_encode($c->getOSAssistenciaTecnica()); break;
        case 'getQtdStatus':
            echo json_encode($c->getQtdStatus()); break;
        case 'getTipoGarantia': 
            echo json_encode($c->getTipoGarantia()); break;
        case 'getOsAbertaGarantia':
            echo json_encode($c->getOsAbertaGarantia()); break;
        case 'getOsAbertaPorMes': 
            echo json_encode($c->getOsAbertaPorMes()); break;
        case 'getOsPorEstado': 
            echo json_encode($c->getOsPorEstado()); break;
        case 'pesquisar':
            echo json_encode($c->getPesquisa($_POST['palavra'])); break;
    }   
}

?>