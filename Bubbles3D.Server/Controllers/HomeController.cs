using Microsoft.AspNetCore.Mvc;

namespace Bubbles3D.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("You have arrived");
        }
    }
}
