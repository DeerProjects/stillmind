using System;

namespace stillmind_api.Dtos;

public class RegisterUserDto
{
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
}
