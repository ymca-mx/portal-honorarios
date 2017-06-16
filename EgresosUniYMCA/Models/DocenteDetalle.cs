using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class DocenteDetalle
    {
        public int DocenteId { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string Curp { get; set; }
        public string NumeroMigracion { get; set; }
        public int? GeneroId { get; set; }
        public int? EstadoCivilId { get; set; }
        public int? PaisId { get; set; }
        public int? EntidadNacimientoId { get; set; }
        public int? EntidadFederativaId { get; set; }
        public int? MunicipioId { get; set; }
        public string Cp { get; set; }
        public string Colonia { get; set; }
        public string Calle { get; set; }
        public string NoExterior { get; set; }
        public string NoInterior { get; set; }
        public string TelefonoCasa { get; set; }
        public string TelefonoOficina { get; set; }
        public string Celular { get; set; }
        public string Email { get; set; }
        public string EmailUniversidad { get; set; }
        public string Rfc { get; set; }
        public string RazonSocial { get; set; }
        public string NoCuenta { get; set; }
        public string ClabeInterbancaria { get; set; }

        public virtual Docente Docente { get; set; }
        public virtual EntidadFederativa EntidadFederativa { get; set; }
        public virtual EntidadFederativa EntidadNacimiento { get; set; }
        public virtual EstadoCivil EstadoCivil { get; set; }
        public virtual Genero Genero { get; set; }
        public virtual Pais Pais { get; set; }
        public virtual Municipio Municipio { get; set; }
    }
}
