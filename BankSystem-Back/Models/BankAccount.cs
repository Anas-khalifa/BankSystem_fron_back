using System;
using System.Collections.Generic;

namespace Bank_System.Models;

public partial class BankAccount
{
    public int AccountId { get; set; }

    public double Balance { get; set; }

    public int? UserId { get; set; }

    public virtual ICollection<Loan> Loans { get; set; } = new List<Loan>();

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public virtual ICollection<Transfer> TransferFromCustomers { get; set; } = new List<Transfer>();

    public virtual ICollection<Transfer> TransferToCustomers { get; set; } = new List<Transfer>();

    public virtual User? User { get; set; }
}
