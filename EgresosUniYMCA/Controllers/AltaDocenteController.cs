using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EgresosUniYMCA.Models;
using EgresosUniYMCA.DTO;
using Newtonsoft.Json.Linq;
using System.IO;

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
            DTODocenteBasico docente1 = new DTODocenteBasico();
            if (docente.docenteid == "")
            {
                _db.Docente.Add(new Docente
                {
                    Nombre = docente.xcoordinador.nombre,
                    Paterno = docente.xcoordinador.paterno,
                    Materno = docente.xcoordinador.materno,
                    FechaAlta = DateTime.Now,
                    HoraAlta = DateTime.Now.TimeOfDay,
                    EstatusId = 2,
                    DocenteDetalle = new DocenteDetalle
                    {
                        Celular = docente.xcoordinador.celular,
                        TelefonoCasa = docente.xcoordinador.telcasa,
                        TelefonoOficina = docente.xcoordinador.teloficina,
                        Email = docente.xcoordinador.email
                    }
                });
                _db.SaveChanges();
                docente1.docenteid = _db.Docente.Local.FirstOrDefault().DocenteId;
                docente1.estatusid = _db.Docente.Local.FirstOrDefault().EstatusId;

            }
            else
            {
                if (docente.estatusid == "2")
                {
                    docente1.docenteid = int.Parse(docente.docenteid);
                    Docente docenteUpdate = _db.Docente.Where(a => a.DocenteId == docente1.docenteid).FirstOrDefault();
                    //Actualizar docente//
                    docenteUpdate.Nombre = docente.xcoordinador.nombre;
                    docenteUpdate.Paterno = docente.xcoordinador.paterno;
                    docenteUpdate.Materno = docente.xcoordinador.materno;
                    DocenteDetalle docenteDetalleUpdate = _db.DocenteDetalle.Where(a => a.DocenteId == docente1.docenteid).FirstOrDefault();
                    //Actualizar docente detalle//
                    docenteDetalleUpdate.Celular = docente.xcoordinador.celular;
                    docenteDetalleUpdate.TelefonoCasa = docente.xcoordinador.telcasa;
                    docenteDetalleUpdate.TelefonoOficina = docente.xcoordinador.teloficina;
                    docenteDetalleUpdate.Email = docente.xcoordinador.email;
                    docente1.estatusid = docenteUpdate.EstatusId;
                }


                _db.SaveChanges();
            }


            return Ok(docente1);
        }

        [HttpPost("Estudio")]
        public IActionResult Estudio([FromBody] DTOEstudio Estudio)
        {

            if (Estudio.crud == "1")
            {
                //_db.DocenteEstudio.Add(new DocenteEstudio
                //{
                //    DocenteId = int.Parse(Estudio.docenteid),
                //    Institucion = Estudio.institucion,
                //    OfertaEducativaTipoId = int.Parse(Estudio.gradoid),
                //    Carrera = Estudio.carrera,
                //    Cedula = Estudio.cedula == "true" ? true : false,
                //    Titulo = Estudio.titulo == "true" ? true : false,
                //    Fecha = DateTime.Now,
                //    Hora = DateTime.Now.TimeOfDay,
                //    EstatusId = 1
                //});
                //_db.SaveChanges();

                //DocenteEstudio estudiodocente = _db.DocenteEstudio.Local.FirstOrDefault();
                /////guardar url de documentos///
                //if (Estudio.cedulanombre != "")
                //{
                //    _db.DocenteEstudioDocumento.Add(new DocenteEstudioDocumento
                //    {
                //        EstudioId = estudiodocente.EstudioId,
                //        DocuentoTipoId = 1,
                //        DocumentoUrl = "http://localhost/PortalEgresos/Documentos/" + Estudio.cedulanombre + ".pdf"
                //    });
                //}
                //if (Estudio.titulonombre != "")
                //{
                //    _db.DocenteEstudioDocumento.Add(new DocenteEstudioDocumento
                //    {
                //        EstudioId = estudiodocente.EstudioId,
                //        DocuentoTipoId = 2,
                //        DocumentoUrl = "http://localhost/PortalEgresos/Documentos/" + Estudio.titulonombre + ".pdf"
                //    });
                //}
                /////////
                //_db.SaveChanges();
            }
            else if (Estudio.crud == "2")
            {
                DocenteEstudio estudioEditar = _db.DocenteEstudio.Where(a => a.EstudioId == int.Parse(Estudio.estudioid)).FirstOrDefault();
                estudioEditar.Institucion = Estudio.institucion;
                estudioEditar.OfertaEducativaTipoId = int.Parse(Estudio.gradoid);
                estudioEditar.Carrera = Estudio.carrera;
                estudioEditar.Cedula = Estudio.cedula == "true" ? true : false;
                estudioEditar.Titulo = Estudio.titulo == "true" ? true : false;
                estudioEditar.Fecha = DateTime.Now;
                estudioEditar.Hora = DateTime.Now.TimeOfDay;
                if (Estudio.cedulanombre != "")
                {
                    DocenteEstudioDocumento estudiodocumento = _db.DocenteEstudioDocumento.Where(a => a.EstudioId == int.Parse(Estudio.estudioid) && a.DocuentoTipoId == 1).FirstOrDefault();
                    if (estudiodocumento != null)
                    {
                        estudiodocumento.DocumentoUrl = "http://localhost/PortalEgresos/Documentos/" + Estudio.cedulanombre + ".pdf";
                    }
                    else
                    {
                        _db.DocenteEstudioDocumento.Add(new DocenteEstudioDocumento
                        {
                            EstudioId = int.Parse(Estudio.estudioid),
                            DocuentoTipoId = 1,
                            DocumentoUrl = "http://localhost/PortalEgresos/Documentos/" + Estudio.cedulanombre + ".pdf"
                        });
                    }
                }
                if (Estudio.titulonombre != "")
                {
                    DocenteEstudioDocumento estudiodocumento = _db.DocenteEstudioDocumento.Where(a => a.EstudioId == int.Parse(Estudio.estudioid) && a.DocuentoTipoId == 2).FirstOrDefault();
                    if (estudiodocumento != null)
                    {
                        estudiodocumento.DocumentoUrl = "http://localhost/PortalEgresos/Documentos/" + Estudio.titulonombre + ".pdf";
                    }
                    else
                    {
                        _db.DocenteEstudioDocumento.Add(new DocenteEstudioDocumento
                        {
                            EstudioId = int.Parse(Estudio.estudioid),
                            DocuentoTipoId = 2,
                            DocumentoUrl = "http://localhost/PortalEgresos/Documentos/" + Estudio.titulonombre + ".pdf"
                        });
                    }
                }
                _db.SaveChanges();
            }
            else if (Estudio.crud == "3")
            {
                DocenteEstudio estudioEditar = _db.DocenteEstudio.Where(a => a.EstudioId == int.Parse(Estudio.estudioid)).FirstOrDefault();
                estudioEditar.EstatusId = 2;
                _db.SaveChanges();
            }
            
            List<DTOEstudio> estudioDocente = _db.DocenteEstudio.Where(a => a.DocenteId == int.Parse(Estudio.docenteid) && a.EstatusId == 1)
                                                                .Select(b => new DTOEstudio
                                                                {
                                                                    estudioid = b.EstudioId.ToString(),
                                                                    docenteid = b.DocenteId.ToString(),
                                                                    institucion = b.Institucion,
                                                                    gradoid = b.OfertaEducativaTipoId.ToString(),
                                                                    grado = b.OfertaEducativaTipo.Descripcion,
                                                                    carrera = b.Carrera,
                                                                    cedula = b.Cedula == true ? "Si" : "No",
                                                                    cedulanombre = b.DocenteEstudioDocumento.Count(c => c.DocuentoTipoId == 1) > 0 ? "Archivo..." : null,
                                                                    cedulaurl = b.DocenteEstudioDocumento.Where(c => c.DocuentoTipoId == 1).FirstOrDefault().DocumentoUrl,
                                                                    titulo = b.Titulo == true ? "Si" : "No",
                                                                    titulonombre = b.DocenteEstudioDocumento.Count(c => c.DocuentoTipoId == 2) > 0 ? "Archivo..." : null,
                                                                    titulourl = b.DocenteEstudioDocumento.Where(e => e.DocuentoTipoId == 2).FirstOrDefault().DocumentoUrl
                                                                })
                                                                .ToList();

            return Ok(estudioDocente);
        }

        [HttpPost("GuardarAchivo")]
        public async Task<IActionResult> Upload(IList<IFormFile> files)
        {

            foreach (var file in files)
            {

                var filePath = Directory.GetCurrentDirectory() + "\\Documentos\\" + file.FileName + ".pdf";
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

            }


            return Ok(true);
        }
    }
}
