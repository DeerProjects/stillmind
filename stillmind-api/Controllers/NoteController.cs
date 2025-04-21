using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using stillmind_api.Dtos;
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

        [HttpPost("Create/Note")]
        public async Task<IActionResult> Create (CreateNoteDto dto)
        {
           int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            
            var note = new Note
            {
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow,
                UserId = userId
            };
        
            _db.Notes.Add(note);
            await _db.SaveChangesAsync();

            return Ok(new NoteDto
            {
                Id = note.Id,
                Content = note.Content,
                CreatedAt = note.CreatedAt
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetMyNotes()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var notes = await _db.Notes
            .Where(n => n.UserId == userId)
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new NoteDto{
                Id = n.Id,
                Content = n.Content,
                CreatedAt = n.CreatedAt
            })
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
