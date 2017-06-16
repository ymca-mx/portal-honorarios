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
        public DTODocentePersonales xcoordinador { get; set; }
        public string nacimiento { get; set; }
        public string nacionalidad { get; set; }
        public string lugarnacimiento { get; set; }
        public string curp { get; set; }
        public string nomigracion { get; set; }
        public string genero { get; set; }
        public string estadocivil { get; set; }
        public string emailuni { get; set; }
    }
    
}
