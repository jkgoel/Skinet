using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.DTO;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {

    private readonly IGenericRepository<Product> _productRepo;
    private readonly IGenericRepository<ProductType> _typeRepo;
    private readonly IGenericRepository<ProductBrand> _brandRepo;
    private readonly IMapper _mapper;

    public ProductsController(IGenericRepository<Product> productRepo,
                              IGenericRepository<ProductType> typeRepo,
                              IGenericRepository<ProductBrand> brandRepo,
                              IMapper mapper)
    {
      _brandRepo = brandRepo;
      _mapper = mapper;
      _typeRepo = typeRepo;
      _productRepo = productRepo;

    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductToReturnDTO>>> GetProducts()
    {
      var spec = new ProductsWithTypesAndBrandsSpecification();
      var products = await _productRepo.ListAsync(spec);
      return Ok(products.Select(product => _mapper.Map<Product, ProductToReturnDTO>(product)));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
    {
      var spec = new ProductsWithTypesAndBrandsSpecification(id);
      var product = await _productRepo.GetEntityWithSpec(spec);
      return _mapper.Map<Product, ProductToReturnDTO>(product);
    }

    [HttpGet("brands")]
    public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
    {
      return Ok(await _brandRepo.ListAllAsync());
    }

    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
    {
      return Ok(await _typeRepo.ListAllAsync());
    }

  }
}