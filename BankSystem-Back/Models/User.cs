using System;
using System.Collections.Generic;

namespace Bank_System.Models;

public partial class User
{
    public int Id { get; set; }

    public string Fullname { get; set; } = null!;

    public int Age { get; set; }

    public string Address { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string? Gender { get; set; }

    public string? RoleName { get; set; }

    public bool? Access { get; set; }

    public string Pass { get; set; } = null!;

    public string? Username { get; set; }

    public virtual ICollection<BankAccount> BankAccounts { get; set; } = new List<BankAccount>();
}
