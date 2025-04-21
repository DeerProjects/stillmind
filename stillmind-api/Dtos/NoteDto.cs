using System;

namespace stillmind_api.Dtos;

public class NoteDto
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
