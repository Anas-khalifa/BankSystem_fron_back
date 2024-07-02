using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bank_System.Models;
using System.Net.Mail;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace Bank_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        private readonly BankSystemContext _context;
        private readonly IEmailSender _emailSender;

        public UsersController(BankSystemContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public  ActionResult<User> GetUser(int id)
        {
            var user =  _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users Create User
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> PostUser( User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            


            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // Login User
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<User>> loginUser(User user)
        {
            var userAuth=_context.Users.Where(a=>a.Username.Equals(user.Username)).FirstOrDefault();
            var passAuth= _context.Users.Where(a => a.Pass.Equals(user.Pass)).FirstOrDefault();
            var isActive = user.Access;
            if (userAuth == null || passAuth == null)
            {
                return BadRequest();
            }
            
            return Ok();
            


        }

        [HttpPost]
        [Route("verifyUser")]
        public ActionResult<User> verifyUser(BankAccount account)
        {
            _context.BankAccounts.Add(account);
            _context.SaveChanges();
            return Ok();
        }
        //Edit Balance 
       


        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
