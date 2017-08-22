using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EgresosUniYMCA.Models;
using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.EntityFrameworkCore;

namespace EgresosUniYMCA.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : Controller
    {
        private readonly UniversidadContext _db;
        public AccountController(UniversidadContext db) { _db = db; }
        

        [Authorize, HttpGet("usuario")]
        public async  Task<IActionResult> Usuario()
        {
            int usuarioId = int.Parse(User.Identity.Name);
            
            Usuario usuario = await _db.Usuario.FirstOrDefaultAsync(w=> w.UsuarioId== usuarioId);
            var datos = new  {Nombre = usuario.Nombre + " " + usuario.Paterno + " " + usuario.Materno }; 
            
            return  Ok( datos);
        }

        [Authorize, HttpGet("menu")]
        public async  Task<IActionResult> Menu()
        {
            List<Menu> Menu = new List<Menu>();

            Menu.Add(new Menu
            {
                Titulo = "Docentes",
                SubMenus = new List<SubMenu>
                {
                    new SubMenu
                    {
                        Descripcion="Alta Docentes",
                        Direccion="docente/altadocente"
                    },
                    new SubMenu
                    {
                        Descripcion="Lista Docentes",
                        Direccion="ListaDocentes"
                    }
                }
            });

            Menu.Add(new Menu
            {
                Titulo = "Materias",
                SubMenus = new List<SubMenu>
                {
                    new SubMenu
                    {
                        Descripcion="Alta Materias",
                        Direccion="AltaMaterias"
                    },
                    new SubMenu
                    {
                        Descripcion="Lista Materias",
                        Direccion="ListaMaterias"
                    }
                }
            });

            return Ok(Menu);

        }

    }

    public class Menu
    {
        public string Titulo { get; set; }
        public List<SubMenu> SubMenus { get; set; }
    }
    public class SubMenu
    {
        public string Direccion { get; set; }
        public string Descripcion { get; set; }
    }
}