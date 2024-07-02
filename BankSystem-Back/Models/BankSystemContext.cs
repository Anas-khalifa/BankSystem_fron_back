using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Bank_System.Models;

public partial class BankSystemContext : DbContext
{
    public BankSystemContext()
    {
    }

    public BankSystemContext(DbContextOptions<BankSystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BankAccount> BankAccounts { get; set; }

    public virtual DbSet<Loan> Loans { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<Transfer> Transfers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-FBECO5I;Database=bankSystem;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BankAccount>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__Bank_Acc__B19E45C916BA4DA1");

            entity.ToTable("Bank_Account");

            entity.Property(e => e.AccountId).HasColumnName("Account_ID");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.User).WithMany(p => p.BankAccounts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Bank_Acco__userI__628FA481");
        });

        modelBuilder.Entity<Loan>(entity =>
        {
            entity.HasKey(e => e.LoanId).HasName("PK__Loans__4F5AD437DF17D632");

            entity.Property(e => e.LoanId).HasColumnName("LoanID");
            entity.Property(e => e.AccountId).HasColumnName("Account_ID");
            entity.Property(e => e.ActiveState).HasDefaultValue(false);
            entity.Property(e => e.LoanType)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Account).WithMany(p => p.Loans)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Loans__Account_I__693CA210");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__55433A6BBBCBA5E0");

            entity.Property(e => e.AccountId).HasColumnName("Account_ID");
            entity.Property(e => e.Currancy)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("currancy");
            entity.Property(e => e.TransactionType)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Transaction_type");

            entity.HasOne(d => d.Account).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Transacti__Accou__75A278F5");
        });

        modelBuilder.Entity<Transfer>(entity =>
        {
            entity.HasKey(e => e.TransferId).HasName("PK__Transfer__954901712B2689B2");

            entity.Property(e => e.TransferId).HasColumnName("TransferID");
            entity.Property(e => e.FromCustomerId).HasColumnName("FromCustomerID");
            entity.Property(e => e.ToCustomerId).HasColumnName("ToCustomerID");
            entity.Property(e => e.TransferDate).HasColumnType("datetime");

            entity.HasOne(d => d.FromCustomer).WithMany(p => p.TransferFromCustomers)
                .HasForeignKey(d => d.FromCustomerId)
                .HasConstraintName("FK__Transfers__FromC__656C112C");

            entity.HasOne(d => d.ToCustomer).WithMany(p => p.TransferToCustomers)
                .HasForeignKey(d => d.ToCustomerId)
                .HasConstraintName("FK__Transfers__ToCus__66603565");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07FFD0F13B");

            entity.Property(e => e.Access)
                .HasDefaultValue(false)
                .HasColumnName("access");
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("address_");
            entity.Property(e => e.Age).HasColumnName("AGE");
            entity.Property(e => e.Fullname)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(6)
                .IsUnicode(false);
            entity.Property(e => e.Pass)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("pass");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Phone_Number");
            entity.Property(e => e.RoleName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
