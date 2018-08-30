<?php
Class Conexao
{
    public function getConexao(){
        try {
            $conn = new PDO('mysql:host=localhost;dbname=admin_os', 'root', '');
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch(PDOException $e) {
            echo 'ERROR: ' . $e->getMessage();
        }
    }
}
?>