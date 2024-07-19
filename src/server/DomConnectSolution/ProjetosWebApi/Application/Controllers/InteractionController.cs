using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.DTOs.ViewModels;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Service.Interfaces;


namespace ProjetosWebApi.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InteractionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IInteractionService _interactionService;

        public InteractionController(IMapper mapper, IInteractionService interactionService)
        {
            _mapper = mapper;
            _interactionService = interactionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InteractionDto>>> GetAllInteractions()
        {
            IEnumerable<Interaction> interactions = await _interactionService.GetAllInteractionsAsync();
            IEnumerable<InteractionDto> response = _mapper.Map<IEnumerable<InteractionDto>>(interactions);

            return Ok(response);
        }

        [HttpGet("{userId:guid}")]
        public async Task<ActionResult<IEnumerable<InteractionDto>>> GetInteractionsByUserId(Guid userId)
        {
            IEnumerable<Interaction> interactions = await _interactionService.GetInteractionsByUserIdAsync(userId);
            IEnumerable<InteractionDto> response = _mapper.Map<IEnumerable<InteractionDto>>(interactions);

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> CreateInteraction([FromBody] InteractionAddViewModel interactionViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Interaction interactionEntity = _mapper.Map<Interaction>(interactionViewModel);
            await _interactionService.CreateInteractionAsync(interactionEntity);

            InteractionDto response = _mapper.Map<InteractionDto>(interactionEntity);

            return CreatedAtAction(nameof(CreateInteraction), response);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteInteraction(int id)
        {
            Interaction existingInteraction = await _interactionService.GetInteractionByIdAsync(id);
            if (existingInteraction == null)
            {
                return NotFound("Interação do usuário não existe");
            }

            await _interactionService.DeleteInteractionAsync(id);
            return NoContent();
        }
    }
}
