using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using StillMindAPI.Data;
using StillMindAPI.Models;
using StillMindAPI.Services;
using stillmind_api.Dtos;
using Microsoft.AspNetCore.Identity;

namespace StillMindAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly StillMindDbContext _db;
        private readonly JwtService _jwt;

        public AuthController(StillMindDbContext db, JwtService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPost("register")]
public async Task<IActionResult> Register(RegisterUserDto dto)
{
    try
    {
        if (await _db.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest("Username already taken.");

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = Hash(dto.PasswordHash)
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok("Registered successfully.");
    }
    catch (Exception ex)
    {
        return StatusCode(500, new
        {
            error = ex.Message,
            stack = ex.StackTrace,
            inner = ex.InnerException?.Message
        });
    }
}

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDto login)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == login.Username);
            if (user == null || user.PasswordHash != Hash(login.PasswordHash))
                return Unauthorized("Invalid credentials.");

            var token = _jwt.GenerateToken(user);
            return Ok(new { token });
        }


        private string Hash(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}
