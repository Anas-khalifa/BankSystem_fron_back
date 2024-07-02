using System;
using System.Collections.Generic;

namespace Bank_System.Models;

public partial class Transaction
{
    public int TransactionId { get; set; }

    public string Currancy { get; set; } = null!;

    public int Amount { get; set; }

    public string TransactionType { get; set; } = null!;

    public int? AccountId { get; set; }

    public virtual BankAccount? Account { get; set; }
}
