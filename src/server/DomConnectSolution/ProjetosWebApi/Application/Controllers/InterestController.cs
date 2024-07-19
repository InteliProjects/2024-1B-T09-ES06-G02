using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.DTOs.ViewModels;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Application.Controllers
{
    [Route("api/interests")]
    [ApiController]
    public class InterestController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IInterestService _interestService;
        public InterestController(IMapper mapper, IInterestService interestService)
        {
            _mapper = mapper;
            _interestService = interestService;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<InterestDto>>> GetAllInterestsById(Guid userId)
        {
            IEnumerable<Interest> interest = await _interestService.GetAllInterestsById(userId);
            IEnumerable<InterestDto> response = _mapper.Map<IEnumerable<InterestDto>>(interest);

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> CreateInterest(InterestAddViewModel interestData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Interest interestEntity = _mapper.Map<Interest>(interestData);
            await _interestService.CreateInterest(interestEntity);

            InterestDto response = _mapper.Map<InterestDto>(interestEntity);

            return CreatedAtAction(nameof(CreateInterest), response);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteInterest(int id)
        {
            Interest existingInterest = await _interestService.GetInterestByIdAsync(id);
            if (existingInterest == null)
            {
                return NotFound("Interesse do usuário não existe");
            }

            await _interestService.DeleteInterestAsync(id);
            return NoContent();
        }
    }
}
