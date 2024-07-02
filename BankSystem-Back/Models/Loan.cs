using System;
using System.Collections.Generic;

namespace Bank_System.Models;

public partial class Loan
{
    public int LoanId { get; set; }

    public int? AccountId { get; set; }

    public string? LoanType { get; set; }

    public double? LoanAmount { get; set; }

    public DateOnly? LoanStartDate { get; set; }

    public DateOnly? LoanEndDate { get; set; }

    public bool? ActiveState { get; set; }

    public virtual BankAccount? Account { get; set; }
}
