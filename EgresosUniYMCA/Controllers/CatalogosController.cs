using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EgresosUniYMCA.Models;
using EgresosUniYMCA.DTO;

namespace EgresosUniYMCA.Controllers
{

    [Produces("application/json")]
    [Route("api/Catalogos")]
    public class CatalogosController : Controller
    {
        private readonly UniversidadContext _db;
        public CatalogosController(UniversidadContext db) { _db = db; }

        [HttpGet("AltaDocenteCatalogo")]
        public IActionResult AltaDocenteCatalogo()
        {

            List<DTOPais> pais = _db.Pais.Select(b => new DTOPais
            {
                PaisId = b.PaisId,
                Descripcion = b.Descripcion,
                value = b.PaisId.ToString(),
                label = b.Descripcion
            }).ToList();

            List<DTOEntidadFederativa> entidad = _db.EntidadFederativa.Where(a => a.SeMuestra == true)
                                                .Select(b => new DTOEntidadFederativa
                                                {
                                                    EntidadFederativaId = b.EntidadFederativaId,
                                                    Descripcion = b.Descripcion,
                                                    value = b.EntidadFederativaId.ToString(),
                                                    label = b.Descripcion
                                                }).ToList();

            List<DTOGenero> genero = _db.Genero.Select(b => new DTOGenero
            {
                GeneroId = b.GeneroId,
                Descripcion = b.Descripcion,
                value = b.GeneroId.ToString(),
                label = b.Descripcion
            }).ToList();

            List<DTOEstadoCivil> estadoCivil = _db.EstadoCivil.Select(b => new DTOEstadoCivil
            {
                EstadoCivilId = b.EstadoCivilId,
                Descripcion = b.Descripcion,
                value = b.EstadoCivilId.ToString(),
                label = b.Descripcion
            }).ToList();

            List<DTOOfertaEducativaTipo> ofertasTipo = _db.OfertaEducativaTipo.Where(a => a.OfertaEducativaTipoId != 4)
                                                                              .Select(b => new DTOOfertaEducativaTipo
                                                                              {
                                                                                  OfertaEducativaTipoId = b.OfertaEducativaTipoId,
                                                                                  Descripcion = b.Descripcion,
                                                                                  value = b.OfertaEducativaTipoId.ToString(),
                                                                                  label = b.Descripcion
                                                                              }).ToList();


            DTOCatalogos catalogos = new DTOCatalogos();

            //seleccionar//
            catalogos.Paises.Add( new DTOPais
            {
                label = "--Seleccionar--",
                value = ""
            } );
            catalogos.Entidades.Add(new DTOEntidadFederativa
            {
                label = "--Seleccionar--",
                value = ""
            });
            catalogos.Generos.Add(new DTOGenero
            {
                label = "--Seleccionar--",
                value = ""
            });
            catalogos.EstadosCiviles.Add(new DTOEstadoCivil
            {
                label = "--Seleccionar--",
                value = ""
            });
            catalogos.OfertasTipo.Add(new DTOOfertaEducativaTipo
            {
                label = "--Seleccionar--",
                value = ""
            });


            //Agregar catalogos//
            catalogos.Paises.AddRange(pais);
            catalogos.Entidades.AddRange(entidad);
            catalogos.Generos.AddRange(genero);
            catalogos.EstadosCiviles.AddRange(estadoCivil);
            catalogos.OfertasTipo.AddRange(ofertasTipo);
            return Ok(catalogos);
        }

        [HttpGet("Municipio/{estadoId}")]
        public IActionResult Municipio(int estadoId)
        {

            List<DTOMunicipio> municipio = new List<DTOMunicipio>();

            municipio.Add(new DTOMunicipio
            {
                label = "--Seleccionar--",
                value = ""
            });

            municipio.AddRange(_db.Municipio.Where(a => a.EntidadFederativaId == estadoId)
                                                        .Select(b => new DTOMunicipio
                                                        {
                                                            MunicipioId = b.MunicipioId,
                                                            Descripcion = b.Descripcion,
                                                            value = b.MunicipioId.ToString(),
                                                            label = b.Descripcion
                                                        }).ToList());



            return Ok(municipio);
        }
    }
}