using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EgresosUniYMCA.DTO
{
    public class DTOCatalogos
    {
        public DTOCatalogos()
        {
            Paises = new List<DTOPais>();
            Entidades = new List<DTOEntidadFederativa>();
            Generos = new List<DTOGenero>();
            EstadosCiviles = new List<DTOEstadoCivil>();
            OfertasTipo = new List<DTOOfertaEducativaTipo>();
        }
        public List<DTOPais> Paises { get; set; }
        public List<DTOEntidadFederativa> Entidades { get; set; }
        public List<DTOGenero> Generos { get; set; }
        public List<DTOEstadoCivil> EstadosCiviles { get; set; }
        public List<DTOOfertaEducativaTipo> OfertasTipo { get; set; }
    }

    public class DTOPais
    {
        public int PaisId { get; set; }
        public string Descripcion { get; set; }

        public string value { get; set; }
        public string label { get; set; }
    }

    public class DTOEntidadFederativa
    {
        public int EntidadFederativaId { get; set; }
        public string Descripcion { get; set; } 

        public string value { get; set; }
        public string label { get; set; }
    }

    public class DTOMunicipio
    {
        public int MunicipioId { get; set; }
        public string Descripcion { get; set; }
        public string EntidadFederativaId { get; set; }

        public string value { get; set; }
        public string label { get; set; }
    }

    public class DTOGenero
    {
        public int GeneroId { get; set; }
        public string Descripcion { get; set; }

        public string value { get; set; }
        public string label { get; set; }
    }

    public class DTOEstadoCivil
    {
        public int EstadoCivilId { get; set; }
        public string Descripcion { get; set; }

        public string value { get; set; }
        public string label { get; set; }
    }

    public class DTOOfertaEducativaTipo
    {
        public int OfertaEducativaTipoId { get; set; }
        public string Descripcion { get; set; }

        public string value { get; set; }
        public string label { get; set; }

    }




}
