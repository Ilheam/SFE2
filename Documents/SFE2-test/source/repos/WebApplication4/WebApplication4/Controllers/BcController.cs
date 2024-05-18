using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PurchaseOrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/PurchaseOrder/Create
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] BonDeCommande bonDeCommande)
        {
            if (bonDeCommande == null || bonDeCommande.Entete == null || bonDeCommande.Details == null || bonDeCommande.Details.Count == 0)
            {
                return BadRequest("Le bon de commande est invalide");
            }

            // Add Entete and Details using SQL queries
            await _context.Database.ExecuteSqlRawAsync(
                "INSERT INTO entete_bc (IdFournisseur, NumeroBonCommande, Date, Devis) VALUES ({0}, {1}, {2}, {3})",
                bonDeCommande.Entete.IdFournisseur, bonDeCommande.Entete.NumeroBonCommande, bonDeCommande.Entete.Date, bonDeCommande.Entete.Devis);

            bonDeCommande.Entete.Id = _context.Entete_BCs.OrderByDescending(e => e.Id).FirstOrDefault()?.Id ?? 0;

            foreach (var detail in bonDeCommande.Details)
            {
                await _context.Database.ExecuteSqlRawAsync(
                    "INSERT INTO detailsbc (IdArticle, Quantite, PrixUnitaire, BonDeCommandeId) VALUES ({0}, {1}, {2}, {3})",
                    detail.IdArticle, detail.Quantite, detail.PrixUnitaire, bonDeCommande.Entete.Id);
            }

            return Ok(bonDeCommande);
        }

        // GET: api/PurchaseOrder/GetAll
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var bonDeCommandes = await _context.BonDeCommandes
                .Include(b => b.Entete)
                .Include(b => b.Details)
                .ToListAsync();

            return Ok(bonDeCommandes);
        }

        // GET: api/PurchaseOrder/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var bonDeCommande = await _context.BonDeCommandes
                .Include(b => b.Entete)
                .Include(b => b.Details)
                .FirstOrDefaultAsync(b => b.Entete.Id == id);

            if (bonDeCommande == null)
            {
                return NotFound("Bon de commande non trouvé");
            }

            return Ok(bonDeCommande);
        }

        // PUT: api/PurchaseOrder/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] BonDeCommande updatedBonDeCommande)
        {
            var existingBonDeCommande = await _context.BonDeCommandes
                .Include(b => b.Entete)
                .Include(b => b.Details)
                .FirstOrDefaultAsync(b => b.Entete.Id == id);

            if (existingBonDeCommande == null)
            {
                return NotFound("Bon de commande non trouvé");
            }

            // Update Entete
            await _context.Database.ExecuteSqlRawAsync(
                "UPDATE entete_bc SET IdFournisseur = {0}, NumeroBonCommande = {1}, Date = {2}, Devis = {3} WHERE Id = {4}",
                updatedBonDeCommande.Entete.IdFournisseur, updatedBonDeCommande.Entete.NumeroBonCommande, updatedBonDeCommande.Entete.Date, updatedBonDeCommande.Entete.Devis, updatedBonDeCommande.Entete.Id);

            // Update Details
            foreach (var detail in updatedBonDeCommande.Details)
            {
                await _context.Database.ExecuteSqlRawAsync(
                    "UPDATE detailsbc SET IdArticle = {0}, Quantite = {1}, PrixUnitaire = {2} WHERE Id = {3}",
                    detail.IdArticle, detail.Quantite, detail.PrixUnitaire, detail.Id);
            }

            return Ok(existingBonDeCommande);
        }

        // DELETE: api/PurchaseOrder/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var bonDeCommandeToRemove = await _context.BonDeCommandes
                .Include(b => b.Entete)
                .Include(b => b.Details)
                .FirstOrDefaultAsync(b => b.Entete.Id == id);

            if (bonDeCommandeToRemove == null)
            {
                return NotFound("Bon de commande non trouvé");
            }

            _context.BonDeCommandes.Remove(bonDeCommandeToRemove);
            await _context.SaveChangesAsync();

            return Ok("Bon de commande supprimé");
        }
    }
}
