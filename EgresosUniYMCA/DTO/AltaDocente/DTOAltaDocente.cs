using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EgresosUniYMCA.DTO
{
    public class DTODocentePersonales
    {
        public string nombre { get; set; }
        public string paterno { get; set; }
        public string materno { get; set; }
        public string celular { get; set; }
        public string telcasa { get; set; }
        public string teloficina { get; set; }
        public string email { get; set; }

    }

    public class DTODocente
    {
        public string docenteid { get; set; }
        public DTODocentePersonales xcoordinador { get; set; }
        public string nacimiento { get; set; }
        public string nacionalidad { get; set; }
        public string lugarnacimiento { get; set; }
        public string curp { get; set; }
        public string nomigracion { get; set; }
        public string genero { get; set; }
        public string estadocivil { get; set; }
        public string emailuni { get; set; }
        public string estatusid { get; set; }
    }
    public class DTODocenteBasico    {
        public int docenteid { get; set; }
        public int? estatusid { get; set; }
    }

    public class DTOEstudio
    {
        public string docenteid { get; set; }
        public string estudioId { get; set; }
        public string institucion { get; set; }
        public string gradoid { get; set; }
        public string grado { get; set; }
        public string carrera { get; set; }
        public string cedula { get; set; }
        public string cedulanombre { get; set; }
        public string cedulaurl { get; set; }
        public string titulo { get; set; }
        public string titulonombre { get; set; }
        public string titulourl { get; set; }
        public string crud { get; set; }
        
    }

}
