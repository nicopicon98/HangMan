<?php
class basedatos
{
    private $con;
    private $dbequipo = 'localhost';
    private $dbusuario = 'root';
    private $dbclave = '01234567';
    private $dbnombre = 'prueba2021';
    //método constructor
    public function __construct()
    {
        $this->conectar();
    } //fin constructor

    //función para conectarse a la base de datos
    public function conectar()
    {
        $this->con = mysqli_connect($this->dbequipo, $this->dbusuario, $this->dbclave, $this->dbnombre);

        if (mysqli_connect_error()) {
            die("Error: No se pudo conectar a la base de datos: " . mysqli_connect_error() . mysqli_connect_errno());
        }

    } //fin funcion conectar

    //función para consultar
    public function leer_tabla()
    {
        $sql = "SELECT * FROM personas";
        $res = mysqli_query($this->con, $sql);
        return $res;
    } // fin consulta

} // Fin Clase basedatos
