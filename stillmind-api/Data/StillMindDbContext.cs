using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StillMindAPI.Models;

namespace StillMindAPI.Data
{
    public class StillMindDbContext : DbContext
    {
        public StillMindDbContext(DbContextOptions<StillMindDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Note> Notes { get; set; } = null;
    }
}