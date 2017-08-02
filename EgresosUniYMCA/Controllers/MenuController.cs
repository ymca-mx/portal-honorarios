using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EgresosUniYMCA.Controllers
{
    [Produces("application/json")]
    [Route("api/Menu")]
    public class MenuController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            List<Menu> Menu = new List<Controllers.Menu>();

            Menu.Add(new Controllers.Menu
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

            Menu.Add(new Controllers.Menu
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