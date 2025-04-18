using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StillMindAPI.Data;
using StillMindAPI.Models;

namespace StillMindAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly StillMindDbContext _db;

        public NotesController(StillMindDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Note note)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            note.UserId = userId;
            note.CreatedAt = DateTime.UtcNow;

            _db.Notes.Add(note);
            await _db.SaveChangesAsync();

            return Ok(note);
        }

        [HttpGet]
        public async Task<IActionResult> GetMyNotes()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var notes = await _db.Notes
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return Ok(notes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var note = await _db.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);
            
            if (note == null)
                return NotFound("Note not found");

            _db.Notes.Remove(note);
            await _db.SaveChangesAsync();

            return Ok("Note deleted.");
        }
    }
}
