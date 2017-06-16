using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EgresosUniYMCA.Models;
using EgresosUniYMCA.DTO;
using Newtonsoft.Json.Linq;

namespace EgresosUniYMCA.Controllers
{
    [Produces("application/json")]
    [Route("api/AltaDocente")]
    public class AltaDocenteController : Controller
    {
        private readonly UniversidadContext _db;
        public AltaDocenteController(UniversidadContext db) { _db = db; }

        [HttpPost("AltaDocente")]
        public IActionResult AltaDocente([FromBody] DTODocente docente)
        {
            _db.Docente.Add(new Docente
            {
                Nombre = docente.xcoordinador.nombre,
                Paterno = docente.xcoordinador.paterno,
                Materno = docente.xcoordinador.materno,
                FechaAlta = DateTime.Now,
                HoraAlta = DateTime.Now.TimeOfDay,
                EstatusId = 8,
                DocenteDetalle = new DocenteDetalle
                {
                   Celular= docente.xcoordinador.celular,
                   TelefonoCasa = docente.xcoordinador.telcasa,
                   TelefonoOficina = docente.xcoordinador.teloficina
                }
            });

            _db.SaveChanges();

            int docenteId = _db.Docente.Local.FirstOrDefault().DocenteId;
            return Ok(docenteId);
        }
    }
}